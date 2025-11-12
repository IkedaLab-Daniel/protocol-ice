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