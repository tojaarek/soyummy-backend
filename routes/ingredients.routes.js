const express = require('express');
const { authMiddleware } = require('../service/auth.service.js');
const {
  getAllIngredientsHandler,
} = require('../controllers/ingredients.controller.js');

const ingredientsRouter = express.Router();

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Get all ingredients.
 *     description: |
 *       Retrieves a list of all ingredients available in the system.
 *     tags:
 *       - ingredients
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token for authentication.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of ingredients retrieved successfully.
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
 *                 ingredients:
 *                   type: array
 *                   description: List of ingredients.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the ingredient.
 *                         example: 640c2dd963a319ea671e3689
 *                       name:
 *                         type: string
 *                         description: Name of the ingredient.
 *                         example: Celeriac
 *                       description:
 *                         type: string
 *                         description: Description of the ingredient.
 *                         example: A root vegetable with a crisp texture.
 *                       thumb:
 *                         type: string
 *                         description: URL to the thumbnail image of the ingredient.
 *                         example: https://example.com/images/example.jpg
 *       404:
 *         description: No ingredients found.
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
 *                   description: A message indicating no ingredients found.
 *                   example: 'No ingredients found'
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

ingredientsRouter.get('/list', authMiddleware, getAllIngredientsHandler);

module.exports = ingredientsRouter;
