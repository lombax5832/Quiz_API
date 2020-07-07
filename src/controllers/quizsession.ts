import Question from '../models/questions';

const TAG = 'QUIZ_SESSION';

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

const new_session = (userID: string,
                     quizID: string,
                     options: IQuizSessionOptions) => {


};


const getNewSession = async (req, res) => {
  const options: IQuizSessionOptions = req.body;

  console.log(TAG, 'getNewSession with options', options);

  const { quiz_id, randomize_answers, randomize_questions, num_questions = 1000 } = options;

  if (!quiz_id) {
    res.status = 400;
    res.send('quiz_id not passed in request body');
  }


  const questions = await Question.find({ quiz_id: quiz_id }, {_id: true, answers: true})

  const ret = {
    session_id: '123456',
    quiz_id: options.quiz_id,
    questions,
  };

  res.json(ret);
};

export { getNewSession };


