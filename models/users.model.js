const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [50, 'Name must not exceed 50 characters'],
      match: [/^[a-zA-Z0-9]*$/, 'Name must contain only letters and numbers'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      maxlength: [60, 'Password must not exceed 60 characters'],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
        'Password must contain at least one uppercase letter and one digit',
      ],
    },
    newsletter: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: 'http://localhost:3030/avatars/basic_avatar.png',
    },
  },
  { versionKey: false, timestamps: true }
);

usersSchema.pre('save', async function () {
  if (!this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usersSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('users', usersSchema);

module.exports = {
  User,
};
