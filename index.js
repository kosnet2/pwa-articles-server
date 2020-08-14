const express = require('express');
const https = require('https');


const app = express();

const PORT = process.env.PORT || 4000;

const bestStories = 'https://hacker-news.firebaseio.com/v0/beststories.json?orderBy="$key"&limitToFirst=30';
const jobStories = 'https://hacker-news.firebaseio.com/v0/jobstories.json?orderBy="$key"&limitToFirst=30';
const baseUrl = 'https://hacker-news.firebaseio.com/v0/item/';
const stories = [];

class Item {
	constructor( { id, type, by, time } ) {
		this.id = id;
		this.type = type;
		this.by = by;
		this.time = time;
	}

	async populateKids(kids, cb) {
		let newKids = [];

		let promisedComments = new Promise( ( resolve, reject ) => {
			let comments = kids.map( async ( id ) => {
				return new Comment( await cb( id ), cb);
			} );
			resolve( comments );
		} );
		
		promisedComments.then( ( promises ) => {
			Promise.all( promises ).then( ( comments ) => {
				newKids = [ ...comments ];
			});
		} );

		return [...newKids];
	}
}

class Story extends Item{
	constructor( { id, type, by, time, text, kids, url, score, title, descendants } ) {
		super( { id, type, by, time } );
		this.text = text;
		this.kids = [ ...kids ];
		this.url = url;
		this.score = score;
		this.title = title;
		this.descendants = descendants;
	}

	async populateComments(cb) {
		this.kids = await this.populateKids(this.kids, cb);
	}
}

class Comment extends Item {
	constructor( { id, type, by, time, text, kids }) {
		super( { id, type, by, time } );
		this.text = text;
		this.kids = kids;
	}

	async populateComments(cb) {
		this.kids = await this.populateKids(this.kids, cb);
	}
}

const getItem = (id) => {
	return new Promise( (resolve, reject) => {
		https.get(`${baseUrl}${id}.json`, (res) => {
        
			const data = [];

			res.on('data', (chunk) => {
				data.push(chunk);
			});

			res.on('end', () => {
				resolve(JSON.parse(data));
			});
		});
	});
};

const populateStories = (storiesUrl, cb) => {
	https.get(storiesUrl, (res) => {
		const data = [];
    
		res.on('data', (chunk) => {
			data.push(chunk);
		});
    
		res.on('end', () => {
			const ids = [...JSON.parse(data)];
			for(const id of ids) {
				const getStory = cb(id);
				getStory.then((val) => {
					const story = new Story(val);
                    
					let promisedComments = new Promise((resolve, reject) => {
						let comments = story.kids.map(async (id) => {
							return new Comment(await cb(id));
						});
						resolve(comments);
					});
                    
					promisedComments.then((promises) => {
						Promise.all(promises).then((comments) => {
							story.kids = [...comments];
							stories.push(story);
						});
					});
				});
			}
		});
	}).on('error', (err) => {
		console.log('Error: ' + err.message);
	});
};

populateStories(bestStories, getItem);
// populateStories(jobStories);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));