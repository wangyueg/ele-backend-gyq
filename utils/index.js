let IdsModel = require('../mongodb/ids');

module.exports = {
	/*
	 *insert promise
	*/
	insertPromise: (model, docs) => {
		return new Promise((resolve, reject) => {
			model.insertMany(docs, (err, data) => {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	},
	idsModel: (name, ins=1) => {
		return new Promise((resolve, reject) => {
			if(!name) reject('自增id时，对应的Model的名称不能为空');

			IdsModel.findOneAndUpdate({name: name}, {$inc: {id: ins}}, {new: true, upsert: true}, (err, data) => {
				if(err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}
}