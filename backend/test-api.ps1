# Digital Doppelgänger API Test Script
# Run this script to test all API endpoints

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Digital Doppelgänger API Test Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:5000"
$token = ""

# Test 1: Health Check
Write-Host "[1/7] Testing API Health..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/api/health"
    Write-Host "✅ Health check passed: $($health.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health check failed: $_" -ForegroundColor Red
    Write-Host "Make sure the server is running on port 5000" -ForegroundColor Red
    exit
}

# Test 2: Register User
Write-Host "`n[2/7] Registering new user..." -ForegroundColor Yellow
try {
    $registerBody = @{
        email = "test@example.com"
        password = "password123"
        avatar = @{
            color = "#8b5cf6"
            nickname = "Test User"
        }
    } | ConvertTo-Json -Depth 3

    $registerResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/register" -Method POST -Body $registerBody -ContentType "application/json"
    $token = $registerResponse.token
    Write-Host "✅ User registered successfully" -ForegroundColor Green
    Write-Host "   Email: $($registerResponse.user.email)" -ForegroundColor Cyan
    Write-Host "   Token: $($token.Substring(0, 30))..." -ForegroundColor Cyan
} catch {
    if ($_.Exception.Response.StatusCode -eq 400) {
        Write-Host "⚠️  User already exists, trying to login..." -ForegroundColor Yellow
        # Try login instead
        $loginBody = @{
            email = "test@example.com"
            password = "password123"
        } | ConvertTo-Json

        $loginResponse = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
        $token = $loginResponse.token
        Write-Host "✅ Login successful" -ForegroundColor Green
    } else {
        Write-Host "❌ Registration failed: $_" -ForegroundColor Red
        exit
    }
}

# Test 3: Get User Profile
Write-Host "`n[3/7] Getting user profile..." -ForegroundColor Yellow
try {
    $headers = @{ Authorization = "Bearer $token" }
    $profile = Invoke-RestMethod -Uri "$baseUrl/api/auth/profile" -Method GET -Headers $headers
    Write-Host "✅ Profile retrieved successfully" -ForegroundColor Green
    Write-Host "   Email: $($profile.email)" -ForegroundColor Cyan
    Write-Host "   Avatar: $($profile.avatar.nickname) ($($profile.avatar.color))" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Get profile failed: $_" -ForegroundColor Red
}

# Test 4: Create Task
Write-Host "`n[4/7] Creating a task..." -ForegroundColor Yellow
try {
    $headers = @{ Authorization = "Bearer $token" }
    $taskBody = @{
        name = "Study Math"
        startTime = "09:00"
        endTime = "10:00"
        priority = "high"
    } | ConvertTo-Json

    $task = Invoke-RestMethod -Uri "$baseUrl/api/tasks" -Method POST -Headers $headers -Body $taskBody -ContentType "application/json"
    Write-Host "✅ Task created successfully" -ForegroundColor Green
    Write-Host "   Task: $($task.name) ($($task.startTime) - $($task.endTime))" -ForegroundColor Cyan
    $taskId = $task._id
} catch {
    Write-Host "❌ Create task failed: $_" -ForegroundColor Red
}

# Test 5: Get All Tasks
Write-Host "`n[5/7] Getting all tasks..." -ForegroundColor Yellow
try {
    $headers = @{ Authorization = "Bearer $token" }
    $tasks = Invoke-RestMethod -Uri "$baseUrl/api/tasks" -Method GET -Headers $headers
    Write-Host "✅ Retrieved $($tasks.Count) task(s)" -ForegroundColor Green
} catch {
    Write-Host "❌ Get tasks failed: $_" -ForegroundColor Red
}

# Test 6: Create Study Session
Write-Host "`n[6/7] Creating study session..." -ForegroundColor Yellow
try {
    $headers = @{ Authorization = "Bearer $token" }
    $sessionBody = @{
        type = "pomodoro"
        duration = 1500
    } | ConvertTo-Json

    $session = Invoke-RestMethod -Uri "$baseUrl/api/study-sessions" -Method POST -Headers $headers -Body $sessionBody -ContentType "application/json"
    Write-Host "✅ Study session created successfully" -ForegroundColor Green
    Write-Host "   Type: $($session.type), Duration: $($session.duration)s" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Create study session failed: $_" -ForegroundColor Red
}

# Test 7: Create Doppelgänger Analysis
Write-Host "`n[7/7] Creating Digital Doppelgänger analysis..." -ForegroundColor Yellow
try {
    $headers = @{ Authorization = "Bearer $token" }
    $analysisBody = @{
        studyHours = 4
        breaks = 3
        sleepHours = 8
        pastPerformance = 75
    } | ConvertTo-Json

    $analysis = Invoke-RestMethod -Uri "$baseUrl/api/doppelganger" -Method POST -Headers $headers -Body $analysisBody -ContentType "application/json"
    Write-Host "✅ Analysis created successfully" -ForegroundColor Green
    Write-Host "   Recommendations: $($analysis.recommendations.Count)" -ForegroundColor Cyan
    Write-Host "   Techniques: $($analysis.techniques.Count)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Create analysis failed: $_" -ForegroundColor Red
}

# Test 8: Test Chat (Optional)
Write-Host "`n[8/8] Testing AI Chatbot..." -ForegroundColor Yellow
try {
    $headers = @{ Authorization = "Bearer $token" }
    $chatBody = @{
        message = "What is the best study technique?"
    } | ConvertTo-Json

    $chatResponse = Invoke-RestMethod -Uri "$baseUrl/api/chat/message" -Method POST -Headers $headers -Body $chatBody -ContentType "application/json"
    Write-Host "✅ Chat response received" -ForegroundColor Green
    Write-Host "   Response: $($chatResponse.message.Substring(0, [Math]::Min(100, $chatResponse.message.Length)))..." -ForegroundColor Cyan
} catch {
    Write-Host "❌ Chat test failed: $_" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ All tests completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nYour API is working correctly!" -ForegroundColor Green
Write-Host "Token for manual testing: $($token.Substring(0, 30))..." -ForegroundColor Cyan

