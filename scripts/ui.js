// scripts/ui.js
import { getRandomJokes } from './api.js';

const btnRandom = document.getElementById('btn-random');
const randomContent = document.getElementById('random-joke-content');
const btnMultiple = document.getElementById('btn-multiple');
const countInput = document.getElementById('count');
const jokesList = document.getElementById('jokes-list');

function renderJokeText(container, jokeObj) {
  container.textContent = jokeObj.joke ?? JSON.stringify(jokeObj);
}

function renderJokesList(listEl, jokes) {
  listEl.innerHTML = '';
  jokes.forEach((j, i) => {
    const li = document.createElement('li');
    li.className = 'p-3 border rounded bg-slate-50';
    li.textContent = j.joke ?? JSON.stringify(j);
    listEl.appendChild(li);
  });
}

btnRandom.addEventListener('click', async () => {
  btnRandom.disabled = true;
  btnRandom.textContent = 'Loading...';
  try {
    const [j] = await getRandomJokes(1);
    renderJokeText(randomContent, j);
  } catch (e) {
    randomContent.textContent = 'Failed to fetch joke. Try again later.';
  } finally {
    btnRandom.disabled = false;
    btnRandom.textContent = 'Get Random';
  }
});

btnMultiple.addEventListener('click', async () => {
  const count = Math.max(1, Math.min(10, Number(countInput.value) || 3));
  btnMultiple.disabled = true;
  btnMultiple.textContent = 'Loading...';
  try {
    const jokes = await getRandomJokes(count);
    renderJokesList(jokesList, jokes);
  } catch (e) {
    jokesList.innerHTML = '<li class="text-red-600">Failed to fetch jokes.</li>';
  } finally {
    btnMultiple.disabled = false;
    btnMultiple.textContent = 'Fetch';
  }
});

// Optionally fetch initial content
btnRandom.click();
btnMultiple.click();
