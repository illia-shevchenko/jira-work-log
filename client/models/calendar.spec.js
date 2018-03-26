import { init, dispatch } from '@rematch/core';

let today;

const OldDate = Date;
global.Date = class extends Date {
  constructor(...args) {
    super();
    return args.length ? new OldDate(...args) : new OldDate(today);
  }
};

import { calendar } from './calendar';

describe('Model: calendar', () => {
  let store;
  const getModel = () => store.getState().calendar;

  afterAll(() => {
    global.Date = OldDate;
  });

  beforeEach(() => {
    today = '2018-03-11T18:00:00';
    store = init({ models: { calendar } });
    dispatch.calendar.setThisWeek();
  });

  it('should provide default state', () => {
    const model = getModel();

    expect(model).toMatchObject({
      dateFrom: '2018-03-05',
      dateTo: '2018-03-11',
    });
  });

  describe('build reducers:', () => {
    describe('setThisWeek', () => {
      it('should be able to set a week today is Sunday', () => {
        dispatch.calendar.setThisWeek();
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-03-05',
          dateTo: '2018-03-11',
        });
      });

      it('should be able to set a week today is Monday', () => {
        today = '2018-03-05T18:00:00';
        dispatch.calendar.setThisWeek();
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-03-05',
          dateTo: '2018-03-11',
        });
      });
    });

    describe('incrementWeek for sunday', () => {
      it('should be able to go to next week', () => {
        dispatch.calendar.incrementWeek(1);
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-03-12',
          dateTo: '2018-03-18',
        });
      });

      it('should be able to go to prev week', () => {
        dispatch.calendar.incrementWeek(-1);
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-02-26',
          dateTo: '2018-03-04',
        });
      });

      it('should be able to go to prev and then back to current week', () => {
        dispatch.calendar.incrementWeek(-1);
        dispatch.calendar.incrementWeek(1);
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-03-05',
          dateTo: '2018-03-11',
        });
      });
    });

    describe('incrementWeek for monday', () => {
      beforeEach(() => {
        today = '2018-03-05T18:00:00';
      });

      it('should be able to go to next week', () => {
        dispatch.calendar.incrementWeek(1);
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-03-12',
          dateTo: '2018-03-18',
        });
      });

      it('should be able to go to prev week', () => {
        dispatch.calendar.incrementWeek(-1);
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-02-26',
          dateTo: '2018-03-04',
        });
      });

      it('should be able to go to prev and then back to current week', () => {
        dispatch.calendar.incrementWeek(-1);
        dispatch.calendar.incrementWeek(1);
        const model = getModel();

        expect(model).toMatchObject({
          dateFrom: '2018-03-05',
          dateTo: '2018-03-11',
        });
      });
    });
  });
});
