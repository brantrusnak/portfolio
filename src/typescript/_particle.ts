import { makeNoise3D, Noise3D } from "open-simplex-noise";

// Credit / Script based off of
// https://github.com/crnacura/AmbientCanvasBackgrounds

const { PI, cos, sin, abs, random } = Math;
const TAU = 2 * PI;
const rand = (n: number) => n * random();
const randRange = (n: number) => n - rand(2 * n);
const fadeInOut = (t: number, m: number) => {
    let hm = 0.5 * m;
    return abs((t + hm) % m - hm) / (hm);
};
const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2;

const particleCount = 700;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const rangeY = 100;
const baseTTL = 50;
const rangeTTL = 150;
const baseSpeed = 0.1;
const rangeSpeed = 2;
const baseRadius = 1;
const rangeRadius = 4;
const baseHue = 220;
const rangeHue = 100;
const noiseSteps = 8;
const xOff = 0.00125;
const yOff = 0.00125;
const zOff = 0.0005;
const backgroundColor = '#16171b';
const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

let container;
let canvas: {
    a: HTMLCanvasElement,
    b: HTMLCanvasElement
};
let ctx: {
    a: CanvasRenderingContext2D,
    b: CanvasRenderingContext2D
};
let center: number[] = [];
let tick: number = 0;
let particleProps: Float32Array;
let noise3D: Noise3D;

function setup() {
    createCanvas();
    resize();
    initParticles();
    draw();
}

function initParticles() {
    noise3D = makeNoise3D(Date.now());
    particleProps = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
    }
}

function initParticle(i: number) {
    let x = rand(canvas.a.width),
        y = center[1] + randRange(rangeY),
        vx = 0,
        vy = 0,
        life = 0,
        ttl = baseTTL + rand(rangeTTL),
        speed = baseSpeed + rand(rangeSpeed),
        radius = baseRadius + rand(rangeRadius),
        hue = baseHue + rand(rangeHue);
    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}

function drawParticles() {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
    }
}

function updateParticle(i: number) {
    let i2 = 1 + i,
        i3 = 2 + i,
        i4 = 3 + i,
        i5 = 4 + i,
        i6 = 5 + i,
        i7 = 6 + i,
        i8 = 7 + i,
        i9 = 8 + i,
        x = particleProps[i],
        y = particleProps[i2],
        n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU,
        vx = lerp(particleProps[i3], cos(n), 0.5),
        vy = lerp(particleProps[i4], sin(n), 0.5),
        life = particleProps[i5],
        ttl = particleProps[i6],
        speed = particleProps[i7],
        x2 = x + vx * speed,
        y2 = y + vy * speed,
        radius = particleProps[i8],
        hue = particleProps[i9];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue);
    life++;
    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;
    (checkBounds(x, y) || life > ttl) && initParticle(i);
}

function drawParticle(x: number, y: number, x2: number, y2: number, life: number, ttl: number, radius: number, hue: number) {
    ctx.a.save();
    ctx.a.lineCap = 'round';
    ctx.a.lineWidth = radius;
    ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.a.beginPath();
    ctx.a.moveTo(x, y);
    ctx.a.lineTo(x2, y2);
    ctx.a.stroke()
    ctx.a.closePath();
    ctx.a.restore();
}

function checkBounds(x: number, y: number) {
    return (
        x > canvas.a.width ||
        x < 0 ||
        y > canvas.a.height ||
        y < 0
    );
}

function createCanvas() {
    container = document.querySelector('.hero-canvas');
    canvas = {
        a: document.createElement('canvas'),
        b: document.createElement('canvas')
    };
    container.appendChild(canvas.b);
    ctx = {
        a: canvas.a.getContext('2d', { alpha: false }),
        b: canvas.b.getContext('2d', { alpha: false })
    };
}

function resize() {
    const { innerWidth, innerHeight } = window;

    canvas.a.width = innerWidth;
    canvas.a.height = innerHeight;

    ctx.a.drawImage(canvas.b, 0, 0);

    canvas.b.width = innerWidth;
    canvas.b.height = innerHeight;

    ctx.b.drawImage(canvas.a, 0, 0);

    center[0] = 0.5 * canvas.a.width;
    center[1] = 0.5 * canvas.a.height;
}

function renderGlow() {
    ctx.b.save();
    ctx.b.filter = 'blur(8px) brightness(200%)';
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();

    ctx.b.save();
    ctx.b.filter = 'blur(4px) brightness(200%)';
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
}

function renderToScreen() {
    ctx.b.save();
    ctx.b.globalCompositeOperation = 'lighter';
    ctx.b.drawImage(canvas.a, 0, 0);
    ctx.b.restore();
}

// We need to check if browser is Firefox for renderGlow because of bug https://bugzilla.mozilla.org/show_bug.cgi?id=1498291
function draw() {
    tick++;

    ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);
    ctx.b.fillStyle = backgroundColor;
    ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

    drawParticles();
    isFirefox ? null : renderGlow();
    renderToScreen();

    window.requestAnimationFrame(draw);
}

export function initalizeParticles() {
    window.addEventListener('load', setup);
    window.addEventListener('resize', resize);
}