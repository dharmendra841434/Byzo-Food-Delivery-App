import React from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can use any icon library
import CustomText from './CustomText';
import appColors from '../utils/appColors';
import {useNavigation} from '@react-navigation/native';

export default function CustomHeader({title, showBackButton = true}) {
  const navigation = useNavigation();

  const onBackPress = () => navigation.goBack();
  return (
    <View style={styles.headerContainer}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="chevron-back-outline" size={20} color="black" />
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
    elevation: 3,
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
    fontSize: 16,
    color: appColors.blackText,
  },
});
