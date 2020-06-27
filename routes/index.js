const express = require('express');
const router = express.Router();
const methods = require('methods');
const eleicon = require('./icons/eleicon');
const user = require('./users/index');
const order = require('./orders/index');
const goods = require('./goods/index');
const discovers = require('./discovers/index');

/*
 *每个route文件格式：[{url: String, methods: String[http.METHODS], callback: func}]
 *添加route之后，在此将route数组合并
*/

const routes = Array.prototype.concat.call([], eleicon, user, order, goods, discovers);

routes.forEach((route) => {
	if(!route.method) route.method = 'get';
	const method = route.method.toLowerCase();
	if(methods.indexOf(method) === -1) {
		throw new Error(route.url + `: method should be indexof http.METHODS`);
	}
	router[method](route.url, route.callback);
});

module.exports = router;
