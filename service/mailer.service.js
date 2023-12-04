const { sendMail } = require('../nodemailer.js');

const sendVerificationMessage = async (email, verificationToken) => {
  const messageSettings = {
    to: email,
    subject: 'So Yummy - Verify your account',
    text: `Hello! Please verify your So Yummy account by visiting http://localhost:3030/users/verify/${verificationToken}`,
    html: `<h2>Hello!</h2><br/>Please verify your So Yummy account by clicking <a href="http://localhost:3030/users/verify/${verificationToken}">here</a>!`,
  };

  await sendMail(messageSettings);
};

module.exports = {
  sendVerificationMessage,
};
