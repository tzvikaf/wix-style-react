const getSequence = (sequence, index, reverseIndex) => {
  return sequence && [
    'child-sequence',
    `child-sequence-${index}`,
    `child-sequence-reverse-${reverseIndex}`
  ];
};

export default getSequence;
