const express = require('express');
const compression = require('compression');
const routes = require('./routes');
const memory = require('./hacker-news-data/runtime-memory');

const app = express();
const PORT = process.env.PORT;

console.log('ENV', process.env.NODE_ENV);
console.log('PORT', process.env.PORT);

app.use(compression());

memory.start();

setInterval(() => {
	memory.start();
}, 600000);

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

