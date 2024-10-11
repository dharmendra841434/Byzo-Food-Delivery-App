import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import FullImageCard from './FullImageCard';

const FullImageSection = ({data}) => {
  //console.log(data, 'shah');

  return (
    <View style={styles.conatiner}>
      <View>
        <FlatList
          data={data?.products}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={item => item._id}
          renderItem={({item}) => <FullImageCard item={item} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginTop: '5%',
    paddingHorizontal: '2%',
  },
});

export default FullImageSection;
