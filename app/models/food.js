var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
	name: { type: String, trim: true },
	price: {type: Number},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});