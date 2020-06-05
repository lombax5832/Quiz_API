import Quiz from '../models/quizzes'

const fetchAll = (res, next) => Quiz.find((err, result) => {
    if (err) {
        res.json({ error: err })
    } else {
        res.json(result)
        next(err)
    }
})

const fetchBySlug = (req, res, next) => Quiz.find({ slug: req.params.id }, (err, result) => {
    if (err) {
        res.json({ error: err })
    } else {
        if (result.length === 0) {
            res.status(404)
            return res.json({ error: "Category not found" })
        }
        res.json(result)
        next(err)
    }
})

const addQuiz = (req, res) => {
    console.log(req.body);
    const newquiz = new Quiz(req.body)

    newquiz.save((err, product) => {
        if (err) {
            console.log("Error: ", err);
            res.end("Error");
        }else{
            console.log("Product: ", product)
            res.end("OK");
        }
    });
}

export { fetchAll, fetchBySlug, addCategory }