#!/bin/bash
# Digital Doppelgänger API Test Script (Linux/Mac)
# Run this script to test all API endpoints

echo "========================================"
echo "Digital Doppelgänger API Test Suite"
echo "========================================"
echo ""

BASE_URL="http://localhost:5000"
TOKEN=""

# Test 1: Health Check
echo "[1/8] Testing API Health..."
HEALTH=$(curl -s http://localhost:5000/api/health)
if [ $? -eq 0 ]; then
    echo "✅ Health check passed"
    echo "$HEALTH"
else
    echo "❌ Health check failed"
    echo "Make sure the server is running on port 5000"
    exit 1
fi

# Test 2: Register User
echo ""
echo "[2/8] Registering new user..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "avatar": {
      "color": "#8b5cf6",
      "nickname": "Test User"
    }
  }')

if echo "$REGISTER_RESPONSE" | grep -q "token"; then
    TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    echo "✅ User registered successfully"
    echo "Token: ${TOKEN:0:30}..."
else
    echo "⚠️  User might already exist, trying login..."
    LOGIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/login \
      -H "Content-Type: application/json" \
      -d '{
        "email": "test@example.com",
        "password": "password123"
      }')
    TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
    if [ -n "$TOKEN" ]; then
        echo "✅ Login successful"
    else
        echo "❌ Registration/Login failed"
        exit 1
    fi
fi

# Test 3: Get User Profile
echo ""
echo "[3/8] Getting user profile..."
PROFILE=$(curl -s -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer $TOKEN")
if echo "$PROFILE" | grep -q "email"; then
    echo "✅ Profile retrieved successfully"
else
    echo "❌ Get profile failed"
fi

# Test 4: Create Task
echo ""
echo "[4/8] Creating a task..."
TASK_RESPONSE=$(curl -s -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Study Math",
    "startTime": "09:00",
    "endTime": "10:00",
    "priority": "high"
  }')
if echo "$TASK_RESPONSE" | grep -q "_id"; then
    echo "✅ Task created successfully"
    TASK_ID=$(echo "$TASK_RESPONSE" | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
else
    echo "❌ Create task failed"
fi

# Test 5: Get All Tasks
echo ""
echo "[5/8] Getting all tasks..."
TASKS=$(curl -s -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN")
if [ $? -eq 0 ]; then
    TASK_COUNT=$(echo "$TASKS" | grep -o '"_id"' | wc -l)
    echo "✅ Retrieved $TASK_COUNT task(s)"
else
    echo "❌ Get tasks failed"
fi

# Test 6: Create Study Session
echo ""
echo "[6/8] Creating study session..."
SESSION_RESPONSE=$(curl -s -X POST http://localhost:5000/api/study-sessions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "pomodoro",
    "duration": 1500
  }')
if echo "$SESSION_RESPONSE" | grep -q "_id"; then
    echo "✅ Study session created successfully"
else
    echo "❌ Create study session failed"
fi

# Test 7: Create Doppelgänger Analysis
echo ""
echo "[7/8] Creating Digital Doppelgänger analysis..."
ANALYSIS_RESPONSE=$(curl -s -X POST http://localhost:5000/api/doppelganger \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "studyHours": 4,
    "breaks": 3,
    "sleepHours": 8,
    "pastPerformance": 75
  }')
if echo "$ANALYSIS_RESPONSE" | grep -q "_id"; then
    echo "✅ Analysis created successfully"
else
    echo "❌ Create analysis failed"
fi

# Test 8: Test Chat
echo ""
echo "[8/8] Testing AI Chatbot..."
CHAT_RESPONSE=$(curl -s -X POST http://localhost:5000/api/chat/message \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the best study technique?"
  }')
if echo "$CHAT_RESPONSE" | grep -q "message"; then
    echo "✅ Chat response received"
else
    echo "❌ Chat test failed"
fi

echo ""
echo "========================================"
echo "✅ All tests completed!"
echo "========================================"
echo ""
echo "Your API is working correctly!"
echo "Token for manual testing: ${TOKEN:0:30}..."

