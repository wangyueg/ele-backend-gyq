const mongoose = require('mongoose');

const Discovers = new mongoose.model('discovers', new mongoose.Schema({}), 'discovers');

module.exports = Discovers;