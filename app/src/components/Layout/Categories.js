import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Pressable, Image } from "native-base";

import BarIcon from '../../../assets/icon/bar.png';
import MovieIcon from '../../../assets/icon/movie.png';
import MuseumIcon from '../../../assets/icon/museum.png';
import RestaurantIcon from '../../../assets/icon/restaurant.png';

const categories = [
  {
    route: 'Restaurants',
    title: 'restaurant',
    icon: RestaurantIcon,
    sub: [
      {
        title: 'list',
        route: 'Restaurants'
      },
      {
        title: 'favorites',
        route: 'MyRestaurants'
      }
    ]
  },
  {
    route: 'Bars',
    title: 'bars',
    icon: BarIcon,
    sub: [
      {
        title: 'list',
        route: 'Bars'
      },
      {
        title: 'favorites',
        route: 'MyBars'
      }
    ]
  },
  {
    route: 'Museums',
    title: 'museums',
    icon: MuseumIcon,
    sub: [
      {
        title: 'list',
        route: 'Museums'
      },
      {
        title: 'favorites',
        route: 'MyMuseums'
      }
    ]
  },
  {
    route: 'Movies',
    title: 'movies',
    icon: MovieIcon,
    sub: [
      {
        title: 'list',
        route: 'Movies'
      },
    ]
  },
]

const Categories = () => {
  const { name } = useRoute();
  const { push } = useNavigation();

  const SubCategories = () => {
    console.log(name);
    const subCat = categories.find((c) => c.route === name || c.sub.find((s) => s.route === name))

    if (!subCat) {
      return null;
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        {subCat.sub.map((sc, index) => (
          <Pressable onPress={() => push(sc.route)} style={{ marginLeft: index !== 0 ? 20 : 0 }}>
            <Text>
              {sc.title}
            </Text>
          </Pressable>
        ))}
      </View>
    )
  }

  return (
    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <View style={{ flexDirection: 'row' }}>
        {categories.map((item, index) => (
          <Pressable onPress={() => push(item.route)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 100 }}>
              <Image source={item.icon} style={{ width: 50, height: 50 }}/>
              <Text>
                {item.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View style={{ width: '90%', backgroundColor: 'gray', height: 1, borderRadius: 10 }}/>
      <SubCategories />
    </View>
  )
}

export default Categories;
