import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Text, Pressable } from "native-base";

const data = [
  {
    route: 'Places',
    title: 'restaurant',
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
      <FlatList data={data} horizontal renderItem={(({ item }) => (
        <Pressable onPress={() => push(item.route)}>
          <Text style={{ marginLeft: 10 }}>
            {item.title}
          </Text>
        </Pressable>
      ))} />
    </View>
  )
}

export default Categories;
