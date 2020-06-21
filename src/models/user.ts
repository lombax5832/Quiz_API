import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    google_id: { type: String },
    name: { type: String },
    givenName: { type: String },
    familyName: { type: String },
    imageURL: { type: String },
    email: { type: String }
}, {
    versionKey: false
})

export default mongoose.model('users', UserSchema)