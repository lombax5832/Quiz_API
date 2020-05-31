const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title: { type: String },
    stub: { type: String }
});

export default mongoose.model('categories', CategorySchema)