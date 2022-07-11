import Swiper from 'react-native-deck-swiper';

import Card from '../../components/Card';
import Layout from "../../components/Layout";

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

const Home = ({ auth }) => (
  <Layout auth={auth}>
    <Swiper
      cards={cards}
      renderCard={(card) => <Card />}
      onSwiped={(cardIndex) => {console.log(cardIndex)}}
      onSwipedAll={() => {console.log('onSwipedAll')}}
      cardIndex={0}
      backgroundColor={'#4FD0E9'}
      stackSize={2}
      showSecondCard={true}
      verticalSwipe={false}
      stackSeparation={0}
    />
  </Layout>
)

export default Home;
