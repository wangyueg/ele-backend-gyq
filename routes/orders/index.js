let uuidv1 = require('uuid/v1')
let OrderModel = require('../../mongodb/orders');
let GoodsModel = require('../../mongodb/goods');
let Utils = require('../../utils/index');

const promise = (action, params) => {
	return new Promise((resolve, reject) => {
		action(params, (err, data) => {
			if(err) return console.error(err);
			resolve(data);
		});
	});
}

module.exports = [
	//订单列表
	{
		url: '/ordersList',
		method: 'post',
		callback: (req, res) => {
			console.log(req.body);
			let phone = req.body.phone;
			if(!phone) res.send({code: -1, msg: '用户未登录'});
			
			OrderModel.find({phone}, (err, data) => {
				if(err) return console.error(err);
				// res.send({code: 0, data: data});
				let ids = [];
				data.map(item => {
					if(ids.indexOf(item.purchasedGoodsId) === -1) {
						ids.push(item.purchasedGoodsId);
					}
				});

				GoodsModel.find({id: {$in: ids}}, (err, data) => {
					res.send({code: 0, data: data});
				});
			});
		}
	},
	{	
		//新增订单
		url: '/ordersAdd',
		method: 'post',
		callback: (req, res) => {
			let body = req.body;
			let obj = {
				phone: body.phone,
				storeName: body.storeName,
				totalPrice: body.totalPrice
			};
			obj.orderId = uuidv1();
			let currentTime = new Date();
			obj.orderTimeStr = currentTime.getFullYear() + '-' + currentTime.getMonth() + '-' + currentTime.getDay() + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
			obj.orderCode = 'ele' + currentTime.getFullYear() + currentTime.getMonth() + currentTime.getDay();
			let purchasedGoodsIds = body.purchasedGoodsIds;

			Utils.idsModel('OrderModel', purchasedGoodsIds.length).then(data => {
				let orders = [];
				let insId = data.id;
				let endId = insId - purchasedGoodsIds.length + 1;

				/*
				 *前端返回格式: [{id: productId, number: Int}]
				 */
				if(purchasedGoodsIds && Array.isArray(purchasedGoodsIds) && purchasedGoodsIds.length > 0) {
					purchasedGoodsIds.forEach(id => {
						orders.push({
							...obj,
							purchasedGoodsId: id.id,
							purchasedGoodsNumber: id.number,
							id: endId ++
						});
					});
				}
				console.log(orders)
				return Utils.insertPromise(OrderModel, orders); 
			}).then(data => {
				res.send({code: 0, msg: '新增成功', data: data});
			}).catch(err => {
				console.log(err);
				res.send({code: -1, msg: err});
			});
		}
	}
]