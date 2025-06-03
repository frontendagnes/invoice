export const dateFormated = (date) => {
  const newDate = new Date(date).toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return newDate;
};

export const getCorrectionWorth = (correctedItems) => {
  if (!correctedItems || !Array.isArray(correctedItems)) return 0;
  return correctedItems.reduce((sum, currentItem) => {
    return sum + (Number(currentItem.worthDifference) || 0);
  }, 0);
};
