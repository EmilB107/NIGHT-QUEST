import { overlays } from '../ui/dom.js';
import { loadQuestion, showResult } from '../ui/view.js';
import { quizData } from '../data/quizData.js';

export function handleAnswer(state, category, selectedAnswer, clickedButton) {
  const idx = state.currentQuestion[category];
  const correct = quizData[category][idx].answer;

  const buttons = clickedButton.parentElement.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);

  const categoryClass = `${category.toLowerCase()}-answers`;
  if (selectedAnswer === correct) {
    state.score[category]++;
    clickedButton.classList.add('correct', categoryClass);
  } else {
    clickedButton.classList.add('wrong', categoryClass);
    buttons.forEach(b => {
      if (b.textContent === correct) b.classList.add('correct', categoryClass);
    });
  }

  setTimeout(() => {
    state.currentQuestion[category]++;
    if (state.currentQuestion[category] < quizData[category].length) {
      buttons.forEach(b => {
        b.disabled = false;
        b.classList.remove('correct', 'wrong', categoryClass);
      });
      loadQuestion(state, category, (cat, ans, btn) => handleAnswer(state, cat, ans, btn));
    } else {
      showResult(state, category);
    }
  }, 1500);
}
