const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  serverPort: process.env.SERVER_PORT || 3030,
  jwtSecret: process.env.JWT_SECRET,
  jwtLifetime: process.env.JWT_LIFETIME,
  mongoConnectionString: process.env.MONGO_URI,
  gmailUser: process.env.GMAIL_USER,
  gmailPassword: process.env.GMAIL_PASSWORD,
};
