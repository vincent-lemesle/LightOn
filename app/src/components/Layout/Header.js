import { Box, Text, Pressable } from "native-base";
import { signOut } from 'firebase/auth';

import ToggleDarkMode from "../ToggleDarkMode";

const Header = ({ auth }) => (
  <Box
    safeArea
    _dark={{ bg: '#2D2F34' }}
    _light={{ bg: '#959494' }}
    style={{ width: '100%', height: 75 }}
  >
    <Text>Light On</Text>
    <Pressable onPress={() => signOut(auth)}>
      <Text>Sign out</Text>
    </Pressable>
    <ToggleDarkMode />
  </Box>
);

export default Header;
