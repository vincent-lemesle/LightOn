import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, Image } from "native-base";

import BarIcon from '../../../assets/icon/bar.png';
import MovieIcon from '../../../assets/icon/movie.png';
import MuseumIcon from '../../../assets/icon/museum.png';
import RestaurantIcon from '../../../assets/icon/restaurant.png';

const data = [
  {
    route: 'Restaurants',
    title: 'restaurant',
    icon: RestaurantIcon,
  },
  {
    route: 'Bars',
    title: 'bars',
    icon: BarIcon,
  },
  {
    route: 'Museums',
    title: 'museums',
    icon: MuseumIcon,
  },
  {
    route: 'Movies',
    title: 'movies',
    icon: MovieIcon,
  },
]

const Categories = () => {
  const { push } = useNavigation();

  return (
    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <View style={{ flexDirection: 'row' }}>
        {data.map((item, index) => (
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
    </View>
  )
}

export default Categories;
