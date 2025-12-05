const STREAM_URL = "https://radio.theatrico.org/stream";

const audioEl = document.querySelector("[data-audio]");
const playButton = document.querySelector("[data-play]");
const statusEl = document.querySelector("[data-status]");
const streamUrlEl = document.querySelector("[data-stream-url]");
const copyButton = document.querySelector("[data-copy]");
const copyHintEl = copyButton?.querySelector(".copy-hint");
const antennaStack = document.querySelector(".antenna-stack");

const setStatus = (text, state = "idle") => {
  const label = text.toUpperCase();
  statusEl.textContent = label;
  statusEl.dataset.state = state;
};

const updatePlayUI = (isPlaying) => {
  const icon = playButton.querySelector(".icon");
  icon.className = `icon ${isPlaying ? "icon-pause" : "icon-play"}`;
  playButton.setAttribute("aria-pressed", String(isPlaying));
  antennaStack?.classList.toggle("is-playing", isPlaying);
};

const applyStreamUrl = () => {
  audioEl.src = STREAM_URL;
  if (streamUrlEl) streamUrlEl.textContent = STREAM_URL;
  if (copyHintEl) {
    try {
      const { host } = new URL(STREAM_URL);
      copyHintEl.textContent = host;
    } catch {
      copyHintEl.textContent = "copy";
    }
  }
};

applyStreamUrl();

const playStream = async () => {
  if (!audioEl.src) applyStreamUrl();
  setStatus("Buffering", "loading");
  updatePlayUI(true);
  try {
    await audioEl.play();
    setStatus("Live", "playing");
  } catch (err) {
    console.error("[stream] play failed", err);
    setStatus("Error", "error");
    updatePlayUI(false);
  }
};

playButton?.addEventListener("click", () => {
  if (audioEl.paused) {
    playStream();
  } else {
    audioEl.pause();
    setStatus("Paused", "idle");
    updatePlayUI(false);
  }
});

// Mute toggle
if (muteButton) {
  muteButton.addEventListener("click", () => {
    const isMuted = audioEl.muted;
    audioEl.muted = !isMuted;
    muteButton.setAttribute("aria-pressed", String(!isMuted));
  });
}

// Volume control
if (volumeEl) {
  volumeEl.addEventListener("input", (event) => {
    const vol = Number(event.target.value) / 100;
    audioEl.volume = vol;
  });
}




copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(STREAM_URL);
    if (copyHintEl) {
      const original = copyHintEl.textContent;
      copyHintEl.textContent = "copied";
      setTimeout(() => {
        copyHintEl.textContent = original || "copy";
      }, 1200);
    }
  } catch (err) {
    console.error("[stream] copy failed", err);
  }
});

audioEl.addEventListener("playing", () => {
  setStatus("Live", "playing");
  updatePlayUI(true);
});

audioEl.addEventListener("pause", () => {
  setStatus("Paused", "idle");
  updatePlayUI(false);
});

audioEl.addEventListener("waiting", () => setStatus("Buffering", "loading"));
audioEl.addEventListener("stalled", () => setStatus("Reconnecting", "loading"));
audioEl.addEventListener("ended", () => {
  setStatus("Idle", "idle");

// Initialize volume to slider value
if (volumeEl) {
  const vol = Number(volumeEl.value) || 70;
  audioEl.volume = vol / 100;
}
  updatePlayUI(false);
});

audioEl.addEventListener("error", () => {
  setStatus("Unavailable", "error");
  updatePlayUI(false);
});

setStatus("Idle", "idle");

// Initialize volume to slider value
if (volumeEl) {
  const vol = Number(volumeEl.value) || 70;
  audioEl.volume = vol / 100;
}
