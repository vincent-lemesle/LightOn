import { signOut } from 'firebase/auth';
import { Box, Text, Pressable, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import ToggleDarkMode from "../ToggleDarkMode";

const Header = ({ auth }) => {
  const { push } = useNavigation();

  return (
    <Box
      safeArea
      _dark={{ bg: '#2D2F34' }}
      _light={{ bg: '#959494' }}
      style={{ width: '100%', paddingHorizontal: '5%', justifyContent: 'center', height: 60 }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => push('Home')}>
          <Text>Light On</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
          <Pressable onPress={() => signOut(auth)}>
            <Text>Sign out</Text>
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
