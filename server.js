require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const courseRoutes = require('./routes/courseRoutes');


const app = express();





// MongoDB Atlas Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected (Atlas)');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1); // Exit process with failure
    }
};


// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/quizzes', quizRoutes);


// Error Handler
app.use(errorHandler);

// Start Server

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
