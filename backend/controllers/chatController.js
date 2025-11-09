import Chat from '../models/Chat.js';
import axios from 'axios';

// Get or create chat for user
const getOrCreateChat = async (userId) => {
  let chat = await Chat.findOne({ userId });
  
  if (!chat) {
    chat = new Chat({
      userId,
      messages: []
    });
    await chat.save();
  }
  
  return chat;
};

// Send message to AI chatbot
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const chat = await getOrCreateChat(req.userId);

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message
    });

    // Generate AI response
    let aiResponse = '';
    let links = [];

    // If OpenAI API key is available, use it
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful study assistant. Provide study techniques, tips, and recommendations. Include relevant links when possible.'
              },
              ...chat.messages.slice(-5).map(m => ({
                role: m.role,
                content: m.content
              }))
            ],
            max_tokens: 500
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        aiResponse = response.data.choices[0].message.content;
      } catch (error) {
        console.error('OpenAI API error:', error.message);
        // Fallback to default response
        aiResponse = generateDefaultResponse(message);
      }
    } else {
      // Fallback response without OpenAI
      aiResponse = generateDefaultResponse(message);
    }

    // Extract and add relevant links
    links = extractLinks(message, aiResponse);

    // Add assistant message
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
      links
    });

    await chat.save();

    res.json({
      message: aiResponse,
      links
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate default response when OpenAI is not available
const generateDefaultResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('pomodoro') || lowerMessage.includes('timer')) {
    return `The Pomodoro Technique is excellent for focused study sessions. Here's how it works:
- Study for 25 minutes
- Take a 5-minute break
- Repeat 4 times, then take a longer 15-30 minute break

This technique helps maintain focus and prevents burnout. You can use the "Study With Me" section in the app to try it out!`;
  }

  if (lowerMessage.includes('memory') || lowerMessage.includes('remember')) {
    return `For better memory retention, try these techniques:
1. Spaced Repetition: Review material at increasing intervals (1 day, 3 days, 1 week)
2. Active Recall: Test yourself instead of re-reading
3. Elaboration: Connect new information to what you already know
4. Visualization: Create mental images of concepts

These techniques are proven to improve long-term retention significantly.`;
  }

  if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
    return `To create an effective study schedule:
1. Identify your peak focus hours (morning, afternoon, or evening)
2. Schedule difficult subjects during peak hours
3. Use the Scheduler section to plan your day
4. Include regular breaks (every 25-30 minutes)
5. Aim for 4-6 hours of focused study per day

The Digital Doppelgänger can analyze your schedule and suggest optimizations!`;
  }

  if (lowerMessage.includes('focus') || lowerMessage.includes('concentrate')) {
    return `To improve focus:
1. Eliminate distractions (phone, social media)
2. Use the Pomodoro Technique
3. Create a dedicated study space
4. Get adequate sleep (7-8 hours)
5. Stay hydrated and eat healthy snacks
6. Take regular breaks to recharge

The "Study With Me" section has timers to help you stay focused!`;
  }

  if (lowerMessage.includes('technique') || lowerMessage.includes('method')) {
    return `Here are some proven study techniques:
1. Pomodoro Technique: 25-min focused sessions
2. Feynman Technique: Explain concepts simply
3. Active Recall: Test yourself regularly
4. Spaced Repetition: Review at intervals
5. Mind Mapping: Visual organization
6. Interleaving: Mix different subjects

Check the Digital Doppelgänger section to see which techniques work best for you!`;
  }

  return `I'm here to help with your study questions! I can provide advice on:
- Study techniques (Pomodoro, Spaced Repetition, Active Recall)
- Time management and scheduling
- Focus and concentration tips
- Memory improvement strategies
- Exam preparation

What specific area would you like help with?`;
};

// Extract relevant links based on message content
const extractLinks = (userMessage, aiResponse) => {
  const links = [];
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('pomodoro')) {
    links.push({
      title: 'Pomodoro Technique - Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Pomodoro_Technique'
    });
  }

  if (lowerMessage.includes('spaced repetition')) {
    links.push({
      title: 'Spaced Repetition - Research',
      url: 'https://en.wikipedia.org/wiki/Spaced_repetition'
    });
  }

  if (lowerMessage.includes('active recall')) {
    links.push({
      title: 'Active Recall Study Method',
      url: 'https://www.usa.edu/blog/active-recall-study-method/'
    });
  }

  return links;
};

// Get chat history
export const getChatHistory = async (req, res) => {
  try {
    const chat = await getOrCreateChat(req.userId);
    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear chat history
export const clearChat = async (req, res) => {
  try {
    const chat = await getOrCreateChat(req.userId);
    chat.messages = [];
    await chat.save();
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

