import { signOut } from 'firebase/auth';
import { Box, Text, Pressable, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import ToggleDarkMode from "../ToggleDarkMode";

const Header = ({ auth }) => {
  const { push } = useNavigation();

  return (
    <Box
      safeArea
      // _dark={{ bg: '#2D2F34' }}
      // _light={{ bg: '#959494' }}
      style={{ width: '100%', position: 'fixed', zIndex: 100, paddingHorizontal: '2.5%', justifyContent: 'center', height: 60 }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => push('Home')}>
          <Text style={{ fontSize: 20 }}>Light On</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
          <Pressable onPress={() => signOut(auth)}>
            <Text style={{ fontSize: 15 }}>Sign out</Text>
          </Pressable>
          <View style={{ marginLeft: 20 }}>
            <ToggleDarkMode />
          </View>
        </View>
      </View>
    </Box>
  )
}

export default Header;
