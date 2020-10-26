import Express from 'express';
import router from './contexts/user_context/infrastructure/router';
import bodyParser from 'body-parser';

const app = Express();
const port: number = 8080;
const host: string = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(port, host, () => {
  console.log('Started Express Process')
  console.log(`Runnning on http://${host}:${port}`);
});
