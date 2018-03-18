const { pick, map } = require('ramda');

const Router = require('koa-router');
/** @type {Router} */
const router = new Router();

const pickUserProps = map(pick(['name', 'avatarUrls']));

router
  .get('/', async (context) => {
    const {
      filter: username,
    } = context.query;

    try {
      const users = await context.state.jiraClient.user.search({ username });
      context.body = pickUserProps(users);
    } catch (error) {
      context.throw(500, 'Jira error', { isJira: true, original: error });
    }
  });

/** @type {Router} */
module.exports = router;
