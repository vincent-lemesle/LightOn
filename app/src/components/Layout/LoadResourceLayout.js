import { useCallback, useEffect } from 'react';
import { Center, Image, Pressable, Spinner, View } from 'native-base';

import Header from "./Header";
import { BrowserView, MobileView } from '../Device';

import discoverIcon from '../../../assets/icon/discover.png';
import { useNavigation } from '@react-navigation/native';

const LoadResourceLayout = ({
  auth,
  children,
  loading,
  setLoading,
  center = true,
  logged = true,
  marginTop = '10%',
  fetchData = undefined,
}) => {
  const { push } = useNavigation();

  const fetchDataWithLoading = useCallback(async () => {
    try {
      setLoading(true);
      if (fetchData) {
        await fetchData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataWithLoading();
  }, []);

  const ChildrenContainer = () => (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      {
        center || loading ? (
          <Center px={4} flex={1} style={{ marginTop, width: '90%', marginHorizontal: '5%' }}>
            {
              loading ? (
                <Spinner size="lg" />
              ) : (
                children
              )
            }
          </Center>
        ) : (
          <View style={{ marginTop, width: '90%', marginHorizontal: '5%' }}>
            {children}
          </View>
        )
      }
    </View>
  )

  return (
    <View
      _dark={{ bg: '#37424a' }}
      _light={{ bg: '#F2F2F2' }}
      style={{ minHeight: '100%' }}
    >
      {/* BROWSER */}
      <BrowserView>
        <Header auth={auth} logged={logged} />
        <ChildrenContainer />
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
