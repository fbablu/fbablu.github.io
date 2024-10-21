document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('kaleidoscopeCanvas');
    const ctx = canvas.getContext('2d');

    let time = 0;
    const waveCount = 3;
    const baseAmplitude = 30;
    const frequency = 0.01;
    const speed = 0.02;

    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function drawWave(yOffset, amplitudeModifier) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + yOffset);

        for (let x = 0; x < canvas.width; x++) {
            const distanceFromMouse = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(canvas.height / 2 + yOffset - mouseY, 2));
            const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 200);
            const amplitude = baseAmplitude * amplitudeModifier * (1 + mouseInfluence);

            const y = Math.sin(x * frequency + time) * amplitude;
            ctx.lineTo(x, canvas.height / 2 + y + yOffset);
        }

        ctx.strokeStyle = 'rgba(6, 64, 43, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function drawBreathingCircle() {
        const breathingAmplitude = Math.sin(time * 0.5) * 20 + 50;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, breathingAmplitude, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 64, 43, 0.1)';
        ctx.fill();
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        drawBreathingCircle();

        for (let i = 0; i < waveCount; i++) {
            const yOffset = (i - Math.floor(waveCount / 2)) * (canvas.height / waveCount);
            const amplitudeModifier = Math.sin(time + i) * 0.5 + 1.5; // Breathing effect
            drawWave(yOffset, amplitudeModifier);
        }

        time += speed;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    resizeCanvas();
    draw();
});
