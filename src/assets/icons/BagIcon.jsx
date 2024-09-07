import React from 'react';
import {Svg, Path} from 'react-native-svg';

const BagIcon = ({width = 50, height = 50, color = '#FFFFFF'}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    {/* The bag shape */}
    <Path
      d="M4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7Z"
      fill={color}
    />
    {/* Left bottle shape */}
    <Path
      d="M8 3C8 2.44772 8.44772 2 9 2C9.55228 2 10 2.44772 10 3V6C10 6.55228 9.55228 7 9 7C8.44772 7 8 6.55228 8 6V3Z"
      fill={color}
    />
    {/* Right bottle shape */}
    <Path
      d="M14 3C14 2.44772 14.4477 2 15 2C15.5523 2 16 2.44772 16 3V6C16 6.55228 15.5523 7 15 7C14.4477 7 14 6.55228 14 6V3Z"
      fill={color}
    />
    {/* Right bottle top */}
    <Path
      d="M15 1C15 0.447715 15.4477 0 16 0C16.5523 0 17 0.447715 17 1V2C17 2.55228 16.5523 3 16 3C15.4477 3 15 2.55228 15 2V1Z"
      fill={color}
    />
  </Svg>
);

export default BagIcon;
