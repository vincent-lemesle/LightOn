import {Text, Image, Box, AspectRatio, Center, View} from "native-base";

const googleMapApiKey = 'AIzaSyDfz-OcfyJFfU3PdUUmPNjh1PbAd5JXKp8';

const Card = ({ data, type  }) => {
  let picture_url;

  if (type === 'place' && data.photos && data.photos.length > 0) {
    picture_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&key=${googleMapApiKey}&photo_reference=${data.photos[0].photo_reference}`;
  }
  if (type === 'movie') {
    picture_url = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
  }

  return (
    <Box
      borderRadius="md"
      style={{
        flex: 1,
        width: 350,
        height: 450,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }}
      _dark={{ bg: '#1f2528' }}
      _light={{ bg: '#a5a5a5' }}
    >
      <Box>
        <AspectRatio w="100%" ratio={1}>
          <Image source={{ uri: picture_url }} resizeMode="cover" />
        </AspectRatio>
        <Center
          bg="violet.500"
          _dark={{ bg: "violet.400" }}
          _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs"
          }}
          px="3"
          py="1.5"
          bottom="0"
          position="absolute"
        >
          {type.toUpperCase()}
        </Center>
      </Box>
      <View style={{ width: '90%', marginHorizontal: '5%', marginVertical: '5%' }}>
        <Text>
          {type === 'place' ? data.name : data.title}
        </Text>
        {
          type === 'place' && (
            <Text>
              {data.formatted_address}
            </Text>
          )
        }
      </View>
    </Box>
  )
}

export default Card;
