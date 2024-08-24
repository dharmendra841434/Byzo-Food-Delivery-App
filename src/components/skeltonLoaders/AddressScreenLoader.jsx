import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const AddressScreenLoader = () => {
  return (
    <View className="px-3 ">
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[20%] h-4 bg-gray-200 rounded-xl "
      />
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[50%] h-6 mt-3 bg-gray-200 rounded-xl "
      />
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[80%] h-5 mt-3 bg-gray-200 rounded-xl "
      />
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[98%] h-10 mt-3 bg-gray-100 rounded-xl "
      />
      <ShimmerPlaceHolder
        className="absolute w-16 h-16 mt-3 bg-gray-100 rounded-full right-4 "
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
      />
    </View>
  );
};

export default AddressScreenLoader;
