export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  MySQL: {
    host: process.env.MYSQL_HOST,
    post: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiredIn: process.env.JWT_EXPIRED_IN,
  },
});
