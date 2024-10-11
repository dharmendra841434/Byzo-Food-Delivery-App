import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from './CustomText';
import appColors from '../utils/appColors';
import {useNavigation} from '@react-navigation/native';
import {setIsOpenDrawer} from '../store/userSlice';
import {useDispatch} from 'react-redux';
import CustomIcons from './CustomIcons';
import {AppIcons} from '../utils/constent';

export default function CustomHeader({
  title,
  showBackButton = true,
  isElivation = true,
  isBack = true,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onBackPress = () => {
    if (isBack) {
      navigation.goBack();
    } else {
      dispatch(dispatch(setIsOpenDrawer(false)));
    }
  };
  return (
    <View style={[styles.headerContainer, {elevation: isElivation ? 3 : 0}]}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <CustomIcons icon={AppIcons?.backIcon} color={appColors?.blackText} />
        </TouchableOpacity>
      )}
      <CustomText font="semibold" style={styles.headerTitle}>
        {title}
      </CustomText>
      <View style={{width: 40}} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: '3%',
    backgroundColor: appColors.background,
    borderBottomWidth: 0.6,
    borderBottomColor: '#ddd',
    paddingBottom: '3%',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: appColors.blackText,
  },
});
