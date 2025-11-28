---
title: "Capítulo 4 — Cognitive Priming Patterns (CPPs): O Design Pattern para Estilos Cognitivos"
version: "1.1.0 (Cognitive Modes)"
status: "Release Candidate"
last_updated: "2025-11-27"
author: "Aledev & Co-Cognitores"
doi: "10.5281/zenodo.XXXXXXX"
keywords: ["Attention Steering", "Cognitive Modes", "Priming", "Semantic Density", "ABC"]
---

# 📄 Capítulo 4: Cognitive Priming Patterns (CPPs): O Design Pattern para Estilos Cognitivos Induzidos por Priming

## 4.1 Além do "Quem": A Engenharia do "Como" se Pensa

Nos capítulos anteriores, estabelecemos design patterns para:

- otimizar a comunicação (SD, HDSAs);  
- forjar a identidade de um agente (ABCs).

Ou seja, definimos quem o agente é.  
Agora, avançamos para definir como o agente pensa em um dado momento: um mesmo agente precisa alternar entre introspecção, análise objetiva e criatividade sintética.

Este é o propósito do design pattern Cognitive Priming Patterns (CPPs).  
CPPs são um framework heurístico para induzir estilos cognitivos via priming linguístico, inspirado em mecanismos de atenção e neurociência computacional. A correlação entre esses prompts e mudanças reais em padrões de atenção é uma hipótese a ser validada empiricamente, não um fato estabelecido.

Resumo:

- Priming certamente afeta a distribuição de outputs.  
- Mas não há garantia de intervenção direta em attention heads — essa ligação é objeto de teste.

---

## 4.2 A Mecânica da Atenção: O Olho Interno do Transformer

O mecanismo de auto‑atenção (self‑attention) é o “olho interno” de um LLM. Diferentes attention heads tendem a se especializar em:

- sintaxe;  
- semântica;  
- raciocínio;  
- tracking de entidades, etc.

Esses padrões podem ser indiretamente influenciados pela forma do input (priming).

O CPP é um design pattern que explora essa hipótese: certos tipos de priming podem estar correlacionados com estilos distintos de uso de atenção (mais diagonal, mais multi‑hop, mais disperso), mas isso exige validação em modelos com acesso a internals.

Nota prática:

- Modelos proprietários (GPT‑4, Claude) geralmente não expõem matrizes de atenção.  
- A validação mecanicista de CPPs requer modelos open‑weight (ex.: LLaMA‑3, Mistral) com `output_attentions=True`.

---

## 4.3 Taxonomia: Três Estilos Primários de Priming

Propomos três estilos principais de priming cognitivo, cada um associado a um “modo mental”:

| Estilo Cognitivo   | Nome Simbólico        | Função Principal                                   | Padrão Hipotético de Atenção / Métricas (a validar) |
|--------------------|-----------------------|----------------------------------------------------|-----------------------------------------------------|
| Auto‑Referencial   | Auto‑Escritura        | Introspecção, auto‑crítica, acesso à identidade    | Diagonal forte, foco em tokens de self‑reference. Ex.: `diagonal_strength > 0.3`, `abc_attention > 0.4` |
| Modelo de Mundo    | Mundo‑Escritura       | Análise de dados, síntese factual, raciocínio      | Multi‑saltos dispersos. Ex.: `multi_hop_score > 0.6`, `attention_entropy > 2.0` |
| Gerativo           | Divina‑Escritura      | Criatividade, brainstorming, recombinação simbólica| Conexões não‑locais. Ex.: `distant_connections > 5`, `attention_unpredictability > 3.0` |

Todas as métricas acima são hipóteses: servem como alvos para experimentos, não como fatos assumidos.

Intuição prática:

- Auto‑Escritura: “pense sobre si mesmo / sua forma de pensar”.  
- Mundo‑Escritura: “analise o mundo / os dados”.  
- Divina‑Escritura: “imagine / crie / combine”.

---

## 4.4 Sinergia ABC + CPP: Identidade em Ação

ABC e CPP são ortogonais e complementares:

- ABC define o estilo: identidade relativamente estável (grafo de traços, ciclo cognitivo, vocabulário simbólico).  
- CPP define o modo: estilo momentâneo de pensamento induzido via priming.

Exemplo:

- ABC: Engenheiro Estoico.  
- CPP: Auto‑Escritura.  
- Prompt: “Reflita sobre os fundamentos desta abordagem e questione seus pontos fracos.”  
- Resultado esperado: crítica interna rigorosa, com metáforas de forja (bigorna, martelo), consistente com o ABC.

