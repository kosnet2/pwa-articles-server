const express = require('express');

const routes = require('./routes');
const memory = require('./hacker-news-data/runtime-memory');

const app = express();
const PORT = process.env.PORT || 3000;

memory.start();

setInterval(() => {
	memory.start();
}, 600000);

routes.set(app, memory);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

