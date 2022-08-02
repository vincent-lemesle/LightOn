import React, { useState } from 'react';

import requester from "../../services/requester";

import Layout from "../../components/Layout/LoadResourceLayout";
import CardSwiperContainer from '../../components/CardSwiperContainer';

const VideoGames = ({ auth, user }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const like = async (movie) => {
    await requester.post(`/video-games/${movie.id}/like`, {},
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
  };

  const disLike = async (movie) => {
    await requester.post(`/video-games/${movie.id}/dislike`, {},
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
  };

  const fetchData = async () => {
    const fetchedMovies = (await requester.get(
      '/video-games/trending',
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })).data;
    setData(fetchedMovies);
  };

  return (
    <Layout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      <CardSwiperContainer
        like={like}
        data={data}
        type="video_game"
        disLike={disLike}
        resumeKey="description"
      />
    </Layout>
  )
}

export default VideoGames;
