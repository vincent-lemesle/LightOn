import { Spinner } from 'native-base';
import React, { useState, useCallback, useEffect } from "react";

import requester from "../../services/requester";

import Layout from "../../components/Layout";
import CardSwiper from '../../components/CardSwiper';

const Home = ({ auth }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [pageToken, setPageToken] = useState(undefined);

  const fetchData = useCallback(async () => {
    const fetchedData = (await requester.get('/nearby')).data;
    setData(fetchedData.results.slice(17));
    setPageToken(fetchedData.next_page_token);
    setLoading(false);
  }, []);

  const fetchNextPage = useCallback(async () => {
    setLoading(true);
    const fetchedData = (await requester.get('/nearby', {
      params: {
        pageToken: pageToken,
      }
    })).data;
    console.log(fetchedData);
    setData(fetchedData.results);
    setPageToken(fetchedData.next_page_token);
    setLoading(false);
  }, [pageToken]);

  useEffect(() => {
    if (!data) {
      console.log('ici');
      fetchData();
    }
  }, [data])

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout auth={auth}>
      <CardSwiper data={data} onSwipedAll={fetchNextPage} />
    </Layout>
  )
}

export default Home;
