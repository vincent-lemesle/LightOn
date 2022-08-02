import React, { useState } from 'react';
import { Text, View, Image } from 'native-base';

import Layout from "../../components/Layout/LoadResourceLayout";

const Home = ({ auth, user, logged = true }) => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout user={user} marginTop="5%" center={false} auth={auth} setLoading={setLoading} logged={logged}>
      <Text fontSize="3xl" bold>
        Solution
      </Text>
      <Text bold style={{ width: '45%', fontSize: 55, lineHeight: 60 }}>
        Choose a category and swipe to find what you want
      </Text>
      <Text fontSize="3xl" style={{ width: '40%' }}>
        Access to data such as movies and video games!
      </Text>
      <View style={{ width: '70%', alignItems: 'center', display: 'flex', marginHorizontal: '15%', marginTop: '5%' }}>
        <Text fontSize="4xl" bold>
          Globally recognized — and growing every day
        </Text>
        <Text fontSize="2xl">
          Just a few examples of LightOn’s reach:
        </Text>
        <Image
          width="80%"
          height={400}
          style={{ borderRadius: 10, marginTop: '2.5%' }}
          source={{ uri: 'https://media.gqmagazine.fr/photos/5dea6130061f7b00082f3405/master/pass/Djangounchained.jpg' }}
        />
        <Image
          width="80%"
          height={400}
          style={{ borderRadius: 10, marginTop: '2.5%', marginBottom: 40 }}
          source={{ uri: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_auto/ncom/fr_CA/dlc/switch-dlc/cuphead-dlc/rom-bundle/cuphead-and-the-delicious-last-course/image' }}
        />
      </View>
    </Layout>
  )
}

export default Home;
