import axios from "axios";

const apiKey = 'b6ff291b53cbf5425a75a801e778c2bb';

export const getTvShows = async () => {
  const movies = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`);

  return movies.data;
}

export const getLikedTvShows = async (userId: string, firestore: any) => {
  const dbMovies = await firestore
    .collection('Like')
    .where('userId', '==', userId)
    .where('type', '==', 'tv_show')
    .get();
  if (dbMovies.empty) {
    return [];
  }
  let movies: any[] = [];
  await Promise.all(dbMovies.docs.map(async (movie: any) => {
    const details = await (axios.get(`https://api.themoviedb.org/3/trending/tv/${movie.date().id}?api_key=${apiKey}`));
    movies.push(details.data);
  }))
  return movies;
}

export const likeTvShow = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('Like').add({ id, type: 'tv_show', userId });
}

export const dislikeTvShow = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('DisLike').add({ id, type: 'tv_show', userId});
}
