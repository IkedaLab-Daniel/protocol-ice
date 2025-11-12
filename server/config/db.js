const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`
        |---- MongoDB Connected: ${conn.connection.host} ----|
        |                   ╱|、               |
        |                 (˚ˎ 。7              |
        |                  |、˜〵              |
        |                 じしˍ,)ノ            |
        |--------------------------------------|
        `);
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;