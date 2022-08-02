import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as functions from 'firebase-functions';

import { getLiked } from './Likes';
import { getMovies, likeMovie, dislikeMovie } from './Movies';
import { getTvShows, likeTvShow, dislikeTvShow } from './TvShows';
import { getVideoGames, likeVideoGame, dislikeVideoGame} from "./VideoGames";

const databaseURL = 'https://social-network-b2616-default-rtdb.europe-west1.firebasedatabase.app';

admin.initializeApp({
  databaseURL,
  credential: admin.credential.applicationDefault(),
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

// PING

app.get('/ping', async (req, res, _next) => {
  res.send({ message: 'pong' });
});

// Express middleware that validates Firebase ID Tokens
// passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer
// token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (
  req: any,
  res: any,
  next: any) => {
  if (!req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    res.locals.user = await admin.auth().verifyIdToken(idToken);
    next();
    return;
  } catch (e) {
    res.status(403).send('Unauthorized');
    return;
  }
};

app.use(authenticate);

app.get('/movies/trending', async (req, res, _next) => {
  try {
    const movies = await getMovies();
    res.send(movies);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/movies/:id/like', async (req, res, _next) => {
  try {
    const { id } = req.params;
    await likeMovie(id, res.locals.user.uid, admin.firestore());
    res.send({ message: 'ok' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/movies/:id/dislike', async (req, res, _next) => {
  try {
    const { id } = req.params;
    await dislikeMovie(id, res.locals.user.uid, admin.firestore());
    res.send({ message: 'ok' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/tv-shows/trending', async (req, res, _next) => {
  try {
    const movies = await getTvShows();
    res.send(movies);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/tv-shows/:id/like', async (req, res, _next) => {
  try {
    const { id } = req.params;
    await likeTvShow(id, res.locals.user.uid, admin.firestore());
    res.send({ message: 'ok' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/tv-shows/:id/dislike', async (req, res, _next) => {
  try {
    const { id } = req.params;
    await dislikeTvShow(id, res.locals.user.uid, admin.firestore());
    res.send({ message: 'ok' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/video-games/trending', async (req, res, _next) => {
  try {
    const movies = await getVideoGames();
    res.send(movies);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/video-games/:id/like', async (req, res, _next) => {
  try {
    const { id } = req.params;
    await likeVideoGame(id, res.locals.user.uid, admin.firestore());
    res.send({ message: 'ok' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/video-games/:id/dislike', async (req, res, _next) => {
  try {
    const { id } = req.params;
    await dislikeVideoGame(id, res.locals.user.uid, admin.firestore());
    res.send({ message: 'ok' });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/liked', async (req, res, _next) => {
  try {
    const liked = await getLiked(res.locals.user.uid, admin.firestore());
    res.send(liked);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

exports.api = functions.https.onRequest(app);
