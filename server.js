const { app } = require('./app');
const dotenv = require('dotenv');

//Utils
const { db } = require('./utils/database.util');

dotenv.config({ path: './config.env' });

const { initialModels } = require('./models/initial.models');

const startServer = async () => {
    try {
        await db.authenticate().then(console.log('Database Authenticated'));

        initialModels();

        //Establish the relations between models
        
        await db.sync().then(console.log('Database Synchronized'));

        //Set server to listen
        const PORT = 4000;

        app.listen(PORT, () => {
            console.log('Express app running!!!');
        });
        
    } catch (error) {
        console.log(error);
    }

};

startServer();