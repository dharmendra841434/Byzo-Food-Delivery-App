import {View, Text, StyleSheet, Animated as RNAnimated} from 'react-native';
import React from 'react';
import {NoticeHeight} from '../../../utils/scaling';
import Notice from './Notice';
import appColors from '../../../utils/appColors';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation = ({noticePosition, children}) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePosition}]},
        ]}>
        <Notice />
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}>
        {children}
      </RNAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
});

export default NoticeAnimation;
