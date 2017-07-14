const getSequence = (sequence, index, reverseIndex) => {
  return sequence && [
    'sequence',
    `child-sequence-${index}`,
    `child-sequence-reverse-${reverseIndex}`
  ];
};

export default getSequence;
