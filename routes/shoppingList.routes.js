const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getShoppingListHandler,
  addIngredientHandler,
  deleteIngredientHandler,
} = require('../controllers/shoppingList.controller.js');

const shoppingListRouter = express.Router();

/**
 * @swagger
 * /shopping-list:
 *   get:
 *     summary: Get shopping list.
 *     description: |
 *       Retrieves user shopping list based on the provided authentication token.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - shopping-list
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns shopping list.
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
 *                 ingredients:
 *                   type: array
 *                   description: Ingredients on the shopping list.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Ingredient ID.
 *                         example: 640c2dd963a319ea671e3689
 *                       title:
 *                         type: string
 *                         description: Ingredient name.
 *                         example: Ginger
 *                       thumb:
 *                         type: string
 *                         description: URL to the thumbnail image of the ingredient.
 *                         example: https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e36e8.png
 *                       measure:
 *                         type: string
 *                         description: Measurement unit for the ingredient.
 *                         example: 20 g
 *       204:
 *         description: Empty shopping list.
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
 *                   example: 204
 *                 message:
 *                   type: string
 *                   description: A message indicating no content.
 *                   example: 'No content'
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


shoppingListRouter.get('/', authMiddleware, getShoppingListHandler);

/**
 * @swagger
 * /shopping-list/add:
 *   post:
 *     summary: Add ingredient to shopping list.
 *     description: |
 *       Adds a new ingredient to the user's shopping list based on the provided data.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - shopping-list
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: ingredient
 *         description: The ingredient data to be added to the shopping list.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: Unique identifier for the ingredient.
 *               example: 640c2dd963a319ea671e3689
 *             title:
 *               type: string
 *               description: Name of the ingredient.
 *               example: Celeriac
 *             thumb:
 *               type: string
 *               description: URL to the thumbnail image of the ingredient.
 *               example: https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3689.png
 *             measure:
 *               type: string
 *               description: Measurement unit for the ingredient.
 *               example: 500 g
 *     responses:
 *       200:
 *         description: Ingredient added successfully.
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
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                   example: 'Ingredient added'
 *                 newIngredient:
 *                   type: object
 *                   description: The added ingredient.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the ingredient.
 *                       example: 640c2dd963a319ea671e3689
 *                     title:
 *                       type: string
 *                       description: Name of the ingredient.
 *                       example: Celeriac
 *                     thumb:
 *                       type: string
 *                       description: URL to the thumbnail image of the ingredient.
 *                       example: https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e3689.png
 *                     measure:
 *                       type: string
 *                       description: Measurement unit for the ingredient.
 *                       example: 1
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
 */

shoppingListRouter.post('/add', authMiddleware, addIngredientHandler);
shoppingListRouter.delete('/:index', authMiddleware, deleteIngredientHandler);

module.exports = shoppingListRouter;
