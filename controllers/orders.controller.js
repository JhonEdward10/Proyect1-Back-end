const { Orders } = require('../models/orders.models');
const { Restaurants } = require('../models/restaurants.models');
const { Meals } = require('../models/meals.models');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createOrders = catchAsync( async (req, res, next) => {
        const { quantity, mealId } = req.body;
        const { sessionUser, meals } = req;

        const activeOrder = await Orders.findAll({
            where: { userId: sessionUser.id, status: 'active' }
        });

        if(activeOrder[0]){
            return res.status(404).json({
                status: 'error',
                messagge: 'the user has an order in process'
            });
        };

        const totalPrice = meals.price * quantity;
        const orders = await Orders.create({
            totalPrice,
            quantity,
            mealId: meals.id,
            userId: sessionUser.id
        });
        
        res.status(200).json({
            status: 'success',
            data: {
                orders
            }
        });
});

const getAllOrders = catchAsync( async (req, res, next) => {
        const orders = await Orders.findAll({
            include: {
                model: Meals,
                include: Restaurants
             }
        });

        res.status(200).json({
            status: 'success',
            data: { orders }
        });
});

const updateOrders = catchAsync( async (req, res, next) => {
        const { orders } = req;

        orders.update({ status: 'completed' });

        res.status(200).json({
            status: 'success',
            data: { orders }
        });
});

const cancellOrders = catchAsync( async (req, res, next) => {
        const { orders } = req;

        orders.update({ status: 'cancelled' });

        res.status(204).json({ status: 'success' });
});

module.exports = { createOrders, getAllOrders, updateOrders, cancellOrders };