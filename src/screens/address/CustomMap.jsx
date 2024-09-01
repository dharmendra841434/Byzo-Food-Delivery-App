// import {View, Text, StyleSheet} from 'react-native';
// import React from 'react';
// import CustomText from '../../components/CustomText';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// const TestMap = () => {
//   return (
//     <View style={{flex: 1, backgroundColor: 'green'}}>
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           style={{height: 200, width: '100%'}}
//           region={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           }}></MapView>
//       </View>
//       <View style={{height: 300, backgroundColor: 'purple'}}>
//         <CustomText>jsdfsdff</CustomText>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default TestMap;

import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import appColors from '../../utils/appColors';
import CustomText from '../../components/CustomText';
import EnableWarning from '../../components/address/mapScreen/EnableWarning';
import TopSearchBar from '../../components/address/mapScreen/TopSearchBar';
import LocationEnable from '../../components/address/mapScreen/LocationEnable';
import NotDeliveryWarning from '../../components/address/NotDeliveryWarning';
import {showNavigationBar} from 'react-native-navigation-bar-color';
import MapDeliveryAddressCard from '../../components/address/mapScreen/MapDeliveryAddressCard';
import AddressScreenLoader from '../../components/skeltonLoaders/AddressScreenLoader';
import AddressFatchingLoader from '../../components/skeltonLoaders/AddressFatchingLoader';
import CustomMarker from '../../components/address/CustomMarker';
import CurrentLocationMarker from '../../components/address/CurrentLocationMarker';
import {useSelector} from 'react-redux';
import {
  checkIsWithinKanyakumari,
  isEmptyObject,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomMap = ({
  isEnable = true,
  loader = false,
  onRegionChangeComplete,
  handleConfirmLocation,
  handleChangeAddress,
  handleGoToCureentLocation,
  handleEnableLocation,
  handleSearchPress,
  mapRef,
}) => {
  const height1 = useSharedValue(hp('80%')); // Initial height for View 1
  const height2 = useSharedValue(hp('20%')); // Initial height for View 2
  const addressCordinates = useSelector(state => state?.map?.addressCordinates);
  const currentCordinates = useSelector(state => state?.map?.currentCordinates);
  const [region, setRegion] = useState({
    latitude: addressCordinates?.latitude,
    longitude: addressCordinates?.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );

  const navigation = useNavigation();
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      height: withTiming(height1.value, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      height: withTiming(height2.value, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      }),
    };
  });

  const handleRegionChangeComplete = newRegion => {
    onRegionChangeComplete(newRegion);
    if (isWithinKanyakumari) {
      height1.value = hp('77%');
      height2.value = hp('23%');
    } else {
      height1.value = hp('64%');
      height2.value = hp('36%');
    }
  };

  useEffect(() => {
    showNavigationBar();
    if (isWithinKanyakumari) {
      height1.value = hp('75%');
      height2.value = hp('25%');
    } else {
      height1.value = hp('60%');
      height2.value = hp('40%');
    }
  }, [isWithinKanyakumari]);

  useEffect(() => {
    mapRef?.current?.animateToRegion(
      {
        latitude: addressCordinates?.latitude,
        longitude: addressCordinates?.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000,
    );
  }, [addressCordinates, isWithinKanyakumari]);

  console.log(currentCordinates, 'ashdjhsa');

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.map, animatedStyle1]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={{height: '100%', width: '100%'}}
          onRegionChangeComplete={handleRegionChangeComplete}
          initialRegion={{
            latitude: region ? region?.latitude : 0,
            longitude: region ? region?.longitude : 0,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          {isEnable && !isEmptyObject(currentCordinates) && (
            <>
              <Marker
                coordinate={{
                  latitude: isEmptyObject(currentCordinates)
                    ? 0
                    : currentCordinates?.latitude,
                  longitude: isEmptyObject(currentCordinates)
                    ? 0
                    : currentCordinates?.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}>
                <CurrentLocationMarker />
              </Marker>
            </>
          )}
        </MapView>
        <View style={[styles.mapHeader]}>
          {isEnable ? (
            <View>
              <View
                style={{
                  backgroundColor: appColors.background,
                  alignContent: 'center',
                  paddingBottom: '3%',
                  paddingStart: '3%',
                }}>
                <TouchableOpacity
                  style={{position: 'absolute', left: '3%'}}
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}>
                  <Icon2
                    name="chevron-back-outline"
                    size={27}
                    color={appColors.blackText}
                  />
                </TouchableOpacity>
                <CustomText
                  font="semibold"
                  style={{fontSize: 17, marginStart: '25%'}}>
                  {isWithinKanyakumari
                    ? 'Confirm map pin location'
                    : 'Select location'}
                </CustomText>
              </View>
              <View style={{paddingHorizontal: '3%', paddingVertical: '2%'}}>
                <TopSearchBar
                  isElivation={isEnable}
                  handleSearchPress={handleSearchPress}
                />
              </View>
            </View>
          ) : (
            <View style={{backgroundColor: appColors.background, elevation: 5}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: appColors.background,
                  alignContent: 'center',
                  paddingBottom: '3%',
                  paddingStart: '3%',
                }}>
                <TouchableOpacity
                  style={{position: 'absolute', left: '3%'}}
                  activeOpacity={0.8}
                  onPress={() => navigation.goBack()}>
                  <Icon2
                    name="chevron-back-outline"
                    size={27}
                    color={appColors.blackText}
                  />
                </TouchableOpacity>
                <CustomText
                  font="semibold"
                  style={{fontSize: 17, marginStart: '25%'}}>
                  {isWithinKanyakumari
                    ? 'Confirm map pin location'
                    : 'Select location'}
                </CustomText>
              </TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: '3%',
                  paddingVertical: '2%',
                }}>
                <TopSearchBar handleSearchPress={handleSearchPress} />
              </View>
              <EnableWarning handleEnableLocation={handleEnableLocation} />
            </View>
          )}
        </View>
        <View style={styles.bottomSection}>
          <LocationEnable
            onEnablePermission={handleEnableLocation}
            handleCurrentLocation={handleGoToCureentLocation}
            isEnable={isEnable}
          />
        </View>
        <View style={{position: 'absolute', left: '46%', top: '52%'}}>
          <CustomMarker />
        </View>
      </Animated.View>
      <Animated.View style={[styles.content, animatedStyle2]}>
        <>
          {loader ? (
            <>
              <AddressFatchingLoader />
            </>
          ) : (
            <>
              {checkIsWithinKanyakumari(fullAddress) ? (
                <View>
                  <MapDeliveryAddressCard
                    handleChangeAddress={handleChangeAddress}
                    handleConfirmLocation={handleConfirmLocation}
                    address={splitAddressAtFirstComma(fullAddress)}
                  />
                </View>
              ) : (
                <NotDeliveryWarning
                  handleGoToCureent={handleGoToCureentLocation}
                  handleSelectManually={handleChangeAddress}
                />
              )}
            </>
          )}
        </>

        {/* <Button title="Toggle Heights" onPress={toggleHeights} /> */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  map: {
    width: '100%',
    backgroundColor: 'skyblue',
    position: 'relative',
  },
  content: {
    width: '100%',
    backgroundColor: appColors?.background,
    alignItems: 'center',
  },
  mapHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    top: 0,
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
});

export default CustomMap;
