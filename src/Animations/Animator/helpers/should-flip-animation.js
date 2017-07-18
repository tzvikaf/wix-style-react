const shouldFlipAnimation = (sequence, phase) => {
  let isFlip = !!sequence;
  if (phase === 'enter') {
    if ((sequence === 'default') || (sequence === 'flip')) {
      isFlip = false;
    }
  } else if (phase === 'exit') {
    if ((sequence === 'default') || (sequence === 'reverse-flip')) {
      isFlip = false;
    }
  }
  return isFlip;
};

export default shouldFlipAnimation;
