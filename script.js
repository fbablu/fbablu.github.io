document.addEventListener("DOMContentLoaded", () => {
  // --- Icons (SVG Strings) ---
  const icons = {
    code: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>`,
    pitch: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>`,
    trophy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h14.625a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.312-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.348v.262zm13.668 0c.668.121 1.336.237 2.006.348a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294v-.262z" clip-rule="evenodd" /></svg>`,
    live: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>`,
  };

  // --- Rolling Text Setup ---
  const setupRollingText = (element) => {
    const text = element.innerText;
    element.innerHTML = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.style.setProperty("--i", i);
      if (char === " ") {
        span.className = "char-space";
        span.innerHTML = "&nbsp;";
      } else {
        span.textContent = char;
      }
      element.appendChild(span);
    });
  };

  const mainTitle = document.querySelector("h1.rolling-text");
  if (mainTitle) setupRollingText(mainTitle);

  // --- Project Data ---
  const projects = [
    {
      path: "icons/hushmesh2.svg",
      name: "HUSH-MESH",
      desc: "Autonomous defense network with RF-silent drones.",
      award: "AWS Mission Autonomy: 2nd Place ($15K)",
      codeLink: "https://github.com/fbablu/hush-mesh/",
      pitchLink:
        "https://drive.google.com/file/d/1GIMq0oROrFASG00U4HrpfS6FhYHmrKbj/view",
      iconScale: 3,
    },
    {
      path: "icons/wallhax.svg",
      name: "WallHax",
      desc: "Custom object permanence model surpassing ChatGPT, Claude, Gemini using Qwen + Spatial Mapping.",
      award: "Ironsite Spatial Hackathon: 3rd Place ($2.5K)",
      codeLink:
        "https://github.com/usman-khan12/vision-model-ironsite-x-vandy-hackathon",
      pitchLink:
        "https://docs.google.com/presentation/d/1ohvFnF6tULQ_vFGDLaKV6--he7dZ4CWQnwXMaSRhPIQ/edit?usp=sharing",
    },
    {
      path: "icons/gemicast.svg",
      name: "Gemicast",
      desc: "Real-time outage risk dashboard & alerts.",
      award: "Google Solutions Challenge: Top 3 Finalist",
      codeLink: "https://github.com/fbablu/gemicast",
      pitchLink:
        "https://docs.google.com/presentation/d/1OpJ9mJ16NzwnT-PTWYOMYuWrQTtofdJ9/edit?slide=id.p1#slide=id.p1",
    },
    {
      path: "icons/npforward.svg",
      name: "NPForward",
      desc: "AR National Parks collectibles experience.",
      award: "Accenture Innovation Challenge: Top 5 Finalist",
      pitchLink:
        "https://drive.google.com/file/d/1izkAAKIDs_o7c44yIynNjDJG2l48cLDM/view",
      iconScale: 2,
    },
    {
      path: "icons/spevents.svg",
      name: "spevents.live",
      desc: "Real-time Event Photo Platform.",
      codeLink: "https://github.com/fbablu/spevents-frontend",
      liveLink: "https://www.spevents.live/",
    },
    {
      path: "icons/vabs.svg",
      name: "vabsvu",
      desc: "Website I made for the Vanderbilt Association of Bangladeshi Students.",
      liveLink: "https://vabsvu.github.io/",
      codeLink: "https://github.com/vabsvu/vabsvu.github.io",
    },
    {
      path: "icons/vectr.svg",
      name: "vectr",
      desc: "Internal GPS for First Responders",
      pitchLink:
        "https://www.figma.com/design/t3eZT3k53f7x71oeaF5yGC/vectr?node-id=0-1&t=pqYJJneRoVuDgQrI-1",
    },
    {
      path: "icons/pong.svg",
      name: "AI Pong",
      desc: "Reinforcement Learning Agents.",
      codeLink: "https://github.com/Tobena-04/deep_learning_pong_project",
    },
    {
      path: "icons/twosixhealth.svg",
      name: "Network Project",
      desc: "Healthcare Network Analysis.",
      codeLink: "https://github.com/fbablu/cs3891-network-project",
      iconScale: 2,
    },
    {
      path: "icons/quizlite.png",
      name: "QuizLITE",
      desc: "Offline Flashcard Desktop App.",
      codeLink: "https://github.com/a-shrey/QuizLITE",
    },
    {
      path: "icons/crossspec.svg",
      name: "CrossSpec",
      desc: "Medical Imaging Research.",
      codeLink: "https://github.com/fbablu/CrossSpec",
    },
  ];

  const grid = document.getElementById("project-grid");

  projects.forEach((project) => {
    // 1. Create Card Container
    const card = document.createElement("div");
    card.className = "project-card";

    // 2. Award Badge (if exists)
    if (project.award) {
      const badge = document.createElement("div");
      badge.className = "award-badge";
      badge.innerHTML = `${icons.trophy} <span>${project.award}</span>`;
      card.appendChild(badge);
    }

    // 3. Icon
    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-container";
    const img = document.createElement("img");
    img.src = project.path;
    img.alt = project.name;

    // --- SCALING LOGIC ADDED HERE ---
    if (project.iconScale) {
      // 1. Check if the device is mobile (less than 768px wide)
      const isMobile = window.innerWidth < 768;

      // 2. If mobile, cap the scale to a safe max (e.g., 1.5) so it fits in the card
      //    Otherwise, use the full scale defined in your project data
      const dynamicScale = isMobile
        ? Math.min(project.iconScale, 1.5)
        : project.iconScale;

      img.style.transform = `scale(${dynamicScale})`;
    }

    iconContainer.appendChild(img);
    card.appendChild(iconContainer);

    // 4. Title & Desc
    const title = document.createElement("h3");
    title.textContent = project.name;
    card.appendChild(title);

    const desc = document.createElement("p");
    desc.textContent = project.desc;
    card.appendChild(desc);

    // 5. Action Buttons (Code / Pitch)
    const actions = document.createElement("div");
    actions.className = "card-actions";

    if (project.codeLink) {
      const codeBtn = document.createElement("a");
      codeBtn.className = "action-btn";
      codeBtn.href = project.codeLink;
      codeBtn.target = "_blank";
      codeBtn.rel = "noopener noreferrer";
      codeBtn.innerHTML = `${icons.code} Code`;
      actions.appendChild(codeBtn);
    }

    if (project.liveLink) {
      const liveBtn = document.createElement("a");
      liveBtn.className = "action-btn";
      liveBtn.href = project.liveLink;
      liveBtn.target = "_blank";
      liveBtn.rel = "noopener noreferrer";
      liveBtn.innerHTML = `${icons.live} Visit`;
      actions.appendChild(liveBtn);
    }

    if (project.pitchLink) {
      const pitchBtn = document.createElement("a");
      pitchBtn.className = "action-btn";
      pitchBtn.href = project.pitchLink;
      pitchBtn.target = "_blank";
      pitchBtn.rel = "noopener noreferrer";
      pitchBtn.innerHTML = `${icons.pitch} Pitch`;
      actions.appendChild(pitchBtn);
    }

    // Only append actions if we actually added buttons
    if (actions.children.length > 0) {
      card.appendChild(actions);
    } else {
      card.style.cursor = "default";
    }

    grid.appendChild(card);
  });

  // --- Mobile Scroll Interaction ---
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -20% 0px",
    threshold: 0.6,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active-mobile");
      } else {
        entry.target.classList.remove("active-mobile");
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card) => observer.observe(card));

  // --- Background Shader Logic ---
  const vertexShader = `
    void main(){ gl_Position = vec4(position, 1.0); }
  `;

  const fragmentShader = `
    precision mediump float;
    uniform vec2  u_resolution;
    uniform float u_time;
    uniform float u_scale;
    uniform float u_noiseStrength;
    uniform float u_noiseScale;
    uniform float u_noiseFlow;

    const int octaves = 3;
    const float seed = 43758.5453123;
    const float seed2 = 73156.8473192;

    vec2 random2(vec2 st, float s){
      st = vec2(dot(st, vec2(127.1,311.7)), dot(st, vec2(269.5,183.3)));
      return -1.0 + 2.0*fract(sin(st)*s);
    }

    float noise(vec2 st, float s){
      vec2 i = floor(st);
      vec2 f = fract(st);
      vec2 u = f*f*(3.0-2.0*f);
      return mix(
        mix(dot(random2(i + vec2(0.0,0.0), s), f - vec2(0.0,0.0)),
            dot(random2(i + vec2(1.0,0.0), s), f - vec2(1.0,0.0)), u.x),
        mix(dot(random2(i + vec2(0.0,1.0), s), f - vec2(0.0,1.0)),
            dot(random2(i + vec2(1.0,1.0), s), f - vec2(1.0,1.0)), u.x), u.y);
    }

    float fbm1(in vec2 st, float s){
      float v = 0.0, a = 0.5; vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      for(int i=0;i<octaves;++i){ v += a*noise(st,s); st = rot*st*2.0 + shift; a *= 0.4; }
      return v;
    }

    float pattern2(vec2 uv, float s, float t, inout vec2 q, inout vec2 r){
      q = vec2(fbm1(uv + vec2(0.0), s), fbm1(uv + vec2(5.2,1.3), s));
      r = vec2(fbm1(uv + 4.0*q + vec2(1.7 - t/2.0, 9.2), s),
               fbm1(uv + 4.0*q + vec2(8.3 - t/2.0, 2.8), s));
      vec2 x = vec2(fbm1(uv + 5.0*r + vec2(21.7 - t/2.0, 90.2), s),
                    fbm1(uv + 5.0*r + vec2(80.3 - t/2.0, 20.8), s));
      return fbm1(uv + 4.0*x, s);
    }

    float hash12(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
    float hash12b(vec2 p){ return fract(sin(dot(p, vec2(269.5, 183.3))) * 73156.8473192); }

    float gaussian(vec2 p){
      float u1 = clamp(hash12(p), 1e-6, 1.0);
      float u2 = hash12b(p);
      return sqrt(-2.0*log(u1)) * cos(6.2831853*u2);
    }

    vec3 oceanPalette(float x, float accent, vec2 q, vec2 r, float flowMag){
      vec3 abyssBlue = vec3(0.01, 0.03, 0.08);
      vec3 deepOcean = vec3(0.05, 0.12, 0.20);
      vec3 oceanBlue = vec3(0.10, 0.20, 0.35);
      vec3 seaBlue = vec3(0.15, 0.35, 0.50);
      vec3 teal = vec3(0.20, 0.50, 0.60);
      vec3 turquoise = vec3(0.30, 0.65, 0.75);
      vec3 cyan = vec3(0.50, 0.80, 0.90);
      vec3 foam = vec3(0.85, 0.95, 0.98);

      float flowInfluence = clamp(flowMag * 1.2, 0.0, 1.0);
      vec3 base;
      if(x < 0.15) base = mix(abyssBlue, deepOcean, smoothstep(0.0, 0.15, x));
      else if(x < 0.35) base = mix(deepOcean, oceanBlue, smoothstep(0.15, 0.35, x));
      else if(x < 0.55) base = mix(oceanBlue, seaBlue, smoothstep(0.35, 0.55, x));
      else if(x < 0.70) base = mix(seaBlue, teal, smoothstep(0.55, 0.70, x));
      else if(x < 0.85) base = mix(teal, turquoise, smoothstep(0.70, 0.85, x));
      else base = mix(turquoise, cyan, smoothstep(0.85, 1.0, x));

      base = mix(base, base * 1.5, flowInfluence * 0.5);
      vec3 foamColor = mix(cyan, foam, accent);
      float foamMix = clamp(accent * (0.2 + flowInfluence * 0.8), 0.0, 1.0);
      foamMix = smoothstep(0.3, 0.9, foamMix);

      return mix(base, foamColor, foamMix);
    }

    void main(){
      vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy) / u_resolution.y;
      float t = u_time * 0.1;
      uv *= u_scale;
      uv.x -= 0.15 * t;
      vec2 q = vec2(0.0), r = vec2(0.0);
      float d = pattern2(uv, seed, t, q, r);
      float d2 = pattern2(r, seed2, t, q, r);
      float cross = dot(q, r);
      float flowMag = length(q + r) * 0.5;
      float luma = smoothstep(-0.2, 1.2, 0.5 + 1.3*(d - 0.5) - 0.2*cross);
      float accent = clamp(0.3 + 0.8*abs(cross) + 0.6*max(0.0, d2 - 0.2) + 0.4*flowMag, 0.0, 1.0);
      accent = pow(accent, 0.8);
      vec2 adv = uv * u_noiseScale + u_noiseFlow*(q + r) + 0.1*t;
      float g = gaussian(adv);
      vec3 col = oceanPalette(luma, accent, q, r, flowMag);
      col += u_noiseStrength * g;
      col = clamp(mix(vec3(0.0), col, 1.15), 0.0, 1.0);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  let container, camera, scene, renderer, mesh;
  const uniforms = {
    u_time: { type: "f", value: 0.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_scale: { type: "f", value: 2.5 },
    u_noiseStrength: { type: "f", value: 0.05 },
    u_noiseScale: { type: "f", value: 3.0 },
    u_noiseFlow: { type: "f", value: 1.0 },
  };

  function init() {
    container = document.getElementById("bg-container");
    camera = new THREE.Camera();
    camera.position.z = 1;
    scene = new THREE.Scene();
    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(0.5);
    container.appendChild(renderer.domElement);
    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);
    animate();
  }

  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.set(
      renderer.domElement.width,
      renderer.domElement.height,
    );
  }

  function animate() {
    requestAnimationFrame(animate);
    uniforms.u_time.value += 0.03;
    renderer.render(scene, camera);
  }

  init();
});
