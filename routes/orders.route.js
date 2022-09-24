const express = require('express');

const ordersRoute = express.Router();

//Middlewares
const { orderValidator } = require('../middlewares/validators.middlewares');
const { mealExist, orderExist } = require('../middlewares/orders.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');

//Controllers
const { createOrders, getAllOrders, updateOrders, cancellOrders } = require('../controllers/orders.controller');

//Routes
ordersRoute.use(protectSession);

ordersRoute.post('/', orderValidator, mealExist, createOrders);

ordersRoute.get('/me', getAllOrders);

ordersRoute.patch('/:id', orderExist, updateOrders);

ordersRoute.delete('/:id', orderExist, cancellOrders);

module.exports = { ordersRoute };
