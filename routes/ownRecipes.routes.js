const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  addRecipeHandler,
  deleteRecipeHandler,
  getOwnRecipesHandler,
} = require('../controllers/recipes.controller.js');
const {
  addRecipeValidator,
} = require('../middleware/recipeDataValidator.middleware.js');

const ownRecipesRouter = express.Router();

/**
 * @swagger
 * /ownRecipes?page={pageNumber}?limit={limitNumber}:
 *   get:
 *     summary: Get recipes owned by the authenticated user.
 *     description:
 *       Retrieves recipes owned by the authenticated user, paginated based on query parameters.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - ownRecipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination, default 1.
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of recipes per page, default 4.
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Recipes owned by the user retrieved successfully.
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
 *                 recipes:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       description: Current page number.
 *                       example: 1
 *                     perPage:
 *                       type: integer
 *                       description: Number of recipes per page.
 *                       example: 4
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages.
 *                       example: 1
 *                     totalRecipes:
 *                       type: integer
 *                       description: Total number of recipes owned by the user.
 *                       example: 1
 *                     data:
 *                       type: array
 *                       description: List of recipes on the current page.
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Unique identifier for the recipe.
 *                             example: 657091580de5a373003b97cc
 *                           title:
 *                             type: string
 *                             description: Name of the recipe.
 *                             example: Pierogi
 *                           category:
 *                             type: string
 *                             description: Category of the recipe.
 *                             example: Miscellaneous
 *                           instructions:
 *                             type: string
 *                             description: Cooking instructions for the recipe.
 *                             example: '1. Boil the potatoes,2. Add flour'
 *                           description:
 *                             type: string
 *                             description: Description of the recipe.
 *                             example: So yummy
 *                           thumb:
 *                             type: string
 *                             description: URL to the thumbnail image of the recipe.
 *                             example: https://example.com/images/example.jpg
 *                           time:
 *                             type: string
 *                             description: Cooking time for the recipe.
 *                             example: 95 min
 *                           favorites:
 *                             type: array
 *                             description: List of user favorites for the recipe.
 *                             items:
 *                               type: string
 *                             example: []
 *                           tags:
 *                             type: array
 *                             description: List of tags associated with the recipe.
 *                             items:
 *                               type: string
 *                             example: []
 *                           ingredients:
 *                             type: array
 *                             description: List of ingredients for the recipe.
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   description: Unique identifier for the ingredient.
 *                                   example: 640c2dd963a319ea671e36d7
 *                                 name:
 *                                   type: string
 *                                   description: Name of the ingredient.
 *                                   example: Flour
 *                                 measure:
 *                                   type: string
 *                                   description: Measurement unit for the ingredient.
 *                                   example: 500 g
 *                           owner:
 *                             type: string
 *                             description: Owner's user ID.
 *                             example: 656e1de863d61b19f16395c7
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
 *       404:
 *         description: No recipes found for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: fail
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: A message indicating no recipes were found for the user.
 *                   example: 'Not found'
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

ownRecipesRouter.get('/', authMiddleware, getOwnRecipesHandler);

/**
 * @swagger
 * /ownRecipes/add:
 *   post:
 *     summary: Add a new recipe.
 *     description:
 *       Adds a new recipe to the system. Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - ownRecipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: formData
 *         name: title
 *         description: Title of the recipe.
 *         required: true
 *         type: string
 *       - in: formData
 *         name: category
 *         description: Category of the recipe.
 *         required: true
 *         type: string
 *       - in: formData
 *         name: instructions
 *         description: Cooking instructions for the recipe.
 *         required: true
 *         type: string
 *       - in: formData
 *         name: description
 *         description: Description of the recipe.
 *         required: true
 *         type: string
 *       - in: formData
 *         name: time
 *         description: Cooking time for the recipe.
 *         required: true
 *         type: string
 *       - in: formData
 *         name: ingredients
 *         description: JSON array containing the list of ingredients.
 *         required: true
 *         type: string
 *       - in: formData
 *         name: thumb
 *         description: Recipe thumbnail image (file upload).
 *         required: true
 *         type: file
 *     responses:
 *       201:
 *         description: Recipe added successfully.
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
 *                   description: A message indicating success.
 *                   example: 'Created'
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     newRecipe:
 *                       type: object
 *                       description: The newly added recipe.
 *                       $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Bad Request. Invalid parameters or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: fail
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Recipe title is required'
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

ownRecipesRouter.post(
  '/add',
  authMiddleware,
  addRecipeValidator,
  addRecipeHandler
);

/**
 * @swagger
 * /ownRecipes/{recipeId}:
 *   delete:
 *     summary: Delete the recipe.
 *     description:
 *       Deletes a recipe based on the provided recipe ID. Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - ownRecipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: recipeId
 *         description: ID of the recipe to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted successfully.
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
 *                   example: 'Recipe deleted'
 *       404:
 *         description: Recipe not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: fail
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Recipe not found'
 *       403:
 *         description: Forbidden. User does not have permission to delete the recipe.
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
 *                   example: 403
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Forbidden'
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

ownRecipesRouter.delete('/:recipeId', authMiddleware, deleteRecipeHandler);

module.exports = ownRecipesRouter;
