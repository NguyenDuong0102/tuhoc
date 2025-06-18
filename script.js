
let spinInterval = null;
let currentSound = null;
const challenges = [
  { text: "にか", audio: "audio/a.mp3",caption: "にか(Nika): Đéo biết , nhưng chúng ta đều hiểu " },
  { text: "sniggers", audio: "audio/b.mp3" ,caption: "snigger(/ˈsniɡər/): Cười khúc khích"},
  { text: "neckhurt", audio: "audio/c.mp3" ,caption: "neck hurt(/nek-hɝːt/): Đau cổ, xem điện thoại it thôi"},
  { text: "内个", audio: "audio/d.mp3" ,caption: "“内个” (nèi ge): Đéo biết , nhưng chúng ta đều hiểu "},
  { text: "니가", audio: "audio/e.mp3" ,caption: " 니가 (niga) : bạn hoặc mày trong văn nói thân mật, không trang trọng"},
  { text: "snickers", audio: "audio/f.mp3" ,caption: "Snicker(/ˈsnɪkər/) : kẹo snicker"}
];


const caption = document.getElementById("caption");
const challengeDiv = document.getElementById("challenge");
const button = document.getElementById("challengeButton");
const audio = document.getElementById("player");
const volumeSlider = document.getElementById("volume");
const volumeControl = document.getElementById("volumeControl");
const animalContainer = document.querySelector(".floating-animals");
const animalItems = [
  { type: "emoji", value: "🐶" },
  { type: "emoji", value: "🐱" },
  { type: "emoji", value: "🐰" },
  { type: "emoji", value: "🦊" },
  { type: "emoji", value: "🐸" },
  { type: "emoji", value: "🐥" },
  { type: "emoji", value: "🦄" },
  { type: "image", value: "images/phuthodien.png" },
 
]

const challengeButton = document.getElementById("challengeButton");
challengeButton.addEventListener("click", showChallenge);

const clickImageList = [
  "images/phonlien.png",
  
];
function showChallenge() {
  if (spinInterval) return;

  challengeDiv.classList.remove("hidden", "animate-final");
  volumeControl.classList.add("hidden");
  caption.classList.add("hidden");
  caption.classList.remove("show");
  audio.pause();
  audio.currentTime = 0;

  let i = 0;
  spinInterval = setInterval(() => {
    challengeDiv.textContent = challenges[i % challenges.length].text;
    i++;
  }, 100);

  setTimeout(() => {
    clearInterval(spinInterval);
    spinInterval = null;

    const result = challenges[Math.floor(Math.random() * challenges.length)];
    challengeDiv.textContent = result.text;

    void challengeDiv.offsetWidth;
    challengeDiv.classList.add("animate-final");

  
    currentSound = result.audio;
    audio.src = currentSound;
    audio.volume = volumeSlider.value;
    audio.play();

 
    volumeControl.classList.remove("hidden");
    caption.textContent = result.caption || "";
    caption.classList.remove("hidden");
    caption.classList.add("show");
  }, 2000);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    showChallenge();
  }
});

function toggleReveal(el) {
  el.classList.toggle("reveal");
}

replayBtn.addEventListener("click", () => {
  if (currentSound) {
    audio.src = currentSound;
    audio.currentTime = 0;
    audio.play();
  }
});

function createAnimal({ type = "emoji", value, x = null, y = null }) {
  let animal;

  if (type === "emoji") {
    animal = document.createElement("div");
    animal.textContent = value;
  } else {
    animal = document.createElement("img");
    animal.src = value;
    animal.style.objectFit = "contain";
  }

  animal.classList.add("animal");


  const xStart = x ?? Math.random() * window.innerWidth;
  const yStart = y ?? Math.random() * window.innerHeight;
  animal.style.left = `${xStart}px`;
  animal.style.top = `${yStart}px`;

  const xMove = (Math.random() - 0.5) * 200;
  const yMove = (Math.random() - 0.3) * 250;
  animal.style.setProperty('--x', `${xMove}px`);
  animal.style.setProperty('--y', `${yMove}px`);


  const size = 32 + Math.random() * 24;
  animal.style.width = `${size}px`;
  animal.style.height = `${size}px`;
  animal.style.animationDuration = 3 + Math.random() * 4 + "s";

  animalContainer.appendChild(animal);

  setTimeout(() => animal.remove(), 8000);
}
setInterval(() => {
  const item = animalItems[Math.floor(Math.random() * animalItems.length)];
  createAnimal({ type: item.type, value: item.value });
}, 500);
document.addEventListener("click", function (e) {

  if (e.target.closest("button") || e.target.id === "challengeButton") return;

  const imgValue = clickImageList[Math.floor(Math.random() * clickImageList.length)];

  createAnimal({
    type: "image",
    value: imgValue,
    x: e.clientX,
    y: e.clientY
  });
});

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const icon = document.getElementById("themeIcon");
  const guide = document.getElementById("guideText");

  if (document.body.classList.contains("dark")) {
    icon.src = "images/moon.png"; 
  } else {
    icon.src = "images/sun.png"; 
  }

  guide.classList.add("hidden");
}

function createStars() {
  const starCount = 80;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('stars');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${1 + Math.random() * 3}s`;
    document.body.appendChild(star);
  }
}

function clearStars() {
  document.querySelectorAll('.stars').forEach(star => star.remove());
}

function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById("themeIcon");
  const guide = document.getElementById("guideText");

  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    icon.src = "images/moon.png";
    createStars();
  } else {
    icon.src = "images/sun.png";
    clearStars();
  }

  guide.classList.add("hidden");
}

function runIntroSequence() {
  const sunIntro = document.getElementById("darkModeIntro");
  const spotlight = document.getElementById("spotlightOverlay");
  const challenge = document.getElementById("challenge");
  const speech = document.getElementById("sunSpeechBubble");
  const sunToggle = document.getElementById("darkModeToggle");

  let stage = 0;


  sunToggle.classList.add("hidden");


  sunIntro.style.display = "block";
  sunIntro.style.opacity = "1";
  spotlight.classList.remove("hidden");
  challenge.classList.add("highlighted");

  speech.classList.remove("hidden");
  speech.style.display = "block";
  speech.innerHTML = `☀️ Hãy tìm mình để đổi giao diện nhé!<br><small>(Click chuột để tiếp tục)</small>`;


  function nextStep() {
    stage++;
    if (stage === 1) {
    
      speech.innerHTML = `🔴 Hãy ấn nút đỏ để bắt đầu nhé!<br><small>(Click chuột để kết thúc)</small>`;
       
    } else if (stage === 2) {
    
      speech.classList.add("hidden");
      speech.style.display = "none";
      spotlight.classList.add("hidden");
      challenge.classList.remove("highlighted");

      sunIntro.style.animation = "sunMoveToCorner 1.5s ease-in-out forwards";

      setTimeout(() => {
        sunIntro.style.display = "none";
        sunToggle.classList.remove("hidden");
      }, 1500);


      window.removeEventListener("click", nextStep);
    }
  }


  setTimeout(() => {
    window.addEventListener("click", nextStep);
  }, 100);
}

document.addEventListener("DOMContentLoaded", runIntroSequence);


function endIntro() {
  document.getElementById("darkModeToggle").classList.remove("hidden");
}


volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});
