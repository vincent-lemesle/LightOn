import React from 'react';
import { isMobile } from '../Device';
import Modal from 'react-native-modal';
import { ScrollView } from 'native-base';

const CardModal = ({ children, isModalOpen, setModalOpen }) => {
  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={isModalOpen}
      animationPreset="slide"
      onClose={() => setModalOpen(false)}
      onBackdropPress={() => setModalOpen(false)}
      style={{ margin: 0, marginTop: isMobile ? 100 : 0 }}
      animationIn={isMobile ? 'slideInUp' : 'slideInRight'}
      animationOut={isMobile ? 'slideOutDown' : 'slideOutRight'}
    >
      <ScrollView
        style={{
          flex: 1,
          padding: 5,
          paddingTop: 60,
          marginLeft: 'auto',
          backgroundColor: '#F8F8F8',
          marginTop: isMobile ? 30 : 0,
          width: isMobile ? '100%' : '30%',
          marginBottom: !isMobile ? 'auto' : 0,
        }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </Modal>
  )
};

export default CardModal;
