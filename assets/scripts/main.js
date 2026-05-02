import { quizData } from './data/quizData.js';
import { createQuizState, resetCategory } from './state/quizState.js';
import { els, overlays, hideAllOverlays, getCategoryFromLabel } from './ui/dom.js';
import { loadQuestion, showCategoryOverlay } from './ui/view.js';
import { handleAnswer as handleAnswerCore } from './logic/handlers.js';

const state = createQuizState();

function onAnswer(category, selectedAnswer, clickedButton) {
  handleAnswerCore(state, category, selectedAnswer, clickedButton);
}

// Wire category link clicks
els.categoryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllOverlays();
    const category = getCategoryFromLabel(link);
    if (!category) return;
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.querySelector('a#quest-paths')?.classList.add('active');
    loadQuestion(state, category, onAnswer);
    showCategoryOverlay(category);
  });
});

// Close and blur overlay clicks
document.querySelector('.result-overlay button')?.addEventListener('click', hideAllOverlays);
document.addEventListener('click', (e) => {
  if (e.target.classList?.contains('blur-overlay')) hideAllOverlays();
});

// Choose path buttons
document.querySelectorAll('.choose').forEach(btn => {
  btn.addEventListener('click', () => {
    hideAllOverlays();
    els.questPaths?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Retake per category
document.querySelectorAll('.retake').forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');
    resetCategory(state, category);
    hideAllOverlays();
    // Clean up any lingering classes/disabled states on buttons in this overlay
    const cfg = overlays[category];
    const allBtns = cfg.quiz.querySelectorAll('button');
    allBtns.forEach(b => {
      b.disabled = false;
      b.classList.remove('correct', 'wrong', `${category.toLowerCase()}-answers`);
    });
    loadQuestion(state, category, onAnswer);
    cfg.quiz.classList.add('active');
    cfg.quiz.scrollIntoView({ behavior: 'smooth' });
  });
});

// View score
document.querySelector('.view-score')?.addEventListener('click', () => {
  hideAllOverlays();
  const resultOverlay = document.querySelector('.result-overlay');
  resultOverlay.classList.add('active');
  resultOverlay.scrollIntoView({ behavior: 'smooth' });
  // Show blur when viewing score
  els.blurOverlay?.classList.add('active');
});

// Exit
document.querySelector('.end-options button:nth-child(2)')?.addEventListener('click', () => location.reload());

// Initial
hideAllOverlays();