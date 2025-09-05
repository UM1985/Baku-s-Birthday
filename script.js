// Floating hearts
const heartsContainer = document.getElementById("hearts");
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 15 + Math.random() * 20 + "px";
  heart.style.animationDuration = 6 + Math.random() * 4 + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 600);

// Terminal
const input = document.getElementById("terminalInput");
const output = document.getElementById("terminalOutput");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    let response = "";
    if (cmd === "love --show") response = "You are my everything 💖";
    else if (cmd === "nurse --heal")
      response = "You heal not just patients, but my soul 💕";
    else if (cmd === "future --us") response = "Happily Ever After 💍";
    else response = "Command not found ⚠️";
    output.innerHTML += `<p>> ${cmd}</p><p>${response}</p>`;
    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
});

// Carousel rotation only Y-axis
// const carousel = document.getElementById("carousel");
// const imgs = carousel.querySelectorAll("img");
// const total = imgs.length;
// const angle = 360 / total;

// // Arrange images in circle
// imgs.forEach((img, i) => {
//   img.style.transform = `rotateY(${i * angle}deg) translateZ(350px)`;
// });

// let autoAngle = 0;
// let tiltX = 0,
//   tiltZ = 0;

// // Auto Y rotation
// setInterval(() => {
//   autoAngle += 0.5;
//   carousel.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${autoAngle}deg) rotateZ(${tiltZ}deg)`;
// }, 50);

// // Mouse interaction to tilt X and Z
// document.addEventListener("mousemove", (e) => {
//   // const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
//   const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
//   tiltX = -y * 20; // Up/Down tilt
// });


(function(){
  const el = document.getElementById('noteText');
  const cursor = document.querySelector('.cursor');
  const skipBtn = document.getElementById('skipBtn');

  // ——— personalize your message here ———
  const fullText = 
`My dearest Baku,

In just four months, you’ve turned ordinary days into something I wait for with a full heart. 
We’ve met only three times, yet those moments replay in my mind like my favorite film— 
soft, bright, and unforgettable.

Every night our 2–3 hour calls become my safe window into your world. 
You bring healing hands and a nurse’s courage; I bring logic and a developer’s craft. 
Somehow, together, we write the most beautiful program: us.

You calm the bugs in my head and I guard the beats of your heart. 
When you laugh, my world compiles. When you’re tired, I hope my words are rest.

I can’t wait for the day distance is just a memory and “goodnight” is said from the same room. 
Until then, remember: I am grateful for you, proud of you, and in love with you—more every day.

Forever yours,
Your Software Developer ❤️`;

  // typewriter config
  const SPEED = 17;           // ms per character
  const CHUNK = 2;            // characters per tick (increase for faster)
  const START_ON_VIEW = true; // start when scrolled into view

  let i = 0, typing = false, done = false, rafId = null, lastStamp = 0, acc = 0;

  function step(ts){
    if(!typing || done) return;
    if(!lastStamp) lastStamp = ts;
    acc += ts - lastStamp;
    lastStamp = ts;

    // type by SPEED with CHUNK chars
    while(acc >= SPEED && !done){
      const next = fullText.slice(i, i + CHUNK);
      el.textContent += next;
      i += next.length;
      acc -= SPEED;
      if(i >= fullText.length){
        done = true;
        cursor.style.display = 'none';
      }
    }
    if(!done) rafId = requestAnimationFrame(step);
  }

  function startTyping(){
    if(typing) return;
    typing = true; done = false; lastStamp = 0; acc = 0;
    rafId = requestAnimationFrame(step);
  }

  // skip button: reveal immediately
  skipBtn.addEventListener('click', function(){
    if(done) return;
    if(rafId) cancelAnimationFrame(rafId);
    el.textContent = fullText;
    done = true; typing = false;
    cursor.style.display = 'none';
  });

  // start immediately or when visible
  if(START_ON_VIEW && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ startTyping(); io.disconnect(); }
      });
    }, { threshold: 0.25 });
    io.observe(document.getElementById('love-note'));
  }else{
    startTyping();
  }
})();

document.addEventListener("keydown", e => {
  if (e.key === "L") { // for example pressing "L"
    document.getElementById("easterEgg").classList.add("show");
  }
});

  const carousel = document.getElementById("carousel");
const imgs = carousel.querySelectorAll("img");
const total = imgs.length;
const angle = 360 / total;

// Calculate translateZ so the carousel fits the screen responsively
function getTranslateZ() {
  if (window.innerWidth < 600) return 100;
  if (window.innerWidth < 900) return 170;
  return 250;
}

// Arrange images in circle responsively
function arrangeCarousel() {
  let z = getTranslateZ();
  imgs.forEach((img, i) => {
    img.style.transform = `rotateY(${i * angle}deg) translateZ(${z}px)`;
  });
}
arrangeCarousel();
window.addEventListener("resize", arrangeCarousel);

let autoAngle = 0;
let tiltX = 0;
let tiltZ = 0;

// Animate rotation
setInterval(() => {
  autoAngle += 0.5;
  carousel.style.transform =
    `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${autoAngle}deg) rotateZ(${tiltZ}deg)`;
}, 50);

// Mouse interaction for tilt (desktop)
document.addEventListener("mousemove", e => {
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  tiltX = -y * 20;
});

// Touch interaction for tilt (mobile)
let lastTouchY = null;
carousel.addEventListener("touchstart", e => {
  lastTouchY = e.touches.clientY;
});
carousel.addEventListener("touchmove", e => {
  if (lastTouchY !== null) {
    const deltaY = e.touches.clientY - lastTouchY;
    tiltX += -deltaY * 0.1;
    lastTouchY = e.touches.clientY;
  }
});
carousel.addEventListener("touchend", () => {
  lastTouchY = null;
});