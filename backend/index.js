import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};

const dataSchema = new mongoose.Schema({
  No: Number,
  Question: String,
  topic: String
});

const Data = mongoose.model('OneMarksSingleChoice', dataSchema);



app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  // console.log(request)
  return response.status(200).send("Welcome to my New project");
});

app.post('/api/data', async (req, res) => {
  // Your backend logic here


  try {


    // Create a new document in the 'data' collection
    const newData = new Data(req.body);
    await newData.save();

    res.json({ message: 'Data stored successfully!' });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getquestions', async (req, res) => {

  try {
    mongoose.connect(mongoDBURL)

    Data.find().then((data)=>{
      // console.log(data)
      // console.log(data);
      return res.json(data);
    })
  }
  catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });


mongoose.connect(mongoDBURL).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  })
}).catch((error) => {
  console.log(error);
});