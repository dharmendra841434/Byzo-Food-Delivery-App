import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import appColors from '../../../utils/appColors';
import {imageBaseUrl} from '../../../utils/constent';
import CustomText from '../../CustomText';
import LinearGradient from 'react-native-linear-gradient';
import stopwatch from '../../../assets/images/stopwatch.webp';
import {RFValue} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions?.get('window');

const FullImageCard = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{height: '40%', width: ' 65%'}}>
        <Image
          className=" mix-blend-multiply bg-blend-multiply"
          style={{height: '100%', width: '100%'}}
          resizeMethod="resize"
          source={{uri: `${imageBaseUrl}/${item?.ProductImage[0]}`}}
        />
      </View>
      <View style={styles.overlay}>
        <LinearGradient
          colors={[
            'rgba(201, 157, 182, 0)', // First transparent color
            'rgba(201, 157, 182, 0)', // Second transparent color
            '#c99db6', // Solid color at the bottom
          ]}
          style={styles.gradient}
          locations={[0, 0.35, 0.65]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}>
          <View>
            <View style={styles.time}>
              <Image
                source={stopwatch}
                style={{width: 12, height: 12}}
                tintColor={appColors?.background}
              />
              <CustomText
                font="semibold"
                style={{
                  fontSize: RFValue(9),
                  color: appColors?.background,
                  marginStart: 3,
                }}>
                14 MINS
              </CustomText>
            </View>
            <CustomText
              style={styles.pName}
              numberOfLines={2}
              ellipsizeMode="tail"
              font="medium">
              {item?.ProductName}
            </CustomText>
            <CustomText
              style={{color: appColors?.background, marginVertical: '2%'}}>
              1 unit
            </CustomText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <CustomText
                  font="semibold"
                  style={{color: appColors?.background}}>
                  ₹500
                </CustomText>
                <CustomText style={styles.drop}>₹1250</CustomText>
              </View>
              <TouchableOpacity activeOpacity={0.7} style={styles.addButton}>
                <CustomText
                  font="semibold"
                  style={{color: appColors?.secondry}}>
                  Add
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    width: width * 0.4,
    height: 250,
    marginRight: 10,
    borderRadius: 15,
    backgroundColor: appColors?.cardBg,
    marginVertical: '5%',
    paddingHorizontal: '1%',
    overflow: 'hidden',
    elevation: 1,
    borderWidth: 0.5,
    borderColor: appColors?.fullCardBg,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gradient: {
    height: '100%',
    width: '100%',
    paddingTop: '70%',
    paddingHorizontal: '4%',
  },
  time: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 3,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '42%',
    paddingTop: 1,
  },
  pName: {
    color: appColors?.background,
    marginTop: '1%',
  },
  drop: {
    textDecorationLine: 'line-through', // Adds a strikethrough effect
    textDecorationStyle: 'solid',
    width: '98%',
    fontSize: RFValue(10),
    color: appColors?.background,
    opacity: 0.6,
  },
  addButton: {
    backgroundColor: appColors?.background,
    paddingHorizontal: '12%',
    paddingBottom: '3%',
    borderRadius: 5,
  },
});

export default FullImageCard;
