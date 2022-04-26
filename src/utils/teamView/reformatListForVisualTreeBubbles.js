const reformatListForVisualTreeBubbles = (array) => {
  let finalList = [];
  if (array.length === 1) {
    finalList = [[], array[0]];
    return finalList;
  }
  // don't splice if there are less that 4 items cuz it will look weird in the visual tree bubbles
  // since the popped item appears in the middle of the circular container
  // also don't splice if there are more than 11 items since we won't show those in a circle with one in the middle.
  // more than 11 items will be shown in a grid
  if (array.length < 4 || array.length > 11) {
    finalList = [array, null];
    return finalList;
  }
  const popped = array.pop();
  finalList = [array, popped];
  return finalList;
};

export default reformatListForVisualTreeBubbles;
