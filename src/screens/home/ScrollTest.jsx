import {
  CollapsibleContainer,
  CollapsibleFlatList,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  StickyView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';

import {dummy} from '../../utils/constent';
import CustomText from '../../components/CustomText';
import {StatusBar, View, Animated as RNAnimated} from 'react-native';
import NoticeAnimation from '../../components/home/testHome/NoticeAnimation';
import {NoticeHeight} from '../../utils/scaling';
import {useEffect, useRef} from 'react';
import appColors from '../../utils/appColors';
import Visuals from '../../components/home/testHome/Visuals';
import TopBarSection from '../../components/home/TopBarSection';

// ...
const ScrollTest = () => {
  const {
    collapse, // <-- Collapse header
    expand, // <-- Expand header
    scrollY, // <-- Animated scroll position. In case you need to do some animation in your header or somewhere else
  } = useCollapsibleContext();

  const NOTICE_HEIGHT = -(NoticeHeight + 20);

  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 40,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <StatusBar backgroundColor={appColors.background} translucent={false} />
      <Visuals />
      <CollapsibleContainer>
        <StatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />

        <CollapsibleHeaderContainer>
          <View style={{backgroundColor: appColors?.topSectionBg, height: 140}}>
            <TopBarSection />
            {/* Your header view */}
          </View>
          <StickyView>
            <View className="h-24 bg-green-500">
              <CustomText>sEARCH BAR</CustomText>
            </View>
          </StickyView>
        </CollapsibleHeaderContainer>
        <CollapsibleFlatList // 4️⃣ (Required) Your FlatList/ScrollView
          data={dummy}
          keyExtractor={(iten, idx) => idx}
          renderItem={({item}) => (
            <View key={item}>
              <CustomText>{item}</CustomText>
            </View>
          )}
          headerSnappable={false} // <-- should header auto snap when you release the finger
        />
      </CollapsibleContainer>
    </NoticeAnimation>
  );
};

export default withCollapsibleContext(ScrollTest); // 5️⃣ (Required)wrap your component with `withCollapsibleContext`
