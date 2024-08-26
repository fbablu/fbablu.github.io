// Particle animation
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
    const particleCount = width * height / 100; // Adjust the density of particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.1, // Particle size
            originalX: Math.random() * width,
            originalY: Math.random() * height,
            velocityX: Math.random() * 2 - 1, // Random velocity
            velocityY: Math.random() * 2 - 1, // Random velocity
            color: Math.random() > 0.5 ? '#555' : '#000' // Particle color
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
        // Move particles based on their velocity
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Bounce off the edges of the canvas
        if (particle.x < 0 || particle.x > width) {
            particle.velocityX *= -1;
        }
        if (particle.y < 0 || particle.y > height) {
            particle.velocityY *= -1;
        }

        // Repel particles from the mouse cursor
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100; // Distance at which repulsion starts

        if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            particle.x -= dx * force * 0.1; // Adjust the strength of the repulsion
            particle.y -= dy * force * 0.1; // Adjust the strength of the repulsion
        }

        // Draw the particle
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

// Drag-and-drop functionality
const blocks = document.querySelectorAll('.block');
const grid = document.getElementById('grid');
const gridRect = grid.getBoundingClientRect();

blocks.forEach(block => {
    block.addEventListener('click', () => {
        window.open(block.dataset.url, '_blank');
    });

    block.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.url);
    });

    block.addEventListener('dragend', function(event) {
        event.target.style.position = ''; // Reset position
        event.target.style.zIndex = '';
    });
});

// Grid item interaction
const blockSize = 150; // The minimum size of the block in the grid

function onDrop(event) {
    event.preventDefault();
    const url = event.dataTransfer.getData('text/plain');
    const draggedElement = [...blocks].find(block => block.dataset.url === url);
    
    if (draggedElement) {
        grid.prepend(draggedElement);
    }
}

grid.addEventListener('dragover', function(event) {
    event.preventDefault(); // Allow drop
});

grid.addEventListener('drop', onDrop);

blocks.forEach(block => {
    block.ondragstart = () => false; // Prevent default drag behavior
});
