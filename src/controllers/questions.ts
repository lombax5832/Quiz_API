import Question from '../models/questions';

const addQuestion = (req, res) => {
    console.log(req.body);
    const newquestion = new Question(req.body)

    newquestion.save((err, product) => {
        if (err) {
            console.log("Error: ", err);
            res.end("Error");
        } else {
            console.log("Product: ", product)
            res.json({ _id: product._id })
        }
    });
}

const fetchByID = (req, res) => Question.findById(req.params.id, (err, result) => {
    if (err) {
        console.error('fetchByID Error', err)
        res.status(500)
        res.json({ error: err })
    } else {
        if (!result) {
            console.error('fetchByID not found by id=', req.params.id)
            res.status(404)
            return res.json({ error: "Question not found" })
        }
        res.json(result)
    }
})

const fetchByQuizID = (req, res) => Question.find({ quiz_id: req.params.quiz_id }, (err, result) => {
    if (err) {
        console.error('fetchByQuizID Error', err)
        res.status(500)
        res.json({ error: err })
    } else {
        if (!result) {
            console.error('fetchByQuizID not found by quiz_id=', req.params.quiz_id)
            res.status(404)
            return res.json({ error: "Question not found" })
        }
        res.json(result)
    }
})

const updateQuestion = (req, res) => Question.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
    if (err) {
        console.log("Error: ", err);
        res.end("Error");
    } else {
        console.log("Product: ", product)
        res.json({ _id: product._id })
    }
})
export { addQuestion, fetchByID, updateQuestion, fetchByQuizID };
