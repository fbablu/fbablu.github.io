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
let isDragging = false;

// Function to position blocks randomly on page load
function positionBlocks() {
    blocks.forEach(block => {
        const top = Math.random() * (window.innerHeight - block.offsetHeight);
        const left = Math.random() * (window.innerWidth - block.offsetWidth);
        block.style.position = 'absolute';
        block.style.top = `${top}px`;
        block.style.left = `${left}px`;
        block.style.transform = 'translateX(0)';
        block.style.color = 'white';
        block.style.fontSize = '24px';
        block.style.zIndex = '1';
        block.style.filter = 'blur(0.5px)';
        block.style.padding = '10px';
        block.style.borderRadius = '5px';
    });
}

// Initialize block positioning
positionBlocks();

blocks.forEach(block => {
    block.addEventListener('mousedown', function(e) {
        isDragging = true;
        const block = e.target;
        block.style.zIndex = '10';
        const shiftX = e.clientX - block.getBoundingClientRect().left;
        const shiftY = e.clientY - block.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            block.style.left = pageX - shiftX + 'px';
            block.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        block.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            block.onmouseup = null;
            block.style.zIndex = '';
            isDragging = false; // Reset dragging flag
        };

        block.ondragstart = function() {
            return false;
        };
    });

    // Click functionality to navigate to a project
    block.addEventListener('dblclick', function(e) {
        if (!isDragging) {
            window.open(block.dataset.url, '_blank');
        }
    });
});
