import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {tabsData} from '../../utils/constent';
import appColors from '../../utils/appColors';

const {width} = Dimensions.get('window');

const CustomTabMenu = ({handleActiveTab}) => {
  const [activeTab, setActiveTab] = useState(0); // Active tab index
  const translateX = useSharedValue(0); // Animation value for sliding indicator

  useEffect(() => {
    // Animate the sliding indicator when the active tab changes
    translateX.value = withTiming(activeTab * (width / 5.3), {
      duration: 300,
    });
  }, [activeTab]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View style={styles.container}>
      {/* Scrollable Tab Menu */}
      <View style={styles.tabMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContentContainer}>
          {tabsData.map((tab, index) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === index && styles.activeTab]}
              onPress={() => {
                setActiveTab(index);
                handleActiveTab(index);
              }}>
              <Image
                source={tab.icon}
                style={styles.tabIcon}
                tintColor={appColors?.background}
              />
              <Text style={styles.tabText}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
          <Animated.View style={[styles.indicator, animatedStyle]}>
            <View
              style={{
                height: 2.6,
                backgroundColor: appColors?.background,
                width: '80%',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
              }}
            />
          </Animated.View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabMenuContainer: {
    position: 'relative',
  },
  scrollViewContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '1%',
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    width: width / 5.5,
    paddingVertical: 10,
    justifyContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#383838',
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 8, // Space between icon and text
  },
  tabText: {
    fontSize: 12,
    color: appColors?.background,
  },
  indicator: {
    position: 'absolute',
    bottom: 0.5,
    width: width / 5.5, // Adjust based on the number of tabs
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 20,
  },
});

export default CustomTabMenu;
