let Discover = require('../../mongodb/discovers/top_banner');

module.exports = [
	{
		url: '/discovers/topBanner',
		method: 'get',
		callback: (req, res) => {
			Discover.find((error, data) => {
				if(error) return console.error(error);
				res.send({
					code: 0,
					data: data
				});
			});	
		}
	}
]