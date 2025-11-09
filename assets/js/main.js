document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const links = document.querySelectorAll(".chapter-link");

  async function loadMarkdown(file) {
    content.innerHTML = "<p><em>Loading...</em></p>";
    try {
      const response = await fetch(file);
      const text = await response.text();
      const html = marked.parse(text);
      content.innerHTML = html;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      content.innerHTML = `<p style="color:red;">Error loading ${file}</p>`;
      console.error(err);
    }
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const file = e.target.getAttribute("data-file");
      loadMarkdown(file);
    });
  });

  // Load first chapter automatically
  if (links.length > 0) {
    loadMarkdown(links[0].getAttribute("data-file"));
  }
});
