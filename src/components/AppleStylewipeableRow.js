import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { Card, Button } from 'react-native-elements';
import { View, Image,StyleSheet, Text, Animated, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';

function AppleStyleSwipeableRow({ profile, navigation }) {
    let lastTap = null;
    const [isModalVisible, setModalVisible] = useState(false); 
    console.log(isModalVisible)
    
    const renderProfileModal = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
               <View style={styles.centeredView}>
                     <View style={styles.modalView}>
                        <View style={styles.modalHeader}>
                             <View style={styles.closeButton}>
                              <Icon name="times" size={30} color="black" onPress={() => setModalVisible(false)} />
                             </View>
                        </View>
                    <ScrollView>
                        <Text>Name: {profile.name}</Text>
                        <Text>MBA: {profile.school}</Text>
                        <Text>職業: {profile.company}</Text>
                        <Text>得意分野: {profile.expertize}</Text>
                        <Text>自己紹介: {profile.introduction}</Text>
                        <Text>提供できること: {profile.offers}</Text>
                        <Text>欲しいこと: {profile.needs}</Text>
                        <Text>その他一言: {profile.description}</Text>
                    </ScrollView>
                 </View>
                </View>
            </Modal>
        );
    };

    const handleTapAction = () => {
        setModalVisible(true); // モーダルを表示
    };

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [20, 0, 0, -1],
        });
    
        return (
            <View style={{ padding: 10, justifyContent: 'center', backgroundColor: 'lightgray'}}>
               <View style={styles.textBox}>
                    <Text>その人の繋がりグループなど</Text>
                </View>
            </View>
        );
    };
    

    const navigateToProfileDetail = () => {
        navigation.navigate('ProfileDetail', { profile });
    }
  
    return (
     <>
      {renderProfileModal()}
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity 
            onPress={handleTapAction} 
            onLongPress={handleTapAction} 
            activeOpacity={1}>
        <Card>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Divider />
          <View style={styles.user}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: profile.imageUri }}
            />
            <View style={styles.TextContainer}>
                <Text style={styles.name}>MBA:{profile.school}</Text>
                <Text style={styles.name}>職業:{profile.company}</Text>
                <Text style={styles.name}>得意分野:{profile.expertize}</Text>
            </View>
            <Icon name="arrow-right" size={30} color="#777" style={styles.swipeIcon} />
          </View>
          <View style={styles.buttonContainer}>
            <Button 
                title="Message"
                onPress={navigateToProfileDetail}
                containerStyle={styles.messageButtonContainer}
                buttonStyle={styles.messageButton}
            />
            <Button 
                title="Detail"
                onPress={handleTapAction}
                containerStyle={styles.messageButtonContainer}
                buttonStyle={styles.messageButton}
            />
          </View>
        </Card>
        </TouchableOpacity>
      </Swipeable>
     </>
    );
  }

  const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // This will give a semi-transparent background
      },
      modalView: {
        width: '80%', // This will make the modal 80% of the screen width
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation:5,
      },
      modalHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      closeButton: {
        padding: 5,
      },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(200, 200, 200, 1)', // 半透明の背景
        padding: 20,
    },
    swipeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        marginTop: -15
    },
    TextContainer: {
        flexDirection: 'column', 
      },
    container: {
      flex: 1,
      padding: 10,
    },
    user: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    image: {
      width: 100, // このサイズを適切に調整してください。
      height: 100,
      marginRight: 10,
    },
    name: {
      fontSize: 14,
      marginTop: 5,
      flexWrap: 'wrap',
    },
    rightAction: {
        backgroundColor: '#ffffe0',
        justifyContent: 'center',
        flex: 1,
      },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageButtonContainer: {
        marginTop: 10,
        alignItems: 'center', 
      },
    messageButton: {
        backgroundColor: '#007BFF',
        width: 120,
        borderRadius: 10,
        height:38,
      },
    textBox: {
        borderWidth: 1,  // 枠線の幅
        borderColor: 'black',  // 枠線の色
        padding: 10,  // テキストと枠線の間のスペース
        width: 200,  // ボックスの幅を200に設定
        marginBottom: 10,  // 各ボックスの間のマージン
        alignItems: 'center'  // テキストを中央に配置
    },
   })

  export default AppleStyleSwipeableRow;