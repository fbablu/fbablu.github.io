document.addEventListener("DOMContentLoaded", () => {
    // Get the canvas and its drawing context
    const canvas = document.getElementById('kaleidoscopeCanvas');
    const ctx = canvas.getContext('2d');

    // Create a custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35">
            <circle cx="17.5" cy="17.5" r="14.5" fill="none" stroke="#fff" stroke-width="1.5"/>
            <circle cx="17.5" cy="17.5" r="3" fill="#fff"/>
        </svg>
    `;
    document.body.appendChild(cursor);

    // Animation variables
    let time = 0;
    const waveCount = 3;
    const baseAmplitude = 30;
    const frequency = 0.01;
    const speed = 0.02;

    // Mouse position variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // Resize the canvas to fill the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Draw wave patterns based on mouse position
    function drawWave(yOffset, amplitudeModifier) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + yOffset);

        for (let x = 0; x < canvas.width; x++) {
            // Calculate distance from mouse and influence on wave amplitude
            const distanceFromMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(canvas.height / 2 + yOffset - mouseY, 2));
            const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 200);
            const amplitude = baseAmplitude * amplitudeModifier * (1 + mouseInfluence);

            // Create wave shape using sine function
            const y = Math.sin(x * frequency + time) * amplitude;
            ctx.lineTo(x, canvas.height / 2 + y + yOffset);
        }

        // Style and draw the wave
        ctx.strokeStyle = 'rgba(6, 64, 43, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw a breathing circle at the mouse position
    function drawBreathingCircle() {
        const breathingAmplitude = Math.sin(time * 0.5) * 20 + 50; // Pulsing effect
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, breathingAmplitude, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 64, 43, 0.1)';
        ctx.fill();
    }

    // Main drawing function
    function draw() {
        // Clear the canvas with a slight fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the breathing circle and waves
        drawBreathingCircle();
        for (let i = 0; i < waveCount; i++) {
            const yOffset = (i - Math.floor(waveCount / 2)) * (canvas.height / waveCount);
            const amplitudeModifier = Math.sin(time + i) * 0.5 + 1.5; // Breathing effect for waves
            drawWave(yOffset, amplitudeModifier);
        }

        // Smooth mouse movement with faster easing
        mouseX += (targetX - mouseX); // Quick response for x-axis
        mouseY += (targetY - mouseY); // Quick response for y-axis

        // Update custom cursor position
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

        // Increment time for animation
        time += speed;

        // Request the next animation frame
        requestAnimationFrame(draw);
    }

    // Event listeners for window resize and mouse movement
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX; // Set target x position
        targetY = e.clientY; // Set target y position
    });

    // Initial setup
    resizeCanvas(); // Resize canvas on load
    draw(); // Start drawing
});
