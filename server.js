const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users.routes')
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

//Connect to DB
mongoose
	.connect(process.env.DB)
	.then(() => console.log('Database connected successfully'))
	.catch((err) => console.error(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.use(express.json({limit: '6mb'}));
app.use(express.urlencoded({ limit: '6mb', extended: true }))

// Set the routes to use, these are the api endpoints for accessing mongodb
app.use('/', userRoutes)

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});