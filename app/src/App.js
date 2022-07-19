import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import Router from "./Router";

import Auth from "./screens/Auth";
import { extendTheme } from "native-base";
import { registerRootComponent } from 'expo';

const theme = extendTheme({
  colors: {
  },
  config: {
    // Changing initialColorMode to 'dark
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

const firebaseConfig = {
  apiKey: 'AIzaSyA8T8ax79KvJEypVdGqI-OlteI5mCr2rjg',
  authDomain: 'lighton-e6343.firebaseapp.com',
  databaseURL: 'https://lighton-e6343-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'lighton-e6343',
  storageBucket: 'gs://lighton-e6343.appspot.com',
  messagingSenderId: '595738063490',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [user, setUser] = useState(undefined);
  const [initialRoute, setInitialRoute] = useState('');

  auth.onAuthStateChanged((fetchedUser) => {
    if (fetchedUser) {
      console.log(fetchedUser);
      setUser(fetchedUser);
      /*
      requester.post('/accounts', {}, {
        headers: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          'Authorization': `Bearer ${fetchedUser.accessToken}`
        },
      }).then(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUser(fetchedUser);
        setIsLoading(false);
      });
       */
    } else {
      // User is signed out
      // ...
      // setInitialRoute('Auth');
      // setIsLoading(false);
    }
  });

  const ads = async () => {
    await mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      });
    await mobileAds()
      .initialize()
  }

  useEffect(() => {
    ads();
  }, [initialRoute, user]);

  if (!user) {
    return (
      <NativeBaseProvider theme={theme}>
        <Auth auth={auth} />
      </NativeBaseProvider>
    )
  }

  return (
    <Router auth={auth} />
  );
}

export default registerRootComponent(App);
