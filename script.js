document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".drag-container");
  const cleanupBtn = document.querySelector(".cleanup-icon");

  const projects = [
    { path: "icons/spevents.svg", name: "spevents.live" },
    { path: "icons/hushmesh.svg", name: "HUSH" },
    { path: "icons/gemicast.svg", name: "Gemicast" },
    { path: "icons/dormdash.svg", name: "DormDash" },
    { path: "icons/pong.svg", name: "AI Pong" },
    { path: "icons/crossspec.svg", name: "CrossSpec" },
    { path: "icons/twosixhealth.svg", name: "TWOSIX Health" },
    { path: "icons/vabs.svg", name: "vabsvu" },
    { path: "icons/vectr.svg", name: "vectr" },
    { path: "icons/npforward.svg", name: "NPForward" },
  ];

  const draggables = [];

  projects.forEach((project, index) => {
    const draggable = createDraggableIcon(project, index);
    container.appendChild(draggable);
    draggables.push(draggable);
    randomizePosition(draggable);
    setupDragHandlers(draggable);
  });

  function createDraggableIcon(project, index) {
    const div = document.createElement("div");
    div.className = "draggable";
    div.dataset.index = index;

    const img = document.createElement("img");
    img.src = project.path;
    img.alt = project.name;
    img.draggable = false;

    const label = document.createElement("div");
    label.className = "project-label";

    const arrow = document.createElement("div");
    arrow.className = "project-arrow";

    const name = document.createElement("span");
    name.className = "project-name";
    name.textContent = project.name;

    label.appendChild(arrow);
    label.appendChild(name);

    div.appendChild(img);
    div.appendChild(label);

    return div;
  }

  function randomizePosition(element) {
    const iconSize = element.offsetWidth || 60;
    const maxX = container.offsetWidth - iconSize;
    const maxY = container.offsetHeight - iconSize;

    const randomX = Math.random() * Math.max(0, maxX);
    const randomY = Math.random() * Math.max(0, maxY);

    element.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  function getCurrentTransform(element) {
    const transform = window.getComputedStyle(element).transform;
    if (transform === "none") return { x: 0, y: 0 };

    const matrix = transform.match(/matrix\((.+)\)/);
    if (matrix) {
      const values = matrix[1].split(", ");
      return {
        x: parseFloat(values[4]) || 0,
        y: parseFloat(values[5]) || 0,
      };
    }
    return { x: 0, y: 0 };
  }

  function setupDragHandlers(draggable) {
    let isDragging = false;
    let currentX, currentY, initialX, initialY;
    let xOffset = 0;
    let yOffset = 0;

    draggable.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    draggable.addEventListener("touchstart", dragStart, { passive: false });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", dragEnd);

    function dragStart(e) {
      if (e.target.closest(".draggable") !== draggable) return;
      e.preventDefault();

      const currentPos = getCurrentTransform(draggable);
      xOffset = currentPos.x;
      yOffset = currentPos.y;

      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      isDragging = true;
      draggable.classList.add("dragging");
    }

    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();

      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      const iconSize = draggable.offsetWidth;
      const maxX = container.offsetWidth - iconSize;
      const maxY = container.offsetHeight - iconSize;

      xOffset = Math.max(0, Math.min(currentX, maxX));
      yOffset = Math.max(0, Math.min(currentY, maxY));

      draggable.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }

    function dragEnd(e) {
      if (!isDragging) return;
      isDragging = false;
      draggable.classList.remove("dragging");
    }
  }

  // Centered cleanup function
  cleanupBtn.addEventListener("click", () => {
    const iconSize = 60;
    const spacing = 20;
    const itemsPerRow = Math.min(
      draggables.length,
      Math.floor(container.offsetWidth / (iconSize + spacing)),
    );
    const rows = Math.ceil(draggables.length / itemsPerRow);

    const gridWidth = itemsPerRow * iconSize + (itemsPerRow - 1) * spacing;
    const gridHeight = rows * iconSize + (rows - 1) * spacing;

    const startX = (container.offsetWidth - gridWidth) / 2;
    const startY = (container.offsetHeight - gridHeight) / 2;

    draggables.forEach((draggable, index) => {
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;

      const x = startX + col * (iconSize + spacing);
      const y = startY + row * (iconSize + spacing);

      draggable.style.transition = "transform 0.5s ease";
      draggable.style.transform = `translate(${x}px, ${y}px)`;

      setTimeout(() => {
        draggable.style.transition = "";
      }, 500);
    });
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      draggables.forEach((draggable) => {
        const pos = getCurrentTransform(draggable);
        const iconSize = draggable.offsetWidth;
        const maxX = container.offsetWidth - iconSize;
        const maxY = container.offsetHeight - iconSize;

        const newX = Math.min(pos.x, Math.max(0, maxX));
        const newY = Math.min(pos.y, Math.max(0, maxY));

        if (newX !== pos.x || newY !== pos.y) {
          draggable.style.transform = `translate(${newX}px, ${newY}px)`;
        }
      });
    }, 250);
  });
});
