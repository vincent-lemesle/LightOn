import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { NativeBaseProvider, Center, Spinner } from 'native-base';
import Router from "./Router";

import { registerRootComponent } from 'expo';

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
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');

  auth.onAuthStateChanged((fetchedUser) => {
    if (fetchedUser) {
      console.log(fetchedUser);
      setUser(fetchedUser);
    } else {
      // User is signed out
    }
    setLoading(false);
  });

  if (loading) {
    return (
      <NativeBaseProvider>
        <Center px={4} flex={1} style={{ width: '90%', marginHorizontal: '5%' }}>
          <Spinner size="lg" />
        </Center>
      </NativeBaseProvider>
    )
  }

  return (
    <Router auth={auth} user={user} />
  );
}

export default registerRootComponent(App);
