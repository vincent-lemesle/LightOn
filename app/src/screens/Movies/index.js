import React, { useState } from 'react';

import requester from "../../services/requester";

import Layout from "../../components/Layout/LoadResourceLayout";
import CardSwiperContainer from '../../components/CardSwiperContainer';

const Movies = ({ auth, user }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const like = async (movie) => {
    await requester.post(`/movies/${movie.id}/like`, {},
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
  };

  const disLike = async (movie) => {
    await requester.post(`/movies/${movie.id}/dislike`, {},
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
  };

  const fetchData = async () => {
    const fetchedMovies = (await requester.get(
      '/movies/trending',
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })).data;
    setData(fetchedMovies.results);
  };

  return (
    <Layout user={user} auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      <CardSwiperContainer
        like={like}
        data={data}
        type="movie"
        disLike={disLike}
        resumeKey="overview"
      />
    </Layout>
  )
}

export default Movies;
