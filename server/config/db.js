const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI || 'mongodb://localhost:27017/skillswap';

        try {
            // Try connecting to the provided URI first with a short timeout
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        } catch (err) {
            console.log('Could not connect to local MongoDB. Starting in-memory database...');
            console.log('This may take a moment to download the binary...');

            const mongod = await MongoMemoryServer.create();
            uri = mongod.getUri();

            await mongoose.connect(uri);
            console.log(`MongoDB In-Memory Connected: ${mongoose.connection.host}`);

            // Log the URI for debugging
            console.log(`In-Memory URI: ${uri}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
