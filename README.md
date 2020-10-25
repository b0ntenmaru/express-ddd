## セットアップ

### クローン
`git clone git@github.com:b0ntenmaru/express-ddd.git`

### docker起動

`docker-compose up`

### 初期データ作成

`mysql -h 0.0.0.0 -u docker -P 3306 -p express_ddd create database users(name varchar(255), email varchar(255))`

### サーバー起動
`docker-compose up`

`http://localhost:8080/users` にアクセス

