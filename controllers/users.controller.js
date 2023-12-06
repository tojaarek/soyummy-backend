const {
  createUser,
  getUser,
  updateUser,
  changeAvatarFile,
} = require('../service/users.service.js');
const { generateToken } = require('../service/auth.service.js');

const registerHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const createdUser = await createUser({
      name,
      email,
      password,
    });

    const userPayload = {
      _id: createdUser._id,
      email: createdUser.email,
      name: createdUser.name,
    };

    const token = generateToken(userPayload);
    await updateUser(createdUser._id, { token });

    return res.status(201).json({
      status: 'success',
      code: 201,
      message: 'User created',
      token: token,
      user: {
        name: name,
        email: email,
        avatar: 'https://soyummy-h1wx.onrender.com/avatars/basic_avatar',
      },
    });
  } catch (error) {
    console.error(error);
    if (error.message === 'Conflict') {
      return res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      });
    }
    return next(error);
  }
};

const signInHandler = async (req, res, next) => {
  try {
    const user = await getUser({ email: req.body.email });
    const isPasswordValid = await user.validatePassword(req.body.password);
    if (!user || !isPasswordValid) {
      return res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'Incorrect email or password',
      });
    }

    const userPayload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const token = generateToken(userPayload);
    await updateUser(user._id, { token });

    return res.status(200).json({
      status: 'OK',
      code: 200,
      token: token,
      user: {
        name: userPayload.name,
        email: userPayload.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const accountVerifyHandler = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await getUser({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'Verification token is invalid or user does not exist',
      });
    }

    await updateUser(user._id, { verified: true, verificationToken: null });

    return res.status(200).json({
      status: 'OK',
      code: 200,
      message: 'Verification successful',
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const logOutHandler = async (req, res, next) => {
  try {
    await updateUser(req.user._id, { token: null });

    return res.status(204).json({
      status: 'OK',
      code: 204,
    });
  } catch (error) {
    return next(error);
  }
};

const currentUserHandler = async (req, res, next) => {
  const tokenWithBearer = req.get('Authorization');
  const token = tokenWithBearer ? tokenWithBearer.split(' ')[1] : null;
  try {
    const { name, email, avatar, } =
      await getUser({ token });
    if (token === null) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
      });
    }
    return res.status(200).json({
      status: 'OK',
      code: 200,
      token,
      user: {
        name: name,
        email: email,
        avatar: avatar,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const updateUserNameHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updatedUser = await updateUser(req.user._id, { name });

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const updateUserAvatar = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    const id = req.user._id;
    const mimetype = req.file.mimetype;
    const avatar = await changeAvatarFile(filePath, id, mimetype);
    const updatedUser = await updateUser(id, {
      avatar: `https://soyummy-h1wx.onrender.com/avatars/${avatar}`,
    });

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {
  registerHandler,
  signInHandler,
  accountVerifyHandler,
  logOutHandler,
  currentUserHandler,
  updateUserNameHandler,
  updateUserAvatar,
};
