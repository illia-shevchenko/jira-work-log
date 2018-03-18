const { omit } = require('ramda');
const { client } = require('./client');

const omitUnsafeProperties = omit(['body', 'request']);
const parseError = (error) => {
  try {
    const parsedError = JSON.parse(error);

    return [parsedError.statusCode, 'A problem while connecting Jira', { details: omitUnsafeProperties(parsedError) }];
  } catch (parsingError) {
    return [500, `A problem while connecting Jira: ${ parsingError }`, { details: error }];
  }
};

// The purpose foe this middleware is to have an ability to provide based on session separate clients for separate users/session
module.exports =
  () =>
    async (context, next) => {
      context.state.jiraClient = client;

      try {
        await next();
      } catch (error) {
        if (!error.isJira) {
          throw error;
        }

        context.throw(...parseError(error.original));
      }
    };
