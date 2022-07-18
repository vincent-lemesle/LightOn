import { Spinner } from 'native-base';
import React, { useState, useCallback, useEffect } from "react";

import requester from "../../services/requester";

import Layout from "../../components/Layout/LoadResourceLayout";
import CardSwiper from '../../components/CardSwiper';

const Movies = ({ auth }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const fetchedMovies = (await requester.get('/movies/box-office')).data;
      setData(fetchedMovies);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [data])

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout auth={auth}>
      {data.length > 0 && <CardSwiper data={data} type="movie" />}
    </Layout>
  )
}

export default Movies;
