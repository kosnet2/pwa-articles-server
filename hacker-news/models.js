class Item {
	constructor(item) {
		this.id = item.id;
		this.deleted = item.deleted;
		this.type = item.type;
		this.by = item.by;
		this.time = item.time;
		this.text = item.text;
		this.dead = item.dead;
		this.parent = item.parent;
		this.poll = item.poll;
		this.kids = item.kids;
		this.url = item.url;
		this.score = item.score;
		this.title = item.title;
		this.parts = item.parts;
		this.descendants = item.descendants;
	}
}

class Story extends Item {
	/* id type by time text kids url score title descendants */
	constructor(item) {
		super(item);
	}
}

class Comment extends Item {
	/*  id  type  by  time  text parent kids */
	constructor(item) {
		super(item);
	}
}

class Ask extends Item {
	/*  id type by time text kids url score title descendants */
	constructor(item) {
		super(item);
	}
}

class Job extends Item {
	/* id type by time text url score title */
	constructor(item) {
		super(item);
	}
}

class Poll extends Item {
	/* id type by time text kids score title parts descendants */
	constructor(item) {
		super(item);
	}
}

class PollOpt extends Item {
	/* id type by time text score poll */
	constructor(item) {
		super(item);
	}
}

class User {
	/* id delay created karma about submitted */
	constructor(user) {
		this.id = user.id;
		this.delay = user.delay;
		this.created = user.created;
		this.karma = user.karma;
		this.about = user.about;
		this.submitted = user.submitted;
	}
}

const ItemInstance = (item) => {

	if (item === null) return undefined;
	if (item.deleted !== undefined || item.dead !== undefined) 
		return undefined;
		
	if (item.type === 'story') {
		if (item.text !== undefined) return new Ask(item);
		return new Story(item);
	}
	if (item.type === 'job') return new Job(item);
	if (item.type === 'comment') return new Comment(item);
	if (item.type === 'poll') return new Poll(item);
	if (item.type === 'pollopt') return new PollOpt(item);
};

const UserInstance = (user) => {
	if (user === null)
		return undefined;
	return new User(user);
};

module.exports = {
	ItemInstance,
	UserInstance
};