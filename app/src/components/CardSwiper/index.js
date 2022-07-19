import { useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import { Image, Pressable, View } from "native-base";
import { AdMobInterstitial, setTestDeviceIDAsync } from "expo-ads-admob";

import Card from "../Card";
import { isMobile } from "../Device";

const CardSwiper = ({ data, type, onSwipedAll = undefined, setExtraData = undefined, buttons = [] }) => {
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
    if (isMobile) {
      adTest();
    }
  }, []);

  const swipedAll = async () => {
    if (isMobile) {
      await showInterstitial();
    }
    await onSwipedAll();
  }

  return (
    <View style={{ flex: 1, height: 600 }}>
      <Swiper
        cards={data}
        stackSize={2}
        cardIndex={0}
        stackSeparation={0}
        verticalSwipe={false}
        showSecondCard={true}
        cardHorizontalMargin={0}
        backgroundColor={'rgba(0, 0, 0, 0)'}
        cardStyle={{ height: 450, width: 350 }}
        containerStyle={{ position: 'relative', width: 350, height: 450 }}
        onSwipedAll={onSwipedAll ? () => swipedAll() : undefined}
        renderCard={(item) => <Card data={item} type={type} />}
        onSwiped={(cardIndex) => setExtraData(data[cardIndex])}
      />
      <View style={{ marginTop: 100, alignItems: 'center' }}>
        {
          buttons.map((b) => (
            <Pressable onPress={b.onPress}>
              <Image source={b.icon} style={{ width: 50, height: 50 }}/>
            </Pressable>
          ))
        }
      </View>
    </View>
  )
}

export default CardSwiper;
