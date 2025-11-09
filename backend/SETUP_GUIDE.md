# Complete Setup and Testing Guide

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ Node.js installed (v14 or higher) - Check with: `node --version`
- ✅ npm installed - Check with: `npm --version`
- ✅ MongoDB installed and running (or MongoDB Atlas account)

## 📁 File Structure

Your project should look like this:

```
doppel-demo-main/
├── backend/                    # Backend folder
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── activityController.js
│   │   ├── authController.js
│   │   ├── chatController.js
│   │   ├── doppelgangerController.js
│   │   ├── scheduleController.js
│   │   ├── studySessionController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Activity.js
│   │   ├── Chat.js
│   │   ├── DoppelgangerAnalysis.js
│   │   ├── Schedule.js
│   │   ├── StudySession.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── activityRoutes.js
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── doppelgangerRoutes.js
│   │   ├── scheduleRoutes.js
│   │   ├── studySessionRoutes.js
│   │   └── taskRoutes.js
│   ├── .env                    # Create this file
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   ├── README.md
│   └── QUICKSTART.md
└── src/                        # Frontend folder (existing)
    └── ...
```

## 🚀 Step-by-Step Setup

### Step 1: Navigate to Backend Directory

Open your terminal/command prompt and navigate to the backend folder:

```bash
cd backend
```

### Step 2: Install Dependencies

Install all required packages:

```bash
npm install
```

**Expected output:** You should see packages being installed. Wait until it completes.

**If you see errors:**
- Make sure you're in the `backend` directory
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Step 3: Create .env File

Create a `.env` file in the `backend` directory with the following content:

**For Windows (Command Prompt):**
```cmd
cd backend
type nul > .env
```

**For Windows (PowerShell):**
```powershell
cd backend
New-Item -Path .env -ItemType File
```

**For Mac/Linux:**
```bash
cd backend
touch .env
```

Then open the `.env` file and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doppelganger
JWT_SECRET=my_super_secret_jwt_key_12345_change_this_in_production
NODE_ENV=development

# Optional: For AI Chatbot (OpenAI API)
# OPENAI_API_KEY=your_openai_api_key_here
```

**Important:**
- Replace `my_super_secret_jwt_key_12345_change_this_in_production` with a strong random string
- If using MongoDB Atlas, replace `MONGODB_URI` with your connection string
- The `OPENAI_API_KEY` is optional

### Step 4: Start MongoDB

#### Option A: Local MongoDB

**Windows:**
```cmd
# If MongoDB is installed as a service, it should start automatically
# Or start it manually:
net start MongoDB
```

**Mac (using Homebrew):**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

**Verify MongoDB is running:**
```bash
mongosh
# or
mongo
```

If you see the MongoDB shell, type `exit` to leave.

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doppelganger
   ```

### Step 5: Start the Backend Server

In the `backend` directory, run:

```bash
npm run dev
```

**Expected output:**
```
Server is running on port 5000
Environment: development
MongoDB Connected: localhost:27017
```

**If you see errors:**
- **MongoDB connection error:** Make sure MongoDB is running
- **Port already in use:** Change `PORT` in `.env` file to another number (e.g., 5001)
- **Module not found:** Run `npm install` again

### Step 6: Test the API

Open a new terminal window (keep the server running) and test the health endpoint:

**Using curl:**
```bash
curl http://localhost:5000/api/health
```

**Using PowerShell (Windows):**
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/health
```

**Or open in browser:**
```
http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "message": "Digital Doppelgänger API is running!"
}
```

## 🧪 Testing the API

### Test 1: Register a New User

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"avatar\":{\"color\":\"#8b5cf6\",\"nickname\":\"Test User\"}}"
```

