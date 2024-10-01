import {View, Text, FlatList, Dimensions} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const {width, height} = Dimensions?.get('window');

const HomeProductLoader = () => {
  const [numberOfColumns, setNumberOfColumns] = useState(4);
  const [loaderColors, setLoaderColors] = useState([
    '#fcf5ed',
    '#fcf4eb',
    '#faecdc',
  ]);
  return (
    <View style={{flex: 1, paddingTop: '12%', alignItems: 'center'}}>
      <ShimmerPlaceHolder
        shimmerColors={loaderColors}
        height={100}
        className="mx-1 w-[95%] my-1 rounded-[8px] "
      />
      <ShimmerPlaceHolder
        shimmerColors={loaderColors}
        height={100}
        className="mx-1 w-[95%] my-1 rounded-[8px] mt-2 "
      />
      <View style={{flexDirection: 'row'}}>
        <ShimmerPlaceHolder
          shimmerColors={loaderColors}
          height={140}
          className="mx-1 w-[95%] my-1 rounded-[8px] "
        />
        <ShimmerPlaceHolder
          shimmerColors={loaderColors}
          height={140}
          className="mx-1 w-[45%] my-1 rounded-[8px] mt-1 "
        />
      </View>
      <ShimmerPlaceHolder
        shimmerColors={loaderColors}
        height={140}
        className="mx-1 w-[95%] my-1 rounded-[8px] mt-1 "
      />
      <FlatList
        numColumns={numberOfColumns}
        scrollEnabled={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        renderItem={(cat, index) => (
          <ShimmerPlaceHolder
            shimmerColors={loaderColors}
            width={width / 4.4}
            height={100}
            className="mx-1 my-1 rounded-[8px] "
          />
        )}
      />
    </View>
  );
};

export default HomeProductLoader;
