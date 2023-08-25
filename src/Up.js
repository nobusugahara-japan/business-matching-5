import { View,StyleSheet } from 'react-native';
import { Text} from 'react-native-elements';

function Up() {
    return (
     <View style={styles.centeredView}>
        <Text>投稿記事を記載する</Text>
        <Text>音声、動画なども</Text>
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

  export default Up;