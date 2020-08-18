const https = require('https');

const base = 'https://hacker-news.firebaseio.com/v0/';

const urls = {
	item : `${base}item/`,
	maxItem : `${base}maxitem.json`,
	user : `${base}user/`,
	topStories : `${base}topstories.json?orderBy="$key"&limitToFirst=3`,
	newStories : `${base}newstories.json?orderBy="$key"&limitToFirst=3`,
	bestStories : `${base}beststories.json?orderBy="$key"&limitToFirst=3`,
	askStories : `${base}askstories.json?orderBy="$key"&limitToFirst=3`,
	showStories : `${base}showstories.json?orderBy="$key"&limitToFirst=3`,
	jobStories : `${base}jobstories.json?orderBy="$key"&limitToFirst=3`,
	updates : `${base}updates.json`
};

const request = (url, caller) => {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			const data = [];
    
			res.on('data', (chunk) => {
				data.push(chunk);
			});
            
			res.on('end', () => {
				try {
					resolve(JSON.parse(data));
				} catch (error) {
					reject({
						'function' : caller,
						'reason' : error, 
					});
				}
			});
		}).on('error', (error) => {
			reject({
				'function' : caller,
				'reason' : error, 
			});
		});
	});
};

const getMaxItem = () => request(urls.maxItem, 'getMaxItem()');
const getItem = (id) => request(`${urls.item}${id}.json`, 'getItem()');
const getUser = (id) => request(`${urls.user}${id}.json`, 'getUser()');
const getAskStories = () => request(urls.askStories, 'getAskStories()');
const getBestStories = () => request(urls.bestStories, 'getBestStories()');
const getJobStories = () => request(urls.jobStories, 'getJobStories()');
const getNewStories = () => request(urls.newStories, 'getNewStories()');
const getShowStories = () => request(urls.showStories, 'getShowStories()');
const getTopStories = () => request(urls.topStories, 'getTopStories()');
const getUpdates = () => request(urls.updates, 'getUpdates()');

const HackerNewsApi = {
	getMaxItem : getMaxItem,
	getItem : getItem,
	getUser : getUser,
	getAskStories : getAskStories,
	getBestStories : getBestStories,
	getJobStories : getJobStories,
	getNewStories : getNewStories,
	getShowStories : getShowStories,
	getTopStories : getTopStories,
	getUpdates : getUpdates
};

module.exports = {
	HackerNewsApi
};