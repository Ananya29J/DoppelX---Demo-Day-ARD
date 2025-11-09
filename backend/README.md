# Digital Doppelgänger Backend API

Backend server for the Digital Doppelgänger platform built with Node.js, Express.js, and MongoDB.

## Features

- **User Authentication**: Register, login, and avatar management
- **Scheduler**: Task management and schedule generation
- **Study Sessions**: Track Pomodoro and infinity timer sessions
- **Activity Tracking**: Store and analyze study hours, scores, and performance
- **Digital Doppelgänger**: AI-powered analysis and recommendations
- **AI Chatbot**: Study assistant with technique recommendations (optional OpenAI integration)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Models

- **User**: User accounts with avatar information
- **Task**: Individual tasks with time tracking
- **Schedule**: Complete schedules with multiple tasks
- **StudySession**: Pomodoro and infinity timer sessions
- **Activity**: Daily activity records with scores
- **DoppelgangerAnalysis**: AI analysis and recommendations
- **Chat**: Chat history with AI assistant

## Notes

- The AI chatbot works without OpenAI API key but provides basic responses. For enhanced AI responses, add your OpenAI API key to the `.env` file.
- All timestamps are stored in UTC. Convert to local time in the frontend.
- JWT tokens expire after 30 days. Users need to log in again after expiration.

