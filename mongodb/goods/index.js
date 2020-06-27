let mongoose = require('mongoose');

let GoodsModel = new mongoose.model('Good', new mongoose.Schema({
	name: {type: String, required: true}, //商品名称
	id: {type: Number, required: true}, //商品ID
	code: {type: String, require: true}, //商品编码
	// price: {type: Number, require: true}, //商品价格
}), 'goods');

module.exports = GoodsModel;