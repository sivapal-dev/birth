/* ==========================================================================
   NAJIYA'S BIRTHDAY SURPRISE — CINEMATIC INTERACTIVE ENGINE
   Pure Vanilla JavaScript (100% Zero Frameworks, Zero External Dependencies)
   Author: Antigravity for NAJIYA ❤️
   ========================================================================== */

(function () {
  'use strict';

  /* ========================================================================
     1. EASY PERSONALIZATION CONFIGURATION (CUSTOMIZE EVERYTHING HERE)
     ======================================================================== */

  // The Birthday Person's Name
  const birthdayPerson = "NAJIYA";

  // The Heartfelt Letter in Tamil
  const letterTamilText = `உன் வார்த்தைகளால் வரும் கோவமும்,
உன் பார்வையால் எழும் கேள்விக்கு
பதில் தேடுகிறேன் உந்தன் மௌனத்தில்...!!`;

  // Step 3 Moments ("A Few Moments... 5-Photo Stacking Deck")
  const step3Moments = [
    {
      tag: "✦ 01 // The Beginning",
      text: "“Some people enter your life unexpectedly... and quietly change the way you see everyday moments.”"
    },
    {
      tag: "✦ 02 // The Conversations",
      text: "“Some conversations become memories that you catch yourself smiling at for no reason at all.”"
    },
    {
      tag: "✦ 03 // The Random Moments",
      text: "“The smallest, most random moments sometimes become the most memorable chapters in our story.”"
    },
    {
      tag: "✦ 04 // The Shared Laughter",
      text: "“Moments where laughter came so naturally, effortlessly, and endlessly.”"
    },
    {
      tag: "✦ 05 // The Smile",
      text: "“And somehow... your smile became one of those rare things I never forget.”"
    }
  ];

  // Memory Gallery Photos (Using local images in ./assets/)
  const memories = [
    {
      image: "./assets/img1.jpeg",
      caption: "That random moment 😂",
      subtitle: "A candid memory full of laughter"
    },
    {
      image: "./assets/img2.jpeg",
      caption: "One of those days worth remembering.",
      subtitle: "When time just seemed to slow down"
    },
    {
      image: "./assets/img15.jpeg",
      caption: "A simple moment, but somehow special.",
      subtitle: "Moments etched in gold"
    },
    {
      image: "./assets/img11.jpeg",
      caption: "This one still makes me smile.",
      subtitle: "A genuine spark of joy"
    },
    {
      image: "./assets/img5.jpeg",
      caption: "Unfiltered, unscripted happiness.",
      subtitle: "Just you being effortlessly yourself"
    },
    {
      image: "./assets/img6.jpeg",
      caption: "A chapter I cherish deeply.",
      subtitle: "Memories that stay forever young"
    },
    {
      image: "./assets/img13.jpeg",
      caption: "That one time we couldn't stop laughing.",
      subtitle: "Pure chaos and pure fun"
    },
    {
      image: "./assets/img18.jpeg",
      caption: "Quiet peace in a busy world.",
      subtitle: "A day filled with warmth"
    }
  ];

  // "10 Things I Like About You"
  const tenThings = [
    { num: "01", text: "Your smile — it genuinely has a way of lighting up everything around you." },
    { num: "02", text: "The way you randomly make normal conversations infinitely more interesting." },
    { num: "03", text: "Your cute little reactions 😂 that you probably don't even realize you do." },
    { num: "04", text: "The way you are simply, unapologetically... you." },
    { num: "05", text: "Your genuine kindness towards everyone around you." },
    { num: "06", text: "The little details you notice in the world that most people just walk past." },
    { num: "07", text: "How you can turn a dull, ordinary day into a memorable one without even trying." },
    { num: "08", text: "Your taste in songs and the sweet little quirks that make you unique." },
    { num: "09", text: "That laughter that is completely impossible not to smile along with." },
    { num: "10", text: "Just the genuine, irreplaceable person that you are in my life." }
  ];

  // Friendship / Crush Quiz Data
  const quizData = [
    {
      question: "Who is more likely to reply late? 😂",
      options: [
        "Me, obviously 🤷‍♂️",
        "You, without a doubt 😌",
        "Both of us equally",
        "Definitely you 😌"
      ],
      correct: 3,
      correctReaction: "I knew you'd admit it! 😂",
      wrongReaction: "Haha nice try, but we both know the truth! 😉"
    },
    {
      question: "Nee thaththiii thane ? (Be completely honest 😂)",
      options: [
        "Aama 100% 🙈",
        "Konjam thaan",
        "No way, I'm super genius",
        "Maybe a little 🤭"
      ],
      correct: 0,
      correctReaction: "Honesty is the best policy! 🥰",
      wrongReaction: "Don't deny it now! 😂"
    },
    {
      question: "Eptiyum pesa matta athane ? 🤐",
      options: [
        "Aama athane 😌",
        "Pesuren pa eppovum",
        "Depends on the mood",
        "Only when you don't annoy me"
      ],
      correct: 0,
      correctReaction: "Spot on! 😂",
      wrongReaction: "Aha! Caught in the act! 🤭"
    },
    {
      question: "Who has the cutest random reactions? ✨",
      options: [
        "You, obviously!",
        "Me? Never.",
        "Both of us",
        "Undeniably you 💯"
      ],
      correct: 3,
      correctReaction: "100% undisputed truth! ❤️",
      wrongReaction: "Modesty won't save you here! You win this one easily! ✨"
    }
  ];

  /* ========================================================================
     2. APPLICATION STATE
     ======================================================================== */
  const state = {
    currentStep: 1,
    totalSteps: 12,
    audioInitialized: false,
    isMuted: true,
    audioCtx: null,
    musicPlaying: false,
    quizIndex: 0,
    quizScore: 0,
    currentThingIndex: 0,
    lightboxIndex: 0,
    candlesBlown: false,
    userWishText: "",
    giftOpened: false,
    letterOpened: false,
    easterEggClicks: 0,
    easterEggTimer: null
  };

  /* ========================================================================
     3. WEB AUDIO API SYNTHESIZER (PROCEDURAL AUDIO — ZERO MP3 DEPENDENCY)
     ======================================================================== */
  function initAudioContext() {
    if (!state.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        state.audioCtx = new AudioCtxClass();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    state.audioInitialized = true;
  }

  function playSynthesizedTone(freq, type = 'sine', duration = 0.3, gainLevel = 0.15, attack = 0.02) {
    if (state.isMuted) return;
    initAudioContext();
    if (!state.audioCtx) return;

    try {
      const osc = state.audioCtx.createOscillator();
      const gainNode = state.audioCtx.createGain();
      const now = state.audioCtx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(gainLevel, now + attack);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gainNode);
      gainNode.connect(state.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  // Sound Effects
  const SFX = {
    click: () => playSynthesizedTone(587.33, 'triangle', 0.1, 0.1), // D5
    heart: () => {
      playSynthesizedTone(523.25, 'sine', 0.15, 0.12);
      setTimeout(() => playSynthesizedTone(659.25, 'sine', 0.22, 0.14), 70);
    },
    cardAttach: () => {
      playSynthesizedTone(523.25, 'triangle', 0.18, 0.12, 0.02); // C5
      setTimeout(() => playSynthesizedTone(659.25, 'sine', 0.22, 0.14, 0.02), 80); // E5
    },
    cardDetach: () => {
      playSynthesizedTone(440, 'triangle', 0.15, 0.09, 0.02); // A4
    },
    success: () => {
      playSynthesizedTone(523.25, 'sine', 0.2, 0.15); // C5
      setTimeout(() => playSynthesizedTone(659.25, 'sine', 0.25, 0.18), 120); // E5
      setTimeout(() => playSynthesizedTone(783.99, 'sine', 0.45, 0.22), 240); // G5
    },
    wrong: () => {
      playSynthesizedTone(233.08, 'sawtooth', 0.22, 0.12);
      setTimeout(() => playSynthesizedTone(220.00, 'sawtooth', 0.3, 0.12), 140);
    },
    candleBlow: () => {
      if (state.isMuted) return;
      initAudioContext();
      if (!state.audioCtx) return;
      try {
        const bufferSize = state.audioCtx.sampleRate * 0.4;
        const buffer = state.audioCtx.createBuffer(1, bufferSize, state.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (state.audioCtx.sampleRate * 0.08));
        }
        const noise = state.audioCtx.createBufferSource();
        noise.buffer = buffer;
        const gain = state.audioCtx.createGain();
        gain.gain.setValueAtTime(0.2, state.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + 0.4);
        noise.connect(gain);
        gain.connect(state.audioCtx.destination);
        noise.start();
      } catch (e) {}
    },
    unwrap: () => {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        setTimeout(() => playSynthesizedTone(freq, 'sine', 0.35, 0.15), idx * 80);
      });
    },
    typewriter: () => {
      playSynthesizedTone(1100 + Math.random() * 300, 'square', 0.025, 0.02);
    },
    fireworkBoom: () => {
      if (state.isMuted) return;
      initAudioContext();
      if (!state.audioCtx) return;
      try {
        const osc = state.audioCtx.createOscillator();
        const gain = state.audioCtx.createGain();
        const now = state.audioCtx.currentTime;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.5);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(state.audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } catch (e) {}
    }
  };

  // Background Song Engine (WhatsApp Audio)
  function getBgAudioElement() {
    let audio = document.getElementById("bgMusicAudio");
    if (!audio) {
      audio = new Audio();
      audio.id = "bgMusicAudio";
      audio.loop = true;
      audio.src = encodeURI("./assets/WhatsApp Audio 2026-10-04 at 8.43.41 PM.mpeg");
      document.body.appendChild(audio);
    }
    audio.loop = true;
    audio.volume = 0.75;
    return audio;
  }

  function startMusic() {
    state.musicPlaying = true;
    state.isMuted = false;
    const btn = document.getElementById("audioToggleBtn");
    if (btn) {
      btn.innerHTML = "🎵";
      btn.classList.add("playing");
      btn.setAttribute("title", "Song Playing (Click to Mute)");
    }

    const audio = getBgAudioElement();
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Audio playback waiting for user gesture:", err);
        });
      }
    }
  }

  function stopMusic() {
    state.musicPlaying = false;
    state.isMuted = true;
    const audio = document.getElementById("bgMusicAudio");
    if (audio) {
      audio.pause();
    }
    const btn = document.getElementById("audioToggleBtn");
    if (btn) {
      btn.innerHTML = "🔇";
      btn.classList.remove("playing");
      btn.setAttribute("title", "Song Muted (Click to Play)");
    }
  }

  function toggleAudio() {
    initAudioContext();
    if (state.musicPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  // Auto-resume song on any touch/click if music is supposed to be playing
  const resumeBgAudioOnGesture = () => {
    const audio = document.getElementById("bgMusicAudio");
    if (audio && state.musicPlaying && audio.paused) {
      audio.play().catch(() => {});
    }
  };
  window.addEventListener("click", resumeBgAudioOnGesture);
  window.addEventListener("touchstart", resumeBgAudioOnGesture, { passive: true });

  /* ========================================================================
     4. STARFIELD & FIREFLIES BACKGROUND (CANVAS)
     ======================================================================== */
  const starCanvas = document.getElementById("starCanvas");
  const starCtx = starCanvas ? starCanvas.getContext("2d") : null;
  let stars = [];
  let fireflies = [];

  function initStarfield() {
    if (!starCanvas || !starCtx) return;

    function resize() {
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;
      stars = [];
      fireflies = [];

      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 7500);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * starCanvas.width,
          y: Math.random() * starCanvas.height,
          radius: Math.random() * 1.2 + 0.4,
          alpha: Math.random() * 0.8 + 0.2,
          speed: 0.008 + Math.random() * 0.015
        });
      }

      // Fireflies
      const numFlies = Math.min(25, Math.floor(window.innerWidth / 40));
      for (let i = 0; i < numFlies; i++) {
        fireflies.push({
          x: Math.random() * starCanvas.width,
          y: Math.random() * starCanvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          alpha: Math.random(),
          pulseSpeed: 0.02 + Math.random() * 0.02
        });
      }
    }

    window.addEventListener("resize", resize);
    resize();

    function renderAtmosphere() {
      starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

      // Render Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += s.speed;
        if (s.alpha > 0.95 || s.alpha < 0.15) s.speed = -s.speed;

        starCtx.save();
        starCtx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        starCtx.fillStyle = "#ffffff";
        starCtx.beginPath();
        starCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        starCtx.fill();
        starCtx.restore();
      }

      // Render Fireflies (Soft warm glow)
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        f.x += f.vx;
        f.y += f.vy;

        if (f.x < 0) f.x = starCanvas.width;
        if (f.x > starCanvas.width) f.x = 0;
        if (f.y < 0) f.y = starCanvas.height;
        if (f.y > starCanvas.height) f.y = 0;

        f.alpha += f.pulseSpeed;
        if (f.alpha > 0.85 || f.alpha < 0.1) f.pulseSpeed = -f.pulseSpeed;

        starCtx.save();
        starCtx.globalAlpha = Math.max(0.05, Math.min(0.9, f.alpha));
        const grad = starCtx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 3.5);
        grad.addColorStop(0, "rgba(254, 240, 138, 0.9)");
        grad.addColorStop(0.5, "rgba(251, 113, 133, 0.4)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        starCtx.fillStyle = grad;
        starCtx.beginPath();
        starCtx.arc(f.x, f.y, f.radius * 3.5, 0, Math.PI * 2);
        starCtx.fill();
        starCtx.restore();
      }

      requestAnimationFrame(renderAtmosphere);
    }

    renderAtmosphere();
  }

  /* ========================================================================
     5. FULLSCREEN CANVAS FIREWORKS & CONFETTI ENGINE
     ======================================================================== */
  const fwCanvas = document.getElementById("fireworksCanvas");
  const fwCtx = fwCanvas ? fwCanvas.getContext("2d") : null;
  let fireworks = [];
  let particles = [];
  let confettiItems = [];

  function initFireworksEngine() {
    if (!fwCanvas || !fwCtx) return;

    function resize() {
      fwCanvas.width = window.innerWidth;
      fwCanvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class FireworkRocket {
      constructor(sx, sy, tx, ty) {
        this.x = sx;
        this.y = sy;
        this.tx = tx;
        this.ty = ty;
        this.dist = Math.hypot(tx - sx, ty - sy);
        this.traveled = 0;
        this.coords = [[sx, sy], [sx, sy]];
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 4.5;
        this.acc = 1.045;
        this.hue = Math.random() * 60 + 330; // Romantic hues (rose, pink, gold)
      }
      update(idx) {
        this.coords.pop();
        this.coords.unshift([this.x, this.y]);
        this.speed *= this.acc;
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.traveled = Math.hypot(vx, vy) + this.traveled;

        if (this.traveled >= this.dist) {
          createExplosion(this.tx, this.ty, this.hue);
          SFX.fireworkBoom();
          fireworks.splice(idx, 1);
        } else {
          this.x += vx;
          this.y += vy;
        }
      }
      draw() {
        fwCtx.beginPath();
        fwCtx.moveTo(this.coords[1][0], this.coords[1][1]);
        fwCtx.lineTo(this.x, this.y);
        fwCtx.strokeStyle = `hsl(${this.hue}, 100%, 75%)`;
        fwCtx.lineWidth = 2.5;
        fwCtx.stroke();
      }
    }

    class FireworkParticle {
      constructor(x, y, baseHue) {
        this.x = x;
        this.y = y;
        this.coords = [[x, y], [x, y], [x, y]];
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 7 + 1.5;
        this.friction = 0.95;
        this.gravity = 0.85;
        this.hue = baseHue + (Math.random() * 40 - 20);
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.012;
      }
      update(idx) {
        this.coords.pop();
        this.coords.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
        if (this.alpha <= this.decay) {
          particles.splice(idx, 1);
        }
      }
      draw() {
        fwCtx.beginPath();
        fwCtx.moveTo(this.coords[2][0], this.coords[2][1]);
        fwCtx.lineTo(this.x, this.y);
        fwCtx.strokeStyle = `hsla(${this.hue}, 100%, 65%, ${this.alpha})`;
        fwCtx.lineWidth = 2;
        fwCtx.stroke();
      }
    }

    function createExplosion(x, y, hue) {
      let count = 45;
      while (count--) {
        particles.push(new FireworkParticle(x, y, hue));
      }
    }

    window.launchCustomFirework = function (x, y) {
      const sx = window.innerWidth / 2 + (Math.random() * 300 - 150);
      const sy = window.innerHeight;
      fireworks.push(new FireworkRocket(sx, sy, x, y));
    };

    function renderFireworks() {
      requestAnimationFrame(renderFireworks);
      fwCtx.globalCompositeOperation = 'destination-out';
      fwCtx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
      fwCtx.globalCompositeOperation = 'lighter';

      let i = fireworks.length;
      while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
      }

      let j = particles.length;
      while (j--) {
        particles[j].draw();
        particles[j].update(j);
      }
    }

    renderFireworks();
  }

  // DOM Confetti Blast
  function triggerConfettiBlast(x, y, count = 30) {
    const colors = ["#fb7185", "#fde047", "#e11d48", "#c084fc", "#60a5fa", "#ffffff"];
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.style.position = "fixed";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.width = `${Math.random() * 8 + 6}px`;
      el.style.height = `${Math.random() * 12 + 6}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.borderRadius = "2px";
      el.style.pointerEvents = "none";
      el.style.zIndex = "999";
      el.style.transition = "transform 1.4s cubic-bezier(0.12, 0.8, 0.3, 1), opacity 1.4s ease";
      document.body.appendChild(el);

      const dx = (Math.random() - 0.5) * 400;
      const dy = -Math.random() * 260 - 60;
      const rot = (Math.random() - 0.5) * 800;

      requestAnimationFrame(() => {
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`;
        el.style.opacity = "0";
      });

      setTimeout(() => el.remove(), 1500);
    }
  }

  /* ========================================================================
     6. STEP CONTROLLER & CINEMATIC NAVIGATION
     ======================================================================== */
  function navigateToStep(stepNum) {
    if (stepNum === 6) stepNum = 7; // User removed step 6 (quiz)
    if (stepNum < 1 || stepNum > state.totalSteps) return;

    // Stop Step 3 auto timer if leaving step 3
    if (state.currentStep === 3 && stepNum !== 3) {
      stopStep3AutoTimer();
    }

    SFX.click();

    // Hide all steps
    for (let i = 1; i <= state.totalSteps; i++) {
      const scr = document.getElementById(`step${i}`);
      if (scr) scr.classList.remove("active");
    }

    state.currentStep = stepNum;

    // Show target step
    const targetScreen = document.getElementById(`step${stepNum}`);
    if (targetScreen) {
      targetScreen.classList.add("active");
    }

    // Update Progress Indicator Badge: "01 / 12"
    const badgeNum = document.getElementById("stepCounterText");
    if (badgeNum) {
      const formatted = String(stepNum).padStart(2, "0");
      badgeNum.textContent = `${formatted} / 12`;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Step-Specific Initializations
    onStepActivated(stepNum);
  }

  function onStepActivated(stepNum) {
    if (stepNum === 3) {
      initStep3Cinematic();
    } else if (stepNum === 4) {
      renderGallery();
    } else if (stepNum === 5) {
      renderTenThings();
    } else if (stepNum === 6) {
      renderQuizQuestion();
    } else if (stepNum === 10) {
      startCountdownSequence();
    } else if (stepNum === 11) {
      startGrandFinale();
    } else if (stepNum === 12) {
      initStep12BestMemories();
    }
  }

  /* ========================================================================
     STEP 1: SECRET INTRO SEQUENCER
     ======================================================================== */
  function initIntroSequence() {
    const lines = [
      document.getElementById("introLine1"),
      document.getElementById("introLine2"),
      document.getElementById("introLine3"),
      document.getElementById("introLine4")
    ];
    const btnWrapper = document.getElementById("introBtnWrapper");

    setTimeout(() => lines[0]?.classList.add("show"), 800);
    setTimeout(() => lines[1]?.classList.add("show"), 2400);
    setTimeout(() => lines[2]?.classList.add("show"), 4200);
    setTimeout(() => lines[3]?.classList.add("show"), 5800);
    setTimeout(() => btnWrapper?.classList.add("show"), 7200);

    const openBtn = document.getElementById("openSurpriseBtn");
    if (openBtn) {
      openBtn.addEventListener("click", () => {
        initAudioContext();
        if (state.isMuted) {
          startMusic();
        }
        triggerConfettiBlast(window.innerWidth / 2, window.innerHeight / 2, 25);
        navigateToStep(2);
      });
    }
  }

  /* ========================================================================
     STEP 3: A FEW MOMENTS — 5-PHOTO AUTO-SCROLL STACKING DECK ENGINE
     ======================================================================== */
  let step3ActiveIndex = 0;
  let step3AutoTimer = null;
  let step3IsAutoPlaying = true;
  let step3Initialized = false;
  let step3LastScrollTime = 0;

  function initStep3Cinematic() {
    step3ActiveIndex = 0;
    updateStep3StackUI(false);
    startStep3AutoTimer();

    if (!step3Initialized) {
      step3Initialized = true;
      bindStep3Controls();
    }
  }

  function updateStep3StackUI(playTone = true, isReverse = false) {
    const cards = document.querySelectorAll(".step3-photo-card");
    const dots = document.querySelectorAll(".step3-s-dot");
    const quoteBox = document.getElementById("step3QuoteBox");
    const quoteTag = document.getElementById("step3QuoteTag");
    const quoteText = document.getElementById("step3QuoteText");

    cards.forEach((card, idx) => {
      // Clear depth classes first
      card.classList.remove("card-attached", "card-under-1", "card-under-2", "card-under-3");

      if (idx <= step3ActiveIndex) {
        // This card is attached to the deck
        card.classList.add("card-attached");
        const depth = step3ActiveIndex - idx;
        if (depth === 1) card.classList.add("card-under-1");
        else if (depth === 2) card.classList.add("card-under-2");
        else if (depth >= 3) card.classList.add("card-under-3");
      }
    });

    // Update Dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === step3ActiveIndex);
    });

    // Update Quote Box with gentle transition
    if (quoteBox && quoteTag && quoteText && step3Moments[step3ActiveIndex]) {
      quoteBox.style.opacity = "0";
      quoteBox.style.transform = "translateY(6px)";
      setTimeout(() => {
        quoteTag.textContent = step3Moments[step3ActiveIndex].tag;
        quoteText.textContent = step3Moments[step3ActiveIndex].text;
        quoteBox.style.opacity = "1";
        quoteBox.style.transform = "translateY(0)";
      }, 200);
    }

    if (playTone) {
      if (isReverse) {
        if (SFX.cardDetach) SFX.cardDetach();
        else SFX.click();
      } else {
        if (SFX.cardAttach) SFX.cardAttach();
        else SFX.click();
      }
    }
  }

  function step3AttachNext() {
    if (step3ActiveIndex < step3Moments.length - 1) {
      step3ActiveIndex++;
      updateStep3StackUI(true, false);
      if (navigator.vibrate) navigator.vibrate(25);
    } else {
      // Loop back to beginning so automatic movement keeps running smoothly
      step3ActiveIndex = 0;
      updateStep3StackUI(true, true);
    }
  }

  function step3DetachPrev() {
    if (step3ActiveIndex > 0) {
      step3ActiveIndex--;
      updateStep3StackUI(true, true);
      if (navigator.vibrate) navigator.vibrate(18);
    }
  }

  function step3GoToIndex(targetIdx) {
    if (targetIdx < 0 || targetIdx >= step3Moments.length || targetIdx === step3ActiveIndex) return;
    const isReverse = targetIdx < step3ActiveIndex;
    step3ActiveIndex = targetIdx;
    updateStep3StackUI(true, isReverse);
  }

  function startStep3AutoTimer() {
    stopStep3AutoTimer();
    if (!step3IsAutoPlaying) return;

    step3AutoTimer = setInterval(() => {
      if (state.currentStep !== 3) {
        stopStep3AutoTimer();
        return;
      }
      step3AttachNext();
    }, 4200);
  }

  function stopStep3AutoTimer() {
    if (step3AutoTimer) {
      clearInterval(step3AutoTimer);
      step3AutoTimer = null;
    }
  }

  function toggleStep3AutoPlay() {
    step3IsAutoPlaying = !step3IsAutoPlaying;
    const btn = document.getElementById("step3AutoToggleBtn");
    if (btn) {
      btn.textContent = step3IsAutoPlaying ? "⏸" : "▶";
      btn.title = step3IsAutoPlaying ? "Pause Auto-Advance" : "Play Auto-Advance";
    }
    if (step3IsAutoPlaying) {
      startStep3AutoTimer();
    } else {
      stopStep3AutoTimer();
    }
    SFX.click();
  }

  function bindStep3Controls() {
    const deck = document.getElementById("step3CardsDeck");
    const nextBtn = document.getElementById("step3StackNextBtn");
    const prevBtn = document.getElementById("step3StackPrevBtn");
    const autoBtn = document.getElementById("step3AutoToggleBtn");
    const dots = document.querySelectorAll(".step3-s-dot");
    const step3Sec = document.getElementById("step3");

    // Click or Tap anywhere on Deck to attach next card
    if (deck) {
      deck.addEventListener("click", () => {
        step3AttachNext();
        if (step3IsAutoPlaying) startStep3AutoTimer();
      });
    }

    // Arrow Buttons
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        step3AttachNext();
        if (step3IsAutoPlaying) startStep3AutoTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        step3DetachPrev();
        if (step3IsAutoPlaying) startStep3AutoTimer();
      });
    }

    // Play/Pause Auto Toggle Button
    if (autoBtn) {
      autoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleStep3AutoPlay();
      });
    }

    // Indicator Dots Click
    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        const targetIdx = parseInt(dot.getAttribute("data-index"), 10);
        if (!isNaN(targetIdx)) {
          step3GoToIndex(targetIdx);
          if (step3IsAutoPlaying) startStep3AutoTimer();
        }
      });
    });

    // Mouse Wheel Scroll Listener ("scorll panna kela irunthu oru oru photo va mela mela vanthu attacche aganumm")
    if (step3Sec) {
      step3Sec.addEventListener("wheel", (e) => {
        const now = Date.now();
        if (now - step3LastScrollTime < 380) return; // Debounce for smooth discrete step

        if (e.deltaY > 15) {
          // Scrolling down: attach next photo from bottom
          step3LastScrollTime = now;
          step3AttachNext();
          if (step3IsAutoPlaying) startStep3AutoTimer();
        } else if (e.deltaY < -15) {
          // Scrolling up: detach photo
          step3LastScrollTime = now;
          step3DetachPrev();
          if (step3IsAutoPlaying) startStep3AutoTimer();
        }
      }, { passive: true });

      // Mobile Touch Gesture Support
      let touchStartY = 0;
      let touchStartX = 0;

      step3Sec.addEventListener("touchstart", (e) => {
        if (e.touches && e.touches.length === 1) {
          touchStartY = e.touches[0].clientY;
          touchStartX = e.touches[0].clientX;
        }
      }, { passive: true });

      step3Sec.addEventListener("touchend", (e) => {
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;
        const diffY = touchEndY - touchStartY;
        const diffX = touchEndX - touchStartX;

        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 35) {
          const now = Date.now();
          if (now - step3LastScrollTime < 380) return;
          step3LastScrollTime = now;

          if (diffY < -35) {
            // Swiped UP (natural scroll down) -> Attach next photo!
            step3AttachNext();
            if (step3IsAutoPlaying) startStep3AutoTimer();
          } else if (diffY > 35) {
            // Swiped DOWN (natural scroll up) -> Detach photo!
            step3DetachPrev();
            if (step3IsAutoPlaying) startStep3AutoTimer();
          }
        }
      }, { passive: true });
    }
  }

  /* ========================================================================
     STEP 4: MEMORY GALLERY & LIGHTBOX
     ======================================================================== */
  function renderGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid || grid.children.length > 0) return;

    memories.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      card.innerHTML = `
        <button class="card-like-btn" title="Save favorite" aria-label="Favorite">❤️</button>
        <img src="${item.image}" alt="Memory ${index + 1}" loading="lazy" />
        <div class="memory-card-overlay">
          <span class="memory-card-num">${String(index + 1).padStart(2, '0')} // MEMORY</span>
          <h4 class="memory-card-caption">${item.caption}</h4>
        </div>
      `;

      // Open Lightbox
      card.addEventListener("click", (e) => {
        if (e.target.closest(".card-like-btn")) return;
        openLightbox(index);
      });

      // Like Button Interaction
      const likeBtn = card.querySelector(".card-like-btn");
      likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        likeBtn.classList.toggle("liked");
        SFX.click();
        triggerConfettiBlast(e.clientX, e.clientY, 15);
      });

      grid.appendChild(card);
    });
  }

  let activeLightboxItems = memories;

  function openLightboxForSource(items, index) {
    activeLightboxItems = (items && items.length > 0) ? items : memories;
    state.lightboxIndex = Math.max(0, Math.min(index, activeLightboxItems.length - 1));
    const modal = document.getElementById("lightboxModal");
    const img = document.getElementById("lightboxImg");
    const cap = document.getElementById("lightboxCaption");

    if (modal && img && cap) {
      const item = activeLightboxItems[state.lightboxIndex];
      img.src = item.image;
      if (item.desc) {
        cap.innerHTML = `<strong>${item.caption}</strong><br><span style="font-size:0.9em;opacity:0.85;font-style:italic;">${item.desc}</span>`;
      } else {
        cap.textContent = item.caption;
      }
      modal.classList.add("active");
      SFX.click();
    }
  }

  function openLightbox(index) {
    openLightboxForSource(memories, index);
  }

  function closeLightbox() {
    const modal = document.getElementById("lightboxModal");
    if (modal) modal.classList.remove("active");
  }

  function nextLightbox() {
    if (!activeLightboxItems || activeLightboxItems.length === 0) return;
    state.lightboxIndex = (state.lightboxIndex + 1) % activeLightboxItems.length;
    openLightboxForSource(activeLightboxItems, state.lightboxIndex);
  }

  function prevLightbox() {
    if (!activeLightboxItems || activeLightboxItems.length === 0) return;
    state.lightboxIndex = (state.lightboxIndex - 1 + activeLightboxItems.length) % activeLightboxItems.length;
    openLightboxForSource(activeLightboxItems, state.lightboxIndex);
  }

  function openCustomLightbox(src, caption) {
    const modal = document.getElementById("lightboxModal");
    const img = document.getElementById("lightboxImg");
    const cap = document.getElementById("lightboxCaption");
    if (modal && img && cap) {
      img.src = src;
      cap.textContent = caption || "";
      modal.classList.add("active");
      SFX.click();
    }
  }

  /* ========================================================================
     STEP 5: 10 THINGS I LIKE ABOUT YOU
     ======================================================================== */
  function renderTenThings() {
    const counterEl = document.getElementById("thingsCounter");
    const textEl = document.getElementById("thingsText");
    const fillEl = document.getElementById("thingsProgressFill");
    const btnEl = document.getElementById("nextThingBtn");

    if (state.currentThingIndex < tenThings.length) {
      const item = tenThings[state.currentThingIndex];
      if (counterEl) counterEl.textContent = `${item.num} // 10`;
      if (textEl) textEl.textContent = `"${item.text}"`;
      if (fillEl) fillEl.style.width = `${((state.currentThingIndex + 1) / tenThings.length) * 100}%`;
      if (btnEl) btnEl.innerHTML = `<span>Next →</span>`;
    } else {
      if (counterEl) counterEl.textContent = `HONESTLY... ❤️`;
      if (textEl) textEl.innerHTML = `Honestly... I could keep going.<br /><br /><span style="font-size: 1.2rem; color: var(--accent-gold);">But let's save some secrets for later. 😉</span>`;
      if (fillEl) fillEl.style.width = `100%`;
      if (btnEl) {
        btnEl.innerHTML = `<span>Continue to Make a Wish 🎂 ➔</span>`;
        btnEl.onclick = () => navigateToStep(7);
      }
    }
  }

  function advanceThing() {
    SFX.click();
    const box = document.getElementById("thingsDisplayBox");
    if (box) {
      box.style.opacity = "0";
      box.style.transform = "translateY(10px)";
      setTimeout(() => {
        state.currentThingIndex++;
        renderTenThings();
        box.style.opacity = "1";
        box.style.transform = "translateY(0)";
      }, 300);
    }
  }

  /* ========================================================================
     STEP 6: FRIENDSHIP / CRUSH QUIZ
     ======================================================================== */
  function renderQuizQuestion() {
    const qEl = document.getElementById("quizQuestion");
    const listEl = document.getElementById("quizOptionsList");
    const countEl = document.getElementById("quizCounter");
    const activeBox = document.getElementById("quizActiveBox");
    const resultBox = document.getElementById("quizResultBox");

    if (!qEl || !listEl) return;

    if (state.quizIndex < quizData.length) {
      if (activeBox) activeBox.style.display = "block";
      if (resultBox) resultBox.style.display = "none";

      const currentQ = quizData[state.quizIndex];
      qEl.textContent = currentQ.question;
      if (countEl) countEl.textContent = `Question ${state.quizIndex + 1} of ${quizData.length}`;
      listEl.innerHTML = "";

      currentQ.options.forEach((optText, optIdx) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option-btn";
        btn.innerHTML = `<span>${optText}</span><span class="opt-badge"></span>`;
        btn.onclick = () => handleQuizSelect(btn, optIdx, currentQ);
        listEl.appendChild(btn);
      });
    } else {
      // Quiz Finished
      if (activeBox) activeBox.style.display = "none";
      if (resultBox) {
        resultBox.style.display = "block";
        const scoreVal = document.getElementById("quizScoreValue");
        const scoreMsg = document.getElementById("quizScoreMessage");
        const pct = Math.round((state.quizScore / quizData.length) * 100);

        if (scoreVal) scoreVal.textContent = `${pct}%`;
        if (scoreMsg) {
          if (pct >= 75) {
            scoreMsg.textContent = `"Okay... you know yourself pretty well! 😂 Bestie alert! 🥰"`;
          } else {
            scoreMsg.textContent = `"Haha sweet! Every little memory makes our bond even better! 💫"`;
          }
        }
        triggerConfettiBlast(window.innerWidth / 2, window.innerHeight / 2, 40);
        SFX.success();
      }
    }
  }

  function handleQuizSelect(btn, chosenIdx, qObj) {
    const allBtns = document.querySelectorAll(".quiz-option-btn");
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = (chosenIdx === qObj.correct);
    if (isCorrect) {
      btn.classList.add("correct");
      btn.querySelector(".opt-badge").textContent = "✔";
      state.quizScore++;
      SFX.success();
      triggerConfettiBlast(window.innerWidth / 2, window.innerHeight * 0.45, 25);
    } else {
      btn.classList.add("wrong");
      btn.querySelector(".opt-badge").textContent = "✖";
      allBtns[qObj.correct].classList.add("correct");
      allBtns[qObj.correct].querySelector(".opt-badge").textContent = "✔";
      SFX.wrong();
    }

    setTimeout(() => {
      state.quizIndex++;
      renderQuizQuestion();
    }, 1800);
  }

  /* ========================================================================
     STEP 7: MAKE A WISH (CAKE & CANDLES)
     ======================================================================== */
  function onReadyForCake() {
    const input = document.getElementById("birthdayWishInput");
    state.userWishText = input ? input.value.trim() : "";
    SFX.click();

    const prepArea = document.getElementById("wishPrepArea");
    const cakeArea = document.getElementById("cakeSceneContainer");

    if (prepArea) prepArea.style.display = "none";
    if (cakeArea) {
      cakeArea.style.display = "flex";
      cakeArea.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function blowOutCandles() {
    if (state.candlesBlown) return;
    state.candlesBlown = true;
    SFX.candleBlow();

    const flames = document.querySelectorAll(".candle-flame");
    const smokes = document.querySelectorAll(".smoke-puff");
    flames.forEach(f => f.classList.add("extinguished"));
    smokes.forEach(s => s.classList.add("rise"));

    const hint = document.getElementById("cakeHintText");
    const reveal = document.getElementById("wishGrantedMsg");

    if (hint) hint.style.display = "none";
    if (reveal) {
      reveal.style.display = "block";
      reveal.innerHTML = `<p style="font-size: 1.4rem; font-family: var(--font-serif); color: #4ade80; margin-bottom: 12px;">"I hope that wish comes true. ❤️"</p>`;
    }

    triggerConfettiBlast(window.innerWidth / 2, window.innerHeight * 0.45, 50);
    SFX.success();

    const nextBtn = document.getElementById("cakeToGiftBtn");
    if (nextBtn) nextBtn.style.display = "inline-flex";
  }

  /* ========================================================================
     STEP 8: MYSTERY GIFT UNWRAPPING
     ======================================================================== */
  function unwrapMysteryGift() {
    if (state.giftOpened) return;
    state.giftOpened = true;

    SFX.unwrap();
    const box = document.getElementById("giftBoxCube");
    const hint = document.getElementById("giftTapHint");
    const revealedArea = document.getElementById("giftRevealedArea");

    if (box) {
      box.style.transform = "scale(1.15) rotate(8deg)";
      box.style.opacity = "0";
      setTimeout(() => box.style.display = "none", 400);
    }
    if (hint) hint.style.display = "none";

    setTimeout(() => {
      if (revealedArea) revealedArea.style.display = "block";
      triggerConfettiBlast(window.innerWidth / 2, window.innerHeight / 2, 50);
    }, 450);
  }

  /* ========================================================================
     STEP 9: SECRET LETTER & WAX SEAL
     ======================================================================== */
  function openSecretLetter() {
    if (state.letterOpened) return;
    state.letterOpened = true;

    SFX.unwrap();
    const stage = document.getElementById("envelopeStage");
    const sheet = document.getElementById("letterSheet");
    const textTarget = document.getElementById("tamilTypewriterTarget");
    const sig = document.getElementById("letterSignature");
    const btn = document.getElementById("letterToNextBtn");

    if (stage) {
      stage.style.transform = "scale(0.8) translateY(-20px)";
      stage.style.opacity = "0";
      setTimeout(() => stage.style.display = "none", 400);
    }

    setTimeout(() => {
      if (sheet) sheet.style.display = "block";
      // Split into grapheme clusters for natural Tamil typography
      let segments = [];
      if (window.Intl && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('ta', { granularity: 'grapheme' });
        segments = Array.from(segmenter.segment(letterTamilText), s => s.segment);
      } else {
        segments = letterTamilText.split('');
      }

      let idx = 0;
      textTarget.textContent = "";

      const timer = setInterval(() => {
        if (idx < segments.length) {
          textTarget.textContent += segments[idx];
          if (idx % 2 === 0) SFX.typewriter();
          idx++;
        } else {
          clearInterval(timer);
          if (sig) sig.classList.add("show");
          if (btn) btn.style.display = "inline-flex";
          SFX.success();
        }
      }, 55);
    }, 450);
  }

  /* ========================================================================
     STEP 10: ONE LAST SECRET (COUNTDOWN)
     ======================================================================== */
  function startCountdownSequence() {
    const p1 = document.getElementById("secretPhrase1");
    const p2 = document.getElementById("secretPhrase2");
    const p3 = document.getElementById("secretPhrase3");
    const numEl = document.getElementById("countdownNumber");

    setTimeout(() => p1?.classList.add("show"), 600);
    setTimeout(() => p2?.classList.add("show"), 2200);
    setTimeout(() => p3?.classList.add("show"), 4000);

    setTimeout(() => {
      if (numEl) {
        numEl.classList.add("show");
        numEl.textContent = "3";
        SFX.click();

        setTimeout(() => {
          numEl.textContent = "2";
          SFX.click();
        }, 1000);

        setTimeout(() => {
          numEl.textContent = "1";
          SFX.click();
        }, 2000);

        setTimeout(() => {
          navigateToStep(11);
        }, 3000);
      }
    }, 5500);
  }

  /* ========================================================================
     STEP 11: GRAND FINALE
     ======================================================================== */
  let finaleInterval = null;
  function startGrandFinale() {
    SFX.success();
    // Continuous launch of fireworks
    if (finaleInterval) clearInterval(finaleInterval);
    finaleInterval = setInterval(() => {
      if (state.currentStep !== 11) {
        clearInterval(finaleInterval);
        return;
      }
      const x = Math.random() * (window.innerWidth * 0.8) + (window.innerWidth * 0.1);
      const y = Math.random() * (window.innerHeight * 0.5) + (window.innerHeight * 0.1);
      if (window.launchCustomFirework) {
        window.launchCustomFirework(x, y);
      }
    }, 650);

    // Initial shower
    triggerConfettiBlast(window.innerWidth / 2, window.innerHeight * 0.35, 60);
  }

  /* ========================================================================
     STEP 12: BEST MEMORIES (14-PHOTO SLIDES STREAM) & GRAND BLESSINGS
     ======================================================================== */
  let step12Observer = null;
  let step12MemoriesData = [];

  function initStep12BestMemories() {
    const cards = document.querySelectorAll(".step12-slide-card");
    if (!cards || cards.length === 0) return;

    step12MemoriesData = [];
    cards.forEach((card, idx) => {
      const img = card.querySelector("img");
      const caption = card.querySelector(".step12-card-caption");
      const desc = card.querySelector(".step12-card-desc");
      const tag = card.querySelector(".step12-card-tag");

      step12MemoriesData.push({
        image: img ? img.getAttribute("src") : "",
        caption: caption ? caption.textContent.trim() : `Memory ${idx + 1}`,
        desc: desc ? desc.textContent.trim() : "",
        tag: tag ? tag.textContent.trim() : ""
      });

      // Bind click on card / img box to open lightbox
      const imgBox = card.querySelector(".step12-img-box");
      const targetBox = imgBox || card;
      if (!card.dataset.bound) {
        card.dataset.bound = "true";
        targetBox.style.cursor = "pointer";
        targetBox.addEventListener("click", () => {
          openLightboxForSource(step12MemoriesData, idx);
        });
      }
    });

    // Animate cards into view
    // Immediately reveal the first 2 cards smoothly so the top is never blank
    setTimeout(() => {
      if (cards[0]) cards[0].classList.add("in-view");
    }, 150);
    setTimeout(() => {
      if (cards[1]) cards[1].classList.add("in-view");
    }, 400);

    // Setup IntersectionObserver for smooth scroll-in animations
    if ("IntersectionObserver" in window) {
      if (step12Observer) step12Observer.disconnect();
      step12Observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -40px 0px",
          threshold: 0.1
        }
      );

      cards.forEach((card) => step12Observer.observe(card));
    }

    // Scroll listener fallback to ensure all cards reveal as user scrolls
    const checkCardVisibility = () => {
      if (state.currentStep !== 12) return;
      const triggerBottom = window.innerHeight * 0.95;
      cards.forEach((card) => {
        const top = card.getBoundingClientRect().top;
        if (top < triggerBottom) {
          card.classList.add("in-view");
        }
      });
    };

    window.removeEventListener("scroll", checkCardVisibility);
    window.addEventListener("scroll", checkCardVisibility, { passive: true });
    setTimeout(checkCardVisibility, 350);

    // Initial celebratory confetti burst
    triggerConfettiBlast(window.innerWidth / 2, window.innerHeight * 0.25, 30);
  }

  function resetAndRestartStory() {
    SFX.click();

    // Reset interactive state
    state.quizIndex = 0;
    state.quizScore = 0;
    state.currentThingIndex = 0;
    state.candlesBlown = false;
    state.giftOpened = false;
    state.letterOpened = false;

    // Reset step 12 cards animation state
    const cards = document.querySelectorAll(".step12-slide-card");
    cards.forEach((card) => card.classList.remove("in-view"));

    // Reset cake
    const flames = document.querySelectorAll(".candle-flame");
    flames.forEach((f) => f.classList.remove("extinguished"));
    const prep = document.getElementById("wishPrepArea");
    const cake = document.getElementById("cakeSceneContainer");
    const hint = document.getElementById("cakeHintText");
    const rev = document.getElementById("wishGrantedMsg");
    const cBtn = document.getElementById("cakeToGiftBtn");
    if (prep) prep.style.display = "block";
    if (cake) cake.style.display = "none";
    if (hint) hint.style.display = "block";
    if (rev) rev.style.display = "none";
    if (cBtn) cBtn.style.display = "none";

    // Reset gift
    const gBox = document.getElementById("giftBoxCube");
    const gHint = document.getElementById("giftTapHint");
    const gRev = document.getElementById("giftRevealedArea");
    if (gBox) {
      gBox.style.display = "flex";
      gBox.style.opacity = "1";
      gBox.style.transform = "none";
    }
    if (gHint) gHint.style.display = "block";
    if (gRev) gRev.style.display = "none";

    // Reset letter
    const eStage = document.getElementById("envelopeStage");
    const sheet = document.getElementById("letterSheet");
    const sig = document.getElementById("letterSignature");
    const lBtn = document.getElementById("letterToNextBtn");
    if (eStage) {
      eStage.style.display = "flex";
      eStage.style.opacity = "1";
      eStage.style.transform = "none";
    }
    if (sheet) sheet.style.display = "none";
    if (sig) sig.classList.remove("show");
    if (lBtn) lBtn.style.display = "none";

    navigateToStep(1);
  }

  /* ========================================================================
     SECRET EASTER EGG (TAP HEART 5 TIMES)
     ======================================================================== */
  function onHeartIconTapped() {
    state.easterEggClicks++;
    SFX.click();

    if (state.easterEggTimer) clearTimeout(state.easterEggTimer);
    state.easterEggTimer = setTimeout(() => {
      state.easterEggClicks = 0;
    }, 2500);

    if (state.easterEggClicks >= 5) {
      state.easterEggClicks = 0;
      const modal = document.getElementById("easterEggModal");
      if (modal) {
        modal.classList.add("active");
        triggerConfettiBlast(window.innerWidth / 2, window.innerHeight / 2, 60);
        SFX.success();
      }
    }
  }

  function closeEasterEgg() {
    const modal = document.getElementById("easterEggModal");
    if (modal) modal.classList.remove("active");
  }

  /* ========================================================================
     GLOBAL EVENT BINDINGS
     ======================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    // Populate Personalized Names in DOM
    const nameTargets = document.querySelectorAll(".person-name-target");
    nameTargets.forEach(el => el.textContent = birthdayPerson);

    // Init Atmosphere
    initStarfield();
    initFireworksEngine();
    initIntroSequence();

    // Audio Toggle
    const audioBtn = document.getElementById("audioToggleBtn");
    if (audioBtn) audioBtn.addEventListener("click", toggleAudio);

    // Step 2 Invitation Continue Button
    const startJourneyBtn = document.getElementById("startJourneyBtn");
    if (startJourneyBtn) {
      startJourneyBtn.addEventListener("click", () => navigateToStep(3));
    }

    // Step 3 Timeline to Gallery Button
    const timelineToGalleryBtn = document.getElementById("timelineToGalleryBtn");
    if (timelineToGalleryBtn) {
      timelineToGalleryBtn.addEventListener("click", () => navigateToStep(4));
    }

    // Step 4 Gallery to 10 Things Button
    const galleryToThingsBtn = document.getElementById("galleryToThingsBtn");
    if (galleryToThingsBtn) {
      galleryToThingsBtn.addEventListener("click", () => navigateToStep(5));
    }

    // Step 5 Next Thing Button
    const nextThingBtn = document.getElementById("nextThingBtn");
    if (nextThingBtn) {
      nextThingBtn.addEventListener("click", advanceThing);
    }

    // Step 6 Quiz Finish Button
    const quizToCakeBtn = document.getElementById("quizToCakeBtn");
    if (quizToCakeBtn) {
      quizToCakeBtn.addEventListener("click", () => navigateToStep(7));
    }

    // Step 7 Cake Wish Ready Button
    const readyForCakeBtn = document.getElementById("readyForCakeBtn");
    if (readyForCakeBtn) {
      readyForCakeBtn.addEventListener("click", onReadyForCake);
    }

    // Cake Candle Blow Interaction
    const cakeScene = document.getElementById("cakeSceneContainer");
    if (cakeScene) {
      cakeScene.addEventListener("click", blowOutCandles);
    }

    // Step 7 Cake to Gift Button
    const cakeToGiftBtn = document.getElementById("cakeToGiftBtn");
    if (cakeToGiftBtn) {
      cakeToGiftBtn.addEventListener("click", () => navigateToStep(8));
    }

    // Step 8 Gift Unwrap Interaction
    const giftStage = document.getElementById("giftStageWrapper");
    if (giftStage) {
      giftStage.addEventListener("click", unwrapMysteryGift);
    }

    // Step 8 Gift to Letter Button
    const giftToLetterBtn = document.getElementById("giftToLetterBtn");
    if (giftToLetterBtn) {
      giftToLetterBtn.addEventListener("click", () => navigateToStep(9));
    }

    // Step 9 Letter Envelope Open Interaction
    const envStage = document.getElementById("envelopeStage");
    if (envStage) {
      envStage.addEventListener("click", openSecretLetter);
    }

    // Step 9 Letter to Step 10 Button
    const letterToNextBtn = document.getElementById("letterToNextBtn");
    if (letterToNextBtn) {
      letterToNextBtn.addEventListener("click", () => navigateToStep(10));
    }

    // Step 11 Center Beating Heart
    const finaleHeart = document.getElementById("finaleBeatingHeart");
    if (finaleHeart) {
      finaleHeart.addEventListener("click", (e) => {
        SFX.heart();
        const rect = finaleHeart.getBoundingClientRect();
        triggerConfettiBlast(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
        if (window.launchCustomFirework) {
          window.launchCustomFirework(window.innerWidth * 0.3, window.innerHeight * 0.3);
          setTimeout(() => {
            window.launchCustomFirework(window.innerWidth * 0.7, window.innerHeight * 0.25);
          }, 200);
        }
      });
    }

    // Step 11 to Step 12 Navigation Button
    const finaleToStep12Btn = document.getElementById("finaleToStep12Btn");
    if (finaleToStep12Btn) {
      finaleToStep12Btn.addEventListener("click", () => {
        SFX.success();
        triggerConfettiBlast(window.innerWidth / 2, window.innerHeight / 2, 40);
        navigateToStep(12);
      });
    }

    // Step 11 Legacy Buttons (if present)
    const launchFwBtn = document.getElementById("launchFinaleFwBtn");
    if (launchFwBtn) {
      launchFwBtn.addEventListener("click", () => {
        SFX.success();
        for (let i = 0; i < 6; i++) {
          setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.55);
            if (window.launchCustomFirework) window.launchCustomFirework(x, y);
          }, i * 160);
        }
      });
    }

    const sendWishBtn = document.getElementById("sendFinaleLoveBtn");
    if (sendWishBtn) {
      sendWishBtn.addEventListener("click", () => {
        SFX.click();
        triggerConfettiBlast(window.innerWidth / 2, window.innerHeight / 2, 50);
      });
    }

    const reliveBtn = document.getElementById("reliveJourneyBtn");
    if (reliveBtn) {
      reliveBtn.addEventListener("click", resetAndRestartStory);
    }

    // Step 12 Fireworks Celebration Button
    const step12FireworksBtn = document.getElementById("step12FireworksBtn");
    if (step12FireworksBtn) {
      step12FireworksBtn.addEventListener("click", () => {
        SFX.success();
        triggerConfettiBlast(window.innerWidth / 2, window.innerHeight * 0.35, 75);
        for (let i = 0; i < 8; i++) {
          setTimeout(() => {
            const x = Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1;
            const y = Math.random() * (window.innerHeight * 0.5) + window.innerHeight * 0.1;
            if (window.launchCustomFirework) {
              window.launchCustomFirework(x, y);
            }
          }, i * 200);
        }
      });
    }

    // Step 12 Restart Journey Button
    const step12RestartBtn = document.getElementById("step12RestartBtn");
    if (step12RestartBtn) {
      step12RestartBtn.addEventListener("click", resetAndRestartStory);
    }

    // Lightbox Controls
    const lbClose = document.getElementById("lightboxCloseBtn");
    const lbNext = document.getElementById("lightboxNextBtn");
    const lbPrev = document.getElementById("lightboxPrevBtn");
    const lbModal = document.getElementById("lightboxModal");

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbNext) lbNext.addEventListener("click", nextLightbox);
    if (lbPrev) lbPrev.addEventListener("click", prevLightbox);
    if (lbModal) {
      lbModal.addEventListener("click", (e) => {
        if (e.target === lbModal) closeLightbox();
      });
    }

    // Mobile swipe gesture on Lightbox
    let touchStartX = 0;
    if (lbModal) {
      lbModal.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      lbModal.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) nextLightbox();
        if (touchEndX > touchStartX + 50) prevLightbox();
      }, { passive: true });
    }

    // Easter Egg Listeners (Heart button & modal close)
    const easterEggTrigger = document.getElementById("easterEggHeartBtn");
    if (easterEggTrigger) {
      easterEggTrigger.addEventListener("click", onHeartIconTapped);
    }
    const closeEasterBtn = document.getElementById("closeEasterEggBtn");
    if (closeEasterBtn) {
      closeEasterBtn.addEventListener("click", closeEasterEgg);
    }

    // Tap Anywhere on Sky (Step 11 or Step 12) to Launch Custom Fireworks
    window.addEventListener("click", (e) => {
      if ((state.currentStep === 11 || state.currentStep === 12) &&
          !e.target.closest("button") &&
          !e.target.closest(".top-header") &&
          !e.target.closest(".step12-slide-card") &&
          !e.target.closest(".step12-wishes-card") &&
          !e.target.closest(".lightbox-modal")) {
        if (window.launchCustomFirework) {
          window.launchCustomFirework(e.clientX, e.clientY);
        }
      }
    });

  });

})();
