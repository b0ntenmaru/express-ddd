import Express from 'express';
import router from './contexts/user_context/infrastructure/router';
import bodyParser from 'body-parser';
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm';

const app = async () => {
  const express = Express();
  const port: number = 8080;
  express.use(bodyParser.urlencoded({ extended: true }));
  express.use(bodyParser.json());

  // --- TypeORMの設定
  const connectionOptions = await getConnectionOptions();
  const connection = await createConnection(connectionOptions);
  BaseEntity.useConnection(connection);
  /**
   * routing呼び出し
   */
  express.use('/', router);

  express.listen(port, () => {
    console.log('Started Express Process');
    console.log(`Runnning on http://localhost:${port}`);
  });
};

app();
