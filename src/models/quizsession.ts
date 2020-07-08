import mongoose, { Schema } from "mongoose";

const QuizSessionSchema = new Schema({
    quiz_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: false },
    quiz_type: { type: String, enum: ['practice', 'exam'] },
    questions: [{
        _id: false,
        question_id: { type: Schema.Types.ObjectId, required: true },
        choices: { type: [Number], required: true },
        userAnswers: { type: [Number] },
    }]
}, {
    versionKey: false
});

export default mongoose.model('quizsession', QuizSessionSchema)