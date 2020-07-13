import { default as shuffle } from 'shuffle-array';
/**
 * Select n question by quizID
 * optionally randomize order
 * optionally randomize answers in each question
 * Create array of objects
 * {
 * question_id: questions._id,
 * answers_order: [3,1,2,0]
 * }
 *
 * store this array in quiz_sessions under 'questions' prop
 * store also users_id, created_time? (Maybe not because it will be part of _id)
 * array of last_active timestamps.
 *
 * return object:
 * {
 *   quiz_session: _id
 *   quiz_id: qid
 *   questions: [question]
 * }
 *
 * @param req
 * @param res
 */
import { IQuizSessionOptions } from '../interfaces/quiz_session_options';
import Question, { IQuestion } from '../models/questions';
import QuizSession from '../models/quizsession';
import { Schema, Types } from 'mongoose';
import { ObjectId } from "mongodb";



const TAG = 'QUIZ_SESSION';

export interface IQuestionMeta {
  choices: number[]
  userAnswers?: number[]
  question_id: ObjectId
}
export interface IQuizSession {
  active_question: number;
  _id: ObjectId
  quiz_id: ObjectId
  quiz_type: string
  score?: number
  questions: IQuestionMeta[]
}


const randomOrder = (size: number) => {
  return shuffle([...Array(size).keys()], { 'copy': true })
}


const getNewSession = async (req, res) => {
  const options: IQuizSessionOptions = req.body;

  console.log(TAG, 'getNewSession with options', options);

  const { quiz_id, randomize_answers, randomize_questions, num_questions = 1000 } = options;

  if (!quiz_id) {
    res.status = 400;
    res.send('quiz_id not passed in request body');
  }

  let questions = await Question.find({ quiz_id: quiz_id }, { _id: true, answers: true })

  if (randomize_questions) {
    shuffle(questions)
  }

  let sessionQuestions = questions.map(question => {
    const q = (question as unknown as IQuestion)
    return { question_id: q._id, choices: randomize_answers ? randomOrder(q.answers.length) : [...Array(q.answers.length).keys()] }
  })

  const ret = {
    quiz_id: options.quiz_id,
    quiz_type: 'practice',
    active_question: 0,
    questions: sessionQuestions,
  };

  const newQuizSession = new QuizSession(ret)

  newQuizSession.save((err, product) => {
    if (err) {
      console.log("Error: ", err);
      res.end("Error");
    } else {
      console.log("Product: ", product)
      res.json({ quiz_session: product._id })
    }
  })
};


const getQuizBySessionId = async (req, res) => {
  const sessionID: string = req.params.id;
  console.log(TAG, 'entered getQuizBySessionId with', sessionID);

  const sessionData: IQuizSession = await QuizSession.findById(sessionID).lean();

  //res.statusCode = 400;
  //res.end('Session not found');

  //return;
  console.log(TAG, 'sessionData:', sessionData);

  const questionIDs = sessionData.questions.map(q => q.question_id)
  console.log(TAG, 'questionIDs:', questionIDs);

  const questions: unknown = await Question.find({_id: {$in: questionIDs}}).lean();

  let myQuestions = (sessionData as IQuizSession).questions.map(questionMeta => {
    let quest = (questions as IQuestion[]).find(q => q._id.equals(questionMeta.question_id));
    let answers = questionMeta.choices.map(ansId => quest.answers[ansId]);

    return {...quest, answers}
  })

  res.json({...sessionData, questions: myQuestions, active_question: sessionData.active_question || 0})

}

export { getNewSession, getQuizBySessionId };


