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
import {dummy} from '../../utils/constent';
import CustomText from '../../components/CustomText';
import {useDispatch, useSelector} from 'react-redux';
import {setViewNotice} from '../../store/mapSlice';
import TopSectionCards from '../../components/home/TopSectionCards';
import {isWithinTimeRange} from '../../utils/helperfun';

const NOTICE_HEIGHT = -(NoticeHeight + 75);

const Home = ({address, handleChangeAddress}) => {
  const scrollY = useRef(new Animated.Value(0)).current; // Create an animated value to track the scroll position
  const [isVisible, setIsVisible] = useState(false);
  const [isShowSearched, setIsShowSearched] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  const searchBarBackgroundColor = scrollY.interpolate({
    inputRange: [300, 320],
    outputRange: [appColors?.gredientFrom, appColors?.background], // Change colors from green to red
    extrapolate: 'clamp',
  });

  // Effect to change the status bar style based on scroll position
  useEffect(() => {
    const listenerId = scrollY.addListener(({value}) => {
      if (value >= 320) {
        setIsShowSearched(true);
        setGradientColor(['#ffff', '#ffff']);
        StatusBar.setBarStyle('dark-content'); // Change to dark-content when not at the top
      } else {
        setIsShowSearched(false);
        setGradientColor([appColors?.gredientFrom, appColors?.gredientFrom]);
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
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      StatusBar.setBarStyle('light-content');
      setIsVisible(false);
    });
  };

  const slideDown = () => {
    Animated.timing(noticePosition, {
      toValue: 40,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      StatusBar.setBarStyle('dark-content');
      setIsVisible(true);
    });
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
                }, 3500);
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
              backgroundColor: searchBarBackgroundColor,
              borderBottomWidth: isShowSearched ? 1 : 0,
              borderBottomColor: isShowSearched
                ? appColors?.borderGray
                : appColors?.background,
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
            <LinearGradient
              colors={gradientColor} // Interpolated colors
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: appColors?.gredientFrom,
              }}>
              <View
                style={{
                  width: '100%',
                }}>
                <ImageBackground
                  style={{height: screenHeight * 0.28}}
                  source={require('../../assets/images/ttt.png')}>
                  <TopSectionCards />
                </ImageBackground>
              </View>
            </LinearGradient>
            {/* <LinearGradient
              colors={gradientColor} // Interpolated colors
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                flex: 1,
                width: '100%',
              }}>
              <TabManuBar
                handleActiveTab={index => {
                  setActiveTab(index);
                }}
              />
            </LinearGradient>
            <View>
              {tabsData[activeTab] && (
                <CustomText style={styles.contentText}>
                  Content of {tabsData[activeTab].name}
                </CustomText>
              )}
            </View> */}
            <View style={{backgroundColor: appColors?.background}}>
              {dummy?.map((item, index) => (
                <CustomText key={index} className=" h-44">
                  {item}
                </CustomText>
              ))}
            </View>
          </View>
          {/* Add more content as needed */}
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
    paddingTop: '50%', // Make sure there's space for the header
    backgroundColor: appColors?.gredientFrom,
  },
  content: {
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 24,
  },
});

export default Home;
