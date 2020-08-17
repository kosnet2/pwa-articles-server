const api = require('../hacker-news/hacker-news-api');
const models = require('../hacker-news/models');

const hn = api.HackerNewsApi;

async function start() {
	const maxItem = await hn.getMaxItem().catch(err => console.error(err));
    
	for (let i = 0; i < 5; i++) {
		// console.log(maxItem - i);
		const promisedItem = await hn.getItem(maxItem - i).catch(err => console.error(err));
		if (promisedItem !== undefined) {
			const instance = models.ItemInstance(promisedItem);
			if (instance !== undefined)
				console.log(instance.constructor.name);
		} else {
			console.log('UNDEFINED');
		}
	}
    
	const themUpdates = await hn.getUpdates();
	console.log(themUpdates);
	// const aUser = await hn.getUser('charle0077').catch(err => console.error(err));
	// const instance = models.UserInstance(aUser);
	// if (instance !== undefined)
	// 	console.log(instance);
}


module.exports = {
	start
};