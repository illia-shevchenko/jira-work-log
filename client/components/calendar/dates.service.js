const getIsonWithoutTimeZone = (date) => {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  return (new Date(date.valueOf() - offset)).toISOString().slice(0, -1);
};

export const transformDate = (date) => getIsonWithoutTimeZone(date).slice(0, 10);

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
