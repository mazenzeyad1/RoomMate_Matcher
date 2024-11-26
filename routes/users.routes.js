const express = require('express');
const router = express.Router();
const Users = require('../models/users.model');

router.get('/users', (req, res, next) => {
	Users.find({})
		.then((data) => {
			console.log('RECEIVED DATA: ' + data);
			res.json(data);
		})
		.catch(next);
});

router.get('/users/:user_name', (req, res, next) => {
	console.log(req.params.user_name);
	Users.findOne({ user_name: req.params.user_name })
		.then((data) => {
			console.log('RECEIVED DATA: ' + data);
			res.json(data);
		})
		.catch(next);
});

router.post('/users', (req, res, next) => {
	 console.log(
		`body: ${JSON.stringify(req.body)}`
	 );
	if (
		req.body.user_name &&
		req.body.password &&
		req.body.email &&
		req.body.first_name &&
		req.body.last_name &&
		req.body.phone_no &&
		req.body.avatar
	) {
		Users.create({
			user_name: req.body.user_name,
			password: req.body.password,
			email: req.body.email,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			phone_no: req.body.phone_no,
			avatar: req.body.avatar
		})
			.then((data) => { console.log('user is created')
				res.json(data)								
			})
			.catch((err) => {console.log(err)
			next()});
	} else {
		res.json({
			error: 'Missing field information',
		});
	}
});

router.patch('/users/:id', (req, res, next) => {
	Users.findOneAndReplace({ _id: req.body.id }, {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		avatar: req.body.avatar,
		phone_no: req.body.phone_number,
		user_name: req.body.user_name,
		password: req.body.password,
		email: req.body.email
	})
		.then((data) => res.json(data))
		.catch(next);
})

router.delete('/users/:id', (req, res, next) => {
	Users.findOneAndDelete({ _id: req.params.id })
		.then((data) => res.json(data))
		.catch(next);
});

module.exports = router;