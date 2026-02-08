// scripts/api.js
const BASE = 'https://yomomma-api.herokuapp.com';

export async function getRandomJokes(count = 1) {
  const url = `${BASE}/jokes/random${count ? '?count=' + encodeURIComponent(count) : ''}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    // API returns either an object or array depending on count
    return Array.isArray(data) ? data : [data];
  } catch (err) {
    // Basic retry/backoff for transient errors
    console.error('getRandomJokes error', err);
    throw err;
  }
}
