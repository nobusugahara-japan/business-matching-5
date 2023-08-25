import { View,StyleSheet } from 'react-native';
import { Text} from 'react-native-elements';

function ProfileDetail({ route }) {
    const { profile } = route.params; 
    return (
     <View style={styles.centeredView}>
        <Text>プロフィールの詳細を記載する</Text>
        <Text>メッセージボックスを作成する</Text>
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
  
export default ProfileDetail;