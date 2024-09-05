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
import {StatusBar, View} from 'react-native';

// ...
const ScrollTest = () => {
  const {
    collapse, // <-- Collapse header
    expand, // <-- Expand header
    scrollY, // <-- Animated scroll position. In case you need to do some animation in your header or somewhere else
  } = useCollapsibleContext();

  console.log(scrollY, 'ssjhhj');

  return (
    <CollapsibleContainer>
      <StatusBar backgroundColor="rgba(0,0,0,0)" translucent={true} />
      <View className="bg-pink-300 ">
        <CustomText>Notice</CustomText>
      </View>
      <CollapsibleHeaderContainer>
        <View className="bg-red-400 h-44 ">
          <CustomText>Header</CustomText>
        </View>
        {/* Your header view */}
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
  );
};

export default withCollapsibleContext(ScrollTest); // 5️⃣ (Required)wrap your component with `withCollapsibleContext`
