# Quick Start Guide

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doppelganger
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development

# Optional: For AI Chatbot (OpenAI API)
OPENAI_API_KEY=your_openai_api_key_here
```

**Important Notes:**
- Replace `your_jwt_secret_key_here_change_in_production` with a strong random string
- If using MongoDB Atlas, replace the `MONGODB_URI` with your connection string
- The `OPENAI_API_KEY` is optional - the chatbot will work without it but with basic responses

## Step 3: Start MongoDB

### Local MongoDB:
Make sure MongoDB is running on your system:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### MongoDB Atlas:
If using MongoDB Atlas, make sure your connection string is correct in the `.env` file.

## Step 4: Start the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server should start on `http://localhost:5000` (or the PORT you specified).

## Step 5: Test the API

You can test if the server is running by visiting:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "message": "Digital Doppelgänger API is running!"
}
```

## Testing Authentication

### Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "avatar": {
      "color": "#8b5cf6",
      "nickname": "Test User"
    }
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

The response will include a `token` that you can use for authenticated requests.

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running
- Check your `MONGODB_URI` in the `.env` file
- For MongoDB Atlas, check your IP whitelist and credentials

### Port Already in Use
- Change the `PORT` in your `.env` file
- Or stop the process using port 5000

### Module Not Found
- Make sure you ran `npm install` in the backend directory
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Next Steps

1. Connect your frontend to the backend API
2. Update your frontend to use the API endpoints
3. Test all features (tasks, schedules, study sessions, etc.)

For detailed API documentation, see [README.md](README.md).

