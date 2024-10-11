import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import CustomText from '../CustomText';
import {addEllipsis, extractAddress} from '../../utils/helperfun';
import locationIcon from '../../assets/images/addressIcon.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  fatchAddressByCords,
  fatchCurrentLocationAddress,
  setAddressCordinates,
} from '../../store/mapSlice';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {AppIcons} from '../../utils/constent';
import CustomIcons from '../CustomIcons';

const none = () => {};

const AddressAutoComplete = ({
  setSettingModelOpen,
  handleCloseSheet = none,
  handleSelectAddress = none,
  onPressCureentLocation = none,
  inputRef,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loader, setLoader] = useState(false);
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchSuggestions = async text => {
    setLoader(true);
    const apiKey = 'AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is'; // Replace with your actual API key
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&components=country:in&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const json = await response.json();

      if (json.status === 'OK') {
        // console.log(json, 'jhjh');
        setSuggestions(json.predictions);
        setLoader(false);
      } else {
        setSuggestions([]);
        setLoader(false);
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  const handleSuggestionPress = async placeId => {
    const apiKey = 'AIzaSyCIWbUh6hK1P_ARYXLVwqm2B_IOeACS8is'; // Replace with your actual API key
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${apiKey}`;
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();

      if (json.status === 'OK') {
        const {lat, lng} = json.result.geometry.location;

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
        setSuggestions([]);
        setQuery('');
        navigation.navigate('mapview');
        console.log('modal closing.......');
        handleCloseSheet();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = text => {
    setQuery(text);
    if (text.length > 2) {
      fetchSuggestions(text);
    } else {
      setSuggestions([]);
    }
  };

  const handleClearInput = () => {
    setQuery('');
    setSuggestions([]);
  };

  // const handleSuggestionPress = async placeId => {
  //   handleSuggestionAPI(placeId);
  //   setSuggestions([]);
  //   setQuery('');
  // };

  const handleCurrentLocation = async () => {
    if (locationPermission === 'granted') {
      dispatch(fatchCurrentLocationAddress());
      navigation.navigate('mapview');
      handleCloseSheet();
    } else {
      setSettingModelOpen(true);
    }
  };

  const renderSuggestion = ({item}) => {
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
            {addEllipsis(itemData?.addressTitle, 45)}
          </CustomText>
          <CustomText style={styles.addressDescription}>
            {addEllipsis(itemData?.addressDescription, 50)}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.container}>
        <CustomIcons icon={AppIcons?.searchIcon} />

        <BottomSheetTextInput
          placeholder="Search for area, street name..."
          placeholderTextColor={appColors.blackText}
          style={{
            fontFamily: appFonts.medium,
            color: appColors.blackText,
            height: '100%',
            backgroundColor: appColors?.background,
            width: '100%',
          }}
          cursorColor={appColors.blackText}
          value={query}
          onChangeText={handleInputChange}
          ref={inputRef}
        />
        <View style={{position: 'absolute', top: 13, right: 15}}>
          {query?.length > 2 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleClearInput}
              style={{
                backgroundColor: appColors.bottomSheetBg,
                borderRadius: 100,
                padding: 1,
              }}>
              <CustomIcons
                icon={AppIcons?.closeIcon}
                color={appColors?.blackText}
                size={17}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        {suggestions?.length === 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              onPressCureentLocation();
              handleCurrentLocation();
            }}
            className="flex flex-row items-center justify-between px-2 py-2 mt-3 bg-white rounded-lg ">
            <View className="flex flex-row ">
              <CustomIcons icon={AppIcons?.locationCross} />
              <CustomText
                className="ml-3 text-secondry text-[13px]"
                font="semibold">
                Use your current location
              </CustomText>
            </View>
            <CustomIcons
              icon={AppIcons?.rightArrow}
              color={appColors?.blackText}
            />
          </TouchableOpacity>
        ) : (
          <View style={{marginTop: '2%'}}>
            <FlatList
              data={suggestions}
              scrollEnabled={false}
              keyExtractor={item => item.place_id}
              renderItem={renderSuggestion}
              style={styles.suggestionsContainer}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    backgroundColor: appColors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderRadius: 8,
    overflow: 'hidden',
  },
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

export default AddressAutoComplete;
