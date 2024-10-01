import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomText from '../../CustomText';
import appColors from '../../../utils/appColors';
import {imageBaseUrl} from '../../../utils/constent';
import {addEllipsis} from '../../../utils/helperfun';
import OfferIcon from '../../../assets/icons/OfferIcon';
import {RFValue} from 'react-native-responsive-fontsize';
import AddCartAection from './AddCartAection';

const {width, height} = Dimensions?.get('window');

const ProductCard = ({item}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.offerIcon}>
        <OfferIcon />
        <View style={styles.offerTextContainer}>
          <CustomText style={styles.offerText}>
            {item?.OfferPercentage}%
          </CustomText>
          <CustomText style={[styles.offerText, {marginLeft: 6}]}>
            off
          </CustomText>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.productImage}
          source={{uri: `${imageBaseUrl}/${item?.ProductImage[0]}`}}
        />
      </View>

      <View style={{height: '20%', width: '95%'}}>
        <CustomText
          numberOfLines={2}
          ellipsizeMode="tail"
          font="semibold"
          style={styles.productTitle}>
          {/* {addEllipsis(item?.ProductName, 30)} */}
          {item?.ProductName}
        </CustomText>
      </View>
      <CustomText style={styles.quantityText}>{item?.ProductWeight}</CustomText>
      <AddCartAection price={item?.Rate[2]} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: appColors?.borderGray,
    width: width * 0.35,
    height: 250,
    marginRight: 10,
    borderRadius: 11,
    elevation: 1.5,
    backgroundColor: appColors?.background,
    marginVertical: '5%',
    paddingHorizontal: '1%',
    overflow: 'hidden',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '56%',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  productTitle: {
    marginTop: '5%',
    width: '100%',
    fontSize: RFValue(12),
  },
  offerIcon: {
    position: 'absolute',
    top: 0,
    right: -2,
    zIndex: 10,
  },
  offerTextContainer: {
    position: 'absolute',
    top: 3,
    right: 10,
    zIndex: 10,
  },
  offerText: {
    fontSize: RFValue(7),
    color: appColors?.background,
  },
  quantityText: {
    color: appColors?.closeButton,
    width: '95%',
    fontSize: RFValue(10),
  },
});

export default ProductCard;
