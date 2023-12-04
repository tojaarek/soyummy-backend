const { Schema, model } = require('mongoose');

const categoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    thumb: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { versionKey: false, timestamps: false }
);

const Category = model('categories', categoriesSchema);

module.exports = {
  Category,
};
