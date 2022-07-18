import axios from 'axios';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as bodyParser from 'body-parser';
import * as functions from 'firebase-functions';

const databaseURL = 'https://social-network-b2616-default-rtdb.europe-west1.firebasedatabase.app';

const imdbApiKey = 'k_3tn9bu7l';
const googleMapApiKey = 'AIzaSyDfz-OcfyJFfU3PdUUmPNjh1PbAd5JXKp8';

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

app.get('/places/nearby', async (req, res, _next) => {
  try {
    const { pageToken, type } = req.query;
    if (!type) {
      throw new Error('Invalid params');
    }
    let params = `key=${googleMapApiKey}&location=48.818508,2.319620&radius=5000&type=${type}`;
    if (pageToken) {
      params += `&pagetoken=${pageToken}`;
    }
    const places = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params}`);
    const placesWithDetails = await Promise.all(places.data.results.map(async (place: any) => {
      const details = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${googleMapApiKey}&place_id=${place.place_id}`);
      return details.data.result;
    }))
    res.send({ results: placesWithDetails, next_page_token: places.data.next_page_token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/places/nearby/:id', async (req, res, _next) => {
  try {
    const { id } = req.params;
    const places = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${googleMapApiKey}&place_id=${id}`);
    res.send(places.data);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/movies/box-office', async (req, res, _next) => {
  try {
    const movies = await axios.get(`https://imdb-api.com/en/api/BoxOfficeAllTime/${imdbApiKey}`);
    const moviesWithPosters = await Promise.all(movies.data.items.map(async (movie: any) => {
      const posters = await axios.get(`https://imdb-api.com/en/api/Posters/${imdbApiKey}/${movie.id}`);
      return {
        ...movie,
        image: posters.data.posters.length > 0 ? posters.data.posters[0].link : 'https://imdb-api.com/images/128x176/nopicture.jpg',
      }
    }))
    res.send(moviesWithPosters);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

exports.api = functions.https.onRequest(app);
