const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getFavoritesHandler,
  addToFavoritesHandler,
  deleteFromFavoritesHandler,
} = require('../controllers/favorites.controller.js');

const favoritesRouter = express.Router();

/**
 * @swagger
 * /favorites?page={pageNumber}?limit={limitNumber}:
 *   get:
 *     summary: Get user favorites.
 *     description: |
 *       Retrieves a paginated list of user favorites based on the provided authentication token.
 *       Requires a valid authentication token in the Authorization header.
 *     tags:
 *       - favorites
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination (default is 1).
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page (default is 4).
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user favorites retrieved successfully.
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
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages for pagination.
 *                   example: 5
 *                 data:
 *                   type: array
 *                   description: List of user favorites.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the favorite.
 *                         example: 640c2dd963a319ea671e3689
 *                       title:
 *                         type: string
 *                         description: Title of the favorite.
 *                         example: Delicious Recipe
 *                       description:
 *                         type: string
 *                         description: Description of the favorite.
 *                         example: A mouth-watering dish.
 *                       thumb:
 *                         type: string
 *                         description: URL to the thumbnail image of the favorite.
 *                         example: https://example.com/thumbnails/delicious_recipe.png
 *                       time:
 *                         type: string
 *                         description: Cooking time for the favorite.
 *                         example: 30 min
 *       404:
 *         description: No favorites found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: Not Found
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: A message indicating no favorites found.
 *                   example: 'No favorites found'
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

favoritesRouter.get('/', authMiddleware, getFavoritesHandler);

/**
 * @swagger
 * /favorites/add:
 *   post:
 *     summary: Add recipe to favorites.
 *     description:
 *       Adds a recipe to the user's favorites based on the provided recipe ID.
 *       Requires a valid authentication token in the Authorization header.
 *     tags:
 *       - favorites
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
 *               recipeId:
 *                 type: string
 *                 description: Recipe Id.
 *                 example: 656e1de863d61b19f16395c7
 *     responses:
 *       200:
 *         description: Recipe added to favorites successfully.
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
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                   example: 'Recipe added to favorites'
 *                 data:
 *                   type: object
 *                   description: Details of the added recipe to favorites.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the recipe.
 *                       example: 64144c7df5f602afeb513263
 *                     title:
 *                       type: string
 *                       description: Title of the recipe.
 *                       example: Garides Saganaki
 *                     category:
 *                       type: string
 *                       description: Category of the recipe.
 *                       example: Seafood
 *                     area:
 *                       type: string
 *                       description: Area or origin of the recipe.
 *                       example: Greek
 *                     instructions:
 *                       type: string
 *                       description: Cooking instructions for the recipe.
 *                       example: >
 *                         Place the prawns in a pot and add enough water to cover. Boil for 5 minutes...
 *                     description:
 *                       type: string
 *                       description: Description of the recipe.
 *                       example: A Greek dish made with prawns, tomatoes, feta cheese, and herbs.
 *                     thumb:
 *                       type: string
 *                       description: URL to the thumbnail image of the recipe.
 *                       example: https://example.com/thumbnails/delicious_recipe.png
 *                     preview:
 *                       type: string
 *                       description: URL to the preview image of the recipe.
 *                       example: https://example.com/thumbnails/delicious_recipe.png
 *                     time:
 *                       type: string
 *                       description: Cooking time for the recipe.
 *                       example: 45
 *                     favorites:
 *                       type: array
 *                       description: List of user IDs who favorited the recipe.
 *                       example: ["656e1de863d61b19f16395c7"]
 *                     youtube:
 *                       type: string
 *                       description: URL to the YouTube video for the recipe.
 *                       example: https://www.youtube.com/watch?v=uO0ejc85zSE
 *                     tags:
 *                       type: array
 *                       description: List of tags associated with the recipe.
 *                       example: ["Seafood", "Shellfish"]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the recipe was created.
 *                       example: 2023-03-11T19:25:33.239Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the recipe was last updated.
 *                       example: 2023-03-22T19:35:39.106Z
 *                     ingredients:
 *                       type: array
 *                       description: List of ingredients for the recipe.
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: Unique identifier for the ingredient.
 *                             example: 640c2dd963a319ea671e374a
 *                           measure:
 *                             type: string
 *                             description: Measurement of the ingredient for the recipe.
 *                             example: 500 g
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
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the error.
 *                   example: Bad request
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Recipe ID is required'
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

favoritesRouter.post('/add', authMiddleware, addToFavoritesHandler);

/**
 * @swagger
 * /favorites/delete:
 *   delete:
 *     summary: Delete recipe from favorites.
 *     description: |
 *       Deletes a recipe from the user's favorites based on the provided recipe ID.
 *       Requires a valid authentication token in the Authorization header.
 *     tags:
 *       - favorites
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: requestBody
 *         name: DeleteFromFavoritesRequest
 *         description: Request body for deleting a recipe from favorites.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recipeId:
 *                   type: string
 *                   description: ID of the recipe to be deleted from favorites.
 *                   example: 64144c7df5f602afeb513263
 *     responses:
 *       200:
 *         description: Recipe deleted from favorites successfully.
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
 *                 message:
 *                   type: string
 *                   description: A message indicating success.
 *                   example: 'Recipe deleted from favorites'
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
 *         description: Recipe ID is required.
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
 *                   example: 'Recipe ID is required'
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

favoritesRouter.delete('/delete', authMiddleware, deleteFromFavoritesHandler);

module.exports = favoritesRouter;