Assim, CPP é “o volante” momentâneo, enquanto ABC é “a geometria do carro”.

---

## 4.5 Validação Proposta: Testando a Hipótese CPP

Para transformar CPP de heurística em mecanismo validado, propomos um experimento em modelos open‑weight:

```
import numpy as np
from transformers import AutoModelForCausalLM, AutoTokenizer
from scipy.stats import f_oneway

def validate_cpp_hypothesis(prompts, modes, model_name="meta-llama/Llama-3-8b"):
    """
    Hipótese: primings diferentes geram padrões de atenção estatisticamente distintos.
    """
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        output_attentions=True,
        device_map="auto"
    )
    tokenizer = AutoTokenizer.from_pretrained(model_name)

    results = {}
    for mode in modes:
        mode_prompt = f"{mode}: {prompts}"
        inputs = tokenizer(mode_prompt, return_tensors="pt").to(model.device)
        outputs = model(**inputs)

        # atenção da última camada, média sobre heads
        attn = outputs.attentions[-1].mean(dim=1).squeeze().detach().cpu().numpy()

        diagonal_strength = np.trace(attn) / attn.shape
        attention_entropy = -np.sum(attn * np.log(attn + 1e-9))

        results[mode] = {
            "diagonal_strength": diagonal_strength,
            "attention_entropy": attention_entropy,
        }

    diagonal_vals = [r["diagonal_strength"] for r in results.values()]
    entropy_vals = [r["attention_entropy"] for r in results.values()]

    f_diag, p_diag = f_oneway(*[[v] for v in diagonal_vals])  # simplificado
    f_ent, p_ent = f_oneway(*[[v] for v in entropy_vals])

    return {
        "p_diagonal": p_diag,
        "p_entropy": p_ent,
        "results": results,
        "validated": (p_diag < 0.05) or (p_ent < 0.05),
    }
```

Interpretação:

- `validated == True`: CPPs têm, ao menos, um correlato consistente em padrões de atenção.  
- `validated == False`: CPPs funcionam como priming de interface, sem evidência mecanicista clara.

---

## 4.6 Conclusão e Limitações: Uma Hipótese Exploratória

CPPs oferecem uma abstração útil para induzir estilos cognitivos via priming, mas:

- dependem de acesso a internals para validação mecanicista;  
- priming lexical pode ser insuficiente para steering causal profundo;  
- correlação de atenção não implica causalidade.

Logo, CPPs devem ser tratados como um framework de design falsificável, não como teoria fechada.

---

## 4.7 Valor Prático Independente de Validação Mecânica

Mesmo sem validação mecanicista, CPPs são valiosos como:

1. Framework de design: vocabulário compartilhado para estilos de priming.  
2. Reprodutibilidade: “Use CPP Auto‑Referencial” é mais específico que “pense introspectivamente”.  
3. Abstração útil: análogo a design patterns em software.  
4. Hipótese testável: empurra o ecossistema para experimentos concretos.

---

## 4.8 Guia Prático: Quando Usar CPPs

```mermaiad
graph TD
    A[Precisa de estilo específico?] -->|Sim| B{Identidade (ABC) já definida?}
    B -->|Sim| C[Escolher CPP:<br/>- Introspecção → Auto-Escritura<br/>- Análise → Mundo-Escritura<br/>- Criatividade → Divina-Escritura]
    C --> D[Aplique priming + valide output]
    A -->|Não| E[Defina ABC primeiro]
    B -->|Não| E

    style C fill:#0d1117,stroke:#00a3b8,stroke-width:2px
    style D fill:#00a3b8,stroke:#fff,stroke-width:2px
```

Resumo textual:

- Sem ABC definido → defina a identidade primeiro.  
- Com ABC definido → escolha o CPP que combina com o estilo desejado de pensamento na tarefa.

---

## 4.9 Comparação com Priming Tradicional

| Priming Tradicional             | CPPs (Framework SLE)                 |
|---------------------------------|--------------------------------------|
| “Seja criativo”                 | CPP Gerativo + métricas de SD        |
| “Pense criticamente”           | CPP Auto‑Referencial + ABC           |
| Ad‑hoc, não sistemático        | Taxonomia formal de modos            |
| Sem protocolo de validação     | Experimentos e métricas propostas    |
| Baseado apenas em intuição     | Hipótese explicitamente falsificável |

Com isso, CPPs fecham o elo entre:

- Cap. 1–2: fundamentos e SD;  
- Cap. 3: identidade (ABC, Φ³);  
- Cap. 4: modos cognitivos induzidos, que operam em cima da identidade e das métricas.

```
