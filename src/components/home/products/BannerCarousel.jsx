import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {imageBaseUrl} from '../../../utils/constent';
import CleaningProductsSection from './CleaningProductsSection';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width; // Smaller item width to show part of previous/next items

const BannerCarousel = ({data}) => {
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={width}
        height={ITEM_WIDTH * 0.5}
        autoPlay={false}
        pagingEnabled={true}
        snapEnabled={true}
        data={data?.bannerData[0]?.bannerItems}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 45,
          parallaxAdjacentItemScale: 0.84,
        }}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={{
              width: ITEM_WIDTH,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              defaultSource={{uri: 'https://via.placeholder.com/300'}}
              source={{
                uri: `${imageBaseUrl}/${item?.bannerImage}`,
              }}
              style={{width: '100%', height: 220}}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <CleaningProductsSection />
    </View>
  );
};

export default BannerCarousel;
