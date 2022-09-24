//Models
const { Users } = require('../models/users.models');

const userExists = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await Users.findOne({
            attributes: { exclude: ['password'] },
            where: { id, status: 'active' }
        });

        // If user doesn't exist, send error message
        if(!user){
            return res.status(404).json({
                status: 'error',
                messagge: `User with ID ${id} doesn't exists or your status are inactive`
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
    }
};

module.exports = { userExists }; 