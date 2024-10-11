import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  Animated,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import AnimatedSearchBar from '../../components/home/AnimatableSearchBar';
import TopBarSection from '../../components/home/TopBarSection';
import appColors from '../../utils/appColors';
import {NoticeHeight, screenHeight} from '../../utils/scaling';
import NoticeAnimation from '../../components/home/NoticeAnimation';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {setViewNotice} from '../../store/mapSlice';
import TopSectionCards from '../../components/home/TopSectionCards';
import {isWithinTimeRange} from '../../utils/helperfun';
import ProductsView from '../../components/home/ProductsView';

const NOTICE_HEIGHT = -(NoticeHeight + 50);

const Home = ({address, handleChangeAddress}) => {
  const scrollY = useRef(new Animated.Value(0)).current; // Create an animated value to track the scroll position

  const [gradientColor, setGradientColor] = useState([
    appColors?.gredientFrom,
    appColors?.gredientFrom,
  ]);
  const viewNotice = useSelector(state => state?.map?.viewNotice);

  const dispatch = useDispatch();

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 250],
    outputRange: [200, 100], // Adjust these values based on your design
    extrapolate: 'clamp',
  });
  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, 195],
    outputRange: [0, -80], // Adjust this value to control the search bar's final position
    extrapolate: 'clamp',
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0], // Opacity transitions from 1 (fully visible) to 0 (invisible)
    extrapolate: 'clamp',
  });

  // const searchBarBackgroundColor = scrollY.interpolate({
  //   inputRange: [300, 320],
  //   outputRange: [appColors?.gredientFrom, appColors?.background], // Change colors from green to red
  //   extrapolate: 'clamp',
  // });

  // Effect to change the status bar style based on scroll position
  // useEffect(() => {
  //   const listenerId = scrollY.addListener(({value}) => {
  //     if (value >= 320) {
  //       setIsShowSearched(true);
  //       StatusBar.setBarStyle('dark-content'); // Change to dark-content when not at the top
  //     } else {
  //       setIsShowSearched(false);
  //       StatusBar.setBarStyle('light-content'); // Change to light-content when search bar sticks to top
  //     }
  //   });

  // Clean up the listener when the component unmounts
  //   return () => {
  //     scrollY.removeListener(listenerId);
  //   };
  // }, [scrollY]);

  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    // StatusBar.setBarStyle('light-content');
    Animated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {});
  };

  const slideDown = () => {
    // StatusBar.setBarStyle('dark-content');
    Animated.timing(noticePosition, {
      toValue: 25,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {});
  };

  useEffect(() => {
    let timeoutId = '';
    if (viewNotice && isWithinTimeRange()) {
      slideDown();
      timeoutId = setTimeout(() => {
        slideUp();
        dispatch(setViewNotice(false));
      }, 2500);
    }
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {height: headerHeight, backgroundColor: appColors?.gredientFrom},
          ]}>
          <LinearGradient
            colors={gradientColor} // Interpolated colors
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              flex: 1,
              width: '100%',
            }}>
            <TopBarSection
              opacity={textOpacity}
              address={address}
              handleChangeAddress={handleChangeAddress}
              handleKnowMore={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 2500);
                return () => clearTimeout(timeoutId);
              }}
            />
          </LinearGradient>
        </Animated.View>

        {/* Animated Search Bar */}
        <Animated.View
          style={[
            styles.searchBar,
            {
              transform: [{translateY: searchBarTranslateY}],
              backgroundColor: appColors?.gredientFrom,
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
          showsVerticalScrollIndicator={false}>
          {/* Add your screen content here */}
          <View style={styles.content}>
            <View>
              <ImageBackground
                style={{height: screenHeight * 0.28}}
                source={require('../../assets/images/ttt.png')}>
                <TopSectionCards />
              </ImageBackground>
            </View>
            <ProductsView />
          </View>
        </ScrollView>
      </View>
    </NoticeAnimation>
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
    paddingHorizontal: 10,
    zIndex: 2,
  },
  searchBarText: {
    color: '#000',
    fontSize: 18,
  },
  contentContainer: {
    paddingTop: '45%', // Make sure there's space for the header
    backgroundColor: appColors?.gredientFrom,
  },
  content: {
    justifyContent: 'center',
    backgroundColor: appColors?.background,
    paddingBottom: '25%',
  },
  contentText: {
    fontSize: 24,
  },
});

export default Home;
