import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import appColors from '../../utils/appColors';

const TopSectionCards = () => {
  const data = [
    {
      id: 1,
      name: 'Pooja Esentials',
      image: require('../../assets/images/puja.png'),
    },
    {
      id: 2,
      name: 'Flowers and Leaves',
      image: require('../../assets/images/flower.png'),
    },
    {
      id: 3,
      name: 'Explore All',
      image: require('../../assets/images/fruits.png'),
    },
    // {
    //   id: 4,
    //   name: 'Flowers and Leaves',
    //   image: require('../../assets/images/flower.png'),
    // },
  ];
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        height: '100%',
      }}>
      <View style={styles.container}>
        {data?.map((item, index) => (
          <View key={index} style={styles.card}>
            <CustomText
              className="text-center "
              font="semibold"
              style={{color: appColors?.gredientFrom}}>
              {item?.name}
            </CustomText>
            <Image
              source={item?.image}
              style={{
                height: index === 0 ? 60 : index === 1 ? 70 : 60,
                width: index === 0 ? 80 : index === 1 ? 60 : 80,
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '2%',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: appColors?.background,
    width: '30%',
    height: 120,
    marginHorizontal: '1%',
    borderRadius: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TopSectionCards;
