import { Text, View } from 'native-base';
import React, { useState, useEffect } from 'react';

import requester from "../../services/requester";

import CardSwiper from '../../components/CardSwiper';
import { BrowserView } from '../../components/Device';
import Layout from "../../components/Layout/LoadResourceLayout";
import WebCardInformation from '../../components/WebCardInformation';

const Movies = ({ auth, user }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [extraData, setExtraData] = useState("");

  const like = async (movie) => {
    await requester.post(`/movies/${movie.id}/like`, {},
      {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
  };

  const diLike = async (movie) => {
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
    setExtraData(fetchedMovies.results[0].overview || "");
  };

  useEffect(() => {}, [extraData]);

  return (
    <Layout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      <BrowserView style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ width: '30%', zIndex: 2 }}>
          {data?.length > 0 && <CardSwiper
            like={like}
            data={data}
            type="movie"
            disLike={diLike}
            setExtraData={(m) => setExtraData(m.overview || "")}
          />}
        </View>
        <View style={{ width: '55%' }}>
          <WebCardInformation>
            <Text fontSize="xl">
              {extraData}
            </Text>
          </WebCardInformation>
        </View>
      </BrowserView>
    </Layout>
  )
}

export default Movies;
