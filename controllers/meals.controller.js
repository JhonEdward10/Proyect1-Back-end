const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createMeal = catchAsync( async (req, res, next) => {
        const { name, price } = req.body;
        const { restaurant } = req;

        const meals = await Meals.create({
            name,
            price, 
            restaurant: restaurant.id
        });

        //201 --> Success and a resource has been created
        res.status(201).json({
            status: 'success',
            data: { meals }
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
        const { meals } = req;

        res.status(200).json({  
            status: 'success',
            data: {
                meals,
            }
        });
});

const updateMeals = catchAsync( async (req, res, next) => {
        const { name, price } = req.body;
        const { meals } = req;

        await meals.update({
            name, 
            price
        });

        res.status(200).json({
            status: 'success',
            data: { meals }
        }); 
});

const deletedMeals = catchAsync( async (req, res, next) => {
        const { meals } = req;
        
        await meals.update({ status: 'disabled' });

        res.status(204).json({
            status: 'success'
        });
});

module.exports = { createMeal, getAllMeals, getMealsId, updateMeals, deletedMeals };