import {View, Text, PermissionsAndroid, StatusBar} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AddressBottomSheetModal from '../../components/address/AddressBottomSheetModal';
import appColors from '../../utils/appColors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fatchUserAddress, setLocationPermission} from '../../store/mapSlice';

const HomeScreen = () => {
  const bottomSheetModalRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [settingModelOpen, setSettingModelOpen] = useState(false);
  const isWithinKanyakumari = useSelector(
    state => state?.map?.isWithinKanyakumari,
  );
  const locationPermission = useSelector(
    state => state?.map?.locationPermission,
  );
  const loader = useSelector(state => state?.map?.addressLoader);
  const dispatch = useDispatch();
  const fullAddress = useSelector(state => state?.map?.fullAddress);
  const navigation = useNavigation();
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const enableLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      dispatch(setLocationPermission('granted'));
      dispatch(fatchUserAddress());
    } else {
      setSettingModelOpen(true);
    }
  };

  useEffect(() => {
    console.log(isWithinKanyakumari, 'location permission');
    if (locationPermission === 'granted' && !isWithinKanyakumari) {
      navigation.goBack();
    } else {
      bottomSheetModalRef.current?.close();
    }
    if (locationPermission === 'denied') {
      handlePresentModalPress();
    }
  }, [loader]);

  //console.log(loader);

  return (
    <BottomSheetModalProvider>
      <StatusBar
        backgroundColor={
          modalVisible ? 'rgba(0,0,0,0.7)' : appColors.background
        }
      />
      <View>
        <Text>Allow location :</Text>
      </View>
      <AddressBottomSheetModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleClose={() => console.log('close')}
        setModalVisible={setModalVisible}
        keyboardVisible={keyboardVisible}
        handleEnableLocation={enableLocation}
        settingModelOpen={settingModelOpen}
        setSettingModelOpen={setSettingModelOpen}
        loader={loader}
      />
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;
