import Swiper from "react-native-deck-swiper";

import Card from "../Card";

const CardSwiper = ({ data, type, onSwipedAll = undefined }) => {
  return (
    <Swiper
      cards={data}
      stackSize={2}
      cardIndex={0}
      stackSeparation={0}
      verticalSwipe={false}
      showSecondCard={true}
      backgroundColor={'rgba(0, 0, 0, 0)'}
      renderCard={(item) => <Card data={item} type={type} />}
      onSwiped={(cardIndex) => {console.log(cardIndex)}}
      onSwipedAll={onSwipedAll ? () => onSwipedAll() : undefined}
    />
  )
}

export default CardSwiper;
