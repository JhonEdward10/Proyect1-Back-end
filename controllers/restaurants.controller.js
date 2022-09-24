const { Restaurants } = require('../models/restaurants.models');
const { Reviews } = require('../models/reviews.models');

const createRestaurants = async (req, res) => {
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
};

const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.findAll({
            where: { status: 'active' },
            include: Reviews
        });

        res.status(200).json({
            status: 'success',
            data: { restaurants }
        });

    } catch (error) {
        console.log(error);
    }
};

const getRestaurantsId = async (req, res) => {
    try {
        const { restaurant } = req;

        res.status(200).json({
            status: 'success',
            data: { restaurant }
        });
        
    } catch (error) {
        console.log(error);
    }
};

const updateRestaurants = async (req, res) => {
    try {
        const { name, address } = req.body;
        const { restaurant } = req;
    
        await restaurant.update({ name, address });

        res.status(200).json({
            status: 'success',
            data: { restaurant }
        });
    
    } catch (error) {
        console.log(error);    
    }
};

const deleteRestaurant = async (req, res) => {
    try {
        const { restaurant } = req;

        await restaurant. update({ status: 'disabled' });

        res.status(204).json({
            status: 'success'
        });

    } catch (error) {
        console.log(error);
    }
};

const createRestaurantReviews = async (req, res) => {
    try {
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

        res.stauts(201).json({
            status: 'success',
            data: { review }
        });

    } catch (error) {
        console.log(error);
    }
};

const updateRestaurantReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, rating } = req.body;
        const { review } = req;

        await review.update({ comment, rating });

        res.status(200).json({
            status: 'succcess',
            data: { review }
        });

    } catch (error) {
        console.log(error);
    }
};

const deleteRestaurantReviews = async (req, res) => {
    try {
        const { review } = req;

        await review.update({ status: 'deleted' });

        res.status(204).json({
            status: 'success',
        });

    } catch (error) {
        
    }
};

module.exports = { createRestaurants, getRestaurants, getRestaurantsId, updateRestaurants, deleteRestaurant, createRestaurantReviews, updateRestaurantReviews, deleteRestaurantReviews };
