const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: String,
	last_name: String,
	password: String,
	email: String,
	user_name: String,
	phone_no: String,
	avatar: String
});

const User = mongoose.model('users', UserSchema);

module.exports = User;