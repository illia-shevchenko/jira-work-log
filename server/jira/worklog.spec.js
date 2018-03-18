jest.mock('./issue', () => ({
  getLink: (key) => key,
}));

const worklogService = require('./worklog');

describe('Jira worklog service', () => {
  describe('getting params for request', () => {
    let result;

    beforeEach(() => {
      result = worklogService.getRequestParams({
        usernames: ['Bob', 'Jim'],
        dateFrom: new Date('2017 January 9 GMT00'),
        dateTo: new Date('2017 January 16 GMT00'),
      });
    });

    it('should set minimum date', () => {
      expect(result.jql).toEqual(expect.stringContaining('worklogDate >= 2017-01-09'));
    });

    it('should set maximum date', () => {
      expect(result.jql).toEqual(expect.stringContaining('worklogDate <= 2017-01-16'));
    });

    it('should set users', () => {
      expect(result.jql).toEqual(expect.stringContaining('worklogAuthor in ("Bob", "Jim")'));
    });

    it('should set fields', () => {
      expect(result.fields).toEqual(expect.any(Array));
    });
  });

  describe('transforming th result', () => {
    let result;

    beforeEach(() => {
      result = worklogService.fromSearchResult([{
        key: 'FOO-1',
        fields: {
          summary: 'Task 1',
          worklog: {
            worklogs: [{
              author: { name: 'Bob' },
              started: '2017-01-31T05:25:00.000-0700',
              timeSpentSeconds: 11,
            }, {
              author: { name: 'Jim' },
              started: '2017-01-31T05:25:00.000-0700',
              timeSpentSeconds: 12,
            }, {
              author: { name: 'Alice' },
              started: '2017-01-31T05:25:00.000-0700',
              timeSpentSeconds: 13,
            }],
          },
        },
      }, {
        key: 'FOO-2',
        fields: {
          summary: 'Task 2',
          worklog: {
            worklogs: [{
              author: { name: 'Bob' },
              started: '2017-02-01T05:25:00.000-0700',
              timeSpentSeconds: 100,
            }, {
              author: { name: 'Bob' },
              started: '2017-02-01T05:25:00.000-0700',
              timeSpentSeconds: 200,
            }, {
              author: { name: 'Jim' },
              started: '2017-01-29T05:25:00.000-0700',
              timeSpentSeconds: 110,
            }, {
              author: { name: 'Jim' },
              started: '2017-01-31T05:25:00.000-0700',
              timeSpentSeconds: 120,
            }],
          },
        },
      }], {
        usernames: ['Bob', 'Jim'],
        dateFrom: new Date('2017 January 30 GMT00'),
        dateTo: new Date('2017 February 02 GMT00'),
      });
    });

    it('should provide list of days', () => {
      expect(result.days).toEqual([
        '2017-01-30',
        '2017-01-31',
        '2017-02-01',
        '2017-02-02',
      ]);
    });

    it('should provide proper list of users', () => {
      expect(result.users).toEqual([{
        username: 'Bob',
        days: {
          '2017-01-31': {
            timeSpentSeconds: 11,
            issues: [{
              link: 'FOO-1',
              key: 'FOO-1',
              summary: 'Task 1',
              timeSpentSeconds: 11,
            }],
          },
          '2017-02-01': {
            timeSpentSeconds: 300,
            issues: [{
              link: 'FOO-2',
              key: 'FOO-2',
              summary: 'Task 2',
              timeSpentSeconds: 100,
            }, {
              link: 'FOO-2',
              key: 'FOO-2',
              summary: 'Task 2',
              timeSpentSeconds: 200,
            }],
          },
        },
      }, {
        username: 'Jim',
        days: {
          '2017-01-31': {
            timeSpentSeconds: 132,
            issues: [{
              link: 'FOO-1',
              key: 'FOO-1',
              summary: 'Task 1',
              timeSpentSeconds: 12,
            }, {
              link: 'FOO-2',
              key: 'FOO-2',
              summary: 'Task 2',
              timeSpentSeconds: 120,
            }],
          },
        },
      }]);
    });
  });
});
