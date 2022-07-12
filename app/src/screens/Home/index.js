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
    try {
      const fetchedData = (await requester.get('/nearby')).data;
      setData(fetchedData.results.slice(17));
      setPageToken(fetchedData.next_page_token);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNextPage = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedData = (await requester.get('/nearby', {
        params: {
          pageToken: pageToken,
        }
      })).data;
      setData(fetchedData.results);
      setPageToken(fetchedData.next_page_token);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [pageToken]);

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
      <CardSwiper data={data} onSwipedAll={fetchNextPage} />
    </Layout>
  )
}

export default Home;
