import { View,StyleSheet } from 'react-native';
import { Text} from 'react-native-elements';

function Group() {
    return (
     <View style={styles.centeredView}>
        <Text>いろいろなグループ</Text>
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
  
export default Group;