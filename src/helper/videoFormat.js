export const videoFormat = (data) => {
  const filterData = data.filter((item) => {
    if (
      !["", null, undefined].includes(item.qualityLabel) &&
      item.container === "mp4"
    ) {
      return item;
    }
  });
  const result = filterData.map((item, i) => {
    return { value: i, label: item.qualityLabel };
  });
  return result;
};
