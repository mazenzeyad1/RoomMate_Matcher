const express = require('express');
const router = express.Router();
const MatchProfile = require('../models/matchProfiles.model')

router.get('/match-profile/:user_name', (req, res, next) => {

    if(req.params.user_name) {
        console.log(`Fetching match profile for user: ${req.params.user_name}`)
        MatchProfile.findOne({ user_name: req.params.user_name })
            .then((data) => {
                console.log("Found profile: " + data);
                res.json(data);
            })
            .catch(next);
    }
    else {
        res.json({
            error: "No user name was specified for the profile"
        });
    }
})

router.post('/match-profile', (req, res, next) => {
    console.log(`Creating match profile: ${JSON.stringify(req.body)}`);

    if (
        req.body.user_name &&
        req.body.cleanliness_level &&
        req.body.schedule &&
        req.body.budget &&
        req.body.preferred_chores &&
        req.body.socializing_level &&
        req.body.preferences
    ) {
        MatchProfile.create({
            cleanliness_level: req.body.cleanliness_level,
            schedule: req.body.schedule,
            budget: req.body.budget,
            preferred_chores: req.body.preferred_chores,
            socializing_level: req.body.socializing_level,
            associated_user: req.body.user_name,
            preferences: req.body.preferences,
        })
        .then((data) => {
            console.log("The profile was successfully created");
            res.json(data)
        })
        .catch((err) => {
            console.log("encountered an error while creating the match profile: " + err)
            next()
        });
    }
    else {
        res.json({
            error: "Missing information to create profile"
        })
    }
})

router.delete('/match-profile/:user_name', (req, res, next) => {
    console.log("Deleting match profile for: " + req.params.user_name)
    MatchProfile.findOneAndDelete({ associated_user: req.params.user_name})
        .then((data) => {
            if(data) {
                console.log("Profile successfully deleted");
            }
            else {
                console.log("Query ran successfully, but no data was returned")
                res.json({
                    error: "Unknown error while deleting match profile"
                })
            }
        })
        .catch((err) => {
            console.log('Encountered an error when deleting match profile: ' + err)
            next()
        })
})

module.exports = router