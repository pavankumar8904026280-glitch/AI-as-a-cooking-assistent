const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Function to append a message to the chat interface
function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

// Function to handle sending message to the Express backend
async function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    // Show temporary typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message');
    typingIndicator.innerText = "Thinking...";
    chatBox.appendChild(typingIndicator);

    try {
        // Fetching data from your local backend server
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
        chatBox.removeChild(typingIndicator); // Remove loading state
        appendMessage(data.reply, 'bot');

    } catch (error) {
        console.error("Error communicating with backend:", error);
        chatBox.removeChild(typingIndicator);
        appendMessage("Sorry, I'm having trouble connecting to my cooking brain right now.", 'bot');
    }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});