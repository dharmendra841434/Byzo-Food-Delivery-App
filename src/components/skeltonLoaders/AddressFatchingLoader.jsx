import {View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import CustomText from '../CustomText';
import appColors from '../../utils/appColors';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const AddressFatchingLoader = () => {
  return (
    <View>
      <View style={{paddingHorizontal: '3%', paddingVertical: '2%'}}>
        <CustomText
          font="bold"
          style={{color: appColors.blackText, fontSize: 17}}>
          Getting your pin location....
        </CustomText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: '5%',
          marginTop: '3%',
        }}>
        <ShimmerPlaceHolder
          shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
          className="w-16 h-16 bg-gray-200 rounded-lg "
        />
        <View style={{width: '80%', marginStart: '3%'}}>
          <ShimmerPlaceHolder
            shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
            className="w-[50%] h-4 bg-gray-200 rounded-lg "
          />
          <ShimmerPlaceHolder
            shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
            className="w-[80%] h-6 mt-2 bg-gray-200 rounded-lg "
          />
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: appColors.borderGray,
          opacity: 0.6,
          marginHorizontal: '2%',
          marginTop: 6,
        }}
      />
      <View style={{alignItems: 'center'}}>
        <ShimmerPlaceHolder
          shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
          className="w-[90%] h-12 bg-gray-200 rounded-md "
        />
      </View>
    </View>
  );
};

export default AddressFatchingLoader;
