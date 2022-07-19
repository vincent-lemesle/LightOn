import Swiper from "react-native-deck-swiper";

import Card from "../Card";
import { AdMobInterstitial, setTestDeviceIDAsync } from "expo-ads-admob";
import {useEffect} from "react";

const CardSwiper = ({ data, type, onSwipedAll = undefined }) => {
  const adTest = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910');
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      console.log("interstitialDidFailToLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("interstitialDidOpen")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () =>
      console.log("interstitialDidClose")
    );
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      console.log("interstitialWillLeaveApplication")
    );
  }

  const showInterstitial = async () => {
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  }

  useEffect(() => {
    adTest();
  }, []);

  const swipedAll = async () => {
    await showInterstitial();
    await onSwipedAll();
  }
  return (
    <Swiper
      cards={data}
      stackSize={2}
      cardIndex={0}
      stackSeparation={0}
      verticalSwipe={false}
      showSecondCard={true}
      backgroundColor={'rgba(0, 0, 0, 0)'}
      onSwiped={(cardIndex) => {console.log(cardIndex)}}
      renderCard={(item) => <Card data={item} type={type} />}
      onSwipedAll={onSwipedAll ? () => swipedAll() : undefined}
    />
  )
}

export default CardSwiper;
