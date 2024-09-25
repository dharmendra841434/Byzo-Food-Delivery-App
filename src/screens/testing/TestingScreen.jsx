// import React, {useCallback, useEffect, useMemo, useRef} from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Button,
//   StatusBar,
//   Keyboard,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
// import {SearchHandle} from '../../components/bottomsheet/SearchHandle';
// import {AddressList} from '../../components/bottomsheet/AddressList';
// import {
//   hideNavigationBar,
//   showNavigationBar,
// } from 'react-native-navigation-bar-color';

// const TestingScreen = () => {
//   const {height: SCREEN_HEIGHT} = Dimensions.get('window');
//   // hooks
//   const bottomSheetRef = useRef(null);
//   // variables
//   const snapPoints = useMemo(() => [50, SCREEN_HEIGHT * 0.95], [SCREEN_HEIGHT]);
//   const handleExpandPress = useCallback(() => {
//     hideNavigationBar();
//     bottomSheetRef.current?.expand();
//   }, []);
//   const handleClosePress = useCallback(() => {
//     bottomSheetRef.current?.close();
//   }, []);

//   // Backdrop component for the BottomSheet
//   const renderBackdrop = props => (
//     <TouchableWithoutFeedback
//       onPress={() => {
//         setTimeout(() => {
//           showNavigationBar();
//         }, 500);
//       }}>
//       <BottomSheetBackdrop {...props} disappearsOnIndex={-1} opacity={0.6} />
//     </TouchableWithoutFeedback>
//   );

//   // useEffect(() => {
//   //   showNavigationBar();
//   // }, []);

//   // renders
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="rgba(0,0,0,0)" translucent />
//       <View style={{marginTop: '15%'}}>
//         <Button title="Expand" onPress={handleExpandPress} />
//         <Button title="Close" onPress={handleClosePress} />
//       </View>
//       <BottomSheet
//         ref={bottomSheetRef}
//         snapPoints={snapPoints}
//         index={-1}
//         style={styles.sheetStyle}
//         backgroundStyle={{backgroundColor: '#e6ecf0'}}
//         backdropComponent={renderBackdrop} // Add backdrop
//         enableDynamicSizing={false}
//         enablePanDownToClose={true} // Allow closing by swiping down
//         keyboardBehavior="interactive"
//         keyboardBlurBehavior="restore"
//         handleComponent={() => (
//           <SearchHandle
//             handleCloseSheet={() => {}}
//             onPressCureentLocation={() => {}}
//             setSettingModelOpen={() => {}}
//           />
//         )}
//         onChange={index => {
//           //console.log(index, "current ind3x");
//           if (!index) {
//             handleClosePress();
//             Keyboard.dismiss();
//             showNavigationBar();
//           }
//         }}>
//         <AddressList />
//       </BottomSheet>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   sheetStyle: {
//     marginTop: '20%',
//     backgroundColor: 'red',
//     borderTopLeftRadius: 14,
//     borderTopRightRadius: 14,
//   },
// });

// export default TestingScreen;
import {View, Text} from 'react-native';
import React from 'react';

const TestingScreen = () => {
  return (
    <View>
      <Text>TestingScreen</Text>
    </View>
  );
};

export default TestingScreen;
