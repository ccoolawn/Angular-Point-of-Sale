var Food = require('./models/food');
var Order= require('./models/order');

function getFoods(res) {
	Food.find(function (err, foods) {

		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err) {
			res.send(err);
		}

		res.json(foods); // return all foods in JSON format
		console.log(foods);
	});
};

function getTotal(res) {
	Order.find(function(err, orders) {
		if (err) {
			res.send(err);
		}

	res.json(orders);
	console.log(orders);
	});

};
module.exports = function (app) {

		// api ---------------------------------------------------------------------
		// get all foods
		app.get('/api/foods', function (req, res) {
			// use mongoose to get all foods in the database
			getFoods(res);
		});

		// create food and send back all foods after creation
		app.post('/api/foods', function (req, res) {

			// create a food, information comes from AJAX request from Angular
			Food.create({
				name: req.body.text,
				price:req.body.number,
				done: false
			}, function (err, food) {
				if (err)
					res.send(err);

				// get and return all the foods after you create another
				getFoods(res);
			});

		});

		// total food items
		app.post('api/total', function(req, res) {
			Order.create({
				name: req.body.text,
				price: req.body.number,
				quantity: req.body.int,
				done: false
			}, function (err, food) {
				if (err)
					res.send(err);

				// get and return all the foods after you create another
				getTotal(res);
			});
		});

		app.get('/api/total/:order_id', function(req, res) { 
			Order.show(req, res) 
		});

		// delete a food
		app.delete('/api/foods/:food_id', function (req, res) {
			Food.remove({
				_id: req.params.food_id
			}, function (err, food) {
				if (err)
					res.send(err);

				getFoods(res);
			});
		});

		// application -------------------------------------------------------------
		app.get('*', function (req, res) {
			res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
		});
};