const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createMeal = catchAsync( async (req, res, next) => {
        const { name, price } = req.body;
        const { id } = req.params;

        const meal = await Meals.create({
            name,
            price,
            restaurantId: id
        });

        //201 --> Success and a resource has been created
        res.status(201).json({
            status: 'success',
            data: { meal }
        });
});

const getAllMeals = catchAsync( async (req, res, next) => {
        const meals = await Meals.findAll({
            where: { status: 'active' },
            include: Restaurants
        });
        res.status(200).json({
            status: 'success',
            data: { meals }
        });
});

const getMealsId = catchAsync( async (req, res, next) => {
        const { meal } = req;

        res.status(200).json({  
            status: 'success',
            data: {
                meal,
            }
        });
});

const updateMeals = catchAsync( async (req, res, next) => {
        const { name, price } = req.body;
        const { meal } = req;

        await meal.update({
            name, 
            price
        });

        res.status(200).json({
            status: 'success',
            data: { meal }
        }); 
});

const deletedMeals = catchAsync( async (req, res, next) => {
        const { meal } = req;
        
        await meal.update({ status: 'disabled' });

        res.status(204).json({
            status: 'success'
        });
});

module.exports = { createMeal, getAllMeals, getMealsId, updateMeals, deletedMeals };