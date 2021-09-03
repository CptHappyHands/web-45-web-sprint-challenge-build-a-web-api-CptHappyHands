const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.get("/", (req, res) => {
    res.send(`<h1>The Waystone Inn lay in silence, and it was a silence of three parts...</h1>`)
})

module.exports = server;
