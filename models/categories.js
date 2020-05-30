const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: { type: String },
    stub: { type: String }
});

module.exports = mongoose.model('categories', CategorySchema)