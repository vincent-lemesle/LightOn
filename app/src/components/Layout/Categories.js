import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Text, Pressable } from "native-base";

const data = [
  {
    route: 'Restaurants',
    title: 'restaurant',
  },
  {
    route: 'Bars',
    title: 'bars',
  },
  {
    route: 'NightClubs',
    title: 'NightClubs',
  },
  {
    route: 'Museums',
    title: 'museums',
  },
  {
    route: 'Movies',
    title: 'movies',
  },
]
const Categories = () => {
  const { push } = useNavigation();

  return (
    <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0)' }}>
      <FlatList data={data} horizontal renderItem={(({ item, index }) => (
        <Pressable onPress={() => push(item.route)}>
          <Text style={{ marginLeft: index > 0 ? 10 : 0 }}>
            {item.title}
          </Text>
        </Pressable>
      ))} />
    </View>
  )
}

export default Categories;
