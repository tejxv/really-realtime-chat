const http = require('http').createServer();
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const emojis = ['🤠', '🤓', '🤡', '👻', '💀', '😼', '💥', '🐵', '🐮'];

io.on('connection', (socket) => {
    console.log('a user connected');

    // Select a random emoji for the user
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    // Emit the selected emoji to the client
    socket.emit('changeEmoji', randomEmoji);
    console.log(randomEmoji);

    socket.on('message', (message) => {
        // console.log(message);
        io.emit('message', `${randomEmoji} said: ${message}`);
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));
