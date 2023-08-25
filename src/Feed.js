import { View,StyleSheet } from 'react-native';
import { Text} from 'react-native-elements';

function Feed() {
    return (
     <View style={styles.centeredView}>
        <Text>Feedを流す</Text>
        <Text>音声、短い動画なども</Text>
     </View>
    );
  };

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center', // 垂直方向に中央に配置
      alignItems: 'center',     // 水平方向に中央に配置
    },
  });

  export default Feed;