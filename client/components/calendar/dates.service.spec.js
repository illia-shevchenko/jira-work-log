import { getHours, getDates, getIncrementedRange, getRange, types } from './dates.service';

let today;

const OldDate = Date;
global.Date = class extends Date {
  constructor(...args) {
    super();
    return args.length ? new OldDate(...args) : new OldDate(today);
  }
};

describe('Service: Dates', () => {
  beforeEach(() => {
    today = '2018-03-04T18:00:00';
  });

  afterAll(() => {
    global.Date = OldDate;
  });

  describe('transforming seconds', () => {
    it('should be able to return hours', () => {
      expect(getHours(46800)).toBe(13);
    });
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

  describe('when get week range', () => {
    it('should be able to get for Sunday', () => {
      const result = getRange(types.WEEK);

      expect(result).toMatchObject({
        dateFrom: '2018-02-26',
        dateTo: '2018-03-04',
      });
    });

    it('should be able to get for Monday', () => {
      today = '2018-03-05T18:00:00';
      const result = getRange(types.WEEK);

      expect(result).toMatchObject({
        dateFrom: '2018-03-05',
        dateTo: '2018-03-11',
      });
    });
  });

  describe('when get month range', () => {
    it('should be able to get for March', () => {
      const result = getRange(types.MONTH);

      expect(result).toMatchObject({
        dateFrom: '2018-03-01',
        dateTo: '2018-03-31',
      });
    });

    it('should be able to get for February', () => {
      today = '2018-02-05T18:00:00';
      const result = getRange(types.MONTH);

      expect(result).toMatchObject({
        dateFrom: '2018-02-01',
        dateTo: '2018-02-28',
      });
    });
  });

  describe('when increment a week', () => {
    describe('for sunday', () => {
      it('should be able to go to next', () => {
        const result = getIncrementedRange({ date: today, type: types.WEEK, delta: 1 });

        expect(result).toMatchObject({
          dateFrom: '2018-03-05',
          dateTo: '2018-03-11',
        });
      });

      it('should be able to go to previous', () => {
        const result = getIncrementedRange({ date: today, type: types.WEEK, delta: -1 });

        expect(result).toMatchObject({
          dateFrom: '2018-02-19',
          dateTo: '2018-02-25',
        });
      });
    });

    describe('for monday', () => {
      const date = '2018-03-05';

      it('should be able to go to next', () => {
        const result = getIncrementedRange({ date, type: types.WEEK, delta: 1 });

        expect(result).toMatchObject({
          dateFrom: '2018-03-12',
          dateTo: '2018-03-18',
        });
      });

      it('should be able to go to previous', () => {
        const result = getIncrementedRange({ date, type: types.WEEK, delta: -1 });

        expect(result).toMatchObject({
          dateFrom: '2018-02-26',
          dateTo: '2018-03-04',
        });
      });
    });
  });

  describe('when increment a month', () => {
    it('should be able to go to next', () => {
      const result = getIncrementedRange({ date: '2018-02-01', type: types.MONTH, delta: 1 });
      expect(result).toMatchObject({
        dateFrom: '2018-03-01',
        dateTo: '2018-03-31',
      });
    });

    it('should be able to go to previous', () => {
      const result = getIncrementedRange({ date: '2018-03-02', type: types.MONTH, delta: -1 });
      expect(result).toMatchObject({
        dateFrom: '2018-02-01',
        dateTo: '2018-02-28',
      });
    });
  });
});
