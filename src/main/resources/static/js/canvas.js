const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const setCanvasSize = () => { 
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    
};
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

let particles = [];
let particleCount = 280;
let colors = [
    'rgba(67, 131, 93, 0.8)',
    'rgba(62, 127, 145, 0.8)',
    'rgba(92, 189, 139, 0.8)'
];

const createParticles = () => {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
            x: x, 
            y: y,
            size: Math.random() * 3 + 1.5,
            baseSize: Math.random() * 3 + 1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            // Propriedades para movimento autônomo contínuo
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            // Propriedades para interação com mouse
            isRepelled: false
        });
    }
};
createParticles();

let mouseX = null, mouseY = null;
window.addEventListener('mousemove', (e) => { 
    mouseX = e.clientX; 
    mouseY = e.clientY; 
});
window.addEventListener('mouseleave', () => { 
    mouseX = null; 
    mouseY = null; 
});

const updateParticle = (p) => {
    // Movimento autônomo básico
    p.x += p.vx;
    p.y += p.vy;
    
    // Rebate nas bordas
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    
    // Adiciona pequenas variações aleatórias no movimento
    if (Math.random() < 0.02) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
    }
    
    // Limita a velocidade máxima
    const maxSpeed = 0.05; // Velocidade do movimento autonomo
    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
    }
    
    // Interação com o mouse (como força adicional)
    if (mouseX !== null && mouseY !== null) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 80; // Raio de influência do mouse
        const repelForce = 3.0; // Força da repulsão
        
        if (distance < repelRadius) {
            p.isRepelled = true;
            const force = (repelRadius - distance) / repelRadius * repelForce;
            p.vx += (dx / distance) * force;
            p.vy += (dy / distance) * force;
            p.size = p.baseSize * 1.8;
        } else {
            p.isRepelled = false;
            p.size = p.baseSize;
        }
    } else {
        p.isRepelled = false;
        p.size = p.baseSize;
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Atualiza e desenha partículas
    particles.forEach((p, i) => {
        updateParticle(p);
        
        // Desenha a partícula
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Sombra apenas quando repelida
        if (p.isRepelled) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
        } else {
            ctx.shadowBlur = 0;
        }
        
        // Conexões entre partículas
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const maxLineDistance = 120; //Distancia de ligação entre os pontos
            if (dist < maxLineDistance) {
                const opacity = 1 - dist / maxLineDistance;
                ctx.strokeStyle = `rgba(0, 255, 150, ${opacity * 0.7})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    });
    
    requestAnimationFrame(animate);
};
animate();