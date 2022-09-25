const { Users } = require('../models/users.models');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    };
};

const protectSession = catchAsync(async (req, res, next) => {

        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid session',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Users.findOne({
            where: { id: decoded.id, status: 'active' },
        });

        if (!user) {
            return res.status(403).json({
                status: 'error',
                message: 'The owner of the session is no longer active',
            });
        }

        req.sessionUser = user;

        next();
});

const protectUsersAccount = (req, res, next) => {
    const { sessionUser, user } = req;

    if (sessionUser.id !== user.id) {
        return res.status(403).json({
            status: 'error',
            message: 'You are not the owner of this account',
        });
    }

    next();
};

module.exports = { protectSession, protectUsersAccount };