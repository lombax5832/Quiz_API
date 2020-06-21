import Quiz from '../models/quizzes'

const fetchAll = (req, res) => Quiz.find((err, result) => {
    if (err) {
        res.status(400)
        res.json({ error: err })
    } else {
        res.json(result)
    }
})

const fetchBySlug = (req, res, next) => Quiz.find({ slug: req.params.id }, (err, result) => {
    if (err) {
        res.status(400)
        res.json({ error: err })
    } else {
        if (result.length === 0) {
            res.status(404)
            return res.json({ error: "Quiz not found" })
        }
        res.json(result)
    }
})

const fetchAllWithCategories = (req, res) => Quiz.aggregate([{
    $lookup: {
        from: 'categories',
        localField: 'category_id',
        foreignField: '_id',
        as: 'category'
    }
}, {
    $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: false
    }
}, {
    $project: {
        _id: 1,
        category_id: 1,
        title: 1,
        categoryName: "$category.title",
        slug: 1,
        quiz_id: 1,
        description: 1,
    }
}, {
    $sort: {
        categoryName: 1
    }
}]).exec((err, result) => {
    if (err) {
        console.error('fetchAllWithCategories Error', err)
        res.status(500)
        res.json({ error: err })
    } else {
        res.json(result)
    }
})

const fetchByID = (req, res) => Quiz.findById(req.params.id, (err, result) => {
    if (err) {
        console.error('fetchByID Error', err)
        res.status(400)
        res.json({ error: err })
    } else {
        if (!result) {
            console.error('fetchByID not found by slug=', req.params.id)
            res.status(404)
            return res.json({ error: "Quiz not found" })
        }
        res.json(result)
    }
})

const addQuiz = (req, res) => {
    console.log(req.body);
    const newquiz = new Quiz(req.body)

    newquiz.save((err, product) => {
        if (err) {
            res.status(400)
            console.log("Error: ", err);
            res.end("Error");
        } else {
            console.log("Product: ", product)
            res.end("OK");
        }
    })
}

const updateQuiz = (req, res) => {

    Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
        if (err) {
            res.status(400)
            console.log("Error: ", err);
            res.end("Error");
        } else {
            console.log("Product: ", product)
            res.json(product);
        }
    })
}

export { fetchAll, fetchAllWithCategories, fetchByID, addQuiz, updateQuiz }