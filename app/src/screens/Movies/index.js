import React, { useState } from "react";

import requester from "../../services/requester";

import Layout from "../../components/Layout/LoadResourceLayout";
import CardSwiper from '../../components/CardSwiper';

const Movies = ({ auth, user }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const fetchedMovies = (await requester.get(
      '/movies/box-office',
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })).data;
    setData(fetchedMovies);
  };

  return (
    <Layout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      {data?.length > 0 && <CardSwiper data={data} type="movie" />}
    </Layout>
  )
}

export default Movies;
