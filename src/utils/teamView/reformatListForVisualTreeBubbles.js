const reformatListForVisualTreeBubbles = (array) => {
  let finalList = [];
  if (array.length === 1) {
    finalList = [[], array[0]];
    return finalList;
  }
  // don't splice if there are less that 4 items cuz it will look weird in the visual tree bubbles
  // since the popped item appears in the middle of the circular container
  if (array.length < 4) {
    finalList = [array, null];
    return finalList;
  }
  const popped = array.pop();
  finalList = [array, popped];
  return finalList;
};

export default reformatListForVisualTreeBubbles;
