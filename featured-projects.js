class FeaturedProjects {
  constructor() {
    this.scenes = {};
    this.renderers = {};
    this.cameras = {};
    this.meshes = {};
    this.animationIds = {};
    this.rotationSpeed = 0.3; // degrees per second
    this.currentRotation = 0;

    this.projects = [
      { id: "spevents", color: 0x344e41, url: "/projects/spevents.html" },
      { id: "spark", color: 0x007aff, url: "/projects/spark.html" },
      { id: "quizlite", color: 0x4255ff, url: "/projects/quizlite.html" },
      { id: "ezdoordecs", color: 0xc49f6c, url: "/projects/ezdoordecs.html" },
    ];

    this.init();
  }

  init() {
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      this.projects.forEach((project) => {
        this.createScene(project);
      });
      this.startRotation();
      this.addClickListeners();
    }, 100);
  }

  createScene(project) {
    const container = document.getElementById(`model-${project.id}`);
    if (!container) {
      console.warn(`Container not found for ${project.id}`);
      return;
    }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2.5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(80, 80);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Geometry based on project type
    let geometry;
    switch (project.id) {
      case "spevents":
        // Camera-like shape
        geometry = new THREE.BoxGeometry(1.2, 0.8, 0.6);
        break;
      case "spark":
        geometry = new THREE.IcosahedronGeometry(0.8, 0);
        break;
      case "quizlite":
        geometry = new THREE.OctahedronGeometry(0.8);
        break;
      case "ezdoordecs":
        geometry = new THREE.ConeGeometry(0.6, 1.2, 8);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    // Material with metallic/shiny properties
    const material = new THREE.MeshPhongMaterial({
      color: project.color,
      shininess: 100,
      specular: 0x666666,
      transparent: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Store references
    this.scenes[project.id] = scene;
    this.renderers[project.id] = renderer;
    this.cameras[project.id] = camera;
    this.meshes[project.id] = mesh;

    // Start render loop
    this.animate(project.id);
  }

  animate(projectId) {
    const animateLoop = () => {
      this.animationIds[projectId] = requestAnimationFrame(animateLoop);

      // Rotate the mesh
      if (this.meshes[projectId]) {
        this.meshes[projectId].rotation.x += 0.015;
        this.meshes[projectId].rotation.y += 0.02;
      }

      if (
        this.renderers[projectId] &&
        this.scenes[projectId] &&
        this.cameras[projectId]
      ) {
        this.renderers[projectId].render(
          this.scenes[projectId],
          this.cameras[projectId],
        );
      }
    };
    animateLoop();
  }

  startRotation() {
    const rotateProjects = () => {
      this.currentRotation += this.rotationSpeed;
      const container = document.querySelector(".featured-projects");
      if (container) {
        container.style.transform = `rotate(${this.currentRotation}deg)`;

        // Counter-rotate the project content to keep it upright
        const projects = container.querySelectorAll(".featured-project");
        projects.forEach((project) => {
          const currentTransform = project.style.transform || "";
          const baseTransform = this.getBaseTransform(project);
          project.style.transform = `${baseTransform} rotate(${-this.currentRotation}deg)`;
        });
      }
      requestAnimationFrame(rotateProjects);
    };
    rotateProjects();
  }

  getBaseTransform(project) {
    const index = Array.from(project.parentNode.children).indexOf(project);
    switch (index) {
      case 0:
        return "translateX(-50%)";
      case 1:
        return "translateY(-50%)";
      case 2:
        return "translateX(-50%)";
      case 3:
        return "translateY(-50%)";
      default:
        return "";
    }
  }

  addClickListeners() {
    this.projects.forEach((project) => {
      const element = document.querySelector(`[data-project="${project.id}"]`);
      if (element) {
        element.addEventListener("click", () => {
          this.transitionToProject(project);
        });
      }
    });
  }

  transitionToProject(project) {
    // Create transition overlay
    const overlay = document.createElement("div");
    overlay.className = "page-transition active";
    overlay.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; flex-direction: column;">
        <div style="font-size: 2rem; margin-bottom: 1rem; text-transform: capitalize;">${project.id}</div>
        <div style="font-size: 1rem; color: #666;">Loading...</div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Navigate after transition
    setTimeout(() => {
      window.location.href = project.url;
    }, 500);
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FeaturedProjects();
});
