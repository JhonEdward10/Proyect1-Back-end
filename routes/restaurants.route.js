const express = require('express');

const restaurantsRoute = express.Router();

//Middlewares
const { createRestaurantValidator, updateRestaurantValidator, reviewValidator } = require('../middlewares/validators.middlewares');
const { restaurantsExists, userIsAdmin, reviewExist, reviewOwner } = require('../middlewares/restaurants.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

//Controllers
const { createRestaurants, getRestaurants, getRestaurantsId, updateRestaurants, deleteRestaurant, createRestaurantReviews, updateRestaurantReviews, deleteRestaurantReviews } = require('../controllers/restaurants.controller');

//Routes
restaurantsRoute.get('/', getRestaurants);

restaurantsRoute.get('/:id', restaurantsExists, getRestaurantsId);

restaurantsRoute.use(protectSession);

restaurantsRoute.post('/', createRestaurantValidator, createRestaurants);

restaurantsRoute.patch('/:id', userIsAdmin, restaurantsExists, updateRestaurantValidator, updateRestaurants);

restaurantsRoute.delete('/:id', userIsAdmin, restaurantsExists, deleteRestaurant);

restaurantsRoute.post('/reviews/:restaurantId', reviewValidator, createRestaurantReviews);

restaurantsRoute.patch('/reviews/:id', reviewExist, reviewValidator, reviewOwner, updateRestaurantReviews);

restaurantsRoute.delete('/reviews/:id', reviewExist, reviewOwner, deleteRestaurantReviews);

module.exports = { restaurantsRoute };