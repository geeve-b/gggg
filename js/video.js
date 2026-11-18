document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector("video"), end = document.querySelector("[data-video-end]"), replay = document.querySelector("[data-replay]");
  const source = video.querySelector("source");
  const music = window.princessMusicController;
  const pauseBackgroundMusic = () => {
    if (music) music.pause();
  };
  const resumeBackgroundMusic = () => {
    if (music) music.resume();
  };
  video.addEventListener("play", pauseBackgroundMusic);
  video.addEventListener("playing", pauseBackgroundMusic);
  video.addEventListener("pause", () => {
    if (!video.ended) resumeBackgroundMusic();
  });
  video.addEventListener("ended", () => {
    resumeBackgroundMusic();
    end.classList.remove("hidden");
    end.classList.add("reveal");
  });
  video.addEventListener("error", () => {
    const notice = document.createElement("p");
    notice.className = "media-notice";
    notice.textContent = `Add your video at ${source.getAttribute("src")} to enable the grand finale.`;
    video.replaceWith(notice);
  }, { once: true });
  video.addEventListener("ended", () => { end.classList.remove("hidden"); end.classList.add("reveal"); });
  replay.addEventListener("click", () => { video.currentTime = 0; end.classList.add("hidden"); video.play().catch(() => {}); });
});
