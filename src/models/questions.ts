import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    explanation: { type: String },
    quiz_id: { type: Schema.Types.ObjectId, required: true },
    qtype: { type: String, enum: ['single', 'multi'] },
    answers: [{
        _id: false,
        body: { type: String, required: true },
        explanation: { type: String },
        isCorrect: { type: Boolean, default: false },
    }]
}, {
    versionKey: false
});

export default mongoose.model('questions', QuestionSchema)