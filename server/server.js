const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const votesRoute = require('./routes/votes');
const authRoute = require('./routes/auth')

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'))

// > CORS Configuration - Allow all origins
app.use(cors({
    origin: '*',
    credentials: false
}))

// > Middleware
app.use(express.json());

// > Routes
// ? Vote Route
app.use('/api/votes', votesRoute);
// ? Auth Route
app.use('/api/auth', authRoute);

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

app.listen(PORT, '0.0.0.0', () => {
    connectDB();
    console.log(`
        ╔════════════════════════════════════════════╗
        ║                                            ║
        ║         ⚡ LET'S GOOOO! ⚡                 ║
        ║                                            ║
        ║              ༼ つ ◕_◕ ༽つ                  ║
        ║                                            ║
        ║      Ready to build random sht! 🔥         ║
        ║       Port ${PORT} is now ALIVE!              ║
        ║                                            ║
        ║           ♪┏(・o･)┛♪┗ ( ･o･) ┓♪            ║
        ║                                            ║
        ╚════════════════════════════════════════════╝
    `);
});