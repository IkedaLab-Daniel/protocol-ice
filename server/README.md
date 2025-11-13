# Protocol-Ice Server 🧊

A RESTful API backend server for the Protocol-Ice MERN stack application. Track positive and negative votes with user authentication and statistics.

## 🚀 Features

- ✅ **User Authentication** - JWT-based authentication system
- ✅ **Vote Management** - Create, read, and delete votes
- ✅ **User Statistics** - Track voting patterns with daily breakdowns
- ✅ **Role-Based Access** - User and admin roles with protected routes
- ✅ **MongoDB Integration** - Mongoose ODM for database operations
- ✅ **Request Logging** - Morgan middleware for HTTP request logging
- ✅ **Error Handling** - Centralized error handling middleware

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── voteController.js     # Vote business logic
├── middlewares/
│   └── auth.js               # JWT authentication & authorization
├── models/
│   ├── User.js               # User schema and model
│   └── Vote.js               # Vote schema and model
├── routes/
│   ├── auth.js               # Authentication routes
│   └── votes.js              # Vote routes
├── .env                      # Environment variables (not in git)
├── .env.example              # Example environment variables
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies
├── server.js                 # Main application entry point
└── README.md                 # This file
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Logging**: Morgan
- **Environment**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Protocol-Ice/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/protocol-ice
   # Or use MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/protocol-ice

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d

   # CORS Configuration 
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the server**
   
   Development mode with auto-reload:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

   You should see:
   ```
   ╔════════════════════════════════════════════╗
   ║                                            ║
   ║         ⚡ LET'S GOOOO! ⚡                 ║
   ║                                            ║
   ║              ༼ つ ◕_◕ ༽つ                  ║
   ║                                            ║
   ║      Ready to build random sht! 🔥         ║
   ║       Port 3000 is now ALIVE!              ║
   ║                                            ║
   ║           ♪┏(・o･)┛♪┗ ( ･o･) ┓♪            ║
   ║                                            ║
   ╚════════════════════════════════════════════╝

                       ╱|、
                     (˚ˎ 。7  
                      |、˜〵          
                     じしˍ,)ノ
   ```

## 📡 API Endpoints

### Health Check

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/health` | Public | Check if server is running |

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user profile |

### Votes

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/votes` | Private | Create a new vote |
| GET | `/api/votes` | Private/Admin | Get all votes (admin only) |
| GET | `/api/votes/my-votes` | Private | Get current user's votes |
| GET | `/api/votes/stats` | Private | Get user's vote statistics |
| DELETE | `/api/votes/:id` | Private | Delete a vote (owner only) |

## 🔐 Authentication

### Register a New User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <your_token>
```

## 📊 Vote Management

### Create a Vote

```http
POST /api/votes
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "type": "positive",
  "label": "Completed project milestone"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "type": "positive",
    "label": "Completed project milestone",
    "score": 1,
    "timestamp": "2025-11-14T10:30:00.000Z",
    "createdAt": "2025-11-14T10:30:00.000Z",
    "updatedAt": "2025-11-14T10:30:00.000Z"
  }
}
```

### Get My Votes

```http
GET /api/votes/my-votes
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `startDate` (optional): Filter votes from this date (YYYY-MM-DD)
- `endDate` (optional): Filter votes until this date (YYYY-MM-DD)

### Get Vote Statistics

```http
GET /api/votes/stats?period=today
Authorization: Bearer <your_token>
```

**Query Parameters:**
- `period`: `today` (default), `week`, `month`, or `all`

**Response:**
```json
{
  "success": true,
  "data": {
    "period": "today",
    "totalScore": 5,
    "positiveCount": 7,
    "negativeCount": 2,
    "totalVotes": 9,
    "labelCounts": {
      "Completed project milestone": 3,
      "Fixed bug": 2
    },
    "dailyBreakdown": [
      {
        "date": "2025-11-14",
        "positive": 7,
        "negative": 2,
        "total": 5
      }
    ]
  }
}
```

### Delete a Vote

```http
DELETE /api/votes/:id
Authorization: Bearer <your_token>
```

## 🔒 Authorization

### Protected Routes
Routes that require authentication use the `protect` middleware. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### Admin Routes
Some routes require admin privileges. These use both `protect` and `admin` middleware:
- `GET /api/votes` - View all users' votes

To create an admin user, manually update the user's role in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## 📝 Data Models

### User Model
```javascript
{
  username: String (required, unique, min: 3 chars),
  email: String (required, unique, validated),
  password: String (required, min: 6 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true
}
```

### Vote Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  type: String (enum: ['positive', 'negative'], required),
  label: String (optional, max: 200 chars),
  score: Number (required, 1 for positive, -1 for negative),
  timestamp: Date (default: now),
  timestamps: true
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:3000/health

# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create vote (replace TOKEN with actual token)
curl -X POST http://localhost:3000/api/votes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"type":"positive","label":"Finished task"}'
```

### Using VS Code REST Client

Install the REST Client extension and create a `.http` file:

```http
### Register User
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}

### Login
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

### Create Vote
POST http://localhost:3000/api/votes
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "type": "positive",
  "label": "Completed milestone"
}

### Get My Votes
GET http://localhost:3000/api/votes/my-votes
Authorization: Bearer <your_token>

### Get Stats
GET http://localhost:3000/api/votes/stats?period=today
Authorization: Bearer <your_token>
```

## 🚨 Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## 🔍 Logging

HTTP requests are logged using Morgan in development mode. You'll see logs like:

```
GET /api/votes/my-votes 200 15.648 ms - 1234
POST /api/votes 201 25.123 ms - 567
```

## 🔐 Security Best Practices

- ✅ Passwords are hashed using bcryptjs (10 salt rounds)
- ✅ JWT tokens for stateless authentication
- ✅ Sensitive fields (password) excluded from query results by default
- ✅ Environment variables for sensitive configuration
- ✅ Input validation using Mongoose schemas
- ✅ CORS configuration for frontend integration

## 🚀 Deployment

### Environment Variables for Production

Make sure to update these in production:
```env
NODE_ENV=production
MONGODB_URI=<your_production_mongodb_uri>
JWT_SECRET=<strong_random_secret>
CLIENT_URL=<your_frontend_url>
```

### Recommended Hosting Platforms

- **Backend**: Railway, Render, Heroku, DigitalOcean
- **Database**: MongoDB Atlas (free tier available)

## 📄 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with nodemon |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

ISC

## 👨‍💻 Author

Mark Daniel Callejas

---

**Happy Coding!** ༼ つ ◕_◕ ༽つ 🔥
