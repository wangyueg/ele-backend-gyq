let mongoose = require('mongoose');

let EleIcon = new mongoose.model('User', new mongoose.Schema({}), 'users');

module.exports = EleIcon;