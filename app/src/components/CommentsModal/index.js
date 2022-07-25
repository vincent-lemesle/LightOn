import React from 'react';
import { isMobile } from '../Device';
import Modal from 'react-native-modal';
import { ScrollView } from 'native-base';
import { useWindowDimensions } from 'react-native';

import Comments from '../Comments';

const CommentsModal = ({ reviews, isModalOpen, setModalOpen }) => {
  const { width } = useWindowDimensions();

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={isModalOpen}
      animationPreset="slide"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onClose={() => setModalOpen(false)}
      style={{ margin: 0, marginTop: 300 }}
      onBackdropPress={() => setModalOpen(false)}
    >
      <ScrollView
        style={{
          flex: 1,
          padding: 5,
          width: '100%',
          paddingTop: 60,
          backgroundColor: 'gray',
          marginTop: isMobile ? 30 : 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Comments reviews={reviews} />
      </ScrollView>
    </Modal>
  )
};

export default CommentsModal;
