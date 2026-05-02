import { overlays, els, hideAllOverlays } from './dom.js';
import { quizData } from '../data/quizData.js';

export function loadQuestion(state, category, onAnswer) {
  const cfg = overlays[category];
  const idx = state.currentQuestion[category];
  const data = quizData[category][idx];

  if (cfg.qTitle) cfg.quiz.querySelector(cfg.qTitle).textContent = `Q${idx + 1}`;
  cfg.quiz.querySelector(cfg.qText).textContent = data.question;

  const buttons = cfg.quiz.querySelectorAll(cfg.answers);
  data.options.forEach((option, i) => {
    const btn = buttons[i];
    const span = btn.querySelector('span');
    if (span) span.textContent = option; else btn.textContent = option;

    const newBtn = btn.cloneNode(true);
    // Remove any inline onclick attributes to avoid double-invocation
    newBtn.removeAttribute('onclick');
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener('click', () => onAnswer(category, option, newBtn));
  });
  // Ensure blur is visible when a quiz overlay is active
  els.blurOverlay?.classList.add('active');
}

export function showResult(state, category) {
  hideAllOverlays();

  const cfg = overlays[category];
  const score = state.score[category];
  const total = quizData[category].length;
  const wrong = total - score;

  switch (category) {
    case 'Science':
      cfg.result.querySelector('.inner-circle span').textContent = `${score}/${total}`;
      cfg.result.querySelector('.correct span').textContent = score;
      cfg.result.querySelector('.wrong span').textContent = wrong;
      state.completed.Science = true;
      break;
    case 'Technology':
      cfg.result.querySelector('.correct .result').textContent = score;
      cfg.result.querySelector('.wrong .result').textContent = wrong;
      state.completed.Technology = true;
      break;
    case 'History':
      cfg.result.querySelector('.correct .result').textContent = score;
      cfg.result.querySelector('.wrong .result').textContent = wrong;
      state.completed.History = true;
      break;
    case 'Mathematics':
      cfg.result.querySelector('.correct').textContent = score;
      cfg.result.querySelector('.wrong').textContent = wrong;
      state.completed.Mathematics = true;
      break;
  }

  cfg.result.classList.add('active');
  // Keep blur while result is shown
  els.blurOverlay?.classList.add('active');
  updatePathBanners(state);
  updateTotalResults(state);

  if (checkAllCompleted(state)) {
    els.resultOverlay.classList.add('active');
    els.resultOverlay.scrollIntoView({ behavior: 'smooth' });
  }
}

export function updatePathBanners(state) {
  document.querySelectorAll('.paths li').forEach(li => {
    const label = li.querySelector('span');
    const a = li.querySelector('a');
    if (!label || !a) return;
    const key = label.textContent;
    if (state.completed[key]) {
      label.classList.add('completed-category');
      a.classList.add('done');
    } else {
      label.classList.remove('completed-category');
      a.classList.remove('done');
    }
  });
}

export function updateTotalResults(state) {
  const scores = state.score;
  const res = els.resultOverlay.querySelectorAll('.result-each p');
  res[1].textContent = scores['Science'];
  res[3].textContent = scores['Technology'];
  res[5].textContent = scores['History'];
  res[7].textContent = scores['Mathematics'];
  const total = scores['Science'] + scores['Technology'] + scores['History'] + scores['Mathematics'];
  els.resultOverlay.querySelector('.result-total p:last-child').textContent = total;
}

export function checkAllCompleted(state) {
  const c = state.completed;
  return c.Science && c.Technology && c.History && c.Mathematics;
}

export function showCategoryOverlay(category) {
  const cfg = overlays[category];
  cfg.quiz.classList.add('active');
  cfg.quiz.scrollIntoView({ behavior: 'smooth' });
  // Activate blur on open
  els.blurOverlay?.classList.add('active');
}