**Using PowerShell:**
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
    avatar = @{
        color = "#8b5cf6"
        nickname = "Test User"
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/auth/register -Method POST -Body $body -ContentType "application/json"
```

**Expected response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "test@example.com",
    "avatar": {
      "color": "#8b5cf6",
      "nickname": "Test User"
    }
  }
}
```

**Save the token** from the response - you'll need it for authenticated requests!

### Test 2: Login

**Using PowerShell:**
```powershell
$body = @{
    email = "test@example.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/auth/login -Method POST -Body $body -ContentType "application/json"
```

### Test 3: Create a Task (Requires Authentication)

Replace `YOUR_TOKEN_HERE` with the token from registration/login:

**Using PowerShell:**
```powershell
$headers = @{
    Authorization = "Bearer YOUR_TOKEN_HERE"
}

$body = @{
    name = "Study Math"
    startTime = "09:00"
    endTime = "10:00"
    priority = "high"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/tasks -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

### Test 4: Get All Tasks

```powershell
$headers = @{
    Authorization = "Bearer YOUR_TOKEN_HERE"
}

Invoke-RestMethod -Uri http://localhost:5000/api/tasks -Method GET -Headers $headers
```

### Test 5: Create a Study Session

```powershell
$headers = @{
    Authorization = "Bearer YOUR_TOKEN_HERE"
}

$body = @{
    type = "pomodoro"
    duration = 1500
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/study-sessions -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

### Test 6: Create Digital Doppelgänger Analysis

```powershell
$headers = @{
    Authorization = "Bearer YOUR_TOKEN_HERE"
}

$body = @{
    studyHours = 4
    breaks = 3
    sleepHours = 8
    pastPerformance = 75
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/doppelganger -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

### Test 7: Test AI Chatbot

```powershell
$headers = @{
    Authorization = "Bearer YOUR_TOKEN_HERE"
}

$body = @{
    message = "What is the best study technique?"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:5000/api/chat/message -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

## 🔍 Troubleshooting

### Issue: "Cannot find module"
**Solution:** 
```bash
cd backend
npm install
```

### Issue: "MongoDB connection error"
**Solutions:**
1. Make sure MongoDB is running
2. Check your `MONGODB_URI` in `.env` file
3. For MongoDB Atlas, check your IP whitelist

### Issue: "Port 5000 already in use"
**Solution:** Change `PORT` in `.env` file to another number (e.g., 5001, 3001)

### Issue: "JWT_SECRET is required"
**Solution:** Make sure your `.env` file has `JWT_SECRET` set

### Issue: "EADDRINUSE: address already in use"
**Solution:** 
- Find and stop the process using the port
- Or change the port in `.env` file

## ✅ Verification Checklist

After setup, verify:

- [ ] Dependencies installed (`node_modules` folder exists)
- [ ] `.env` file created with correct values
- [ ] MongoDB is running
- [ ] Server starts without errors
- [ ] Health endpoint returns success
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Can create a task (with token)
- [ ] Can get tasks (with token)

## 📝 Next Steps

1. Connect your frontend to the backend API
2. Update frontend API calls to use `http://localhost:5000/api/...`
3. Store JWT tokens in frontend (localStorage or state)
4. Test all features end-to-end

## 🎯 Quick Test Script

Save this as `test-api.ps1` in the backend folder:

```powershell
# Test API Health
Write-Host "Testing API Health..." -ForegroundColor Green
$health = Invoke-RestMethod -Uri http://localhost:5000/api/health
Write-Host $health.message -ForegroundColor Cyan

# Register User
Write-Host "`nRegistering user..." -ForegroundColor Green
$registerBody = @{
    email = "test@example.com"
    password = "password123"
    avatar = @{
        color = "#8b5cf6"
        nickname = "Test User"
    }
} | ConvertTo-Json

$registerResponse = Invoke-RestMethod -Uri http://localhost:5000/api/auth/register -Method POST -Body $registerBody -ContentType "application/json"
$token = $registerResponse.token
Write-Host "Token received: $($token.Substring(0, 20))..." -ForegroundColor Cyan

# Create Task
Write-Host "`nCreating task..." -ForegroundColor Green
$headers = @{ Authorization = "Bearer $token" }
$taskBody = @{
    name = "Study Math"
    startTime = "09:00"
    endTime = "10:00"
    priority = "high"
} | ConvertTo-Json

$task = Invoke-RestMethod -Uri http://localhost:5000/api/tasks -Method POST -Headers $headers -Body $taskBody -ContentType "application/json"
Write-Host "Task created: $($task.name)" -ForegroundColor Cyan

Write-Host "`n✅ All tests passed!" -ForegroundColor Green
```

Run it with:
```powershell
.\test-api.ps1
```

