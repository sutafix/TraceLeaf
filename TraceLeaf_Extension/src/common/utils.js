// common/utils.js
export function secondsToTimeString(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function getDomain() {
  return window.location.hostname.replace("www.", "");
}
