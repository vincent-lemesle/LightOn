import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home";
import Movies from "./screens/Movies";
import Places from "./screens/Places";

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

const Router = ({ auth }) => {
  const [initialRoute, setInitialRoute] = useState('');

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Stack.Navigator initialRouteKey={initialRoute} screenOptions={{ headerShown: false, headerMode: 'none', animationTypeForReplace: undefined }}>
          <Stack.Screen name="Home" component={(props) => <Home {...props} auth={auth} />} />
          <Stack.Screen name="Places" component={(props) => <Places {...props} auth={auth} />} />
          <Stack.Screen name="Movies" component={(props) => <Movies {...props} auth={auth} />} />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default Router;
