import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true }
}, {
    versionKey: false
});

export default mongoose.model('categories', CategorySchema)