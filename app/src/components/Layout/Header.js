import { Box, Text } from "native-base";

const Header = () => (
  <Box
    safeArea
    _dark={{ bg: '#041131' }}
    _light={{ bg: '#959494' }}
    style={{ width: '100%', height: 75 }}
  >
    <Text>Light On</Text>
  </Box>
);

export default Header;
