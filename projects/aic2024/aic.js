function loadPDF() {
  const container = document.getElementById("pdf-container");
  const placeholder = container.querySelector(".embed-placeholder");
  const spinner = container.querySelector(".loading-spinner");
  const frame = document.getElementById("pdf-frame");

  placeholder.style.display = "none";
  spinner.classList.add("active");

  frame.src = "aic2024_presentation.pdf";

  frame.onload = function () {
    spinner.classList.remove("active");
    frame.classList.add("loaded");
  };

  frame.onerror = function () {
    spinner.classList.remove("active");
    placeholder.style.display = "flex";
    placeholder.innerHTML = `
      <div style="text-align: center;">
        <div style="color: #dc3545; margin-bottom: 1rem;">⚠️</div>
        <div style="color: #dc3545;">Failed to load PDF</div>
        <div style="color: #6c757d; font-size: 0.8rem; margin-top: 0.5rem;">Click to try again</div>
      </div>
    `;
  };
}

function loadFigma() {
  const container = document.getElementById("figma-container");
  const placeholder = container.querySelector(".embed-placeholder");
  const spinner = container.querySelector(".loading-spinner");
  const frame = document.getElementById("figma-frame");

  placeholder.style.display = "none";
  spinner.classList.add("active");

  frame.src =
    "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FXAZqiFNu4eAdODHqaCV9TI%2FAIC-2024-NPForward%3Fnode-id%3D0-1%26t%3DI69jjcAZuRpfuZEX-1";

  let loaded = false;
  frame.onload = function () {
    if (!loaded) {
      loaded = true;
      spinner.classList.remove("active");
      frame.classList.add("loaded");
    }
  };

  setTimeout(() => {
    if (!loaded) {
      loaded = true;
      spinner.classList.remove("active");
      frame.classList.add("loaded");
    }
  }, 3000);

  frame.onerror = function () {
    if (!loaded) {
      loaded = true;
      spinner.classList.remove("active");
      placeholder.style.display = "flex";
      placeholder.innerHTML = `
        <div style="text-align: center;">
          <div style="color: #dc3545; margin-bottom: 1rem;">⚠️</div>
          <div style="color: #dc3545;">Failed to load Figma</div>
          <div style="color: #6c757d; font-size: 0.8rem; margin-top: 0.5rem;">
            <a href="https://www.figma.com/design/XAZqiFNu4eAdODHqaCV9TI/AIC-2024-NPForward?node-id=0-1&t=I69jjcAZuRpfuZEX-1" target="_blank" style="color: #007bff;">Open in new tab instead</a>
          </div>
        </div>
      `;
    }
  };
}

// Add event listeners once DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const pdfPlaceholder = document.querySelector('[data-action="load-pdf"]');
  const figmaPlaceholder = document.querySelector('[data-action="load-figma"]');

  if (pdfPlaceholder) {
    pdfPlaceholder.addEventListener("click", loadPDF);
  }

  if (figmaPlaceholder) {
    figmaPlaceholder.addEventListener("click", loadFigma);
  }
});
