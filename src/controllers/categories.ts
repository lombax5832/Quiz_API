import Category from '../models/categories'

const fetchAll = (req, res) => Category.find((err, result) => {
    if (err) {
        res.status(500)
        res.json({ error: err })
    } else {
        res.json(result)
    }
})

const fetchBySlug = (req, res) => Category.findOne({ slug: req.params.id }, (err, result) => {
    if (err) {
        console.error('fetchBySlug Error', err)
        res.status(500)
        res.json({ error: err })
    } else {
        if (!result) {
            console.error('fetchBySlug not found by slug=', req.params.id)
            res.status(404)
            return res.json({ error: "Category not found" })
        }
        res.json(result)
    }
})

const fetchByID = (req, res) => Category.findById(req.params.id, (err, result) => {
    if (err) {
        console.error('fetchByID Error', err)
        res.status(500)
        res.json({ error: err })
    } else {
        if (!result) {
            console.error('fetchByID not found by slug=', req.params.id)
            res.status(404)
            return res.json({ error: "Category not found" })
        }
        res.json(result)
    }
})

const addCategory = (req, res) => {
    console.log(req.body);
    const newcategory = new Category(req.body)

    newcategory.save((err, product) => {
        if (err) {
            console.log("Error: ", err);
            res.end("Error");
        } else {
            console.log("Product: ", product)
            res.end("OK");
        }
    });
}

const updateCategory = (req, res) => {

    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
        if (err) {
            console.log("Error: ", err);
            res.end("Error");
        } else {
            console.log("Product: ", product)
            res.json(product);
        }
    })
}

export { fetchAll, fetchBySlug, fetchByID, addCategory, updateCategory }

