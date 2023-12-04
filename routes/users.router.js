const express = require('express');
const {
  registerHandler,
  signInHandler,
  accountVerifyHandler,
  logOutHandler,
  currentUserHandler,
  updateUserNameHandler,
  updateUserAvatar,
} = require('../controllers/users.controller.js');
const {
  userRegisterValidator,
} = require('../middleware/userDataValidator.middleware.js');
const {
  userSignInValidator,
} = require('../middleware/userSignIn.middleware.js');
const {
  userNameValidator,
} = require('../middleware/userNameValidator.middleware.js');
const { authMiddleware } = require('../service/auth.service.js');
const { upload } = require('../middleware/multer.middleware.js');

const usersRouter = express.Router();

usersRouter.post('/register', userRegisterValidator, registerHandler);
usersRouter.post('/signin', userSignInValidator, signInHandler);
usersRouter.post('/logout', authMiddleware, logOutHandler);
usersRouter.get('/verify/:verificationToken', accountVerifyHandler);
usersRouter.get('/current', authMiddleware, currentUserHandler);
usersRouter.patch(
  '/current/name',
  authMiddleware,
  userNameValidator,
  updateUserNameHandler
);
usersRouter.patch(
  '/current/avatar',
  authMiddleware,
  upload.single('avatar'),
  updateUserAvatar
);

module.exports = usersRouter;
