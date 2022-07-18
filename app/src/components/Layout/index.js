import { useWindowDimensions } from "react-native";
import { Center, View } from 'native-base';

import Header from "./Header";
import Categories from "./Categories";

const Layout = ({ children, auth }) => {
  const { height } = useWindowDimensions();

  return (
    <View
      style={{ height }}
      _dark={{ bg: '#37424a' }}
      _light={{ bg: '#c1c1c1' }}
    >
      <Header auth={auth} />
      <Categories />
      <Center
        px={4}
        flex={1}
        style={{ height: '100%' }}
      >
        {children}
      </Center>
    </View>
  )
}

export default Layout;
