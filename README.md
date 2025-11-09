# Digital Doppelgänger Platform

The Digital Doppelgänger platform creates an AI Twin for each learner by analyzing study hours, breaks, sleep cycles, and past performance. It simulates outcomes (e.g., studying 2 hours instead of 1 could boost scores by 15%) and gives personalized recommendations on schedules, focus areas, and strategies, helping students optimize efforts before real exams.

## Features

### 1. Scheduler Handler + Generator
- Add and manage your daily schedule
- Generate schedules based on tasks and priorities
- Task manager with time tracking
- Visual activity graphs

### 2. Study With Me
- Pomodoro timer (25-minute focused sessions)
- Free infinity clock for extended study sessions
- Track study time and sessions

### 3. Digital Doppelgänger (Main Feature)
- AI-powered analysis of study habits
- Simulates different study scenarios and outcomes
- Personalized recommendations for schedules, focus areas, and strategies
- Visual line graphs comparing real vs. twin performance
- Suggests different studying techniques

### 4. Previous Activity
- Store and view all previously created/generated data
- Track study hours, scores, and performance over time
- Historical data analysis

### 5. AI-Powered Chatbot (Additional Feature)
- Ask questions about study techniques
- Get personalized recommendations
- Receive links and resources based on queries
- Analyze and provide insights on study methods

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Recharts (for graphs)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API (optional, for enhanced chatbot)

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. After registering or logging in, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database

The application uses MongoDB to store:
- User accounts and avatars
- Tasks and schedules
- Study sessions
- Activity records
- AI analyses and recommendations
- Chat history

## Development

### Frontend Development
- Uses Vite for fast HMR (Hot Module Replacement)
- Tailwind CSS for styling
- React 19 with hooks

### Backend Development
- Express.js REST API
- Mongoose for MongoDB ODM
- JWT for authentication
- CORS enabled for frontend communication

## Notes

- The AI chatbot works without OpenAI API key but provides basic responses. For enhanced AI responses, add your OpenAI API key.
- All timestamps are stored in UTC. Convert to local time in the frontend.
- JWT tokens expire after 30 days.
