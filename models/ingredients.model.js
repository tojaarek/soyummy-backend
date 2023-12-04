const { Schema, model } = require('mongoose');

const ingredientsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
    },
    description: {
      type: String,
    },
    t: {
      type: String,
    },
    thumb: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

const Ingredient = model('ingredients', ingredientsSchema);

module.exports = {
  Ingredient,
};
