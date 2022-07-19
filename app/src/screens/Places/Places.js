import React, { useCallback, useState } from "react";

import requester from "../../services/requester";

import CardSwiper from '../../components/CardSwiper';
import LoadResourceLayout from "../../components/Layout/LoadResourceLayout";
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds } from 'react-native-google-mobile-ads';

const Places = ({ auth, type }) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const d = (await requester.get('/places/nearby', { params: { type }})).data;
    setData(d);
  };

  const fetchNextPage = useCallback(async () => {
    setLoading(true);
    InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/4411468910');
    try {
      const fetchedData = (await requester.get('/places/nearby', {
        params: { pageToken: data.next_page_token, type }
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
      <CardSwiper data={data?.results.slice(10)} onSwipedAll={fetchNextPage} type="place" />
    </LoadResourceLayout>
  )
}

export default Places;
