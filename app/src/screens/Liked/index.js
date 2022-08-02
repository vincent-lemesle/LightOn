import { FlatList } from 'react-native';
import React, { useState } from "react";

import requester from "../../services/requester";

import Card from '../../components/Card';
import Layout from "../../components/Layout/LoadResourceLayout";
import { View } from 'native-base';

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
      {data && <FlatList numColumns={4} data={data} contentContainerStyle={{ paddingBottom: 40 }} renderItem={({ item }) => (
          <View style={{ width: 350, height: 450, margin: 10 }}>
            <Card data={item} type={item.type} />
          </View>
        )}
      />}
    </Layout>
  )
}

export default Movies;
