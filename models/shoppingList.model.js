const { Schema, model } = require('mongoose');

const shoppingListSchema = new Schema(
  {
    ingredients: {
      type: Array,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: false }
);

const ShoppingList = model('shoppinglist', shoppingListSchema);

module.exports = {
  ShoppingList,
};
