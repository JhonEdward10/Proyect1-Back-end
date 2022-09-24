const { Users } = require('./users.models');
const { Restaurants } = require('./restaurants.models');
const { Meals } =require('./meals.models');
const { Orders } =require('./orders.models');
const { Reviews } = require('./reviews.models');

const initialModels = () => {
    // 1 <---> M
    Orders.hasMany(Users, { foreignKey: "userId" });
    Users.belongsTo(Orders);

    Users.hasMany(Reviews, { foreignKey: "userId" });
    Reviews.belongsTo(Users);

    Restaurants.hasMany(Reviews, { foreignKey: "restaurantId" });
    Reviews.belongsTo(Restaurants);

    Restaurants.hasMany(Meals, { foreignKey: "restaurantId" });
    Meals.belongsTo(Restaurants);

    // 1 <---> 1
    Meals.hasMany(Orders, { foreignKey: "mealId" });
    Orders.belongsTo(Meals);
};

module.exports = { initialModels };