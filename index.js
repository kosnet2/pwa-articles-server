const express = require('express');
const routes = require('./routes');
const memory = require('./hacker-news-data/runtime-memory');

const app = express();
const PORT = process.env.PORT || 4000;

memory.start();

setInterval(() => {
	memory.start();
}, 600000);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));