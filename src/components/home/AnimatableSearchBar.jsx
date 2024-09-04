import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../../utils/appColors';
import CustomText from '../CustomText';
import RollingBar from 'react-native-rolling-bar';

const AnimatedSearchBar = () => {
  const [showFirstText, setShowFirstText] = useState(true);

  useEffect(() => {
    // Function to handle the animation sequence
    const animateTexts = () => {
      setShowFirstText(false); // Start the second text animation

      setTimeout(() => {
        setShowFirstText(true); // Start the first text animation again
      }, 2000); // Delay to allow the second text to slide in slowly
    };

    // Set interval to repeat the animation every 4 seconds
    const interval = setInterval(animateTexts, 4000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="search" color={appColors.blackText} size={25} />
        {/* Animatable Text for the first placeholder */}
        <View
          style={{
            height: '100%',
            width: '85%',
          }}>
          <RollingBar
            interval={3000}
            defaultStyle={false}
            customStyle={styles.textContainer}>
            <CustomText>Search "sweets"</CustomText>
            <CustomText>Search "milk"</CustomText>
            <CustomText>Search for ata, dal, coke</CustomText>
            <CustomText>Search "chips"</CustomText>
            <CustomText>Search "pooja thali"</CustomText>
          </RollingBar>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.6}>
        <Icon
          name="mic"
          size={25}
          color={appColors.blackText}
          style={{zIndex: 10}}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 15,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 16,
    height: 50,
    color: '#333',
  },
  placeholder: {
    position: 'absolute',
    left: 15,
    top: 15,
    fontSize: 16,
    color: '#aaa',
  },
  textContainer: {
    height: '100%',
    paddingVertical: '5.6%',
    paddingLeft: '3%',
  },
});

export default AnimatedSearchBar;
