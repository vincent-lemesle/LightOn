import { useCallback, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Center, Image, Pressable, Spinner, View } from 'native-base';

import Header from "./Header";
import { WebMenu } from './Menu';
import { BrowserView, MobileView } from '../Device';

import discoverIcon from '../../../assets/icon/discover.png';
import { useNavigation } from '@react-navigation/native';

const LoadResourceLayout = ({ children, auth, fetchData, loading, setLoading }) => {
  const { push } = useNavigation();

  const fetchDataWithLoading = useCallback(async () => {
    try {
      setLoading(true);
      await fetchData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataWithLoading();
  }, []);

  return (
    <View
      _dark={{ bg: '#37424a' }}
      _light={{ bg: '#c1c1c1' }}
      style={{ minHeight: '100%' }}
    >
      {/* BROWSER */}
      <BrowserView>
        <LinearGradient
          end={[1, 0]}
          start={[0, 0]}
          style={{ position: 'fixed', width: '20%', height: '100%' }}
          colors={['rgba(0,0,0,0.8)', 'transparent']}
        />
        <Header auth={auth} />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <WebMenu />
          <Center px={4} flex={1} style={{ marginTop: '10%', width: '80%', marginLeft: '25%', marginRight: '2.5%' }}>
            {
              loading ? (
                <Spinner size="lg" />
              ) : (
                children
              )
            }
          </Center>
        </View>
      </BrowserView>
      {/* MOBILE */}
      <MobileView>
        <Header auth={auth} />
        <Center px={4} flex={1}>
          {
            loading ? (
              <Spinner size="lg" />
            ) : (
              children
            )
          }
        </Center>
        <View
          style={{
            display: 'flex', width: '100%', height: 90, backgroundColor: '#1e292e',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Pressable onPress={() => push('MobileMenu')}>
            <Image source={discoverIcon} style={{ width: 40, height: 40 }} />
          </Pressable>
        </View>
      </MobileView>
    </View>
  )
}

export default LoadResourceLayout;
