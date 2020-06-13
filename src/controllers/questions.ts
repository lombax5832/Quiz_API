import Question from '../models/questions'

const addQuestion = (req, res) => {
    console.log(req.body);
    const newquestion = new Question(req.body)

    newquestion.save((err, product) => {
        if (err) {
            console.log("Error: ", err);
            res.end("Error");
        } else {
            console.log("Product: ", product)
            res.end("OK");
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

export { addQuestion, fetchByID }