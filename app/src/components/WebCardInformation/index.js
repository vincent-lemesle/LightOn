import React from 'react';
import { ScrollView, View } from 'native-base';

const WebCardInformation = ({ children, width = '55%' }) => (
  <View
    style={{
      width,
      zIndex: 1,
      height: 500,
      elevation: 10,
      borderRadius: 15,
      overflow: 'hidden',
      shadowRadius: 6.27,
      shadowColor: '#000',
      shadowOpacity: 0.34,
      backgroundColor: 'white',
      shadowOffset: {
        width: 0,
        height: 5,
      },
    }}
  >
    <ScrollView
      style={{ width: '100%', height: '100%' }}
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{  margin: '20px 20px 20px 20px' }}
    >
      {children}
    </ScrollView>
  </View>
);

export default WebCardInformation;
