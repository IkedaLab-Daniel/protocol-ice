const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const votesRoute = require('./routes/votes');
const authRoute = require('./routes/auth')
const { globalLimiter, authLimiter, voteLimiter } = require('./middlewares/rateLimiter');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

// If behind a proxy (Nginx, ALB), trust proxy to get correct client IP
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use(morgan('dev'))

// > CORS Configuration - MUST be before rate limiters for proper error responses
app.use(cors({
    origin: '*',
    credentials: false
}))

// > Middleware
app.use(express.json());

// Apply global rate limiter AFTER CORS
app.use(globalLimiter)

// > Routes with specific rate limiters
// ? Auth Route - Strict rate limiting
app.use('/api/auth', authLimiter, authRoute);
// ? Vote Route - Moderate rate limiting
app.use('/api/votes', voteLimiter, votesRoute);

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