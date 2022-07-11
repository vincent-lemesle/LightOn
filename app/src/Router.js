import React, { useState } from "react";
import { NativeBaseProvider, extendTheme } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home";

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
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default Router;
