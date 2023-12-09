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

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Creates a new user.
 *     description: Creates a new user and retrieves user data from the database.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name.
 *                 example: username
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: user@user.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: Password12
 *     responses:
 *       201:
 *         description: User data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 201
 *                 message:
 *                   type: string
 *                   description: A message describing the result of the operation.
 *                   example: User created
 *                 token:
 *                   type: string
 *                   description: Authentication token.
 *                   example: abc
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: User name.
 *                       example: username
 *                     email:
 *                       type: string
 *                       description: User email.
 *                       example: user@user.com
 *                     avatar:
 *                       type: string
 *                       description: User avatar url.
 *                       example: https://example.com/images/example.jpg
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: "Password fails to match the required pattern. (At least one uppercase character and one digit. Min 6 characters)"
 *       409:
 *         description: Conflict.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 409
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Email is already in use'
 *                 data:
 *                   type: string
 *                   description: Additional data about the error.
 *                   example: 'Conflict'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Internal Server Error'
 */

usersRouter.post('/register', userRegisterValidator, registerHandler);

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: User authentication.
 *     description: Allows access to the app.
 *     tags:
 *       - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email.
 *                 example: user@user.com
 *               password:
 *                 type: string
 *                 description: User password.
 *                 example: Password12
 *     responses:
 *       200:
 *         description: User data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 200
 *                 token:
 *                   type: string
 *                   description: Authentication token.
 *                   example: abc
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: User name.
 *                       example: username
 *                     email:
 *                       type: string
 *                       description: User email.
 *                       example: user@user.com
 *                     avatar:
 *                       type: string
 *                       description: User avatar url.
 *                       example: https://example.com/images/example.jpg
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: "Email is required"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: Unauthorized
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: "Incorrect email or password"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Internal Server Error'
 */

usersRouter.post('/signin', userSignInValidator, signInHandler);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out the current user.
 *     description: Logs out the current user by updating their token to null.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successful operation. User has been logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: OK
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 204
 *       401:
 *         description: Unauthorized. Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Unauthorized'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Internal Server Error'
 */

usersRouter.post('/logout', authMiddleware, logOutHandler);
usersRouter.get('/verify/:verificationToken', accountVerifyHandler);

/**
 * @swagger
 * /users/current:
 *   get:
 *     summary: Get current user information.
 *     description:
 *       Retrieves information about the current user based on the provided authentication token.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns current user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: OK
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 200
 *                 token:
 *                   type: string
 *                   description: Authentication token.
 *                   example: abc
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: User name.
 *                       example: username
 *                     email:
 *                       type: string
 *                       description: User email.
 *                       example: user@user.com
 *                     avatar:
 *                       type: string
 *                       description: User avatar url.
 *                       example: https://example.com/images/example.jpg
 *       401:
 *         description: Unauthorized. Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Unauthorized'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Internal Server Error'
 */

usersRouter.get('/current', authMiddleware, currentUserHandler);

/**
 * @swagger
 * /users/current/name:
 *   patch:
 *     summary: Update the name of the current user.
 *     description:
 *       Updates the name of the current user based on the provided data.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the user.
 *                 example: NewName
 *     responses:
 *       200:
 *         description: Successful operation. Returns updated user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedUser:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: User ID.
 *                           example: 5f8b0f65a0083e3a1d21617d
 *                         name:
 *                           type: string
 *                           description: Updated user name.
 *                           example: NewName
 *                         email:
 *                           type: string
 *                           description: User email.
 *                           example: user@user.com
 *                         avatar:
 *                           type: string
 *                           description: User avatar url.
 *                           example: https://example.com/images/example.jpg
 *       401:
 *         description: Unauthorized. Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Unauthorized'
 *       400:
 *         description: Bad Request. Invalid request data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Invalid request data: name is required.'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Internal Server Error'
 */

usersRouter.patch(
  '/current/name',
  authMiddleware,
  userNameValidator,
  updateUserNameHandler
);

/**
 * @swagger
 * /users/current/avatar:
 *   patch:
 *     summary: Update the avatar of the current user.
 *     description:
 *       Updates the avatar of the current user based on the provided image file.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: avatar
 *         description: Image file for the user's avatar.
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Successful operation. Returns updated user data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: success
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedUser:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: User ID.
 *                           example: 5f8b0f65a0083e3a1d21617d
 *                         name:
 *                           type: string
 *                           description: User name.
 *                           example: username
 *                         email:
 *                           type: string
 *                           description: User email.
 *                           example: user@user.com
 *                         avatar:
 *                           type: string
 *                           description: User new avatar url.
 *                           example: https://example.com/images/new_example.jpg
 *       400:
 *         description: Bad Request. Image file is required but not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Image file is required but not provided.'
 *       401:
 *         description: Unauthorized. Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Unauthorized'
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: error
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Internal Server Error'
 */

usersRouter.patch(
  '/current/avatar',
  authMiddleware,
  upload.single('avatar'),
  updateUserAvatar
);

module.exports = usersRouter;
