import session from 'express-session';
import redisStore from 'connect-redis';
import { createClient } from 'redis';

// use Redis to store session
const redisClient = createClient();
const sessionStore = redisStore(session);

async () => {
  await redisClient.connect();
};

export const sessionConfig = {
  store: new sessionStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000,
  },
};
