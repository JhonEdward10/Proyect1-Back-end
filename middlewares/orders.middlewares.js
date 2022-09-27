const { Orders } = require('../models/orders.models');
const { Meals } = require('../models/meals.models');
//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const mealExist = catchAsync(async (req, res, next) => {
        const { mealId } = req.body;

        const meal = await Meals.findOne({
            where: { id: mealId, status: 'active' },
        });

        if (!meal) {
            res.status(404).json({
                status: 'error',
                message: `Meal with ID:${mealId} doesent exist or your status is inactive`,
            });
        }

        req.meal = meal;

        next();
});

const orderExist = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const order = await Orders.findOne({ where: { id, status: 'active' } });

        if (!order) {
            res.status(404).json({
                status: 'error',
                message: `The order with ID:${id} doesent exist or your status is diferent to active`,
            });
        }

        req.order = order;

        next();
});

module.exports = { mealExist, orderExist };