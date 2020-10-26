const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./common/clientDb');
const { logger } = require('./utils/logger');

connectToDB(() => {
  app.listen(PORT, () =>
    logger.info(`App is running on http://localhost:${PORT}`)
  );
});
