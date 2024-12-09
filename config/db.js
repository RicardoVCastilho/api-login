const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ursep.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log('Connected to the database');
    } catch (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;