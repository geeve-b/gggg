document.addEventListener("DOMContentLoaded", () => {
  const gift = document.querySelector("[data-gift]");
  const open = document.querySelector("[data-open]");
  const message = document.querySelector("[data-message]");
  if (!gift || !open || !message) return;

  open.addEventListener("click", () => {
    gift.classList.add("gift-open");
    for (let i = 0; i < 28; i++) {
      const particle = document.createElement("span");
      particle.className = "confetti";
      particle.textContent = i % 2 ? "✦" : "♥";
      particle.style.setProperty("--x", `${(Math.random() - 0.5) * 80}vw`);
      particle.style.setProperty("--delay", `${Math.random() * 0.35}s`);
      document.body.append(particle);
      window.setTimeout(() => particle.remove(), 2200);
    }
    window.setTimeout(() => {
      message.querySelector("[data-last]").classList.remove("hidden");
      message.querySelector("[data-video]").classList.remove("hidden");
    }, 3000);
  }, { once: true });
});
