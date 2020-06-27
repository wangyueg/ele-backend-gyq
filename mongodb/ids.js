let mongoose = require('mongoose');

let IdsModel = new mongoose.model('Id', new mongoose.Schema({
	name: {type: String, required: true}, //其他id自增的集合名
	id: {type: Number, required: true, default: 0} //对应集合中的id属性的最大值
}), 'ids');

module.exports = IdsModel;