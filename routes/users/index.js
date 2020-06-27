let Users = require('../../mongodb/users/index');
let jwt = require('jsonwebtoken');

/*
 *用户登录
*/

module.exports = [
	{
		url: '/user/login',
		method: 'post',
		callback: (req, res) => {
			console.log(req.body)
			let {phone, password} = req.body;

			//手机号或者密码为空
			if(!phone || !password) {
				res.send({code: -1, msg: '手机号或者密码为空'});
			}
			if(phone && password) {
				Users.find({phone: parseInt(phone), password}, (err, data) => {
					if(err) return console.error(err);
					if(data.length > 0) {
						//token
						let token = jwt.sign({phone: phone}, 'ele project', {
							expiresIn: 60*60 //一小时过期
						});
						res.cookie('token', token, {
							maxAge: 60*60,
							httpOnly: true
						});
						res.json({code: 0, data: {token: token, phone: phone}});
					}else {
						res.send({code: -1, msg: 'password is not right'});
					}
				});
			}
		}
	}
]