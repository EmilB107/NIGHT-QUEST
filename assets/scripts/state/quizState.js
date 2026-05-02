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
      Science: false,
      Technology: false,
      History: false,
      Mathematics: false
    }
  };
}

export function resetCategory(state, category) {
  state.currentQuestion[category] = 0;
  state.score[category] = 0;
  state.completed[category] = false;
}