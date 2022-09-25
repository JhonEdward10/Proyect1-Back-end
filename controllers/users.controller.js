const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//Models
const { Users } = require('../models/users.models');
const { Orders } = require('../models/orders.models');
const { Meals } = require('../models/meals.models');
const { Restaurants } = require('../models/restaurants.models');

dotenv.config({ path: './config.env' });

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Encrypt the password
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            name,
            email, 
            password: hashedPassword
        });

        //Remove password from response
        newUser.password = undefined;

        //201 --> Success and a resource has been created
        res.status(201).json({
            status: 'sucess',
            data: { newUser }
        });
        
    } catch (error) {
        console.log(error);
    }

};

const login = async (req, res) => {
    try {
        //Get email and password from req.body
        const { email, password } = req.body;

        //Validate if user exists with given email
        const user = await Users.findOne({
            where: { email, status: 'active' }
        });

        // Compare passwords (entered password vs db password)
		// If user doesn't exists or passwords doesn't match, send error
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({
                status: 'error',
                messagge: 'Invalid Credentials'
            });
        };

        // Remove password from response
        user.password = undefined;

        // Generate JWT (payload, secretOrPrivateKey, options)
        const token = jwt.sign(
            { id: user.id },
             process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            status: 'success',
            data: { user, token }
        });

    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { user } = req;

        await user.update({ name, email });

        res.status(200).json({
            status: 'success',
            data: { user }
        });
        
    } catch (error) {
        console.log(error);
    }

};

const deleteUser = async (req, res) => {
    try {
        const { user } = req;
        
        //Soft delete
        await user.update({ status: 'disabled' });

        res.status(204).json({
            status: 'success'
        });
        
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { sessionUser } = req;

        const orders = await Orders.findAll({
            where: { userId: sessionUser.id },
            attributes: { exclude: [ 'createdAt','updatedAt'] },
            include: 
                {
                    model: Meals,
                    attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                    include:
                    {
                        model: Restaurants,
                        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
                    }
                }
        });

        res.status(200).json({
            status: 'success',
            data: { orders }
        });

    } catch (error) {
        console.log(error);
    }

};

const getUserOrders = async (req, res) => {
    try {
    const { sessionUser } = req;
    const { id } = req.params;

    const order = await Orders.findOne({
        where: { id, userId: sessionUser.id },
        attributes: { exclude: [ 'createdAt','updatedAt'] },
        include: 
                {
                    model: Meals,
                    attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
                    include:
                    {
                        model: Restaurants,
                        attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
                    }
                }
    });

    res.status(200).json({
        status: 'success',
        data: { order }
    });
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createUser, login, updateUser, deleteUser, getAllUsers, getUserOrders };