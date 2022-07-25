import { Text, View } from 'native-base';

const Comments = ({ reviews, textColor }) => (
  reviews?.length > 0 ? reviews.map((r) => (
    <View style={{ marginBottom: 20 }}>
      <Text underline fontSize="md" style={{ color: textColor }}>
        {r.author_name}
      </Text>
      <Text style={{ color: textColor }}>
        {r.text}
      </Text>
    </View>
  )) : (
    <Text style={{ color: textColor }}>
      no comments
    </Text>
  )
)

export default Comments;
