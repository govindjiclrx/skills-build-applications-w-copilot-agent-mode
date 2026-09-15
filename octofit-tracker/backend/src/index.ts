import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import db from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.use('/api', apiRouter);


app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    apiBaseUrl,
    database: db.readyState === 1 ? 'connected' : 'connecting',
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});