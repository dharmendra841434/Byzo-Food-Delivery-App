import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React from 'react';
import CustomText from '../CustomText';
import appColors from '../../utils/appColors';
import {addEllipsis, isWithinTimeRange} from '../../utils/helperfun';
import person from '../../assets/images/person.png';
import {useDispatch} from 'react-redux';
import {setIsOpenDrawer} from '../../store/userSlice';
import {useNavigation} from '@react-navigation/native';
import CustomIcons from '../CustomIcons';
import {AppIcons} from '../../utils/constent';

const TopBarSection = ({
  address,
  opacity,
  handleKnowMore,
  handleChangeAddress,
}) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  return (
    <Animated.View
      style={{
        paddingBottom: '2%',
        width: '100%',
        height: '100%',
      }}>
      <Animated.View style={[styles.conatiner, {opacity: opacity}]}>
        <View>
          <CustomText font="semibold" style={{color: appColors?.background}}>
            {isWithinTimeRange()
              ? 'Delivery in'
              : 'Please come back at 7:00 am'}
          </CustomText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText
              font="extraBold"
              style={{
                color: appColors?.background,
                fontSize: 28,
                marginTop: -9,
              }}>
              {isWithinTimeRange() ? '10 minutes' : 'Store closed'}
            </CustomText>
            {isWithinTimeRange() && (
              <TouchableOpacity onPress={handleKnowMore} style={styles.know}>
                <View
                  style={{
                    backgroundColor: appColors?.closeButton,
                    borderRadius: 100,
                    padding: 2,
                  }}>
                  <CustomIcons
                    icon={AppIcons?.flash}
                    size={11}
                    color={appColors?.background}
                  />
                </View>
                <CustomText
                  style={{
                    fontSize: 11,
                    color: appColors.background,
                    marginBottom: 5,
                  }}>
                  Know more
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleChangeAddress}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText
              style={{color: appColors?.background, marginTop: -5}}
              numberOfLines={1} // Limit text to one line
              ellipsizeMode="tail">
              {addEllipsis(address, 30)}
            </CustomText>
            <CustomIcons
              icon={AppIcons?.downfillArrow}
              size={17}
              color={appColors.background}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => dispatch(setIsOpenDrawer(true))}>
          <Image
            style={{width: 40, height: 40}}
            source={person}
            tintColor={appColors.background}
          />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '12%',
    paddingHorizontal: '3%',
    justifyContent: 'space-between',
  },
  know: {
    backgroundColor: appColors.mediumWhite,
    borderRadius: 12,
    paddingHorizontal: 5,
    alignItems: 'center',
    marginStart: '1%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
});

export default TopBarSection;
