export const els = {
  resultOverlay: document.querySelector('.result-overlay'),
  questPaths: document.querySelector('.quest-paths'),
  categoryLinks: document.querySelectorAll('.paths ul li a'),
  blurOverlay: document.querySelector('.blur-overlay'),
};

export const overlays = {
  Science: {
    quiz: document.querySelector('.science-overlay'),
    result: document.querySelector('.science-result-overlay'),
    qTitle: '.science-title p',
    qText: '.science-question p',
    answers: '.science-answers button'
  },
  Technology: {
    quiz: document.querySelector('.tech-overlay'),
    result: document.querySelector('.tech-result-overlay'),
    qTitle: '.tech-title p',
    qText: '.tech-question p',
    answers: '.tech-answers button'
  },
  History: {
    quiz: document.querySelector('.history-overlay'),
    result: document.querySelector('.history-result-overlay'),
    qText: '.history-question p',
    answers: '.history-answers button'
  },
  Mathematics: {
    quiz: document.querySelector('.math-overlay'),
    result: document.querySelector('.math-result-overlay'),
    qText: '.math-question p',
    answers: '.math-answers button'
  }
};

export function hideAllOverlays() {
  Object.values(overlays).forEach(({ quiz, result }) => {
    quiz?.classList.remove('active');
    result?.classList.remove('active');
  });
  const resultOverlay = document.querySelector('.result-overlay');
  if (resultOverlay?.classList.contains('active')) resultOverlay.classList.remove('active');
  document.querySelector('.about-overlay')?.classList.remove('active');
  els.blurOverlay?.classList.remove('active');
}

export function getCategoryFromLabel(anchorEl) {
  const span = anchorEl.querySelector('span[class$="-label"]');
  return span?.textContent;
}