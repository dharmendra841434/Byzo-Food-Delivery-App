import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ik from '../../../assets/images/puja.png';
import {imageBaseUrl} from '../../../utils/constent';

const CategoryCard = ({category}) => {
  // console.log(category?.item?.categoryImage, 'tjhjh');

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <Image
        source={{uri: `${imageBaseUrl}/${category?.item?.categoryImage}`}} // Replace with your image URL or use require for local images
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '24%',
    // borderWidth: 1,
    // borderColor: 'red',
    margin: '0.5%',
    marginTop: '2%',
  },
  image: {
    width: '100%', // Adjust according to your image dimensions
    height: 135,
    resizeMode: 'contain',
  },
});

export default CategoryCard;
