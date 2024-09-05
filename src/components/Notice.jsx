import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {Defs, G, Path, Svg, Use} from 'react-native-svg';
import CustomText from './CustomText';
import {wavyData} from '../utils/constent';
import {NoticeHeight} from '../utils/scaling';

const Notice = ({NoticeHeight}) => {
  return (
    <View style={{height: NoticeHeight, width: '100%', marginTop: '20%'}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <CustomText style={styles.heading} font="semibold">
              It's raining near this location
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              Our delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>

      <Svg
        width="100%"
        height="35"
        fill="#CCD5E4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4',
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  heading: {
    color: '#2D3875',
    marginBottom: 8,
    textAlign: 'center',
  },
  wave: {
    width: '100%',
    transform: [{rotateX: '180deg'}],
  },
});

export default Notice;
