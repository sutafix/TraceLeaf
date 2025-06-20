// common/api.js

const API_ENDPOINT = "https://rave-gou@iiens.net/api/session"; // adapte à ton domaine

export async function sendSessionData(site, resolutionDurations, timestamp = Date.now()) {
  const payload = {
    site,
    timestamp,
    session: Object.entries(resolutionDurations).map(([res, duration]) => ({
      resolution: res,
      duration_seconds: duration
    }))
  };

  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
    console.log("[TraceLeaf] ✅ Session envoyée avec succès");
  } catch (err) {
    console.error("[TraceLeaf] ❌ Échec de l’envoi :", err);
  }
}
