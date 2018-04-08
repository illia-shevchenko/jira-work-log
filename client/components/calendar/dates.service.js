const getIsonWithoutTimeZone = (date) => {
  const offset = (new Date()).getTimezoneOffset() * 60000;
  return (new Date(date.valueOf() - offset)).toISOString().slice(0, -1);
};

const transformDate = (date) => getIsonWithoutTimeZone(date).slice(0, 10);

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

const throwWrongType = () => {
  throw Error('Wrong calendar type');
};

const transformDates = (dateFrom, dateTo) =>
  ({ dateFrom: transformDate(dateFrom), dateTo: transformDate(dateTo) });

export const types = {
  WEEK: 'week',
  MONTH: 'month',
};

const ONE_HOUR_AM = [1, 0, 0]; // HH, MM, SS

const rangeGetters = {
  [types.WEEK]: (base) => {
    const baseDate = base || new Date(); // to generate each time new actual date
    const dayOfWeek = baseDate.getDay() || 7;

    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() + 1 - dayOfWeek);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    return transformDates(monday, sunday);
  },
  [types.MONTH]: (base) => {
    const baseDate = base || new Date();
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    const firstDay = new Date(year, month, 1, ...ONE_HOUR_AM);
    const lastDay = new Date(year, month + 1, 0, ...ONE_HOUR_AM);

    return transformDates(firstDay, lastDay);
  },
};

const getRangeFromBaseDate = (type, date) => (rangeGetters[type] ? rangeGetters[type](date) : throwWrongType());
export const getRange = (type) => getRangeFromBaseDate(type);

const incrementers = {
  [types.WEEK]: (date, delta) => {
    date.setDate(date.getDate() + delta * 7);
  },

  [types.MONTH]: (date, delta) => {
    date.setMonth(date.getMonth() + delta);
  },
};

export const getIncrementedRange = ({ date: oldDate, type, delta }) => {
  const increment = incrementers[type];

  if (!increment) {
    throwWrongType();
  }
  const date = new Date(oldDate);
  increment(date, delta);

  return getRangeFromBaseDate(type, date);
};
