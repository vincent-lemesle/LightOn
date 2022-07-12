import Swiper from "react-native-deck-swiper";

import Card from "../Card";

const CardSwiper = ({ data, onSwipedAll }) => (
  <Swiper
    cards={data}
    stackSize={2}
    cardIndex={0}
    stackSeparation={0}
    verticalSwipe={false}
    showSecondCard={true}
    onSwipedAll={() => onSwipedAll()}
    backgroundColor="#37424a"
    renderCard={(item) => <Card data={item} />}
    onSwiped={(cardIndex) => {console.log(cardIndex)}}
  />
)

export default CardSwiper;
