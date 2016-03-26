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

		// total food order
		app.post('api/total', function(req, res) {
			Order.create({
				name: req.body.text,
				price: req.body.number,
				quantity: req.body.number,
				done: false
			}, function (err, food) {
				if (err)
					res.send(err);

				// get and return all the foods after you create another
				getFoods(res);
			});
		});

		// get order by id
		app.get('/api/total/:order_id', function(req, res) {
			Order.show({
				_id: req.params.order_id
			}, function(err, order) {
				var subtotal = 0
				order.forEach(function(orderItem) {
					subtotal += orderItem.price
					console.log(orderItem);
				})
				subtotal = (subtotal *100)/100
				totalPrice = (subtotal*1.075)/100
				res.send({total:totalPrice, subtotal:subtotal})
			})
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