(function () {
  const page = document.body.dataset.page || "1";
  const total = 7;
  document.querySelectorAll("[data-name]").forEach(el => { el.textContent = princessContent.princessName; });
  document.querySelectorAll("[data-progress]").forEach(el => { el.style.width = `${(Number(page) / total) * 100}%`; });
  const label = document.querySelector("[data-progress-label]");
  if (label) label.textContent = `${page}/${total}`;
  const music = new Audio(princessContent.musicSource);
  music.loop = true; music.volume = 0.35;
  const musicButton = document.querySelector("[data-music]");
  let musicOn = localStorage.getItem("princessMusic") === "on";
  function updateMusic() { musicButton.textContent = musicOn ? "♫" : "🔇"; musicButton.setAttribute("aria-label", musicOn ? "Pause music" : "Play music"); }
  function toggleMusic() {
    musicOn = !musicOn;
    localStorage.setItem("princessMusic", musicOn ? "on" : "off");
    if (musicOn) music.play().catch(() => { musicOn = false; localStorage.setItem("princessMusic", "off"); });
    else music.pause();
    updateMusic();
  }
  window.princessMusicController = {
    pause: () => {
      music.pause();
      updateMusic();
    },
    resume: () => {
      if (musicOn) music.play().catch(() => {});
    }
  };
  if (musicButton) { updateMusic(); musicButton.addEventListener("click", toggleMusic); if (musicOn) document.addEventListener("click", () => music.play().catch(() => {}), { once: true }); }
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.textContent = i % 2 ? "✦" : "♥";
    s.style.left = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 8}s`;
    s.style.fontSize = `${.6 + Math.random() * .8}rem`;
    document.body.appendChild(s);
  }
  const routes = ["index.html", "welcome.html", "memories.html", "princess.html", "letter.html", "surprise.html", "video.html"];
  const footer = document.createElement("nav");
  footer.className = "footer-nav";
  if (Number(page) > 1) footer.innerHTML += `<a href="${routes[Number(page) - 2]}">← Previous chapter</a>`;
  if (Number(page) < total) footer.innerHTML += `<a href="${routes[Number(page)]}">Next chapter →</a>`;
  document.querySelector(".page")?.append(footer);

  window.typeText = function (element, text, done) {
    element.textContent = "";
    let index = 0;
    const step = () => {
      element.textContent += text[index++];
      if (index < text.length) window.setTimeout(step, 12);
      else if (done) done();
    };
    if (text) step(); else if (done) done();
  };
})();
