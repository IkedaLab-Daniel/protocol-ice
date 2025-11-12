const express = require('express');
const morgan = require('morgan');

const connectDB = require('./config/db');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'))

app.listen(PORT, () => {
    connectDB();
    console.log(`Ready to build random sht`);
});

// > Routes
// ? Health Check
app.get('/health', (req, res) => {
    res.json({
        'success': true,
        'message': 'Protocol Ice Server is running',
        'timestamp': new Date().toString()
    });
});

// ? General Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

// ? 404 Error handling
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})