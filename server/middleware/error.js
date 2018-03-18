module.exports = () =>
  async (context, next) => {
    try {
      await next();
    } catch (error) {
      const {
        status = 500,
        message,
        details = [],
        description = '',
      } = error;

      context.status = status;
      context.message = message;
      context.body = { errors: details, description };

      context.app.emit('error', error, context);
    }
  };
