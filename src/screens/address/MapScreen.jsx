import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import appColors from '../../utils/appColors';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomMarker from '../../components/address/CustomMarker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import CustomText from '../../components/CustomText';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import appFonts from '../../utils/appFonts';
import CurrentLocationMarker from '../../components/address/CurrentLocationMarker';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import MapBottomSheet from '../../components/address/mapScreen/MapBottomSheet';
import AddressFatchingLoader from '../../components/skeltonLoaders/AddressFatchingLoader';
import {useNavigation} from '@react-navigation/native';
import {fatchAddressByCords, setAddressCordinates} from '../../store/mapSlice';
import Geolocation from 'react-native-geolocation-service';
import SettingOpenModel from '../../components/address/SettingOpenModel';
import {
  getLocalStorageData,
  splitAddressAtFirstComma,
} from '../../utils/helperfun';
import MarkerIcon from '../../components/address/MarkerIcon';
import EnableWarning from '../../components/address/mapScreen/EnableWarning';

const MapScreen = () => {
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  // console.log(fullAddress, 'this is full address');
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const addressCordinates = useSelector(state => state?.map?.addressCordinates);
  const currentCordinates = useSelector(state => state?.map?.currentCordinates);
  const addressLoader = useSelector(state => state?.map?.addressLoader);
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );

  const [openSetting, setOpenSetting] = useState(false);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: addressCordinates?.latitude,
    longitude: addressCordinates?.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  //console.log(fullAddress, 'this is full adddress');

  const handleConferLocation = async () => {
    navigation.navigate('home');
    // getLocalStorageData('skip-login').then(val => {
    //   //console.log(val);
    //   if (val !== null) {
    //     navigation.navigate('home');
    //   } else {
    //     navigation.navigate('login');
    //   }
    // });
  };

  const handleGoToCureent = () => {
    Geolocation.getCurrentPosition(
      position => {
        //console.log(position);
        dispatch(setAddressCordinates(position?.coords));
        dispatch(
          fatchAddressByCords({
            lat: position?.coords?.latitude,
            long: position?.coords?.longitude,
          }),
        );
        mapRef?.current?.animateToRegion(
          {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          2000,
        );
      },
      error => {
        setOpenSetting(true);
        console.log(error.code, error.message, 'this is error');
      },
      {enableHighAccuracy: true, timeout: 15000},
    );
  };

  const onRegionChangeComplete = newRegion => {
    let cordinatesData = {
      latitude: newRegion?.latitude,
      longitude: newRegion?.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };
    //console.log(cordinatesData);
    setRegion(cordinatesData);
    dispatch(
      fatchAddressByCords({
        lat: newRegion?.latitude,
        long: newRegion?.longitude,
      }),
    );
  };

  useEffect(() => {
    setRegion({
      latitude: addressCordinates?.latitude,
      longitude: addressCordinates?.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, [addressCordinates]);

  //console.log(cordinatesAddressLoader, 'loader');
  // console.log(fullAddress, 'addd');

  return (
    <BottomSheetModalProvider>
      <View style={styles.screen}>
        <StatusBar
          backgroundColor={
            modalVisible ? appColors.backDropBg : appColors?.background
          }
          barStyle="dark-content"
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 2}}
          zoomEnabled={true}
          ref={mapRef}
          minZoomLevel={5}
          onRegionChangeComplete={onRegionChangeComplete}
          initialRegion={region}>
          <Marker
            coordinate={{
              latitude: currentCordinates?.latitude
                ? currentCordinates?.latitude
                : 0,
              longitude: currentCordinates?.longitude
                ? currentCordinates?.longitude
                : 0,
            }}>
            <CurrentLocationMarker />
          </Marker>
        </MapView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={18} color={appColors.blackText} />
          </TouchableOpacity>
          <CustomText font="semibold" style={styles.heading}>
            Select location
          </CustomText>
        </View>
        {locationPermission === 'denied' ? (
          <View style={styles.notEnableTop}>
            <View>
              <TouchableOpacity
                onPress={handlePresentModalPress}
                activeOpacity={0.9}
                style={[
                  styles.container,
                  {borderWidth: 1, borderColor: appColors.borderGray},
                ]}>
                <Icon2 name="search" size={23} color={appColors.secondry} />

                <CustomText
                  font="medium"
                  style={{
                    color: appColors.blackText,
                    marginStart: 5,
                  }}>
                  Search for area, street name...
                </CustomText>
              </TouchableOpacity>
            </View>
            <EnableWarning />
          </View>
        ) : (
          <View style={styles.searchBox}>
            <TouchableOpacity
              onPress={handlePresentModalPress}
              activeOpacity={0.9}
              style={styles.container}>
              <Icon2 name="search" size={23} color={appColors.secondry} />

              <CustomText
                font="medium"
                style={{
                  color: appColors.blackText,
                  marginStart: 5,
                }}>
                Search for area, street name...
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.bottomSection,
            {paddingBottom: isWithinKanyakumari ? 12 : 18},
          ]}>
          {addressLoader ? (
            <View style={{height: '30%'}}>
              <AddressFatchingLoader />
            </View>
          ) : (
            <>
              {isWithinKanyakumari ? (
                <View>
                  <View style={{paddingHorizontal: 6, paddingVertical: 3}}>
                    <CustomText
                      font="bold"
                      style={{color: appColors.blackText, fontSize: 17}}>
                      Delivering your order to{' '}
                    </CustomText>
                    <View style={styles.addresscard}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '75%',
                          }}>
                          <MarkerIcon />
                          <View
                            style={{
                              marginStart: '4%',
                              width: '80%',
                            }}>
                            <CustomText
                              font="semibold"
                              style={styles.cardTitle}>
                              {splitAddressAtFirstComma(fullAddress)}
                            </CustomText>
                            {/* <CustomText style={styles.cardDesc}>
                              {searchedAddress?.addressDescription}
                            </CustomText> */}
                          </View>
                        </View>
                        <View style={{justifyContent: 'center'}}>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handlePresentModalPress}
                            style={{
                              borderWidth: 1,
                              borderColor: appColors.borderGray,
                              paddingHorizontal: 15,
                              borderRadius: 5,
                              paddingBottom: 3,
                            }}>
                            <CustomText
                              font="semibold"
                              style={{color: appColors.secondry}}>
                              Change
                            </CustomText>
                          </TouchableOpacity>
                        </View>
                      </View>
                      {/* <View style={{marginTop: 6}}>
                        <CustomText
                          style={{fontSize: 12, color: appColors.warning}}>
                          Pin location 65.8km away from your current location{' '}
                        </CustomText>
                      </View> */}
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleConferLocation}
                        style={[
                          styles.button,
                          {width: '95%', paddingVertical: 4},
                        ]}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <CustomText
                            font="semibold"
                            style={{color: appColors.background, fontSize: 16}}>
                            Confirm location
                          </CustomText>
                          <Icon3
                            name="arrow-right"
                            color={appColors.background}
                            size={35}
                            style={{marginStart: -8, marginTop: 6}}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingTop: '2%',
                    }}>
                    <Image
                      style={{height: 110, width: 110}}
                      source={require('../../assets/images/location_not_found.png')}
                    />
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <CustomText
                      font="bold"
                      style={{fontSize: 19, color: appColors.blackText}}>
                      Opps
                    </CustomText>
                    <CustomText font="medium" style={styles.errorText}>
                      Blinkit is not available at this location at the moment.
                      Please select a different location.
                    </CustomText>
                    <TouchableOpacity
                      onPress={handleGoToCureent}
                      activeOpacity={0.7}
                      style={styles.button}>
                      <CustomText
                        font="semibold"
                        style={{color: appColors.background}}>
                        Go to current location
                      </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handlePresentModalPress}
                      activeOpacity={0.7}
                      style={{marginTop: '2%'}}>
                      <CustomText
                        font="semibold"
                        style={{color: appColors.secondry}}>
                        Select location manually
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}
        </View>
        <View
          style={{
            height: 20,
            width: 20,
            position: 'absolute',
            left: '47%',
            top: '24%',
          }}>
          <CustomMarker />
        </View>
      </View>
      <MapBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        setModalVisible={setModalVisible}
        setSettingModelOpen={setOpenSetting}
        mapRef={mapRef}
      />
      <SettingOpenModel
        setSettingModelOpen={setOpenSetting}
        settingModelOpen={openSetting}
      />
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: appColors.background,
  },
  container: {
    elevation: 1,
    backgroundColor: appColors.background,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '3%',
    borderRadius: 8,
    paddingBottom: 12,
    paddingTop: 7,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: appColors.background,
    paddingBottom: '3%',
    paddingHorizontal: '3%',
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: appColors.blackText,
    marginStart: '28%',
    fontSize: 16,
    marginTop: -8,
  },
  searchBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 40,
    paddingHorizontal: '2%',
  },
  bottomSection: {
    backgroundColor: appColors.background,
  },
  errorText: {
    textAlign: 'center',
    width: '85%',
    fontSize: 15,
    color: appColors.blackText,
  },
  button: {
    backgroundColor: appColors.secondry,
    width: '90%',
    marginTop: '3%',
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
  },
  addresscard: {
    margin: 10,
    backgroundColor: appColors.cardBg,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: appColors.bottomSheetBg,
  },
  cardTitle: {
    color: appColors.blackText,
    fontSize: 15,
  },
  cardDesc: {
    color: appColors.blackText,
    fontSize: 12.5,
    opacity: 0.7,
  },
  notEnableTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 30,
    paddingHorizontal: '2%',
    backgroundColor: appColors?.background,
    paddingVertical: '2%',
  },
});

export default MapScreen;
