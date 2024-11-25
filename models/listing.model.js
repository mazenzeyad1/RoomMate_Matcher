const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
	associated_user: String,
	number_of_rooms_available: Number,
	address: String,
    price_per_month: Number,
	contact_info: { email: String, phone_number: String, first_name: String, last_name: String },
	interested_users: [{ interested_user_name: String }],
    tags: [String],
	description: String,
    image: String,
    title: String,
});

const Listing = mongoose.model('listings', ListingSchema);

module.exports = Listing;