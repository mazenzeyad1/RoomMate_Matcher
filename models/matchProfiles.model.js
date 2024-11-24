const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchProfileSchema = new Schema({
	cleanliness_level: Number,
    schedule: String,
    budget: Number,
    preferred_chores: String,
    socializing_level: Number,
    associated_user: String,
});

const MatchProfile = mongoose.model('matchprofiles', MatchProfileSchema);

module.exports = MatchProfile;