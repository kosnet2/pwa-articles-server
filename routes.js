const set = (app, memory) => {
	app.use('/askStories', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(memory.getAskStories());
	});
	
	app.use('/bestStories', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(memory.getBestStories());
	});
	
	app.use('/jobStories', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(memory.getJobStories());
	});
	
	app.use('/newStories', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(memory.getNewStories());
	});
	
	app.use('/showStories', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(memory.getShowStories());
	});
	
	app.use('/topStories', (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		res.send(memory.getTopStories());
	});
};

module.exports = {
	set
};