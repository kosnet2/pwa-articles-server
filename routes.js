const express = require('express');
const memory = require('./hacker-news-data/runtime-memory');

const router = express.Router();

router.get('/askStories', (req, res, next) => {
	setImmediate(() => {
		const params = req.query;
		try {
			res.setHeader('Content-Type', 'application/json');
			res.send(memory.getAskStories());
		} catch (e) {
			next(e);
		}
	});
});

router.get('/bestStories', (req, res, next) => {
	setImmediate(() => {
		const params = req.query;
		try {
			res.setHeader('Content-Type', 'application/json');
			res.send(memory.getBestStories());
		} catch (e) {
			next(e);
		}
	});
});

router.get('/jobStories', (req, res, next) => {
	setImmediate(() => {
		const params = req.query;
		try {
			res.setHeader('Content-Type', 'application/json');
			res.send(memory.getJobStories());
		} catch (e) {
			next(e);
		}
	});
});

router.get('/newStories', (req, res, next) => {
	setImmediate(() => {
		const params = req.query;
		try {
			res.setHeader('Content-Type', 'application/json');
			res.send(memory.getNewStories());
		} catch (e) {
			next(e);
		}
	});
});

router.get('/showStories', (req, res, next) => {
	setImmediate(() => {
		const params = req.query;
		try {
			res.setHeader('Content-Type', 'application/json');
			res.send(memory.getShowStories());
		} catch (e) {
			next(e);
		}
	});
});

router.get('/topStories', (req, res, next) => {
	setImmediate(() => {
		const params = req.query;
		try {
			res.setHeader('Content-Type', 'application/json');
			res.send(memory.getTopStories());
		} catch (e) {
			next(e);
		}
	});
});

router.use('/', (err, req, res, next) => {
	// console.log(err);
	res.status(500).send('Internal Server Error');
});

module.exports = router;