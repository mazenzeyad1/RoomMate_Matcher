const express = require('express')
const router = express.Router();
const Listings = require('../models/listing.model');

router.get('/listings', (req, res, next) => {
    Listings.find({})
        .then((data) => {
            console.log("Received listing data: " + data)
            res.json(data);
        })
        .catch(next);
})

router.get('/listings/:id', (req, res, next) => {
    console.log("Fetching listing for id: " + req.params.id);
    Listings.findOne({ _id: req.params.id })
        .then((data) => {
            //console.log("Received listing: " + data);
            res.json(data);
        })
        .catch(next)
})

router.post('/listings', (req, res, next) =>{
    console.log("Creating listing: " + JSON.stringify(req.body))

    if (
        req.body.associated_user &&
        req.body.number_of_rooms_available &&
        req.body.address &&
        req.body.contact_info &&
        req.body.tags &&
        req.body.description &&
        req.body.price_per_month &&
        req.body.title &&
        req.body.image
    ) {
        Listings.create({
            associated_user: req.body.associated_user,
            number_of_rooms_available: req.body.number_of_rooms_available,
            address: req.body.address,
            contact_info: req.body.contact_info,
            interested_users: [],
            tags: req.body.tags,
            description: req.body.description,
            price_per_month: req.body.price_per_month,
            image: req.body.image,
            title: req.body.title
        })
            .then((data) => {
                console.log('Listing has been created')
                res.json(data)
            })
            .catch((err) => {
                console.log(err)
                next()
            })
    } else {
        res.json({
            error: 'Missing field information',
        })
    }
})

router.patch('/listings/:id', (req, res, next) => {
    console.log("Updating listing " + req.params.id + "with following: " + JSON.stringify(req.body.interested_users))
    if (req.body.interested_users && req.params.id) {
        Listings.findOneAndUpdate({
            _id: req.params.id
        }, {
            interested_users: req.body.interested_users
        })
            .then((data) => {
                console.log('listing has been updated')
                res.json(data)
            })
            .catch(next)
    } else {
        res.json({
            error: 'id or interested_users is empty'
        });
    }
})

module.exports = router