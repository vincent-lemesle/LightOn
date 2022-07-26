import { signOut } from 'firebase/auth';
import { Box, Text, Pressable, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import ToggleDarkMode from "../ToggleDarkMode";
import { LinearGradient } from 'expo-linear-gradient';

const Header = ({ auth }) => {
  const { push } = useNavigation();

  return (
    <Box
      safeArea
      // _dark={{ bg: '#2D2F34' }}
      // _light={{ bg: '#959494' }}
      style={{ width: '100%', position: 'fixed', zIndex: 100, justifyContent: 'center', height: 60 }}
    >
      <LinearGradient
        end={[1, 0]}
        start={[0, 0]}
        colors={['#C02425', '#F0CB35']}
        style={{
          position: 'absolute', width: '100%', height: '100%',
          // backdropFilter: 'blur(10px)'
        }}
      />
      <View style={{ flexDirection: 'row', marginHorizontal: '2.5%' }}>
        <Pressable onPress={() => push('Home')}>
          <Text style={{ fontSize: 20 }}>Light On</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
          <Pressable onPress={() => signOut(auth)}>
            <Text style={{ fontSize: 15 }}>Sign out</Text>
          </Pressable>
          {
            /*
                     <View style={{ marginLeft: 20 }}>
            <ToggleDarkMode />
          </View>
             */
          }
        </View>
      </View>
    </Box>
  )
}

export default Header;
