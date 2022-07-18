import { useCallback, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Center, Spinner, View } from 'native-base';

import Header from "./Header";
import Categories from "./Categories";

const LoadResourceLayout = ({ children, auth, fetchData, loading, setLoading }) => {
  const { height } = useWindowDimensions();

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
      style={{ height }}
      _dark={{ bg: '#37424a' }}
      _light={{ bg: '#c1c1c1' }}
    >
      <Header auth={auth} />
      <Categories />
      <Center
        px={4}
        flex={1}
        style={{ height: '100%' }}
      >
        {
          loading ? (
            <Spinner size="lg" />
          ) : (
            children
          )
        }
      </Center>
    </View>
  )
}

export default LoadResourceLayout;
