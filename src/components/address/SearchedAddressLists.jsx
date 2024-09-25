import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {extractAddress} from '../../utils/helperfun';
import CustomText from '../CustomText';
import appColors from '../../utils/appColors';
import locationIcon from '../../assets/images/addressIcon.png';

const SearchedAddressLists = ({item, handleSuggestionPress}) => {
  // console.log(item, 'ksjdks');

  const itemData = extractAddress(item);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.suggestionItem}
      onPress={() => {
        handleSuggestionPress(item?.place_id);
      }}>
      <View
        style={{
          backgroundColor: appColors.bottomSheetBg,
          borderRadius: 6,
          padding: 7,
        }}>
        <Image source={locationIcon} style={{height: 30, width: 30}} />
      </View>
      <View style={{width: '80%', marginStart: '4%', height: '100%'}}>
        <CustomText font="semibold" style={styles.suggestionTitle}>
          {itemData?.addressTitle}
        </CustomText>
        <CustomText style={styles.addressDescription}>
          {itemData?.addressDescription}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  suggestionItem: {
    backgroundColor: appColors.background,
    marginVertical: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionTitle: {
    color: appColors.blackText,
    fontSize: 14,
  },
  addressDescription: {
    color: appColors.blackText,
    fontSize: 12,
    opacity: 0.7,
  },
});

export default SearchedAddressLists;
