const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let mouseX = 0, mouseY = 0;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createParticles();
}

function createParticles() {
    particles = [];
    const particleCount = width * height / 5000; // Increased density of particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5, // Smaller particles
            originalX: Math.random() * width,
            originalY: Math.random() * height,
            color: Math.random() > 0.5 ? '#555' : '#000' // Black and grey particles
        });
    }
}

function drawBackground() {
    ctx.fillStyle = '#333'; // Dark grey background
    ctx.fillRect(0, 0, width, height);
}

function drawParticles() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            particle.x -= dx * force * 0.1; // Increased influence
            particle.y -= dy * force * 0.1; // Increased influence
        } else {
            particle.x += (particle.originalX - particle.x) * 0.1; // Increased return speed
            particle.y += (particle.originalY - particle.y) * 0.1; // Increased return speed
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();
