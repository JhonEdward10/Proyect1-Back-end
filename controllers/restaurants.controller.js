const { Restaurants } = require('../models/restaurants.models');
const { Reviews } = require('../models/reviews.models');

//Utils
const { catchAsync } = require('../utils/catchAsync.util');

const createRestaurants = catchAsync( async (req, res, next) => {
    const { name, address, rating } = req.body;

    const restaurant = await Restaurants.create({
        name,
        address, 
        rating
    }); 

    //201 --> Success and a resource has been created
    res.status(201).json({
        status: 'success',
        data: { restaurant }
    });
});

const getRestaurants = catchAsync( async (req, res, next) => {
        const restaurants = await Restaurants.findAll({
            where: { status: 'active' },
            include: Reviews
        });

        res.status(200).json({
            status: 'success',
            data: { restaurants }
        });
});

const getRestaurantsId = catchAsync( async (req, res, next) => {
        const { restaurant } = req;

        res.status(200).json({
            status: 'success',
            data: { restaurant }
        });
});

const updateRestaurants = catchAsync( async (req, res, next) => {
        const { name, address } = req.body;
        const { restaurant } = req;
    
        await restaurant.update({ name, address });

        res.status(200).json({
            status: 'success',
            data: { restaurant }
        });
});

const deleteRestaurant = catchAsync( async (req, res, next) => {
        const { restaurant } = req;

        await restaurant. update({ status: 'disabled' });

        res.status(204).json({
            status: 'success'
        });
});

const createRestaurantReviews = catchAsync( async (req, res, next) => {
        const { restaurantId } = req.params;
        const { comment, rating } = req.body;
        const { sessionUser } = req;

        const validId = Number(restaurantId);

        const review = await Reviews.create({
            userId: sessionUser.id,
            comment,
            restaurantId: validId,
            rating
        });

        res.status(201).json({
            status: 'success',
            data: { review }
        });
});

const updateRestaurantReviews = catchAsync( async (req, res, next) => {
        const { id } = req.params;
        const { comment, rating } = req.body;
        const { review } = req;

        await review.update({ comment, rating });

        res.status(200).json({
            status: 'succcess',
            data: { review }
        });
});

const deleteRestaurantReviews = catchAsync( async (req, res, next) => {
        const { review } = req;

        await review.update({ status: 'deleted' });

        res.status(204).json({
            status: 'success',
        });
});

module.exports = { createRestaurants, getRestaurants, getRestaurantsId, updateRestaurants, deleteRestaurant, createRestaurantReviews, updateRestaurantReviews, deleteRestaurantReviews };
