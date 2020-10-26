import Express from 'express';
import router from './contexts/user_context/infrastructure/router';
import bodyParser from 'body-parser';

const app = Express();
const port: number = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, () => {
  console.log('Started Express Process')
  console.log(`Runnning on http://localhost:${port}`);
});
