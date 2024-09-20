import {
  View,
  Text,
  StyleSheet,
  Animated as RNAnimated,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {NoticeHeight} from '../../utils/scaling';
import Notice from './Notice';
import appColors from '../../utils/appColors';
import cloud from '../../assets/images/cloud.png';
import rain from '../../assets/images/animations/raining.json';
import LottieView from 'lottie-react-native';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const NoticeAnimation = ({noticePosition, children}) => {
  const [isRaining, setIsRaining] = useState(false);
  return (
    <View style={styles.container}>
      {isRaining && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            backgroundColor: 'black',
            left: 0,
            right: 0,
            height: 95,
          }}>
          <ImageBackground source={cloud} style={{height: '100%'}}>
            <LottieView
              autoPlay={true}
              enableMergePathsAndroidForKitKatAndAbove={true}
              loop={true}
              style={{
                width: '100%',
                height: 150,
                transform: [{scaleX: -1}],
              }}
              source={rain}
            />
          </ImageBackground>
        </View>
      )}
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
              outputRange: [0, NoticeHeight + 18],
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
    backgroundColor: 'purple',
    top: 5,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    backgroundColor: appColors?.background,
    flex: 1,
  },
});

export default NoticeAnimation;
