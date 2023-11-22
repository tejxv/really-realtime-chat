const socket = io('ws://localhost:8080');
const messageInput = document.getElementById('messageInput');
const messageList = document.querySelector('ul');

// Initialize the input field value
let inputValue = '';

messageInput.addEventListener('input', (event) => {
    // Update the input value as the user types
    inputValue = event.target.value;

    // Send the entire message as it is typed
    socket.emit('message', inputValue);
});

function clearInput() {
    // Clear the input field progressively
    const message = messageInput.value;
    const length = message.length;
    let index = length - 1;

    const interval = setInterval(() => {
        if (index < 0) {
            clearInterval(interval);
            inputValue = '';
            messageInput.value = '';

            // Notify other participants that the input has been cleared
            socket.emit('clearInput');
        } else {
            const partialMessage = message.slice(0, index);
            messageInput.value = partialMessage;
            console.log(messageInput.value);
            // Notify other participants of the partial message
            socket.emit('message', messageInput.value);
            index--;
        }
    }, 100);
}

socket.on('message', (message) => {
    // Display the message as it is updated
    const el = document.createElement('li');
    el.innerHTML = message;

    // Clear the previous messages and append the latest one
    messageList.innerHTML = '';
    messageList.appendChild(el);
});

socket.on('clearInput', () => {
    // Clear the input field when other participants request it
    inputValue = '';
    messageInput.value = '';
});

