import { FlatList } from 'react-native';
import React, { useState } from "react";

import requester from "../../services/requester";

import Card from '../../components/Card';
import Layout from "../../components/Layout/LoadResourceLayout";

const Movies = ({ auth, user }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const fetchedMovies = (await requester.get(
      '/liked',
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })).data;
    setData(fetchedMovies);
  };

  console.log(data);
  return (
    <Layout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      {data && <FlatList data={data} renderItem={({ item }) => <Card data={item} type="movie" />} />}
    </Layout>
  )
}

export default Movies;
