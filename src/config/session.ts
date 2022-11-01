import session from 'express-session';
import redisStore from 'connect-redis';
import { createClient } from 'redis';
import config from './redis';
// use Redis to store session

// const redisClient =
//   process.env.NODE_ENV !== 'development'
//     ? createClient({
//         legacyMode: true,
//         // url: `redis://${config.REDISUSER}:${config.REDISPASSWORD}@${config.REDISHOST}:${config.REDISPORT}`,
//         url: `redis://default:0IEEKPHBgndOaVSOGttS@containers-us-west-101.railway.app:6498`,
//         username: 'default',
//         password: '0IEEKPHBgndOaVSOGttS',
//       })
//     : createClient();
const redisClient = createClient({
  legacyMode: true,
  // url: `redis://${config.REDISUSER}:${config.REDISPASSWORD}@${config.REDISHOST}:${config.REDISPORT}`,
  url: `redis://default:0IEEKPHBgndOaVSOGttS@containers-us-west-101.railway.app:6498`,
  username: 'default',
  password: '0IEEKPHBgndOaVSOGttS',
});
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
