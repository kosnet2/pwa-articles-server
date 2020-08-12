const express = require('express');
const https = require('https');


const app = express();

const PORT = process.env.PORT || 4000;

const bestStories = 'https://hacker-news.firebaseio.com/v0/beststories.json?orderBy="$key"&limitToFirst=30';
const jobStories = 'https://hacker-news.firebaseio.com/v0/jobstories.json?orderBy="$key"&limitToFirst=30';
const baseUrl = 'https://hacker-news.firebaseio.com/v0/item/';

class Comment {
    constructor(id, message, kids) {
        this.id = id;
        this.message = message;
        this.kids = kids;
    }

    get comments() {
        const kids = []
        for (const kid of this.kids) {
            let subComment = getItem(kid);
            kids.push(new Comment(subComment['id'], subComment['text'], subComment['kids']));
        }
        return [...kids];
    }
}

const getItem = (id) => {
    https.get(`${baseUrl}${id}.json`, (res) => {
        const data = [];

        res.on('data', (chunk) => {
            data.push(chunk);
        });

        res.on('end', () => {
            return JSON.parse(data);
        })
    });
}

const populateStories = (storiesUrl, cb) => {
    https.get(storiesUrl, (res) => {
        const data = [];
    
        res.on('data', (chunk) => {
            data.push(chunk);
        });
    
        res.on('end', () => {
            ids = [...JSON.parse(data)]
            for(const id of ids) {
                cb(id);
            }
            console.log(ids);

        })
    }).on('error', (err) => {
        console.log("Error: " + err.message);
    });
}

populateStories(bestStories, getItem);
// populateStories(jobStories);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));