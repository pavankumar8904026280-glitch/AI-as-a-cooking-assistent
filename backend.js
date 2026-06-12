const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Chat Endpoint
app.post('/api/chat', async (req, require) => {
    const { message } = req.body;

    try {
        /* If you want to integrate a core LLM (like OpenAI or Gemini) or pass data directly to a customized logic layout:
           
           const aiResponse = await externalAiApiCall(message); 
           let reply = aiResponse.data;
        */

        // Standard sample response structure mapping back to user queries:
        let reply = `You asked about "${message}". As your AI Cooking Assistant, I recommend balancing your seasonings, keeping your knives sharp, and ensuring your pan is properly pre-heated before adding protein!`;

        res.json({ reply });
    } catch (error) {
        console.error("Backend server error:", error);
        res.status(500).json({ error: "Internal server error processing the cooking request." });
    }
});

app.listen(PORT, () => {
    console.log(`Cooking Assistant backend running on port ${PORT}`);
});