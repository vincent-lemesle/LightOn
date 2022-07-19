import React, {useEffect, useState} from "react";
import {
  AdMobBanner,
  AdMobInterstitial,
  setTestDeviceIDAsync
} from "expo-ads-admob";

import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

import Layout from "../../components/Layout/LoadResourceLayout";

// const interstitial = InterstitialAd.createForAdRequest('ca-app-pub-3940256099942544/4411468910');

const Home = ({ auth }) => {
  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  /*
  const adTest = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910');
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  }

  useEffect(() => {
    adTest();
  }, []);


   */
  useEffect(() => {
  }, [])
  return (
    <Layout auth={auth} setLoading={setLoading} fetchData={() => {}}>

    </Layout>
  )
}

export default Home;
