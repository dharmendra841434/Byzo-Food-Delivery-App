import {View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import appColors from '../utils/appColors';
import RightDrawer from './RightDrawer';
import CategoryStack from './CategoryStack';
import CartStack from './CartStack';
import appFonts from '../utils/appFonts';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          height: 60,
          paddingTop: 7,
          display: 'flex',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 10,
          fontFamily: appFonts?.bold,
          backgroundColor: 'rgba(0,0,0,0)',
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.blackText,
      }}>
      <Tab.Screen
        name="Home"
        component={RightDrawer}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={25}
              color={focused ? appColors.primary : appColors.blackText}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'grid' : 'grid-outline'}
              size={25}
              color={focused ? appColors.primary : appColors.blackText}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name={focused ? 'cart' : 'cart-outline'}
                size={25}
                color={focused ? appColors.primary : appColors.blackText}
              />
              {/* {cartItems?.length > 0 && (
                <View
                  style={{
                    backgroundColor: appColors.primary,
                    position: 'absolute',
                    height: 20,
                    width: 20,
                    borderRadius: 20,
                    right: -15,
                    top: -5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: appColors.appWhite,
                      fontFamily: appFonts.PoppinsMedium,
                    }}>
                    {cartItems?.length}
                  </Text>
                </View>
              )} */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
