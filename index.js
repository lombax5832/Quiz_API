const express = require('express')
const app = express()
const port = 3000

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/quiz';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./models/categories')

const categoriesRouter = require('./routes/categories')

app.get('/', (req, res) => res.json({ "message": "Hello" }))
app.use('/categories', categoriesRouter)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))