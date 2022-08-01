import axios from "axios";

const movieApiKey = 'b6ff291b53cbf5425a75a801e778c2bb';
const newsApiKey = '36a127b3-a6e1-43d0-9a2a-ad9e5ea9af38';

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
    if (data.type === 'newe') {
      details = await axios.get(`http://eventregistry.org/api/v1/article/getArticle?apiKey${newsApiKey}&articleUri=${data.id}`);
    }
    likesWithDetails.push(details?.data || {});
  }))
  return likesWithDetails;
}
