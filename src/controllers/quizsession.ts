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
import Question, { IQuestion, IAnswer, quiztype } from '../models/questions';
import QuizSession from '../models/quizsession';
import { ObjectId } from 'mongodb';

const TAG = 'QUIZ_SESSION';

interface RootObject {
  _id: string;
  quiz_id: string;
  quiz_type: string;
  active_question: number;
  questions_meta: Array<IQuestionMeta>;
  quiz_title: string;
  quiz_slug: string;
  quiz_id_code: string;
  quiz_description: string;
  passing_grade: number;
  category_title: string;
  category_id: string;
  category_slug: string;
  questions_array: Array<IQuestion>;
}


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
  return shuffle([...Array(size).keys()], { 'copy': true });
};


const getNewSession = async (req, res) => {
  const options: IQuizSessionOptions = req.body;

  console.log(TAG, 'getNewSession with options', options);

  const { quiz_id, randomize_answers, randomize_questions, num_questions = 1000 } = options;

  if (!quiz_id) {
    res.status = 400;
    res.send('quiz_id not passed in request body');
  }

  let questions = await Question.find({ quiz_id: quiz_id }, { _id: true, answers: true });

  if (randomize_questions) {
    shuffle(questions);
  }

  /**
   * TODO make sure to limit result to max of num_questions
   * but after the shuffle.
   */

  let sessionQuestions = questions.map(question => {
    const q = (question as unknown as IQuestion);
    return {
      question_id: q._id,
      choices: randomize_answers ? randomOrder(q.answers.length):[...Array(q.answers.length).keys()],
    };
  });

  const ret = {
    quiz_id: options.quiz_id,
    quiz_type: 'practice',
    active_question: 0,
    questions: sessionQuestions,
    options
  };

  const newQuizSession = new QuizSession(ret);

  newQuizSession.save((err, product) => {
    if (err) {
      console.log('Error: ', err);
      res.end('Error');
    } else {
      console.log('Product: ', product);
      res.json({ quiz_session: product._id });
    }
  });
};

const sortQuestionsAndAnswers = (data: RootObject) => {

  const questions = data.questions_array;

  let myQuestions = data.questions_meta.map(questionMeta => {

    const quest = questions.find(q => q._id.equals(questionMeta.question_id));
    const answers: Array<IAnswer> = questionMeta.choices.map(ansId => quest.answers[ansId]);

    return { ...quest, answers };
  });

  return { ...data, questions: myQuestions };
};


const getQuizSessionBySessionId = async (req, res) => {
  const sessionID: string = req.params?.id;
  console.log(TAG, 'entered getQuizSessionBySessionId with', sessionID);

  try {
    const sessionData = await QuizSession.aggregate([
      {
        $match: {
          _id: new ObjectId(sessionID),
        },
      }, {
        $lookup: {
          from: 'quizzes',
          localField: 'quiz_id',
          foreignField: '_id',
          as: 'quiz_data',
        },
      }, {
        $unwind: {
          path: '$quiz_data',
          preserveNullAndEmptyArrays: false,
        },
      }, {
        $lookup: {
          from: 'categories',
          localField: 'quiz_data.category_id',
          foreignField: '_id',
          as: 'category',
        },
      }, {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: false,
        },
      }, {
        $project: {
          _id: 1,
          quiz_id: 1,
          quiz_type: 1,
          active_question: 1,
          questions_meta: '$questions',
          quiz_title: '$quiz_data.title',
          quiz_slug: '$quiz_data.slug',
          quiz_id_code: '$quiz_data.quiz_id',
          quiz_description: '$quiz_data.description',
          passing_grade: '$quiz_data.passing_grade',
          category_title: '$category.title',
          category_id: '$category._id',
          category_slug: '$category.slug',
        },
      }, {
        $lookup: {
          from: 'questions',
          localField: 'questions_meta.question_id',
          foreignField: '_id',
          as: 'questions_array',
        },
      },
    ]).then(data => {

      console.log('getQuizSessionBySessionId aggregate data', data);

      if (Array.isArray(data) && data.length===1) {
        return data[0];
      } else {
        throw new Error(`Unexpected result of aggregation pipeline. Expecting array with one element`);
      }
    }).then(sortQuestionsAndAnswers).then(data => {
      const {
        _id,
        quiz_id,
        quiz_type,
        active_question,
        quiz_title,
        quiz_slug,
        quiz_id_code,
        passing_grade,
        category_id,
        category_slug,
        category_title,
        questions,
      } = data;

      return {
        _id,
        quiz_id,
        quiz_type,
        active_question,
        quiz_title,
        quiz_slug,
        quiz_id_code,
        passing_grade,
        category_id,
        category_slug,
        category_title,
        questions,
      };
    });

    return res.json(sessionData);
  } catch (e) {
    console.log(TAG, 'ERROR in aggregation', e);

    res.status(400);

    return res.json({ error: `Failed to get question for session` });
  }

};


const getQuizBySessionId = async (req, res) => {
  const sessionID: string = req.params.id;
  console.log(TAG, 'entered getQuizBySessionId with', sessionID);

  const sessionData: IQuizSession = await QuizSession.findById(sessionID).lean();

  console.log(TAG, 'sessionData:', sessionData);

  const questionIDs = sessionData.questions.map(q => q.question_id);
  console.log(TAG, 'questionIDs:', questionIDs);

  const questions: unknown = await Question.find({ _id: { $in: questionIDs } }).lean();

  let myQuestions = (sessionData as IQuizSession).questions.map(questionMeta => {
    let quest = (questions as IQuestion[]).find(q => q._id.equals(questionMeta.question_id));
    let answers = questionMeta.choices.map(ansId => quest.answers[ansId]);

    return { ...quest, answers };
  });

  res.json({ ...sessionData, questions: myQuestions, active_question: sessionData.active_question || 0 });

};

export { getNewSession, getQuizBySessionId, getQuizSessionBySessionId };


