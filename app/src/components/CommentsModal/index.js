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
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{ margin: 0, marginTop: -40 }}
      onClose={() => setModalOpen(false)}
      onBackdropPress={() => setModalOpen(false)}
    >
      <ScrollView style={{
        flex: 1,
        padding: 5,
        paddingTop: 60,
        backgroundColor: 'gray',
        marginTop: isMobile ? 30 : 0,
        width: isMobile ? width * 0.7 : width * 0.3,
        marginLeft: isMobile ? width * 0.3 : width * 0.7,
      }}>
        <Comments reviews={reviews} />
      </ScrollView>
    </Modal>
  )
};

export default CommentsModal;
