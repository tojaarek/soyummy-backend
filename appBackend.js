const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const job = require('./cron.js').job;

job.start();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for SoYummy Cookbook App',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from MongoDB.',
    contact: {
      name: 'Arek Wilczyński',
      email: 'arek@wilczynski.app',
    },
  },
  components: {
    headers: {
      Authorization: {
        description: 'Bearer token for authentication.',
        required: true,
        schema: {
          type: 'string',
        },
      },
    },
  },
  servers: [
    {
      url: 'https://soyummy-h1wx.onrender.com',
      description: 'Deployed on Render',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const usersRouter = require('./routes/users.router.js');
const ingredientsRouter = require('./routes/ingredients.routes.js');
const ownRecipesRouter = require('./routes/ownRecipes.routes.js');
const recipesRouter = require('./routes/recipes.routes.js');
const favoritesRouter = require('./routes/favorites.routes.js');
const shoppingListRouter = require('./routes/shoppingList.routes.js');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/thumbs', express.static(path.join('public', 'thumbs')));
app.use('/avatars', express.static(path.join('public', 'avatars')));

app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/ownRecipes', ownRecipesRouter);
app.use('/recipes', recipesRouter);
app.use('/favorites', favoritesRouter);
app.use('/shopping-list', shoppingListRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
