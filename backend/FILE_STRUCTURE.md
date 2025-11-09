# 📁 Backend File Structure Reference

## Complete File Structure

```
backend/
├── config/
│   └── database.js              # MongoDB connection configuration
│
├── controllers/                  # Business logic for each route
│   ├── activityController.js    # Activity CRUD operations
│   ├── authController.js        # Authentication (register, login, avatar)
│   ├── chatController.js        # AI chatbot functionality
│   ├── doppelgangerController.js # Digital Doppelgänger analysis
│   ├── scheduleController.js     # Schedule management
│   ├── studySessionController.js # Study session tracking
│   └── taskController.js         # Task management
│
├── middleware/
│   └── auth.js                   # JWT authentication middleware
│
├── models/                       # MongoDB schemas
│   ├── Activity.js              # Daily activity records
│   ├── Chat.js                  # Chat conversation history
│   ├── DoppelgangerAnalysis.js  # AI analysis and recommendations
│   ├── Schedule.js              # Schedule with tasks
│   ├── StudySession.js          # Pomodoro/infinity sessions
│   ├── Task.js                  # Individual tasks
│   └── User.js                  # User accounts with avatars
│
├── routes/                       # API route definitions
│   ├── activityRoutes.js        # /api/activities endpoints
│   ├── authRoutes.js            # /api/auth endpoints
│   ├── chatRoutes.js            # /api/chat endpoints
│   ├── doppelgangerRoutes.js    # /api/doppelganger endpoints
│   ├── scheduleRoutes.js        # /api/schedules endpoints
│   ├── studySessionRoutes.js    # /api/study-sessions endpoints
│   └── taskRoutes.js             # /api/tasks endpoints
│
├── .env                          # Environment variables (CREATE THIS)
├── .gitignore                    # Git ignore file
├── env.template                  # Template for .env file
├── package.json                  # Dependencies and scripts
├── server.js                     # Main Express server file
├── test-api.ps1                  # Test script (Windows PowerShell)
├── test-api.sh                   # Test script (Linux/Mac)
├── README.md                     # API documentation
├── QUICKSTART.md                 # Quick start guide
├── SETUP_GUIDE.md                # Detailed setup guide
└── FILE_STRUCTURE.md             # This file
```

## File Descriptions

### Core Files

#### `server.js`
- Main Express server entry point
- Sets up middleware (CORS, JSON parsing)
- Connects to MongoDB
- Registers all API routes
- Starts the server on port 5000 (or from .env)

#### `package.json`
- Lists all dependencies
- Defines npm scripts (`npm run dev`, `npm start`)
- Project metadata

#### `.env` (CREATE THIS FILE)
- Environment variables:
  - `PORT` - Server port (default: 5000)
  - `MONGODB_URI` - MongoDB connection string
  - `JWT_SECRET` - Secret key for JWT tokens
  - `NODE_ENV` - Environment (development/production)
  - `OPENAI_API_KEY` - Optional OpenAI API key

### Configuration

#### `config/database.js`
- MongoDB connection using Mongoose
- Handles connection errors
- Exports connection function

### Models (MongoDB Schemas)

#### `models/User.js`
- User account schema
- Email, password (hashed), avatar
- Password hashing with bcrypt

#### `models/Task.js`
- Task schema with name, times, priority
- Time tracking (timeSpent in seconds)
- Linked to user via userId

#### `models/Schedule.js`
- Schedule with multiple tasks
- Can be generated or manually created
- Linked to user via userId

#### `models/StudySession.js`
- Pomodoro or infinity timer sessions
- Tracks duration and completion
- Linked to user via userId

#### `models/Activity.js`
- Daily activity records
- Study hours, scores, breaks, sleep
- Linked to user via userId

#### `models/DoppelgangerAnalysis.js`
- AI analysis results
- Simulated outcomes
- Recommendations and techniques
- Graph data for visualization

#### `models/Chat.js`
- Chat conversation history
- Messages with user and assistant roles
- Links and resources

### Controllers (Business Logic)

#### `controllers/authController.js`
- `register` - Create new user account
- `login` - Authenticate user
- `updateAvatar` - Update avatar color/nickname
- `getProfile` - Get user profile

