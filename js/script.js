document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');

    // Function to display user message
    function displayUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = 'You: ' + message;
        chatMessages.appendChild(messageElement);
    }

    // Function to display AI response
    function displayAIResponse(response) {
        const messageElement = document.createElement('div');
        messageElement.textContent = 'AI: ' + response;
        chatMessages.appendChild(messageElement);
    }

    // Event listener for user input
    userInput.addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            const message = userInput.value.trim();
            if (message !== '') {
                displayUserMessage(message);
                userInput.value = ''; // Clear input field

                // Send user message to server
                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                const aiResponse = data.response;
                displayAIResponse(aiResponse);
            }
        }
    });
});



  