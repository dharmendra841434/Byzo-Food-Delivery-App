import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import CustomText from '../../CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import appColors from '../../../utils/appColors';
import OfferIcon from '../../../assets/icons/OfferIcon';
import ProductCard from './ProductCard';

const RecommendedProducts = ({data}) => {
  return (
    <View style={{paddingHorizontal: '2%'}}>
      <View style={styles.container}>
        <CustomText font="bold" style={styles?.heading}>
          {data?.sectionName}
        </CustomText>
        <TouchableOpacity activeOpacity={0.6}>
          <CustomText font="medium" style={styles.seeAll}>
            See all
          </CustomText>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={data?.products}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={item => item._id}
          renderItem={({item}) => <ProductCard item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: RFValue(16),
  },
  seeAll: {
    fontSize: RFValue(11),
  },
});

export default RecommendedProducts;
