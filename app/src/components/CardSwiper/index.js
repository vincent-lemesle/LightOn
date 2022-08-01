import { useEffect, useState } from 'react';
import Swiper from "react-native-deck-swiper";
import { Image, Pressable, View } from "native-base";
import { AdMobInterstitial, setTestDeviceIDAsync } from "expo-ads-admob";

import Card from "../Card";
import { isMobile } from "../Device";

import requester from '../../services/requester';

import heartPng from '../../../assets/icon/heart.png';
import thumbDownPng from '../../../assets/icon/thumbDown.png';

const CardSwiper = ({ data, type, like, disLike, onSwipedAll = undefined, setExtraData = undefined, buttons = [] }) => {
  const [showSwipedComponent, setShowSwipedComponent] = useState({ active: false });

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

  const onSwiped = (cardIndex) => {
    setExtraData(data[cardIndex]);
  }

  const onSwipedLeft = async (cardIndex) => {
    setShowSwipedComponent({ active: true, type: 'left' })
    await like(data[cardIndex]);
    const to = setTimeout(() => {
      setShowSwipedComponent({ active: false });
      clearTimeout(to);
    }, 500);
  }

  const onSwipedRight = async (cardIndex) => {
    setShowSwipedComponent({ active: true, type: 'right' })
    await disLike(data[cardIndex]);
    const to = setTimeout(() => {
      setShowSwipedComponent({ active: false  });
      clearTimeout(to);
    }, 500);
  }

  return (
    <View style={{ flex: 1, height: 600 }}>
      <Swiper
        cards={data}
        stackSize={2}
        cardIndex={0}
        onSwiped={onSwiped}
        stackSeparation={0}
        verticalSwipe={false}
        showSecondCard={true}
        cardHorizontalMargin={0}
        onSwipedLeft={onSwipedLeft}
        onSwipedRight={onSwipedRight}
        backgroundColor={'rgba(0, 0, 0, 0)'}
        cardStyle={{ height: 450, width: 350 }}
        onSwipedAll={onSwipedAll ? () => swipedAll() : undefined}
        renderCard={(item) => <Card data={item} type={type} />}
        containerStyle={{ position: 'relative', width: 350, height: 450 }}
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
      {
        showSwipedComponent.active && (
          <View style={{ position: 'fixed', alignItems: 'center', justifyContent: 'center', width: 350, height: 450 }}>
            <Image source={showSwipedComponent.type === 'left' ? heartPng : thumbDownPng} style={{ width: 100, height: 100 }}/>
          </View>
        )
      }
    </View>
  )
}

export default CardSwiper;
