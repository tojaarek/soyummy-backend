const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getCategoriesHandler,
  getPopularRecipesHandler,
  getCategoryRecipesHandler,
  getRecipeByIdHandler,
  getRecipesByTitleHandler,
  getRecipesMainPageHandler,
} = require('../controllers/recipes.controller.js');

const recipesRouter = express.Router();

/**
 * @swagger
 * /recipes/category-list:
 *   get:
 *     summary: Get list of categories.
 *     description:
 *       Retrieves a list of categories including their ID, name, description, and thumbnail.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - recipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully.
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
 *                 categories:
 *                   type: array
 *                   description: List of categories.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the category.
 *                         example: 6
 *                       name:
 *                         type: string
 *                         description: Name of the category.
 *                         example: Pasta
 *                       description:
 *                         type: string
 *                         description: Description of the category.
 *                         example: Pasta is a staple food of traditional Italian cuisine.
 *                       thumb:
 *                         type: string
 *                         description: URL to the thumbnail image of the category.
 *                         example: https://example.com/images/example.jpg
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
 *         description: No categories found.
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
 *                   description: A message indicating no categories were found.
 *                   example: 'No categories found'
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

recipesRouter.get('/category-list', authMiddleware, getCategoriesHandler);

/**
 * @swagger
 * /recipes/category/{categoryName}:
 *   get:
 *     summary: Get recipes for a specific category.
 *     description:
 *       Retrieves a list of recipes for a specific category based on the provided category name.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - recipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: categoryName
 *         description: Name of the category for which recipes are to be retrieved.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of recipes for the specified category retrieved successfully.
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
 *                 data:
 *                   type: array
 *                   description: List of recipes for the specified category.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the recipe.
 *                         example: 640cd5ac2d9fecf12e8897f3
 *                       title:
 *                         type: string
 *                         description: Name of the recipe.
 *                         example: Vegan Lasagna
 *                       category:
 *                         type: string
 *                         description: Category of the recipe.
 *                         example: Vegan
 *                       area:
 *                         type: string
 *                         description: Area or cuisine of the recipe.
 *                         example: Italian
 *                       instructions:
 *                         type: string
 *                         description: Step-by-step instructions for preparing the recipe.
 *                         example: "1) Preheat oven to 180 degrees celcius. ..."
 *                       description:
 *                         type: string
 *                         description: Description of the recipe.
 *                         example: A plant-based version of the classic Italian dish.
 *                       thumb:
 *                         type: string
 *                         description: URL to the thumbnail image of the recipe.
 *                         example: https://example.com/images/example.jpg
 *                       preview:
 *                         type: string
 *                         description: URL to the preview image of the recipe.
 *                         example: https://example.com/images/example.jpg
 *                       time:
 *                         type: string
 *                         description: Time required to prepare the recipe.
 *                         example: 50
 *                       favorites:
 *                         type: array
 *                         description: List of user favorites for the recipe.
 *                         items: string
 *                         example: []
 *                       youtube:
 *                         type: string
 *                         description: URL to the YouTube video demonstrating the recipe.
 *                         example: https://www.youtube.com/watch?v=VU8cXvlGbvc
 *                       tags:
 *                         type: array
 *                         description: List of tags associated with the recipe.
 *                         items: string
 *                         example: ["Vegan", "Pasta"]
 *                       createdAt:
 *                         type: string
 *                         description: Date and time when the recipe was created.
 *                         example: 2023-03-11T19:25:33.240Z
 *                       updatedAt:
 *                         type: string
 *                         description: Date and time when the recipe was last updated.
 *                         example: 2023-03-22T13:33:30.768Z
 *                       ingredients:
 *                         type: array
 *                         description: List of ingredients with their IDs and measures.
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: Unique identifier for the ingredient.
 *                               example: 640c2dd963a319ea671e36f4
 *                             measure:
 *                               type: string
 *                               description: Measurement unit for the ingredient.
 *                               example: "1 cups"
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
 *         description: No recipes found for the specified category.
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
 *                   description: A message indicating no recipes were found.
 *                   example: 'No recipes found'
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

recipesRouter.get(
  '/category/:categoryId',
  authMiddleware,
  getCategoryRecipesHandler
);

/**
 * @swagger
 * /recipes/popular-recipe:
 *   get:
 *     summary: Get popular recipes.
 *     description:
 *       Retrieves a list of popular recipes, including their ID, title, description, and thumbnail.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - recipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of popular recipes retrieved successfully.
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
 *                 recipes:
 *                   type: array
 *                   description: List of popular recipes.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the recipe.
 *                         example: 640cd5ac2d9fecf12e889826
 *                       title:
 *                         type: string
 *                         description: Name of the recipe.
 *                         example: Beef stroganoff
 *                       description:
 *                         type: string
 *                         description: Description of the recipe.
 *                         example: Russian-style beef dish with sour cream sauce
 *                       thumb:
 *                         type: string
 *                         description: URL to the thumbnail image of the recipe.
 *                         example: https://example.com/images/example.jpg
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
 *         description: No popular recipes found.
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
 *                   description: A message indicating no popular recipes were found.
 *                   example: 'No popular recipes found'
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

recipesRouter.get('/popular-recipe', authMiddleware, getPopularRecipesHandler);

/**
 * @swagger
 * /recipes/main-page:
 *   get:
 *     summary: Get recipes for the main page.
 *     description:
 *       Retrieves a collection of recipes for the main page, categorized by meal types.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - recipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipes for the main page retrieved successfully.
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
 *                   description: Collection of recipes categorized by meal types.
 *                   properties:
 *                     Breakfast:
 *                       type: array
 *                       description: List of breakfast recipes.
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             description: Unique identifier for the recipe.
 *                             example: 640cd5ac2d9fecf12e889863
 *                           title:
 *                             type: string
 *                             description: Name of the recipe.
 *                             example: English Breakfast
 *                           category:
 *                             type: string
 *                             description: Category of the recipe.
 *                             example: Breakfast
 *                           area:
 *                             type: string
 *                             description: Area or origin of the recipe.
 *                             example: British
 *                           instructions:
 *                             type: string
 *                             description: Cooking instructions for the recipe.
 *                             example: Heat the flat grill plate over a low heat...
 *                           description:
 *                             type: string
 *                             description: Description of the recipe.
 *                             example: A hearty breakfast meal consisting of eggs, bacon, sausage, baked beans, grilled tomato, and toast.
 *                           thumb:
 *                             type: string
 *                             description: URL to the thumbnail image of the recipe.
 *                             example: https://example.com/images/example.jpg
 *                           preview:
 *                             type: string
 *                             description: URL to the preview image of the recipe.
 *                             example: https://example.com/images/example.jpg
 *                           time:
 *                             type: string
 *                             description: Cooking time for the recipe.
 *                             example: 51
 *                           favorites:
 *                             type: array
 *                             description: List of user favorites for the recipe.
 *                             items:
 *                               type: string
 *                             example: []
 *                           youtube:
 *                             type: string
 *                             description: URL to the YouTube video demonstrating the recipe.
 *                             example: https://www.youtube.com/watch?v=FXjYU2Ensck
 *                           tags:
 *                             type: array
 *                             description: List of tags associated with the recipe.
 *                             items:
 *                               type: string
 *                             example: ['Breakfast']
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: Date and time when the recipe was created.
 *                             example: '2023-03-11T19:25:33.243Z'
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             description: Date and time when the recipe was last updated.
 *                             example: '2023-03-22T19:39:41.777Z'
 *                           ingredients:
 *                             type: array
 *                             description: List of ingredients for the recipe.
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   description: Unique identifier for the ingredient.
 *                                   example: 640c2dd963a319ea671e3760
 *                                 measure:
 *                                   type: string
 *                                   description: Measurement unit for the ingredient.
 *                                   example: 2
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
 *         description: Recipes not found for the main page.
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
 *                   description: A message indicating no recipes were found for the main page.
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

recipesRouter.get('/main-page', authMiddleware, getRecipesMainPageHandler);

/**
 * @swagger
 * /recipes/search?q={queryValue}:
 *   get:
 *     summary: Get recipes by title.
 *     description:
 *       Retrieves a list of recipes based on the provided title search query.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - recipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: q
 *         description: Title search query.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of recipes by title retrieved successfully.
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
 *                   type: array
 *                   description: List of recipes matching the title search query.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the recipe.
 *                         example: 640cd5ac2d9fecf12e889833
 *                       title:
 *                         type: string
 *                         description: Name of the recipe.
 *                         example: Pork Cassoulet
 *                       thumb:
 *                         type: string
 *                         description: URL to the thumbnail image of the recipe.
 *                         example: https://example.com/images/example.jpg
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
 *         description: Recipes not found for the provided title search query.
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
 *                   description: A message indicating no recipes were found for the provided title search query.
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

recipesRouter.get('/search', authMiddleware, getRecipesByTitleHandler);

/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Get a recipe by ID.
 *     description:
 *       Retrieves a recipe with the specified ID.
 *       Requires a valid authentication token in the Authorization header.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - recipes
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: recipeId
 *         description: ID of the recipe to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe retrieved successfully.
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
 *                 recipe:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier for the recipe.
 *                       example: 640cd5ac2d9fecf12e8897fc
 *                     title:
 *                       type: string
 *                       description: Name of the recipe.
 *                       example: Spaghetti Bolognese
 *                     category:
 *                       type: string
 *                       description: Category of the recipe.
 *                       example: Beef
 *                     area:
 *                       type: string
 *                       description: Area or origin of the recipe.
 *                       example: Italian
 *                     instructions:
 *                       type: string
 *                       description: Cooking instructions for the recipe.
 *                       example: Put the onion and oil in a large pan and fry over a fairly high heat...
 *                     description:
 *                       type: string
 *                       description: Description of the recipe.
 *                       example: An Italian pasta dish made with spaghetti and a meat-based sauce, typically containing beef, tomatoes, onions, garlic, and herbs.
 *                     thumb:
 *                       type: string
 *                       description: URL to the thumbnail image of the recipe.
 *                       example: https://example.com/images/example.jpg
 *                     preview:
 *                       type: string
 *                       description: URL to the preview image of the recipe.
 *                       example: https://example.com/images/example.jpg
 *                     time:
 *                       type: string
 *                       description: Cooking time for the recipe.
 *                       example: 45
 *                     favorites:
 *                       type: array
 *                       description: List of user favorites for the recipe.
 *                       items:
 *                         type: string
 *                       example: ["653d4c7615bb35cb4f96f8ae", "656891765fa5c4420f43e043"]
 *                     youtube:
 *                       type: string
 *                       description: URL to the YouTube video demonstrating the recipe.
 *                       example: https://www.youtube.com/watch?v=-gF8d-fitkU
 *                     tags:
 *                       type: array
 *                       description: List of tags associated with the recipe.
 *                       items:
 *                         type: string
 *                       example: ["Pasta", "Meat"]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the recipe was created.
 *                       example: '2023-03-11T19:25:33.240Z'
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the recipe was last updated.
 *                       example: '2023-03-23T10:28:36.572Z'
 *                     ingredients:
 *                       type: array
 *                       description: List of ingredients for the recipe.
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: Unique identifier for the ingredient.
 *                             example: 640c2dd963a319ea671e372e
 *                           measure:
 *                             type: string
 *                             description: Measurement unit for the ingredient.
 *                             example: 2
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
 *       403:
 *         description: Forbidden. Current user is trying to access a recipe of another user.
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
 *                   example: 403
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 *                   example: 'Forbidden'
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
 *                   description: A message indicating no recipes were found for the provided ID.
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

recipesRouter.get('/:recipeId', authMiddleware, getRecipeByIdHandler);

module.exports = recipesRouter;
