    // common/overlay.js
export function createOverlay() {
  if (document.getElementById("traceleaf-co2-wrapper")) {
    return document.getElementById("traceleaf-co2");
  }

  const wrapper = document.createElement("div");
  wrapper.id = "traceleaf-co2-wrapper";
  wrapper.style.position = "fixed";
  wrapper.style.bottom = "10px";
  wrapper.style.right = "10px";
  wrapper.style.zIndex = 9999;
  wrapper.style.pointerEvents = "none"; // clique à travers

  const overlay = document.createElement("div");
  overlay.id = "traceleaf-co2";
  overlay.style.background = "rgba(0, 128, 0, 0.9)";
  overlay.style.color = "white";
  overlay.style.padding = "10px 14px";
  overlay.style.borderRadius = "12px";
  overlay.style.fontSize = "14px";
  overlay.style.fontFamily = "Arial, sans-serif";
  overlay.style.transition = "opacity 0.3s ease";
  overlay.style.opacity = "8";
  overlay.style.pointerEvents = "auto";

  overlay.addEventListener("mouseenter", () => {
    overlay.style.opacity = "0.3";
    overlay.style.pointerEvents = "none";
  });

  overlay.addEventListener("mouseleave", () => {
    overlay.style.opacity = "8";
    overlay.style.pointerEvents = "auto";
  });

  wrapper.appendChild(overlay);
  document.body.appendChild(wrapper);

  return overlay;
}
