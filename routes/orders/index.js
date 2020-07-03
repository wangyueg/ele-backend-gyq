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
			let phone = req.body.phone;
			if(!phone) res.send({code: -1, msg: '用户未登录'});
			
			OrderModel.find({phone}, (err, data) => {
				if(err) return console.error(err);
				const orders = data;
				const ordersPromise = orders.map(item => {
					return new Promise((resolve, reject) => {
						GoodsModel.find({id: {$in: item.purchasedGoodsIds}}, (err, data) => {
							if(err) reject(err);
							const ordersItem = {
								purchasedGoods: data,
								...item._doc
							};
							
							resolve(ordersItem);
						});
					});
				});
				Promise.all(ordersPromise).then(data => {
					res.send({code: 0, msg: '成功', data: data});
				}).catch(err => {
					res.send({code: -1, msg: '获取失败'});
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
				totalPrice: body.totalPrice,
				purchasedGoodsTotal: body.purchasedGoodsTotal
			};
			obj.orderId = uuidv1();

			//根据日期生成orderCode
			let currentTime = new Date();
			obj.orderTimeStr = currentTime.getFullYear() + '-' + (currentTime.getMonth() + 1) + '-' + currentTime.getDate() + ' ' + currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();
			obj.orderCode = 'ele' + currentTime.getFullYear() + currentTime.getMonth() + currentTime.getDate() + obj.orderId;
			
			obj.purchasedGoodsIds = body.purchasedGoodsIds;

			Utils.idsModel('OrderModel').then(data => {
				//添加id
				obj.id = data.id;

				return Utils.insertPromise(OrderModel, obj); 
			}).then(data => {
				res.send({code: 0, msg: '新增成功', data: data});
			}).catch(err => {
				console.log(err);
				res.send({code: -1, msg: err});
			});
		}
	}
]