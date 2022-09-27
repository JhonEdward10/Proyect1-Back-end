//Models
const { Restaurants } = require('../models/restaurants.models');
const { Reviews } = require('../models/reviews.models');
//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const restaurantsExists = catchAsync(async (req, res, next) => {
        const { id } = req.params;

        const restaurant = await Restaurants.findOne({
            where: { id, status: 'active' },
            include: Reviews
        });

        // If restaurant doesn't exist, send error message
        if(!restaurant){
            return res.status(404).json({
                status: 'error',
                messagge: `Restaurant with ID ${id} doesn't exists or your status are inactive`
            });
        }

        req.restaurant = restaurant;
        next();
        
});

const userIsAdmin = (req, res, next) => {
    try {
        const { sessionUser } = req;

        if (sessionUser.role !== 'admin') {
            res.status(404).json({
                status: 'error',
                message: 'Just the admin user can update the restaurants',
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

const reviewExist = catchAsync (async (req, res, next) => {
        const { id } = req.params;
        const validId = Number(id);
        const review = await Reviews.findOne({
            where: { id: validId, status: 'active' },
        });

        if (!review) {
            res.status(404).json({
                status: 'error',
                message: `Review with ID: ${id} doesent exist or your status is inactive`,
            });
        }

        req.review = review;

        next();
});

const reviewOwner = (req, res, next) => {
    try {
        const { sessionUser, review } = req;

        if (sessionUser.id !== review.userId) {
            return res.status(404).json({
                status: 'error',
                message: 'You are not the review owner',
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { restaurantsExists, userIsAdmin, reviewExist, reviewOwner };