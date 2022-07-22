require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.URI;

const database = async () => {
	mongoose.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('Database Connected...');
};

module.exports = database;
