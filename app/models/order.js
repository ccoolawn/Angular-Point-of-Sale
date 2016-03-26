var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
	custname: { type: String, trim: true },
	foodname: { type: String, trim: true },
	price: {type: Number},
	quantity: {type: Number},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});