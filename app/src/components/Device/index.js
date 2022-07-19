import React from 'react';
import { View } from 'native-base';
import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isMobile = Platform.OS !== 'web';
export const isBrowser = Platform.OS === 'web';

export const BrowserView = ({ children, style }) => isBrowser && (
  <View style={[style, { width: '100%' }]}>
    {children}
  </View>
);

export const MobileView = ({ children }) => isMobile && (
  <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
    {children}
  </View>
);

export const S = 0;
export const M = 1;
export const L = 2;
export const XL = 3;
export const responsiveBreakPoints = [0, 1290, 1490, 1690];
