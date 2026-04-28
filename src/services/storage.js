export function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}
export function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
