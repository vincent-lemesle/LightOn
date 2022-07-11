import Card from '../../components/Card';
import Layout from "../../components/Layout";

import Swiper from 'react-native-deck-swiper';

const cards = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  }

]

const Home = () => (
  <Layout>
    <Swiper
      cards={cards}
      renderCard={(card) => <Card />}
      onSwiped={(cardIndex) => {console.log(cardIndex)}}
      onSwipedAll={() => {console.log('onSwipedAll')}}
      cardIndex={0}
      backgroundColor={'#4FD0E9'}
      stackSize={3}
      verticalSwipe={false}
    />
  </Layout>
)

export default Home;
