import { Pressable, ScrollView, Text, View } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  {
    route: 'Restaurants',
    title: 'Restaurants',
  },
  {
    title: 'My Restaurants',
    route: 'MyRestaurants'
  },
  {
    route: 'Bars',
    title: 'bars',
  },
  {
    title: 'My Bars',
    route: 'MyBars'
  },
  {
    route: 'Museums',
    title: 'museums',
  },
  {
    title: 'My Museums',
    route: 'MyMuseums'
  },
  {
    route: 'Movies',
    title: 'movies',
  },
]

export const WebMenu = () => {
  const { name } = useRoute();
  const { push } = useNavigation();

  return (
    <View style={{ position: 'fixed', zIndex: 100, marginTop: '5%', marginLeft: '2.5%' }}>
      {categories.map((c) => (
        <Pressable onPress={() => push(c.route)}>
          <Text style={{ fontSize: 20, textDecoration: c.route === name ? 'underline' : undefined}}>
            {c.title}
          </Text>
        </Pressable>
      ))}
    </View>
  )
};

export const MobileMenu = () => {
  const { name } = useRoute();
  const { push } = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: '#37424a' }} _contentContainerStyle={{ display: 'flex', flex: 1, height: '100%' }}>
      <LinearGradient
        end={[1, 0]}
        start={[0, 0]}
        style={{ width: '40%', height: '100%' }}
        colors={['rgba(0,0,0,0.8)', 'transparent']}
      >
        <View style={{ marginTop: 80, marginLeft: 30 }}>
          {categories.map((c) => (
            <Pressable onPress={() => push(c.route)}>
              <Text style={{ fontSize: 20, textDecoration: c.route === name ? 'underline' : undefined }}>
                {c.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  )
}
