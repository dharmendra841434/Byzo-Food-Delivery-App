import React, {memo, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import appColors from '../../utils/appColors';
import CustomText from '../CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  fatchCurrentLocationAddress,
  fetchAddressSuggestions,
  setSearchInput,
  setSuggestedAddress,
} from '../../store/mapSlice';
import {useNavigation} from '@react-navigation/native';

export const SEARCH_HANDLE_HEIGHT = 69;
// Define default empty functions for all optional props
const noop = () => {};

const SearchHandle = ({
  handleCloseSheet = noop,
  onPressCureentLocation = noop,
  setSettingModelOpen = noop,
  handleSelectAddress,
}) => {
  const searchInput = useSelector(state => state?.map?.searchInput);
  const suggetionLoader = useSelector(state => state?.map?.suggetionLoader);
  const suggestedAddress = useSelector(state => state?.map?.suggestedAddress);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleInputChange = async text => {
    dispatch(setSearchInput(text));
    if (text.length > 2) {
      await dispatch(fetchAddressSuggestions(text));
    } else {
      dispatch(setSuggestedAddress([]));
    }
  };

  const handleClearInput = () => {
    dispatch(setSearchInput(''));
    dispatch(setSuggestedAddress([]));
  };

  const handleCurrentLocation = async () => {
    if (locationPermission === 'granted') {
      dispatch(fatchCurrentLocationAddress());
      navigation.navigate('mapview');
      if (handleCloseSheet) {
        handleCloseSheet();
      }
    } else {
      if (setSettingModelOpen) {
        setSettingModelOpen(true);
      }
      if (handleCloseSheet) {
        handleCloseSheet();
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomText font="bold" className="text-[17px] text-blackText">
        Select delivery address
      </CustomText>
      <View style={styles.inputContainer}>
        <Icon name="search" size={25} color={appColors.secondry} />
        <BottomSheetTextInput
          style={styles.textInput}
          value={searchInput}
          textContentType="location"
          cursorColor={appColors?.blackText}
          placeholderTextColor={appColors?.blackText}
          placeholder="Search for a place or address"
          onChangeText={handleInputChange}
        />
        <View
          style={{
            position: 'absolute',
            top: suggetionLoader ? 15 : 13,
            right: 15,
          }}>
          {suggetionLoader ? (
            <ActivityIndicator color={appColors.secondry} />
          ) : (
            <>
              {searchInput?.length > 2 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleClearInput}
                  style={{
                    backgroundColor: appColors.bottomSheetBg,
                    borderRadius: 100,
                    padding: 1,
                  }}>
                  <Icon name="close" size={20} />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
      {suggestedAddress?.length === 0 && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleCurrentLocation();
            if (onPressCureentLocation) {
              onPressCureentLocation();
            }
          }}
          className="flex flex-row items-center justify-between px-2 py-2 mt-1 bg-white rounded-lg ">
          <View className="flex flex-row ">
            <Icon2
              name="location-crosshairs"
              size={22}
              color={appColors.secondry}
            />
            <CustomText
              className="ml-3 text-secondry text-[13px]"
              font="semibold">
              Use your current location
            </CustomText>
          </View>
          <Icon3
            name="keyboard-arrow-right"
            size={20}
            color={appColors.blackText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '3%',
    paddingVertical: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors?.background,
    borderRadius: 8,
    paddingHorizontal: '2%',
    elevation: 2,
    position: 'relative',
    marginVertical: '2%',
  },
  textInput: {
    alignSelf: 'stretch',
    borderRadius: 12,
    width: '100%',
  },
});

export default SearchHandle;
