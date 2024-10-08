import express from 'express';
import cors from 'cors';
import botController from './botController.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello from Express!</h1>');
});

app.post('/api/chat', botController.llmMiddleware, (req, res) => {
  res.status(200).json(res.locals.response);
  // res.status(200).json('Hello yourself!');
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.error('Error: ', err);
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
