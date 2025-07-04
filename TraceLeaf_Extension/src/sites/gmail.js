// sites/gmail.js
import { createOverlay } from '../common/overlay';

console.log("[TraceLeaf] 📬 Gmail tracker actif");

function estimateEmailCO2(hasAttachment) {
  if (hasAttachment) return 50;
  return 4; // estimation pour un mail standard
}

function parseInbox() {
  const mails = [...document.querySelectorAll("tr.zA")].slice(0,100); // Gmail rows
  let count = 0;
  let totalCO2 = 0;
  for (const mailRow of mails) {
    const hasAttach = mailRow.querySelector("img[alt='Pièce jointe']") ||
                      mailRow.querySelector("span.aQ"); // étiquette 'PJ'
    count++;
    totalCO2 += estimateEmailCO2(!!hasAttach);
  }
  return { count, totalCO2 };
}

function refreshOverlay() {
  const { count, totalCO2 } = parseInbox();
  overlay.innerText = `✉️ ${count} mails ≈ ${totalCO2.toFixed(1)} gCO₂`;
}

const overlay = createOverlay();
overlay.innerText = "📬 Analyse de l’inbox en cours…";
let observer = new MutationObserver(refreshOverlay);
observer.observe(document.body, { subtree: true, childList: true });
setTimeout(refreshOverlay, 2000);

window.addEventListener("beforeunload", () => {
  const { count, totalCO2 } = parseInbox();
  console.log(`[TraceLeaf] Gmail : ${count} mails ≈ ${totalCO2.toFixed(1)} gCO₂`);
  sendSessionData(getDomain(), { gmail: totalCO2 });
});
