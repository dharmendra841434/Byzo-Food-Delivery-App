import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const TestScreen = () => {
  // state for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(true);

  // ref for modal
  const bottomSheetModalRef = React.useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // Effect to open or close modal based on state
  React.useEffect(() => {
    if (isModalOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isModalOpen]);

  console.log(isModalOpen, 'is open');

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button onPress={openModal} title="Open Modal" color="black" />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Button onPress={closeModal} title="Close Modal" color="red" />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TestScreen;
