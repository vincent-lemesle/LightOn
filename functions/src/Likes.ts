import axios from "axios";

const movieApiKey = 'b6ff291b53cbf5425a75a801e778c2bb';
const videoGamesApiKey = '00d5268ed7b3454fbf141f34b8859ba2';

export const getLiked = async (userId: string, firestore: any) => {
  const likes = await firestore
    .collection('Like')
    .where('userId', '==', userId)
    .get();
  if (likes.empty) {
    return [];
  }
  let likesWithDetails: any[] = [];
  await Promise.all(likes.docs.map(async (like: any) => {
    const data = like.data();
    let details;
    if (data.type === 'movie') {
      details = await axios.get(`https://api.themoviedb.org/3/movie/${data.id}?api_key=${movieApiKey}`);
    }
    if (data.type === 'tv_show') {
      details = await axios.get(`https://api.themoviedb.org/3/tv/${data.id}?api_key=${movieApiKey}`);
    }
    if (data.type === 'video_game') {
      details = await axios.get(`https://api.rawg.io/api/games/${data.id}?key=${videoGamesApiKey}`);
    }
    likesWithDetails.push({ ...details?.data, type: data.type } || {});
  }))
  return likesWithDetails;
}
