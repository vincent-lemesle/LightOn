import { useWindowDimensions } from "react-native";
import { Center, View } from 'native-base';

import Header from "./Header";
import ToggleDarkMode from "../ToggleDarkMode";

const Layout = ({ children, auth }) => {
  const { height } = useWindowDimensions();

  return (
    <View style={{ height }}>
      <Header auth={auth} />
      <Center
        px={4}
        flex={1}
        _dark={{ bg: '#0d2358' }}
        _light={{ bg: '#c1c1c1' }}
        style={{ height: '100%' }}
      >
        {children}
      </Center>
    </View>
  )
}

export default Layout;
