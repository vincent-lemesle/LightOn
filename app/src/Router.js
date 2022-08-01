import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { isBrowser } from './components/Device';

import Auth from "./screens/Auth";

import Movies from "./screens/Movies";
import Discover from "./screens/Discover";

// PLACES
import Home from './screens/Home';
import Spa from './screens/Places/Spa';
import Zoo from './screens/Places/Zoo';
import Bars from './screens/Places/Bars';
import Cafes from './screens/Places/Cafes';
import Museums from './screens/Places/Museums';
import NightClubs from './screens/Places/NightClubs';
import Restaurants from './screens/Places/Restaurants';
import LiquorStores from './screens/Places/LiquorStores';
import ClothingStores from './screens/Places/ClothingStores';
import TouristAttractions from './screens/Places/TouristAttractions';
// MY PLACES
import MyBars from "./screens/MyPlaces/MyBars";
import MyMuseums from "./screens/MyPlaces/MyMuseums";
import MyRestaurants from "./screens/MyPlaces/MyRestaurants";

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
                {isBrowser && <Stack.Screen name="Home" component={(props) => <Home {...props} auth={auth} />} />}
                <Stack.Screen name="Discover" component={(props) => <Discover {...props} auth={auth} />} />
                {/* PLACES */}
                <Stack.Screen name="Spa" component={(props) => <Spa {...props} auth={auth} user={user} />} />
                <Stack.Screen name="Zoo" component={(props) => <Zoo {...props} auth={auth} user={user} />} />
                <Stack.Screen name="Bars" component={(props) => <Bars {...props} auth={auth} user={user} />} />
                <Stack.Screen name="Cafes" component={(props) => <Cafes {...props} auth={auth} user={user} />} />
                <Stack.Screen name="Museums" component={(props) => <Museums {...props} auth={auth} user={user} />} />
                <Stack.Screen name="NightClubs" component={(props) => <NightClubs {...props} auth={auth} user={user} />} />
                <Stack.Screen name="Restaurants" component={(props) => <Restaurants {...props} auth={auth} user={user} />} />
                <Stack.Screen name="LiquorStores" component={(props) => <LiquorStores {...props} auth={auth} user={user} />} />
                <Stack.Screen name="ClothingStores" component={(props) => <ClothingStores {...props} auth={auth} user={user} />} />
                <Stack.Screen name="TouristAttractions" component={(props) => <TouristAttractions {...props} auth={auth} user={user} />} />
                {/* MY PLACES */}
                <Stack.Screen name="MyBars" component={(props) => <MyBars {...props} auth={auth} user={user} />} />
                <Stack.Screen name="MyMuseums" component={(props) => <MyMuseums {...props} auth={auth} user={user} />} />
                <Stack.Screen name="MyRestaurants" component={(props) => <MyRestaurants {...props} auth={auth} user={user} />} />
                {/* FILMS */}
                <Stack.Screen name="Movies" component={(props) => <Movies {...props} auth={auth} user={user} />} />
              </>
            )
          }
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default Router;
