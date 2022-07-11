import { Box, Text, Pressable } from "native-base";
import { signOut } from 'firebase/auth';

const Header = ({ auth }) => (
  <Box
    safeArea
    _dark={{ bg: '#041131' }}
    _light={{ bg: '#959494' }}
    style={{ width: '100%', height: 75 }}
  >
    <Text>Light On</Text>
    <Pressable onPress={() => signOut(auth)}>
      <Text>Sign out</Text>
    </Pressable>
  </Box>
);

export default Header;
