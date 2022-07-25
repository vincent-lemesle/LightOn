import { Text, View } from 'native-base';

const Comments = ({ reviews, textColor }) => (
  reviews?.map((r) => (
    <View style={{ marginBottom: 20 }}>
      <Text underline fontSize="md" style={{ color: textColor }}>
        {r.author_name}
      </Text>
      <Text style={{ color: textColor }}>
        {r.text}
      </Text>
    </View>
  ))
)

export default Comments;
