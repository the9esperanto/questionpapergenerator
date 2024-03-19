import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import QuestionModel from './models/MathsModelA.js';
import QuestionModelB from "./models/MathsModelb.js";
import QuestionModelC from "./models/MathsModelC.js";
import QuestionModelD from "./models/MathsModelD.js";
import suffleQuestion from "./utils/ShuffleQuestions.js";


const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
};





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

app.get('/api/mathematics-section-a', async (req, res) => {
  try {
    mongoose.connect(mongoDBURL);

    const questions = await QuestionModel.find();
    console.log(questions);
    return res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/mathematics-section-b', async (req, res) => {
  try {
    mongoose.connect(mongoDBURL);
    const questions = await QuestionModelB.find();
    return res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/mathematics-section-c', async (req, res) => {
  try {
    mongoose.connect(mongoDBURL);
    const questions = await QuestionModelC.find();
    return res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/mathematics-section-d', async (req, res) => {
  try {
    const questions = await QuestionModelD.find()
    const numberOfQuestions = questions.length;
    console.log(`Fetched ${numberOfQuestions} questions`);

    const usedTopics = []
    const newQuestionToShowtoHardeek = [];

    // Phele.
    // console.log(questions[10]);
    // suffle
    suffleQuestion(questions);
    // Badhme.
    // console.log(questions[10]);

    for (const question of questions) {
      if (usedTopics.length == 5) {
        // console.log(usedTopics);
        break;
      }

      if (usedTopics.length == 0) {
        usedTopics.push(question);
      }
      else {
        var flag = false;

        // my filter for removing the duplicates.
        for (var q of usedTopics) {
          if (q.Topic == question.Topic) {
            console.log(q.Topic, question.Topic);
            console.log("They are same");
            flag = true;
            break;
          }
        }

        if(flag == false)
        {
          usedTopics.push(question);
        }
      }
    }
    
    for(var q of usedTopics)
    {
      newQuestionToShowtoHardeek.push(q);
    }
    return res.json(newQuestionToShowtoHardeek);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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