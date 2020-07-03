let mongoose = require('mongoose');

let OrderModel = new mongoose.model('Order', new mongoose.Schema({
	storeImageUrl: {type: String, default: 'https://cube.elemecdn.com/5/f1/ef9d33275f955b4342b325a965eb4png.png?x-oss-process=image/format,webp/resize,w_64,h_64,m_fixed'},
	storeName: {type: String}, //商店名称
	orderStatus: {type: String, default: '等待商家接单'}, //订单描述
	orderStatusCode: {type: Number, default: 1}, //订单状态
	purchasedGoodsIds: {type: Array, required: true}, //订单商品Ids
	purchasedGoodsTotal: {type: Number, required: true, default: 1}, //订单商品数量
	totalPrice: Number, //订单总额（扣除福利之后金额）
	orderTimeStr: String, //订单日期
	phone: {type: Number, required: true}, //订单人
	orderId: {type: String, required: true}, //订单ID
	orderCode: {type: String, required: true}, //订单编码
	id: {type: Number, required: true} //ID
}), 'orders');

module.exports = OrderModel;

//订单： ID、订单ID、订单编码、客户、订单总价、订单时间、订单状态、订单状态码、商品ID、商品数量

//商品： ID、商品ID、商品编码、商品价格