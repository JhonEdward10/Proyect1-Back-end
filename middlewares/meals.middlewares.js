const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');

const mealExist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const meal = await Meals.findOne({
            where: { id, status: 'active' },
            include: Restaurants,
        });

        if (!meal) {
            res.status(404).json({
                status: 'error',
                message: `The meal with ID: ${id} doesent, exist or your status is inactive`,
            });
        }

        req.meal = meal;

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { mealExist };