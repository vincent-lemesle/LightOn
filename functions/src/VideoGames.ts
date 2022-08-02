import axios from "axios";

const apiKey = '00d5268ed7b3454fbf141f34b8859ba2';

export const getVideoGames = async () => {
  const videoGames = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);

  const videoGamesWithDetails: any[] = [];
  await Promise.all(videoGames.data.results.map(async (vg: any) => {
    const details = await axios.get(`https://api.rawg.io/api/games/${vg.id}?key=${apiKey}`);
    videoGamesWithDetails.push(details.data);
  }))
  return videoGamesWithDetails;
}

export const getLikedMovies = async (userId: string, firestore: any) => {
  const dbMovies = await firestore
    .collection('Like')
    .where('userId', '==', userId)
    .where('type', '==', 'video_game')
    .get();
  if (dbMovies.empty) {
    return [];
  }
  let movies: any[] = [];
  await Promise.all(dbMovies.docs.map(async (movie: any) => {
    const details = await (axios.get(`https://api.rawg.io/api/games/${movie.date().id}?key=${apiKey}`));
    movies.push(details.data);
  }))
  return movies;
}

export const likeVideoGame = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('Like').add({ id, type: 'video_game', userId });
}

export const dislikeVideoGame = async (id: string, userId: string, firestore: any) => {
  await firestore.collection('DisLike').add({ id, type: 'video_game', userId});
}
