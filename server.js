const app = require('./appBackend.js');
const db = require('./db.js');
const { serverPort } = require('./config.js');

(async () => {
  try {
    await db.connect();
    console.log('Database connection successful');
    app.listen(serverPort, async () => {
      console.log(`Server running. Use the API on port: ${serverPort}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
})();
