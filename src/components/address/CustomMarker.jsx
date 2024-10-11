import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import appColors from '../../utils/appColors';

const CustomMarker = ({onRegionChangeComplete}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false); // Hide tooltip after 1 second
    }, 1000);

    return () => clearTimeout(timer);
  }, [onRegionChangeComplete]);

  return (
    <View style={styles.marker}>
      {/* {showTooltip && <MarkerTooltip />} */}
      <View style={styles.constiner}>
        <View style={styles.whiteCircle} />
      </View>
      <View style={styles.tail} />
    </View>
  );
};

const styles = StyleSheet.create({
  constiner: {
    height: 27,
    width: 27,
    backgroundColor: appColors?.blackText,
    borderRadius: 100,
    padding: 8,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -60,
  },
  whiteCircle: {
    height: '100%',
    width: '100%',
    backgroundColor: appColors?.background,
    borderRadius: 100,
  },
  tail: {
    height: 20,
    width: 5.5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: appColors.blackText,
  },
});

export default CustomMarker;
