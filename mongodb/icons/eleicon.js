let mongoose = require('mongoose');

let EleIcon = new mongoose.model('eleicon', new mongoose.Schema({}), 'eleicon');

module.exports = EleIcon;