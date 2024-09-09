import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const HomeLoader = () => {
  return (
    <View
      style={{}}
      className="items-center justify-center flex-1 w-full h-full px-3 ">
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[98%] h-1/3 bg-gray-200 rounded-xl "
      />
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[98%] h-14 mt-3 bg-gray-200 rounded-xl "
      />
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[98%] h-14 mt-3 bg-gray-200 rounded-xl "
      />
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[98%] h-14 mt-3 bg-gray-200 rounded-xl "
      />
      <ShimmerPlaceHolder
        shimmerColors={['#f0f0f0', '#e3e3e3', '#f0f0f0']}
        className="w-[98%] h-14 mt-3 bg-gray-100 rounded-xl "
      />
    </View>
  );
};

export default HomeLoader;
