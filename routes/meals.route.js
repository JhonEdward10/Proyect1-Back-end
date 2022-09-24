const express = require('express');

const mealsRoute = express.Router();

//Middlewares
const { mealValidator } = require('../middlewares/validators.middlewares');
const { userIsAdmin, restaurantsExists } = require('../middlewares/restaurants.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');
const { mealExist } = require('../middlewares/meals.middlewares');

//Controllers
const { createMeal, getAllMeals, getMealsId, updateMeals, deletedMeals } = require('../controllers/meals.controller');

//Routes
mealsRoute.get('/', getAllMeals);

mealsRoute.get('/:id', mealExist, getMealsId );

mealsRoute.use(protectSession);

mealsRoute.post('/:id', restaurantsExists, mealValidator, createMeal );

mealsRoute.patch('/:id', userIsAdmin, mealValidator, mealExist, updateMeals );

mealsRoute.delete('/:id', userIsAdmin, mealExist, deletedMeals);

module.exports = { mealsRoute };