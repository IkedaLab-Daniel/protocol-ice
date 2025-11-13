const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`
        ╔════════════════════════════════════════════╗
        ║   ✨ MongoDB Connected Successfully! ✨    ║
        ║                                            ║
        ║            /\\_/\\                           ║
        ║           ( o.o )   ~meow~                 ║
        ║            > ^ <                           ║
        ║           /|   |\\                          ║
        ║          (_|   |_)                         ║
        ║                                            ║
        ║   Host: ${conn.connection.host.padEnd(31)}    ║
        ╚════════════════════════════════════════════╝
        `);
    } catch (error) {
       console.error(`
        ╔════════════════════════════════════════════╗
        ║   ❌ Database Connection Error ❌          ║
        ║                                            ║
        ║            /\\_/\\                           ║
        ║           ( >.< )   *sad meow*             ║
        ║            > ⌓ <                           ║
        ║                                            ║
        ║   ${error.message.padEnd(42)} ║
        ╚════════════════════════════════════════════╝
        `);
        process.exit(1);
    }
}

module.exports = connectDB;