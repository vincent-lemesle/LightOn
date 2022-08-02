import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { isBrowser } from './components/Device';

import Home from './screens/Home';
import Auth from './screens/Auth';
import Liked from './screens/Liked';
import Movies from './screens/Movies';
import Profile from './screens/Profile';
import TvShows from './screens/TvShows';
import Discover from './screens/Discover';
import VideoGames from './screens/VideoGames';

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
    // Add new color
    // primary: currentColor,
  },
  config: {
    // Changing initialColorMode to 'dark
    useSystemColorMode: false,
    initialColorMode: 'light',
  },
});

const Router = ({ auth, user }) => {
  const [initialRoute, setInitialRoute] = useState('');

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Stack.Navigator initialRouteKey="Home" screenOptions={{ headerShown: false, headerMode: 'none', animationTypeForReplace: undefined }}>
          {
            !user ? (
              <>
                <Stack.Screen name="Home" component={(props) => <Home {...props} auth={auth} logged={false} />} />
                <Stack.Screen name="Auth" component={(props) => <Auth {...props} auth={auth} logged={false} />} />
              </>
            ) : (
              <>
                {isBrowser && <Stack.Screen name="Home" component={(props) => <Home {...props} auth={auth} user={user} />} />}
                <Stack.Screen name="Discover" component={(props) => <Discover {...props} auth={auth} user={user} />} />
                {/* FILMS */}
                <Stack.Screen name="Liked" component={(props) => <Liked {...props} auth={auth} user={user} />} />
                <Stack.Screen name="Movies" component={(props) => <Movies {...props} auth={auth} user={user} />} />
                <Stack.Screen name="TvShows" component={(props) => <TvShows {...props} auth={auth} user={user} />} />
                <Stack.Screen name="Profile" component={(props) => <Profile {...props} auth={auth} user={user} />} />
                <Stack.Screen name="VideoGames" component={(props) => <VideoGames {...props} auth={auth} user={user} />} />
              </>
            )
          }
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default Router;
