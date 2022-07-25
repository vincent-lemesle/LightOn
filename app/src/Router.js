import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home";
import Movies from "./screens/Movies";

// PLACES
import Bars from "./screens/Places/Bars";
import Museums from "./screens/Places/Museums";
import Restaurants from "./screens/Places/Restaurants";
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
    initialColorMode: 'dark',
  },
});

const Router = ({ auth, user }) => {
  const [initialRoute, setInitialRoute] = useState('');

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Stack.Navigator initialRouteKey={initialRoute} screenOptions={{ headerShown: false, headerMode: 'none', animationTypeForReplace: undefined }}>
          {/* <Stack.Screen name="Home" component={(props) => <Home {...props} auth={auth} />} /> */}
          {/* PLACES */}
          <Stack.Screen name="Restaurants" component={(props) => <Restaurants {...props} auth={auth} user={user} />} />
          <Stack.Screen name="Museums" component={(props) => <Museums {...props} auth={auth} user={user} />} />
          <Stack.Screen name="Bars" component={(props) => <Bars {...props} auth={auth} user={user} />} />
          {/* MY PLACES */}
          <Stack.Screen name="MyBars" component={(props) => <MyBars {...props} auth={auth} user={user} />} />
          <Stack.Screen name="MyMuseums" component={(props) => <MyMuseums {...props} auth={auth} user={user} />} />
          <Stack.Screen name="MyRestaurants" component={(props) => <MyRestaurants {...props} auth={auth} user={user} />} />
          {/* FILMS */}
          <Stack.Screen name="Movies" component={(props) => <Movies {...props} auth={auth} user={user} />} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default Router;
