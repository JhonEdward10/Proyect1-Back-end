const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');

const createMeal = async (req, res) => {
    try {
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

    } catch (error) {
        console.log(error);
    }
};

const getAllMeals = async (req, res) => {
    try {
        const meals = await Meals.findAll({
            where: { status: 'active' },
            include: Restaurants
        });
        res.status(200).json({
            status: 'success',
            data: { meals }
        });
    } catch (error) {
       console.log(error); 
    }
};

const getMealsId = async (req, res) => {
    try {
        const { meals } = req;

        res.status(200).json({  
            status: 'success',
            data: {
                meals,
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const updateMeals = async (req, res) => {
    try {
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
        

    } catch (error) {
        console.log(error);
    }
};

const deletedMeals = async (req, res) => {
    try {
        const { meals } = req;
        
        await meals.update({ status: 'disabled' });

        res.status(204).json({
            status: 'success'
        });

    } catch (error) {
        console.log(error);
    }
};

module.exports = { createMeal, getAllMeals, getMealsId, updateMeals, deletedMeals };