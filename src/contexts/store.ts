export function set(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function get(key: string) {
  const value = localStorage.getItem(key);
  return value;
}

export function clear() {
  localStorage.clear();
}

export function clearOne(name: string) {
  localStorage.removeItem(name);
}
