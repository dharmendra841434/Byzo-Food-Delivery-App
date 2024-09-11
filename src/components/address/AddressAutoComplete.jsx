import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import appColors from '../../utils/appColors';
import appFonts from '../../utils/appFonts';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../CustomText';
import {extractAddress} from '../../utils/helperfun';
import locationIcon from '../../assets/images/addressIcon.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  fatchAddressByCords,
  fatchCurrentLocationAddress,
  fatchUserAddress,
  setAddressCordinates,
} from '../../store/mapSlice';
import {useNavigation} from '@react-navigation/native';

const AddressAutoComplete = ({
  setSettingModelOpen,
  handleCloseSheet,
  handleSelectAddress,
  onPressCureentLocation,
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

  const handleSuggestionAPI = async placeId => {
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
        navigation.navigate('mapview');
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

  const handleSuggestionPress = async placeId => {
    handleSuggestionAPI(placeId);
    handleCloseSheet();
    setSuggestions([]);
    setQuery('');
  };

  const handleCurrentLocation = async () => {
    if (locationPermission === 'granted') {
      dispatch(fatchCurrentLocationAddress());
      navigation.navigate('mapview');
      handleCloseSheet();
    } else {
      setSettingModelOpen(true);
      handleCloseSheet();
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
            {itemData?.addressTitle}
          </CustomText>
          <CustomText style={styles.addressDescription}>
            {itemData?.addressDescription}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.container}>
        <Icon name="search" size={20} color={appColors.secondry} />
        <TextInput
          placeholder="Search for area, street name..."
          placeholderTextColor={appColors.blackText}
          style={{fontFamily: appFonts.medium, color: appColors.blackText}}
          cursorColor={appColors.blackText}
          className="w-full placeholder:text-[13px] "
          value={query}
          onChangeText={handleInputChange}
          ref={inputRef}
        />
        <View style={{position: 'absolute', top: loader ? 15 : 13, right: 15}}>
          {loader ? (
            <ActivityIndicator color={appColors.secondry} />
          ) : (
            <>
              {query?.length > 2 && (
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
      {suggestions?.length === 0 ? (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onPressCureentLocation();
            handleCurrentLocation();
          }}
          className="flex flex-row items-center justify-between px-2 py-2 mt-3 bg-white rounded-lg ">
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
      ) : (
        <View style={{marginTop: '2%'}}>
          <FlatList
            data={suggestions}
            keyExtractor={item => item.place_id}
            renderItem={renderSuggestion}
            style={styles.suggestionsContainer}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
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
