import {View, StyleSheet, ImageBackground, FlatList} from 'react-native';
import React from 'react';
import CustomText from '../../CustomText';
import appColors from '../../../utils/appColors';
import ProductCard from './ProductCard';
import {RFValue} from 'react-native-responsive-fontsize';

const NewlyLunched = ({data}) => {
  return (
    <View style={styles.conatiner}>
      {data?.bgColorBg ? (
        <View style={{backgroundColor: 'rgba(255, 199 ,199, 0.23) '}}>
          <View style={styles.headingContainer}>
            <CustomText font="medium" style={styles.heading}>
              Explore all of the freshly added items
            </CustomText>
            <View className="flex flex-row items-center ">
              <CustomText className="text-3xl text-orange-500" font="extraBold">
                B
              </CustomText>
              <CustomText className="text-3xl text-secondry" font="extraBold">
                yzo
              </CustomText>
            </View>
          </View>
          <CustomText style={styles.header} font="bold">
            Newly Launched
          </CustomText>
          <View style={{paddingStart: '2%', paddingBottom: '5%'}}>
            <FlatList
              data={data?.products}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={item => item._id}
              renderItem={({item}) => <ProductCard item={item} />}
            />
          </View>
        </View>
      ) : (
        <ImageBackground source={{uri: data?.bgImg}} style={{width: '100%'}}>
          <View style={styles.headingContainer}>
            <CustomText style={styles.header} font="bold">
              Newly Launched
            </CustomText>
          </View>
          <View style={{paddingStart: '2%', paddingBottom: '5%'}}>
            <FlatList
              data={data?.products}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={item => item._id}
              renderItem={({item}) => <ProductCard item={item} />}
            />
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginTop: '5%',
  },
  headingContainer: {
    flexDirection: 'row',
    paddingTop: '3%',
    paddingBottom: '1%',
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: appColors?.gredientTo,
    opacity: 0.6,
  },
  header: {
    fontSize: RFValue(16),
    marginStart: '2%',
  },
});

export default NewlyLunched;
