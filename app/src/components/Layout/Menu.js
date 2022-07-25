import { Pressable, ScrollView, Text, View } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';

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
    <ScrollView>
      {categories.map((c) => (
        <Pressable onPress={() => push(c.route)}>
          <Text style={{ textDecoration: c.route === name ? 'underline' : undefined }}>
            {c.title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}
