import { View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeView = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      paddingTop: insets.top,
      backgroundColor:"#fff",
      //paddingLeft: insets.left,
      //paddingRight: insets.right,
      flex: 1,
    }}>
      {children}
    </View>
  );
};

export default SafeView;