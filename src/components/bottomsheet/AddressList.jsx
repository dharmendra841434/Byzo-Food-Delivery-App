import React, {useMemo, useCallback, memo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SearchedAddressLists from '../address/SearchedAddressLists';
import {locationAPI} from '../../store/api';
import {
  fatchAddressByCords,
  setAddressCordinates,
  setSuggestedAddress,
} from '../../store/mapSlice';

const keyExtractor = (item, index) => `${item.name}.${index}`;

const AddressList = ({handleSelectAddress, handleCloseSheet, ...rest}) => {
  const {bottom: bottomSafeArea} = useSafeAreaInsets();
  const suggestedAddress = useSelector(state => state?.map?.suggestedAddress);
  const contentContainerStyle = useMemo(
    () => ({
      ...styles.contentContainer,
      paddingBottom: bottomSafeArea,
    }),
    [bottomSafeArea],
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSuggestionAPI = async placeId => {
    try {
      const response = await locationAPI?.getReverseLocation(placeId);
      const {lat, lng} = response.result.geometry.location;
      dispatch(
        setAddressCordinates({
          latitude: lat,
          longitude: lng,
        }),
      );
      handleSelectAddress({
        latitude: lat,
        longitude: lng,
      });
      dispatch(
        fatchAddressByCords({
          lat: lat,
          long: lng,
        }),
      );
      navigation.navigate('mapview');
    } catch (error) {
      console.log(error, 'this is error');
    }
  };

  const handleSuggestionPress = async placeId => {
    handleSuggestionAPI(placeId);
    handleCloseSheet();
  };

  const renderFlatListItem = useCallback(
    ({item, index}) => (
      <SearchedAddressLists
        item={item}
        handleSuggestionPress={handleSuggestionPress}
      />
    ),
    [],
  );

  return (
    <BottomSheetFlatList
      {...rest}
      data={suggestedAddress}
      refreshing={false}
      keyExtractor={keyExtractor}
      initialNumToRender={5}
      bounces={true}
      windowSize={10}
      maxToRenderPerBatch={5}
      renderItem={renderFlatListItem}
      style={styles.container}
      keyboardDismissMode="interactive"
      indicatorStyle="black"
      contentContainerStyle={contentContainerStyle}
      focusHook={useFocusEffect}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    paddingTop: 24,
    paddingBottom: 6,
    backgroundColor: 'white',
  },
  sectionHeaderTitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'black',
  },
  container: {
    overflow: 'visible',
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    overflow: 'visible',
  },
});

export default AddressList;
