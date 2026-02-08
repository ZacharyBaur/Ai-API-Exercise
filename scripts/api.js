// scripts/api.js
const BASE = 'https://yomomma-api.herokuapp.com'; // verify this host if you see network errors

export async function getRandomJokes(count = 1) {
  const url = `${BASE}/jokes/random${count ? '?count=' + encodeURIComponent(count) : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}
