import React from 'react';
import { ScrollView, View } from 'native-base';

const WebCardInformation = ({ children }) => (
  <View
    style={{
      zIndex: 1,
      height: 500,
      width: '100%',
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
      showsHorizontalScrollIndicator={false}
      _contentContainerStyle={{ width: '100%', margin: '20px 20px 20px 20px' }}
    >
      {children}
    </ScrollView>
  </View>
);

export default WebCardInformation;
