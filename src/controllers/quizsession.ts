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

const TAG = 'QUIZ_SESSION';


const new_session = (userID: string,
  quizID: string,
  options: IQuizSessionOptions) => {


};

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

export { getNewSession };


