import Express from 'express';
import mysql from 'mysql';
import { UsersController } from '../presentation/usersController';
import { UserRepository } from '../infrastructure/userRepository';

const router = Express.Router();

const connecter = mysql.createConnection({
  host: 'db',
  user: 'docker',
  password: 'docker',
  database: 'express_ddd'
});

connecter.connect(function(error: any): void {
  if (error) throw error;
  console.log('connected to Database');
});

// ここでDIを実行する
const userRepository = new UserRepository(connecter);
const usersController = new UsersController(userRepository);

/**
 * Routing
 */

/**
 * GET /users
 * 全てのユーザーを取得する
 */
router.get('/users', async (request: Express.Request, response: Express.Response) => {
  const results = await usersController.findAll();
  response.send(results);
});

/**
 * POST /users/create
 * ユーザーを作成する
 */
router.post('/users/create', async (request: Express.Request, response: Express.Response) => {
  const result = await usersController.createUser(request);
  response.send(result);
});

// DELETE
router.delete('/users/:id', (request: Express.Request, response: Express.Response) => {
  const sql: string = 'DELETE FROM users WHERE id = ?';
  connecter.query(sql, [request.params.id], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    response.send(`Deleted User with id ${request.params.id}`)
  });
});

// PUT
router.put('/users/:id', (request: Express.Request, response: Express.Response) => {
  const sql: string = `UPDATE users SET ? WHERE id = ${request.params.id}`;
  connecter.query(sql, request.body, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    response.send(`Updated User with id ${request.params.id}`)
  });
});

export default router;
