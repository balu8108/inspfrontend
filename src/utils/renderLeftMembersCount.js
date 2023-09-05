const renderLeftMembersCount = (num, offset) => {
  const floorVal = Math.floor((num - offset) / 10);
  if (floorVal < 1) {
    return num - offset;
  } else {
    return floorVal * 10;
  }
};
export default renderLeftMembersCount;
