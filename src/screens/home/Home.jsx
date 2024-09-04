import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import CustomText from '../../components/CustomText';
import {splitAddressAtFirstComma} from '../../utils/helperfun';
import CustomButton from '../../components/CustomButton';
import {useDispatch} from 'react-redux';
import {setIsOpenDrawer} from '../../store/userSlice';
import appColors from '../../utils/appColors';
import AnimatedSearchBar from '../../components/home/AnimatableSearchBar';
import TopBarSection from '../../components/home/TopBarSection';
import {dummy} from '../../utils/constent';
import happy from '../../assets/images/happy2.png';

const Home = ({address, bottomSheetModalRef}) => {
  return (
    <ScrollView
      style={{height: '100%', backgroundColor: appColors?.background}}>
      <View style={{height: '100%'}}>
        <StatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />
        <TopBarSection
          address={address}
          opacity={1}
          bottomSheetModalRef={bottomSheetModalRef}
        />
        <View>
          <ImageBackground style={{height: 200}} source={happy}>
            <View>
              <CustomText>jhdfugdf</CustomText>
            </View>
          </ImageBackground>
        </View>
        {/* <AnimatedSearchBar /> */}

        {dummy?.map((item, index) => (
          <View key={index} className="my-10 ">
            <CustomText>{item}</CustomText>
          </View>
        ))}
      </View>
    </ScrollView>
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
    backgroundColor: '#6200EE',
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
    top: 100,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 10,
    zIndex: 2,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  searchBarText: {
    color: '#000',
    fontSize: 18,
  },
  contentContainer: {
    paddingTop: 200, // Make sure there's space for the header
    paddingBottom: 300, // Extra space for smooth scrolling
    backgroundColor: 'red',
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

export default Home;
