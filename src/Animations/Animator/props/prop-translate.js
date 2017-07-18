const getTranslateClass = translate => {

  if (!translate) {
    return;
  }

  const {
    to: direction,
    size: {
      in: inSizeInPercentage,
      out: outSizeInPercentage
    }
  } = translate;

  return [
    'translate',
    `translate-${direction}`,
    `translate-${inSizeInPercentage}`
  ].concat(
    outSizeInPercentage !== inSizeInPercentage ? `translate-out-${outSizeInPercentage}` : []
  );
};

export default getTranslateClass;
