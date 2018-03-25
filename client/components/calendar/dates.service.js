export const transformDate = (date) => date.toISOString().slice(0, 10);
export const getHours = (timeInSeconds) => Math.round(timeInSeconds / 3600);

export const getDates = (dateFrom, dateTo) => {
  const date = new Date(dateFrom);
  const result = [];

  while (date <= dateTo) {
    result.push(transformDate(date));
    date.setDate(date.getDate() + 1);
  }

  return result;
};
