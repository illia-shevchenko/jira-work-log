import { getHours, transformDate, getDates } from './dates.service';

describe('Service: Dates', () => {
  it('should be able to get hours of seconds', () => {
    expect(getHours(46800)).toBe(13);
  });

  it('should be able to transform dates to strings in format YYYY-MM-DD', () => {
    const date = new Date('12 Jan 2018');
    expect(transformDate(date)).toBe('2018-01-12');
  });

  describe('when get list of dates', () => {
    it('should be able to get list of dates', () => {
      const from = new Date('12 Jan 2018');
      const to = new Date('18 Jan 2018');
      const result = getDates(from, to);

      expect(result).toEqual([
        '2018-01-12',
        '2018-01-13',
        '2018-01-14',
        '2018-01-15',
        '2018-01-16',
        '2018-01-17',
        '2018-01-18',
      ]);
    });
  });
});
