import mongoose, { Schema } from "mongoose";

const QuizSchema = new Schema({
    category_id: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    quiz_id: { type: String },
    description: { type: String },
    passing_grade: { type: Number }
}, {
    versionKey: false
});

export default mongoose.model('quizzes', QuizSchema)