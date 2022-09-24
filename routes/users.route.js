const express = require('express');

const usersRoute = express.Router();

//Middlewares
const { createUserValidator, loginValidator, updateUserValidator } = require('../middlewares/validators.middlewares');
const { userExists } = require('../middlewares/users.middlewares');
const { protectSession, protectUsersAccount } = require('../middlewares/auth.middlewares');

//Controllers
const { createUser, login, updateUser, deleteUser, getAllUsers, getUserOrders } = require('../controllers/users.controller');

//Routes
usersRoute.post('/', createUserValidator, createUser);

usersRoute.post('/login', loginValidator, login);

usersRoute.use(protectSession);

usersRoute.patch( '/:id', updateUserValidator, userExists, protectUsersAccount, updateUser );

usersRoute.delete('/:id', userExists, protectUsersAccount, deleteUser);

usersRoute.get('/orders', getAllUsers);

usersRoute.get('/orders/:id', getUserOrders);

module.exports = { usersRoute };