import {View, Text, FlatList} from 'react-native';
import React, {useState} from 'react';
import CategoryCard from '../../components/home/categories/CategoryCard';

const CategoriesSection = ({categories}) => {
  const [numberOfColumns, setNumberOfColumns] = useState(4);

  return (
    <View style={{alignItems: 'center', width: '100%'}}>
      <FlatList
        numColumns={numberOfColumns}
        scrollEnabled={false}
        data={categories}
        renderItem={(cat, index) => <CategoryCard category={cat} />}
      />
    </View>
  );
};

export default CategoriesSection;
