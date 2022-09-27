const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');
//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const mealExist = catchAsync(async (req, res, next) => {
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
});

module.exports = { mealExist };