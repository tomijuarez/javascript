import express from 'express';
import config from './config.js';
import serverRenderer from 'renderers/server';
import { data } from 'testData';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

app.get('/', async (req, res) => {
  const initialContent = await serverRenderer();
  const title = 'Test title';
  res.render('index', { ...initialContent, title });
});

app.get('/data', (req, res) => {
  res.send(data);
});