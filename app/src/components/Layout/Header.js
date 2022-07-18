import { signOut } from 'firebase/auth';
import { Box, Text, Pressable, useColorMode } from "native-base";

import ToggleDarkMode from "../ToggleDarkMode";

const Header = ({ auth }) => {

  return (
    <Box
      safeArea
      _dark={{ bg: '#2D2F34' }}
      _light={{ bg: '#959494' }}
      style={{ width: '100%', height: 75 }}
    >
      <Text>Light On</Text>
      {
        /*
             <Pressable onPress={() => signOut(auth)}>
        <Text>Sign out</Text>
      </Pressable>
      <ToggleDarkMode />
         */
      }
    </Box>
  )
}

export default Header;
