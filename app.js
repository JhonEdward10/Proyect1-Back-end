const express = require('express');

//Init our Express app
const app = express();

//Enable Express app to receive JSON data 
app.use(express.json());

//Routes
const { usersRoute } = require('./routes/users.route');
const { restaurantsRoute } = require('./routes/restaurants.route');
const { ordersRoute } = require('./routes/orders.route');
const { mealsRoute } = require('./routes/meals.route');

app.use('/api/v1/users', usersRoute );
app.use('/api/v1/restaurants', restaurantsRoute );
app.use('/api/v1/meals', mealsRoute );
app.use('/api/v1/orders', ordersRoute );

//Global Error Handler
app.use((error, req, res, next) => {
	res.status(400).json({
		status: 'error',
		message: error.message,
		error,
	});
});

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };