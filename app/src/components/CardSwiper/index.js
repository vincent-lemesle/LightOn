import Swiper from "react-native-deck-swiper";

import Card from "../Card";

const CardSwiper = ({ data, type, onSwipedAll = undefined }) => (
  <Swiper
    cards={data}
    stackSize={2}
    cardIndex={0}
    stackSeparation={0}
    verticalSwipe={false}
    showSecondCard={true}
    backgroundColor={'rgba(0, 0, 0, 0)'}
    onSwiped={(cardIndex) => {console.log(cardIndex)}}
    renderCard={(item) => <Card data={item} type={type} />}
    onSwipedAll={onSwipedAll ? () => onSwipedAll() : undefined}
  />
)

export default CardSwiper;
