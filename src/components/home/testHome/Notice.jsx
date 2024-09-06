import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {Defs, G, Path, Svg, Use} from 'react-native-svg';
import {NoticeHeight} from '../../../utils/scaling';
import CustomText from '../../CustomText';
import {wavyData} from '../../../utils/constent';
import appColors from '../../../utils/appColors';

const Notice = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{padding: 10}}>
            <CustomText style={styles.heading} font="sembold">
              It's raining near this location
            </CustomText>
            <CustomText style={styles.textCenter}>
              Our delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>

      <Svg
        width="100%"
        height="35"
        fill={appColors.background}
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
    backgroundColor: appColors.background,
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.background,
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
