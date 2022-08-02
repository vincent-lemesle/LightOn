import { useState } from 'react';
import { Text, View } from 'native-base';

import CardModal from '../CardModal';
import CardSwiper from '../CardSwiper';
import CommentIcon from '../../../assets/icon/comment.png';

const CardSwiperContainer = ({ type, data, resumeKey, like, disLike }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <CardModal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
        <Text>
          {data[cardIndex][resumeKey]}
        </Text>
      </CardModal>
      {data?.length > 0 && <CardSwiper
        like={like}
        data={data}
        type={type}
        disLike={disLike}
        setCardIndex={setCardIndex}
        buttons={[{
          icon: CommentIcon,
          onPress: () => setModalOpen(true),
        }]}
      />}
    </View>
  )
}

export default CardSwiperContainer;
