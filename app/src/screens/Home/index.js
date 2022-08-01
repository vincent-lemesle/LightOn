import { Text, View, Image } from 'native-base';
import React, { useEffect, useState } from 'react';

import Layout from "../../components/Layout/LoadResourceLayout";

const Home = ({ auth, logged = true }) => {
  const [loaded, setLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <Layout marginTop="5%" center={false} auth={auth} setLoading={setLoading} logged={logged}>
      <Text fontSize="3xl" bold>
        Solution
      </Text>
      <Text fontSize="6xl" bold style={{ width: '40%' }}>
        Enter a city and you can see all the activities it offers
      </Text>
      <Text fontSize="3xl" style={{ width: '40%' }}>
        Access to activities such as restaurants and nightclubs
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
          style={{ borderRadius: 10, marginTop: '2.5%', marginBottom: 40 }}
          source={{ uri: 'https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1645846296/rg73rgkb4xsiigqzd3ab.jpg' }}
        />
      </View>
    </Layout>
  )
}

export default Home;
