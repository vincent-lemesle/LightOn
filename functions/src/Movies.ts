import axios from "axios";

const apiKey = 'b6ff291b53cbf5425a75a801e778c2bb';

export const getMovies = async () => {
  const movies = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`);

  return movies.data;
}

export const getLikedMovies = async (userId: string, firestore: any) => {
  const dbMovies = await firestore
    .collection('Like')
    .where('userId', '==', userId)
    .where('type', '==', 'movie')
    .get();
  if (dbMovies.empty) {
    return [];
  }
  let movies: any[] = [];
  await Promise.all(dbMovies.docs.map(async (movie: any) => {
    const details = await (axios.get(`https://api.themoviedb.org/3/trending/movie/${movie.date().id}?api_key=${apiKey}`));
    movies.push(details.data);
  }))
  return movies;
}

export const likeMovie = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('Like').add({ id, type: 'movie', userId });
}

export const dislikeMovie = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('DisLike').add({ id, type: 'movie', userId});
}
