import React from 'react';
import {Drawer} from 'react-native-drawer-layout';
import HomeStack from './HomeStack';
import DrawerContent from './DrawerContent';
import {useDispatch, useSelector} from 'react-redux';
import {setIsOpenDrawer} from '../store/userSlice';

const RightDrawer = () => {
  const isOpenDrawer = useSelector(state => state?.user?.isOpenDrawer);
  const dispatch = useDispatch();
  return (
    <Drawer
      open={isOpenDrawer}
      onOpen={() => dispatch(setIsOpenDrawer(true))}
      onClose={() => dispatch(setIsOpenDrawer(false))}
      drawerPosition="right"
      overlayStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}}
      drawerStyle={{
        width: '100%',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
      }}
      renderDrawerContent={() => (
        <>
          <DrawerContent />
        </>
      )}>
      <HomeStack />
    </Drawer>
  );
};

export default RightDrawer;
