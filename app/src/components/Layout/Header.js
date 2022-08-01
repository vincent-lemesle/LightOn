import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, Pressable, View, Image } from 'native-base';

import ToggleDarkMode from "../ToggleDarkMode";
import { LinearGradient } from 'expo-linear-gradient';

import LocationInput from '../LocationInput';
import Discover2 from '../../../assets/icon/discover2.png';

const Header = ({ auth, logged = true }) => {
  const { push } = useNavigation();

  return (
    <Box
      safeArea
      // _dark={{ bg: '#2D2F34' }}
      // _light={{ bg: '#959494' }}
      style={{
        height: 60,
        zIndex: 100,
        width: '100%',
        position: 'fixed',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        backgroundColor: '#F8F8F8',
        borderColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <View style={{ flexDirection: 'row', marginHorizontal: '5%', alignItems: 'center' }}>
        <Pressable onPress={() => push('Home')}>
          <Text style={{ fontSize: 20 }}>Light On</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', marginLeft: 'auto', alignItems: 'center' }}>
          {
            logged ? (
              <>
                <View style={{ height: 45 }}>
                  <LocationInput />
                </View>
                <Pressable
                  onPress={() => push('Discover')}
                  style={{ width: 150, height: 35, marginLeft: 50, backgroundColor: '#2F2F2F', borderRadius: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ fontSize: 15, color: 'white' }}>Discover</Text>
                  <Image source={Discover2} style={{ width: 20, height: 20, marginLeft: 10 }} resizeMode="contain" />
                </Pressable>
                <Pressable
                  onPress={async () => {
                    await signOut(auth)
                    push('Auth');
                  }}
                  style={{ width: 150, height: 35, backgroundColor: '#2F2F2F', marginLeft: 20, borderRadius: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ fontSize: 15, color: 'white' }}>Sign out</Text>
                </Pressable>
              </>
            ) : (
              <Pressable
                onPress={() => push('Auth')}
                style={{ width: 150, height: 35, backgroundColor: '#2F2F2F', borderRadius: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 15, color: 'white' }}>Sign in</Text>
              </Pressable>
            )
          }
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
