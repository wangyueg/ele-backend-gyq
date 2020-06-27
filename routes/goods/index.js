let uuidv1 = require('uuid/v1');
let GoodsModel = require('../../mongodb/goods/index');

let Utils = require('../../utils/index');

module.exports = [
	{
		url: '/goodsAdd',
		method: 'post',
		callback: (req, res) => {
			let body = req.body;
			//商品编码自动生成
			body.code = uuidv1();

			Utils.idsModel('GoodsModel').then((data) => {
				body.id = data.id;
				
				return Utils.insertPromise(GoodsModel, body);
			}).then(data => {
				res.send({code: 0, msg: '新增成功', data: data});
			}).catch(err => {
				console.log(err);
				res.send({code: -1, msg: err});
			});	
		}
	}
]; 