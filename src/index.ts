import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import baseRouter from './routes/baserouter';

const app = express()
app.use(bodyParser.json({ limit: "50mb" }));

const port = 3001;

const mongoDB = 'mongodb://localhost:27017/quiz';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', baseRouter)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))