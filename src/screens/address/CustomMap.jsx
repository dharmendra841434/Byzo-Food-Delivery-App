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
import {useDispatch, useSelector} from 'react-redux';
import {
  checkIsWithinKanyakumari,
  fixedZoomLevel,
  isEmptyObject,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {fatchAddressByCords} from '../../store/mapSlice';
import CustomHeader from '../../components/CustomHeader';

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
    ...fixedZoomLevel,
  });
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );

  const dispatch = useDispatch();

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
    dispatch(
      fatchAddressByCords({
        lat: newRegion?.latitude,
        long: newRegion?.longitude,
      }),
    );
    if (checkIsWithinKanyakumari(fullAddress)) {
      height1.value = hp('77%');
      height2.value = hp('23%');
    } else {
      height1.value = hp('64%');
      height2.value = hp('36%');
    }
  };

  useEffect(() => {
    showNavigationBar();
    if (checkIsWithinKanyakumari(fullAddress)) {
      height1.value = hp('77%');
      height2.value = hp('23%');
    } else {
      height1.value = hp('65%');
      height2.value = hp('35%');
    }
  }, [fullAddress]);

  useEffect(() => {
    mapRef?.current?.animateToRegion(
      {
        latitude: addressCordinates?.latitude,
        longitude: addressCordinates?.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      100,
    );
  }, [addressCordinates, isWithinKanyakumari]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.map, animatedStyle1]}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={{height: '100%', width: '100%'}}
          onRegionChangeComplete={handleRegionChangeComplete}
          region={{
            latitude: region ? region?.latitude : 0,
            longitude: region ? region?.longitude : 0,
            ...fixedZoomLevel,
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
                  ...fixedZoomLevel,
                }}>
                <CurrentLocationMarker />
              </Marker>
            </>
          )}
        </MapView>
        <View style={[styles.mapHeader]}>
          {!isEnable ? (
            <View>
              <CustomHeader
                isElivation={false}
                title={
                  checkIsWithinKanyakumari(fullAddress)
                    ? 'Confirm map pin location'
                    : 'Select location'
                }
              />
              <EnableWarning handleEnableLocation={handleEnableLocation} />
            </View>
          ) : (
            <CustomHeader
              isElivation={false}
              title={
                checkIsWithinKanyakumari(fullAddress)
                  ? 'Confirm map pin location'
                  : 'Select location'
              }
            />
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
    paddingTop: '13%',
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
