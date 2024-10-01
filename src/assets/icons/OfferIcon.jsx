import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

const OfferIcon = props => (
  <View style={styles.svgContainer}>
    <Svg width={42} height={41} fill="none" {...props}>
      <G>
        <Path
          fill="#FF3269"
          d="M38.218 35.95c-1.336 1.41-3.628 1.616-5.292.265a4.053 4.053 0 0 0-5.277 0c-2.029 1.737-5.152 1.07-6.338-1.34a4.053 4.053 0 0 0-4.83-2.147c-2.562.765-5.145-1.12-5.202-3.78a4.053 4.053 0 0 0-3.53-3.914c-2.65-.343-4.252-2.91-3.227-5.214a4.053 4.053 0 0 0-1.63-5.013c-2.277-1.391-2.61-4.57-.672-6.42a4.053 4.053 0 0 0 .551-5.259A4.023 4.023 0 0 1 5.705 0h25.784c4.537 0 8.25 3.713 8.25 8.25v27.7Z"
        />
      </G>
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  svgContainer: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4, // For Android
  },
});

export default OfferIcon;
