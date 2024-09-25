import React, {useState, useEffect, useRef} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import CustomBottomSheet2 from '../../components/bottomsheet/CustomBottomSheet';

const TestScreen = () => {
  const [loader, setLoader] = useState(true); // Loader state initially set to true
  const bottomSheetRef = useRef(null); // Reference to BottomSheet
  // Toggle loader state for testing
  const toggleLoader = () => {
    setLoader(prev => !prev);
  };
  // Open the sheet when loader is true
  useEffect(() => {
    if (loader) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [loader]);

  return (
    <View style={styles.container}>
      <Button title="Toggle Loader" onPress={toggleLoader} />

      <CustomBottomSheet2
        bottomSheetRef={bottomSheetRef}
        initialIndex={loader ? 1 : -1}
        setModalState={setLoader}>
        {/* Pass the content inside the sheet */}
        <View style={styles.sheetContent}>
          {/* You can add loader or other content here */}
          <Button title="Close Sheet" onPress={() => setLoader(false)} />
        </View>
      </CustomBottomSheet2>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestScreen;
