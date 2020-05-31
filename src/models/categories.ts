import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    title: { type: String },
    slug: { type: String }
}, {
    versionKey: false
});

export default mongoose.model('categories', CategorySchema)