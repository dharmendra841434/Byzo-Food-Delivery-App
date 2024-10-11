import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomText from '../../CustomText';
import appColors from '../../../utils/appColors';
import {RFValue} from 'react-native-responsive-fontsize';
import mango from '../../../assets/images/mango.webp';
import {cleanDummy} from '../../../utils/constent';

const {width} = Dimensions.get('window');

const CleaningProductsSection = () => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.topSection}>
        <Image
          source={cleanDummy?.heading}
          style={{width: '100%', height: 90}}
        />
        <View
          style={{
            backgroundColor: appColors?.lightSky,
            paddingHorizontal: '1%',
            paddingVertical: '4%',
          }}>
          <FlatList
            horizontal
            data={cleanDummy?.categories}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.imageContainer}>
                <Image
                  source={item?.image}
                  style={{width: '100%', height: 70, borderRadius: 10}}
                />
                <CustomText font="medium" style={styles.title}>
                  {item?.title}
                </CustomText>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: '2%',
          paddingTop: '2%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '5%',
        }}>
        <CustomText font="extraBold" style={styles.boldText}>
          India's last minute app
        </CustomText>
        <Image
          source={mango}
          style={{height: 70, width: 70, alignSelf: 'flex-end'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    paddingTop: '5%',
  },
  topSection: {
    backgroundColor: appColors?.background,
  },
  heading: {
    fontSize: RFValue(16),
  },
  sub_heading: {
    color: appColors?.disable,
  },
  imageContainer: {
    width: width * 0.23,
    marginHorizontal: '1%',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(11),
    textAlign: 'center',
  },
  boldText: {
    fontSize: RFValue(40),
    width: '70%',
    color: appColors?.borderGray,
  },
});

export default CleaningProductsSection;
