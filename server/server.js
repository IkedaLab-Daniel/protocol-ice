const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'))

app.listen(PORT, () => {
  console.log(`Ready to build random sht`);
});