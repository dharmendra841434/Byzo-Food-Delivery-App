import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {imageBaseUrl} from '../../../utils/constent';
import AddCartAection from './AddCartAection';
import appColors from '../../../utils/appColors';
import DropDown from './DropDown';

const InfiniteSection = ({data}) => {
  const {width, height} = Dimensions?.get('window');
  const [clmn, setClmn] = useState(2);
  return (
    <View style={{marginTop: '5%'}}>
      <FlatList
        data={data?.products}
        numColumns={clmn}
        scrollEnabled={false}
        keyExtractor={item => item._id}
        renderItem={({item, index}) => (
          <View
            className={` ${
              index === 0 || index % 2 === 0
                ? 'border-r border-r-gray-200 border-b border-b-gray-200'
                : 'border-b border-b-gray-200'
            }  ${
              index >= data?.products.length - 2 && 'border-b border-b-white'
            }`}
            style={{
              width: width * 0.5,
              height: 280,
              paddingHorizontal: '3%',
              paddingVertical: '2%',
            }}>
            <View
              style={{
                backgroundColor: 'green',
                width: '58%',
                height: '45%',
                marginVertical: '2%',
                alignSelf: 'center',
              }}>
              <Image
                style={styles.productImage}
                source={{uri: `${imageBaseUrl}/${item?.ProductImage[0]}`}}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: 40,
              }}>
              <CustomText
                numberOfLines={2}
                ellipsizeMode="tail"
                font="semibold"
                style={styles.productTitle}>
                {item?.ProductName}
              </CustomText>
            </View>
            <DropDown />
            <CustomText style={styles.priceDrop}>100₹</CustomText>
            <AddCartAection price={item?.Rate[2]} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productTitle: {
    width: '100%',
    fontSize: RFValue(12),
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  priceDrop: {
    textDecorationLine: 'line-through', // Adds a strikethrough effect
    textDecorationStyle: 'solid',
    width: '98%',
    fontSize: RFValue(10),
    marginVertical: '3%',
    color: appColors?.closeButton,
    opacity: 0.6,
  },
});

export default InfiniteSection;
