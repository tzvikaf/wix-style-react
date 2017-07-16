let state = '';

const animationPhase = {
  set: newState => {
    state = newState;
  },
  get: () => {
    return state;
  }
};

export default animationPhase;