#### `controllers/taskController.js`
- `getTasks` - Get all user tasks
- `createTask` - Create new task
- `updateTask` - Update task
- `deleteTask` - Delete task
- `updateTimeSpent` - Update time spent on task

#### `controllers/scheduleController.js`
- `getSchedules` - Get all schedules
- `createSchedule` - Create schedule
- `generateSchedule` - Generate schedule from tasks
- `getSchedule` - Get specific schedule
- `updateSchedule` - Update schedule
- `deleteSchedule` - Delete schedule

#### `controllers/studySessionController.js`
- `createStudySession` - Create session
- `updateStudySession` - Update session
- `getStudySessions` - Get all sessions
- `getStudyStats` - Get statistics

#### `controllers/activityController.js`
- `getActivities` - Get all activities
- `createActivity` - Create activity
- `updateActivity` - Update activity
- `deleteActivity` - Delete activity
- `getActivityStats` - Get statistics

#### `controllers/doppelgangerController.js`
- `createAnalysis` - Create AI analysis
- `getAnalyses` - Get all analyses
- `getLatestAnalysis` - Get latest analysis
- `simulateScenario` - Simulate different scenarios

#### `controllers/chatController.js`
- `sendMessage` - Send message to AI chatbot
- `getChatHistory` - Get chat history
- `clearChat` - Clear chat history

### Middleware

#### `middleware/auth.js`
- JWT authentication middleware
- Verifies token from Authorization header
- Extracts userId and adds to request
- Used by all protected routes

### Routes (API Endpoints)

#### `routes/authRoutes.js`
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (protected)
- `PUT /api/auth/avatar` - Update avatar (protected)

#### `routes/taskRoutes.js` (All protected)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/time` - Update time spent

#### `routes/scheduleRoutes.js` (All protected)
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Create schedule
- `POST /api/schedules/generate` - Generate schedule
- `GET /api/schedules/:id` - Get schedule
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

#### `routes/studySessionRoutes.js` (All protected)
- `GET /api/study-sessions` - Get all sessions
- `GET /api/study-sessions/stats` - Get statistics
- `POST /api/study-sessions` - Create session
- `PUT /api/study-sessions/:id` - Update session

#### `routes/activityRoutes.js` (All protected)
- `GET /api/activities` - Get all activities
- `GET /api/activities/stats` - Get statistics
- `POST /api/activities` - Create activity
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

#### `routes/doppelgangerRoutes.js` (All protected)
- `GET /api/doppelganger` - Get all analyses
- `GET /api/doppelganger/latest` - Get latest analysis
- `POST /api/doppelganger` - Create analysis
- `POST /api/doppelganger/simulate` - Simulate scenario

#### `routes/chatRoutes.js` (All protected)
- `GET /api/chat` - Get chat history
- `POST /api/chat/message` - Send message
- `DELETE /api/chat` - Clear chat

### Test Scripts

#### `test-api.ps1` (Windows PowerShell)
- Automated test script for all endpoints
- Tests registration, login, tasks, sessions, etc.
- Run with: `.\test-api.ps1`

#### `test-api.sh` (Linux/Mac)
- Same as PowerShell script but for Unix systems
- Run with: `./test-api.sh`

## API Endpoint Summary

### Public Endpoints (No Authentication)
- `GET /api/health` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Protected Endpoints (Require JWT Token)
All other endpoints require authentication:
```
Authorization: Bearer <your_jwt_token>
```

## Data Flow

1. **Request** → Express Server (`server.js`)
2. **Route** → Route file (`routes/*.js`)
3. **Authentication** → Middleware (`middleware/auth.js`) [if protected]
4. **Controller** → Controller file (`controllers/*.js`)
5. **Model** → Database model (`models/*.js`)
6. **Database** → MongoDB
7. **Response** → JSON response to client

## Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `axios` - HTTP client (for OpenAI API)

### Development Dependencies
- `nodemon` - Auto-restart server on changes

## Quick Commands

```bash
# Install dependencies
npm install

# Start server (development with auto-reload)
npm run dev

# Start server (production)
npm start

# Test API (Windows)
.\test-api.ps1

# Test API (Linux/Mac)
./test-api.sh
```

