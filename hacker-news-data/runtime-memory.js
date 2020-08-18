const api = require('../hacker-news/hacker-news-api');
const models = require('../hacker-news/models');

const hn = api.HackerNewsApi;
const items = {};



// LOGIC FOR GETTING THE LAST ITEM
//  const maxItem = await hn.getMaxItem().catch(err => console.error(err));
// 	console.log(maxItem);
// 	for (; lastItem < maxItem; lastItem++) {
// 		console.log(lastItem);
// 		const promisedItem = await hn.getItem(lastItem).catch(err => console.error(err));
// 		if (promisedItem !== undefined) {
// 			const instance = models.ItemInstance(promisedItem);
// 			if (instance !== undefined)
// 				items[lastItem] = instance;
// 				// console.log(instance.constructor.name);
// 		} else {
// 			console.log('UNDEFINED');
// 		}
// 	}
// 	console.log(items);

let lastItem = 24192900;
let askStories = [];
let bestStories = [];
let jobStories = [];
let newStories = [];
let showStories = [];
let topStories = [];
let updates = [];



function sizeOf( object ) {
	return `${JSON.stringify(object).length/1000}KB`;
}

async function getIterableItems(iterable) {
	const results = await Promise.allSettled(iterable.map(id => hn.getItem(id)));
	return results.filter(promise => promise.status === 'fulfilled').
		map(item => item.value);
}

async function start() {
	const askStoriesPromise = await hn.getAskStories().catch(err => console.error(err));
	askStories = await getIterableItems(askStoriesPromise);
	console.log('Ask Stories:', askStories.length, sizeOf(askStories));		

	const bestStoriesPromise = await hn.getBestStories().catch(err => console.error(err));
	bestStories = await getIterableItems(bestStoriesPromise);
	console.log('Best Stories:', bestStories.length, sizeOf(bestStories));

	const jobStoriesPromise = await hn.getJobStories().catch(err => console.error(err));
	jobStories = await getIterableItems(jobStoriesPromise);
	console.log('Job Stories:', jobStories.length, sizeOf(jobStories));

	const newStoriesPromise = await hn.getNewStories().catch(err => console.error(err));
	newStories = await getIterableItems(newStoriesPromise);
	console.log('New Stories:', newStories.length, sizeOf(newStories));

	const showStoriesPromise = await hn.getShowStories().catch(err => console.error(err));
	showStories = await getIterableItems(showStoriesPromise);
	console.log('Show Stories:', showStories.length, sizeOf(showStories));

	const topStoriesPromise = await hn.getTopStories().catch(err => console.error(err));
	topStories = await getIterableItems(topStoriesPromise);
	console.log('Top Stories:', topStories.length, sizeOf(topStories));

	// const updatesPromise = await hn.getUpdates().catch(err => console.error(err));
	// updates = await getIterableItems(updatesPromise.items);
	// console.log('Updates:', updates.length, sizeOf(updates));
}


module.exports = {
	getAskStories: () => [...askStories],
	getBestStories: () => [...bestStories],
	getJobStories: () => [...jobStories],
	getNewStories: () => [...newStories],
	getShowStories: () => [...showStories],
	getTopStories: () => [...topStories],
	start
};