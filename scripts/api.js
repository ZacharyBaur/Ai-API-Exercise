// scripts/api.js
const BASE = '/.netlify/functions/jokes-proxy';

export async function getRandomJokes(count = 1) {
  const url = `${BASE}${count ? '?count=' + encodeURIComponent(count) : ''}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}
