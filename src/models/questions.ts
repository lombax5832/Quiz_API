import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export type quiztype = 'single' | 'multi'

export interface IQuestion {
    _id: ObjectId
    question: string
    explanation?: string
    quiz_id: ObjectId
    qtype: quiztype
    answers: [{
        body: string
        explanation: string
        isCorrect: boolean
    }]
}

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