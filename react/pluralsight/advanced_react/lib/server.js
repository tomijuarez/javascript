import express from 'express';
import config from './config.js';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));

app.get('/', (req, res) => {
  res.render('index', { title: 'test' });
});