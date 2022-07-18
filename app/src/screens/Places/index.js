import React, { useCallback, useState } from "react";

import requester from "../../services/requester";

import CardSwiper from '../../components/CardSwiper';
import LoadResourceLayout from "../../components/Layout/LoadResourceLayout";

const Places = ({ auth }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const d = (await requester.get('/places/nearby')).data;
    setData(d);
  };

  const fetchNextPage = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedData = (await requester.get('/places/nearby', {
        params: { pageToken: data.next_page_token }
      })).data;
      setData(fetchedData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [data]);

  return (
    <LoadResourceLayout auth={auth} fetchData={fetchData} loading={loading} setLoading={setLoading}>
      <CardSwiper data={data?.results} onSwipedAll={fetchNextPage} type="place" />
    </LoadResourceLayout>
  )
}

export default Places;
