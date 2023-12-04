const { Schema, model } = require('mongoose');

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    area: {
      type: String,
    },
    instructions: {
      type: String,
      required: [true, 'Instructions are required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      required: [true, 'Cooking time is required'],
    },
    favorites: {
      type: Array,
    },
    youtube: {
      type: String,
    },
    tags: {
      type: Array,
    },
    ingredients: {
      type: Array,
      required: [true, 'Ingredients are required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: false }
);

const Recipe = model('recipes', recipesSchema);

module.exports = {
  Recipe,
};
