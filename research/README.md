# 📊 SLE Research — Diretório de Validação Científica

Este diretório reúne todos os experimentos, datasets e resultados das validações propostas para o framework **Semantic Latent Engineering (SLE)**.

---

## 🔍 Estrutura

- `datasets/`  
  > Conjuntos de prompts, outputs, avaliações humanas e automáticas usados nos experimentos (E1–E5).  
  > Inclui:
  > - SD/HDSA (semantic density vs. qualidade)
  > - Consistência ABC
  > - MMOR pipelines

- `experiments/`  
  > Scripts de execução, protocolos experimentais, notebooks Colab/Jupyter para validação de hipóteses SLE.  
  > Cada subpasta/documento contém:
  > - Objetivo do experimento
  > - Hipótese testada
  > - Métodos (teste, métricas, t-test/ANOVA)
  > - Reprodução passo a passo

- `results/`  
  > Outputs dos experimentos, tabelas de métricas, logs, gráficos, e análises estatísticas.  
  > Inclui:
  > - Resultados brutos e finais
  > - Comparações entre baseline e métodos SLE
  > - Resumos para publicação/documentação

---

## 🧪 Como Rodar Experimentos

1. Explore a pasta `experiments/` e escolha o protocolo.
2. Confira o dataset apropriado em `datasets/`.
3. Siga o README de cada experimento para reproduzir testes.
4. Consulte resultados, gráficos e análises em `results/`.

---

## 🏷️ Sobre Validação

- **Status:** Em andamento. Experimentos preliminares em ambiente limpo foram realizados, mas validação empírica pública depende de dataset aberto e colaboração.
- **Critério:** Reprodutibilidade, comparabilidade com benchmarks padrão (baseline X SLE).
- **Como contribuir:** Propor novos datasets, corrigi protocolos, sugerir avaliações diferentes via Pull Request.

---

## 📚 Referências  
Consulte o [README central](../README.md) para manifesto, fundamentos e roadmap global.

---

> *"Pesquisa é um processo coletivo. Quem testa, valida — quem propõe, colabora."*

