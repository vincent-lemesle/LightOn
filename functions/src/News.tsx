import axios from "axios";

const apiKey = '34b47f0d-105d-4db0-8c23-fde866d6f7f8';

export const getNews = async () => {
  const news = await axios.get(`https://newsapi.ai/api/v1/article/getArticles?apiKey=${apiKey}`);

  return news.data;
}

export const getLikedNews = async (userId: string, firestore: any) => {
  const dbMovies = await firestore
    .collection('Like')
    .where('userId', '==', userId)
    .where('type', '==', 'news')
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

export const likeNews = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('Like').add({ id, type: 'news', userId });
}

export const dislikeNews = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('DisLike').add({ id, type: 'news', userId});
}
