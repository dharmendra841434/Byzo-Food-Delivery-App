import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  StatusBar,
} from 'react-native';
import AnimatedSearchBar from '../../components/home/AnimatableSearchBar';
import TopBarSection from '../../components/home/TopBarSection';
import appColors from '../../utils/appColors';
import Notice from '../../components/Notice';
import Wave from '../../components/home/testHome/Wave';
import CustomText from '../../components/CustomText';
import {NoticeHeight} from '../../utils/scaling';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const HomeTest = ({address, sheetRef}) => {
  const scrollY = useRef(new Animated.Value(0)).current; // Create an animated value to track the scroll position
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 195],
    outputRange: [195, 60], // Adjust these values based on your design
    extrapolate: 'clamp',
  });
  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 195],
    outputRange: [0, -80], // Adjust this value to control the search bar's final position
    extrapolate: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // Opacity transitions from 1 (fully visible) to 0 (invisible)
    extrapolate: 'clamp',
  });

  const searchBarBackgroundColor = scrollY.interpolate({
    inputRange: [140, 150],
    outputRange: [appColors.topSectionBg, appColors?.background], // Change colors from green to red
    extrapolate: 'clamp',
  });

  // Effect to change the status bar style based on scroll position
  useEffect(() => {
    const listenerId = scrollY.addListener(({value}) => {
      if (value >= 100) {
        StatusBar.setBarStyle('dark-content'); // Change to dark-content when not at the top
      } else {
        StatusBar.setBarStyle('light-content'); // Change to light-content when search bar sticks to top
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    Animated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  console.log(noticePosition, 'aksdkshfh');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />
      {/* Animated Header */}

      <Animated.View
        style={[
          styles.header,
          {height: headerHeight, backgroundColor: searchBarBackgroundColor},
        ]}>
        {/* <Notice  /> */}
        {/* <View>
          <CustomText>jasgdsjggsf</CustomText>
        </View> */}
        <TopBarSection
          opacity={textOpacity}
          address={address}
          bottomSheetModalRef={sheetRef}
          backgroundColor={searchBarBackgroundColor}
        />
      </Animated.View>

      {/* Animated Search Bar */}
      <Animated.View
        style={[
          styles.searchBar,
          {
            transform: [{translateY: searchBarTranslateY}],
            backgroundColor: searchBarBackgroundColor,
            borderBottomWidth: 1,
            borderBottomColor: appColors.borderGray,
          },
        ]}>
        <AnimatedSearchBar />
      </Animated.View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16} // Adjust the scroll event throttle
      >
        {/* Add your screen content here */}
        <View style={styles.content}>
          <Wave height={200} width={300} co />
          <Text style={styles.contentText}>Scroll Down</Text>
        </View>
        {/* Add more content as needed */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  searchBar: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    backgroundColor: appColors?.topSectionBg,
    paddingHorizontal: 10,
    zIndex: 2,
  },
  searchBarText: {
    color: '#000',
    fontSize: 18,
  },
  contentContainer: {
    paddingTop: 200, // Make sure there's space for the header
    paddingBottom: 300, // Extra space for smooth scrolling
  },
  content: {
    height: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 24,
  },
});

export default HomeTest;
