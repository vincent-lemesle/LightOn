import { useCallback, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { Center, ScrollView, Spinner, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import Header from "./Header";
import { WebMenu } from './Menu';
import { BrowserView, MobileView } from '../Device';

const LoadResourceLayout = ({ children, auth, fetchData, loading, setLoading }) => {
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
      </MobileView>
    </View>
  )
}

export default LoadResourceLayout;
