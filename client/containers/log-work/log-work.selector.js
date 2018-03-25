import { curry, map, assoc, objOf, values } from 'ramda';
import { select } from '@rematch/select';

const getHours = (timeInSeconds) => Math.round(timeInSeconds / 3600);
const getUserHours = (user, day) =>
  (day.spent || 0) +
  (user[day.date] ? getHours(user[day.date].timeSpentSeconds) : 0); // some dates may be missing

const getForAUser = (days, user) => {
  let total = 0;

  const filledDays = days.map(
    (day) => {
      const spent = user ? getUserHours(user, day) : 0;

      total += spent;
      return assoc('spent', spent, day); // still need to have spent property for each day
    },
  );

  return { total, days: filledDays };
};

const getGroupDailyWorklog = (days, users) => {
  const spends = values(users).reduce((result, days) => {
    Object.keys(days)
      .forEach((day) => {
        result[day] = (result[day] || 0) + getHours(days[day].timeSpentSeconds);
      });

    return result;
  }, {}); // { '2018-03-02': 10(h) }

  return days.map((day) => assoc('spent', spends[day] || 0, day));
};

const getDailyFromList = map(objOf('date'));

const getByDays = (daysList, usersMap, userNames) => {
  let groupTotal = 0;
  const users = userNames.map((name) => {
    const { total, days } = getForAUser(daysList, usersMap[name]);

    groupTotal += total;

    return {
      name, days, total,
    };
  });

  return {
    users, total: groupTotal,
  };
};

const getForAGroup = curry((daysList, usersMap, { name, users: userNames, toAdd, isOpen }) => {
  const dailyList = getDailyFromList(daysList);
  const { users, total } = getByDays(dailyList, usersMap, userNames);
  const days = getGroupDailyWorklog(dailyList, users);

  return {
    isOpen, toAdd, name,
    total, users, days,
  };
});

export const get = (state) => {
  const groups = select.groups.all(state);
  const days = select.calendar.days(state);
  const users = select.users.map(state);

  return map(getForAGroup(days, users), groups);
};
