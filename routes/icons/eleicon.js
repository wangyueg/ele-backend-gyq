let EleIcon = require('../../mongodb/icons/eleicon');

/*
 *获取饿了么图标（登录页面）
*/

module.exports = [
	{
		url: '/icons/getEleIcon',
		method: 'get',
		callback: (req, res) => {
			EleIcon.find((error, eleicon) => {
				if(error) return console.error(error);
				res.send({
					code: 0,
					data: eleicon[0]
				});
			});	
		}
	}
] 