import mongoose from 'mongoose';

// Define schema
const questionSchema = new mongoose.Schema({
    RelativeQuestionNumber: { type: String, required: true },
    Section: { type: String, required: true },
    SerialNumber: { type: String, required: true },
    Standard: { type: String, required: true },
    Topic: { type: String, required: true },
    Question: { type: String, required: true }
});

// Define model
const QuestionModelC = mongoose.model('mathematicssectioncs', questionSchema);

export default QuestionModelC;
