// sites/youtube.js
import { createOverlay } from "../common/overlay.js";

console.log("[TraceLeaf] 🧪 YouTube tracker actif");

let currentUrl = location.href;
let isPlaying = false;
let lastTick = Date.now();
let interval;
const resolutionDurations = {};
let overlay = null;

function estimateCO2Rate(res) {
  if (res.includes("2560") || res.includes("3840")) return 0.8;
  if (res.includes("1920") || res.includes("1080")) return 0.4;
  if (res.includes("1280") || res.includes("720")) return 0.2;
  if (res.includes("640") || res.includes("360")) return 0.1;
  if (res.includes("256") || res.includes("144")) return 0.05;
  return 0.1;
}

function getQuality() {
  const video = document.querySelector("video");
  return video ? `${video.videoWidth}x${video.videoHeight}` : "Inconnu";
}

function updateOverlay() {
  if (!overlay) return;

  const now = Date.now();
  const delta = Math.floor((now - lastTick) / 1000);
  lastTick = now;

  const quality = getQuality();
  if (isPlaying && quality !== "Inconnu") {
    resolutionDurations[quality] = (resolutionDurations[quality] || 0) + delta;
  }

  let totalCO2 = 0;
  for (const [res, seconds] of Object.entries(resolutionDurations)) {
    const rate = estimateCO2Rate(res) / 60;
    totalCO2 += seconds * rate;
  }

  overlay.innerText = `🌿 ${totalCO2.toFixed(3)} gCO₂ | ${quality} | ${isPlaying ? "▶️" : "⏸️"}`;
}

function setupVideoTracking() {
  const video = document.querySelector("video");
  if (!video || video.__traceleaf_initialized) return;

  console.log("[TraceLeaf] 🎬 Vidéo détectée");
  video.__traceleaf_initialized = true;
  overlay = createOverlay();

  isPlaying = !video.paused;
  video.addEventListener("play", () => {
    isPlaying = true;
    lastTick = Date.now();
    console.log("[TraceLeaf] ▶️ Lecture");
  });

  video.addEventListener("pause", () => {
    isPlaying = false;
    console.log("[TraceLeaf] ⏸️ Pause");
  });

  if (interval) clearInterval(interval);
  lastTick = Date.now();
  interval = setInterval(updateOverlay, 5000);
}

const detectUrlChange = () => {
  const newUrl = location.href;
  if (newUrl !== currentUrl) {
    console.log("[TraceLeaf] 🔁 URL changée → relance tracking");
    currentUrl = newUrl;
    setTimeout(setupVideoTracking, 1000);
  }
};

const mutationObserver = new MutationObserver(() => {
  setupVideoTracking();
  detectUrlChange();
});

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

setTimeout(setupVideoTracking, 1000);

window.addEventListener("beforeunload", () => {
  clearInterval(interval);
  let totalCO2 = 0;
  for (const [res, seconds] of Object.entries(resolutionDurations)) {
    const rate = estimateCO2Rate(res) / 60;
    const g = seconds * rate;
    totalCO2 += g;
    console.log(`📊 ${res} : ${Math.round(seconds / 60)} min ≈ ${g.toFixed(2)} gCO₂`);
  }
  console.log(`[TraceLeaf] 💡 Total session ≈ ${totalCO2.toFixed(2)} gCO₂`);
});
