import {View} from 'react-native';
import React from 'react';
import appColors from '../../utils/appColors';
import CustomText from '../CustomText';
import {useSelector} from 'react-redux';
import CategoriesSection from '../../screens/home/CategoriesSection';
import RecommendedProducts from './products/RecommendedProducts';
import InfiniteSection from './products/InfiniteSection';
import NewlyLunched from './products/NewlyLunched';
import BannerCarousel from './products/BannerCarousel';
import CleaningProductsSection from './products/CleaningProductsSection';
import FullImageSection from './products/FullImageSection';

const ProductsView = () => {
  const productsCategories = useSelector(
    state => state?.products?.productsCategories,
  );
  const allProducts = useSelector(state => state?.products?.allProducts);

  //console.log(productsCategories, 'category');

  return (
    <View style={{backgroundColor: appColors?.background}}>
      <CategoriesSection categories={productsCategories} />
      <View style={{marginTop: '3%'}}>
        {allProducts?.map((item, index) => (
          <View key={index}>
            {item?.sectionName === 'Recommended Products' && (
              <RecommendedProducts data={item} />
            )}
            {item?.sectionName === 'Infinate Cards Section' && (
              <InfiniteSection data={item} />
            )}
            {item?.sectionName === 'Newly Launched' && (
              <NewlyLunched data={item} />
            )}

            {item?.sectionName === 'Best Seller' && (
              <BannerCarousel data={item} />
            )}
            {item?.sectionName === 'Full Img section' && (
              <FullImageSection data={item} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProductsView;
