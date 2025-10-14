export function createQuizState() {
  return {
    currentQuestion: {
      Science: 0,
      Technology: 0,
      History: 0,
      Mathematics: 0
    },
    score: {
      Science: 0,
      Technology: 0,
      History: 0,
      Mathematics: 0
    },
    completed: {
      science: false,
      tech: false,
      history: false,
      math: false
    }
  };
}

export function resetCategory(state, category) {
  state.currentQuestion[category] = 0;
  state.score[category] = 0;
  state.completed[category.toLowerCase()] = false;
}