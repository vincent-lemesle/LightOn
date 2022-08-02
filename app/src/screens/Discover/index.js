import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, FlatList, View, Pressable, Image } from 'native-base';

import { isMobile } from '../../components/Device';
import MovieIcon from '../../../assets/icon/movie.png';
import MusicIcon from '../../../assets/icon/music.png';
import TvShowIcon from '../../../assets/icon/tv-show.png';
import VideoGameIcon from '../../../assets/icon/video-game.png';

import Layout from '../../components/Layout/LoadResourceLayout';

const categories = [
  {
    color1: '#f5af19',
    color2: '#f12711',
    route: 'Movies',
    title: 'Movies',
    icon: MovieIcon,
  },
  {
    color1: '#52c234',
    color2: '#061700',
    route: 'TvShows',
    title: 'Series',
    icon: TvShowIcon,
  },
  {
    color1: '#ff00cc',
    color2: '#333399',
    route: 'VideoGames',
    title: 'Video Games',
    icon: VideoGameIcon,
  },
  {
    color1: '#c31432',
    color2: '#240b36',
    route: 'VideoGames',
    title: 'Musics',
    icon: MusicIcon,
  }
]

const Discover = ({ auth, user }) => {
  const [loading, setLoading] = useState(false);

  const { name } = useRoute();
  const { push } = useNavigation();

  return (
    <Layout user={user} auth={auth} setLoading={setLoading}>
      <Text fontSize="4xl">
        What do you want to find out ? 🌎
      </Text>
      <FlatList
        numColumns={isMobile ? 2 : 4}
        style={{ paddingBottom: 80, marginTop: 60 }}
        data={categories}
        renderItem={({ item }) => (
          <Pressable onPress={() => push(item.route)}>
            <View
              style={{
                margin: 20,
                width: isMobile ? 150 : 275,
                height: isMobile ? 200 : 350,
                borderRadius: 15,
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
            >
              <LinearGradient
                end={[0, 1]}
                start={[0, 0]}
                colors={[item.color1, item.color2]}
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image source={item.icon} style={{ width: 60, height: 60 }} />
                <Text fontSize="3xl" style={{ color: 'white' }}>{item.title}</Text>
              </LinearGradient>
            </View>
          </Pressable>
        )}
      />
    </Layout>
  )
};

export default Discover;
