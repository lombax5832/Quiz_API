import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import baseRouter from './routes/baserouter';
import cors from 'cors';

const app = express()

app.set('etag', false);
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));

const port = 3001;

//const mongoDB = 'mongodb://192.168.0.199:27017/quiz';
//const mongoDB = `mongodb+srv://snytkine2020:${process.env.DB_PASSWORD}@cluster0.ft1p3.mongodb.net/quiz?retryWrites=true&w=majority`
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', baseRouter)

//app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

export {app}
