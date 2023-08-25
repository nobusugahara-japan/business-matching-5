import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react-native';
import Amplify, { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
// import config from './aws-exports';

// Amplify.configure(config);


const Account = () => {
    const [user, setUser] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        // 現在のユーザーを取得
        checkCurrentUser();
    }, []);

    const checkCurrentUser = async () => {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
        } catch (error) {
            console.log('ユーザーが登録されていません。', error);
            setUser(null);
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <View>
                    <Text>登録内容:</Text>
                    <Text>ユーザー名: {user.username}</Text>
                    <Button
                        title="ユーザー情報登録"
                        onPress={() => navigation.navigate('Register')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                    />
                </View>
            ) : (
                <Authenticator theme={myTheme} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const myTheme = {
    ...AmplifyTheme,
    // ここにカスタムテーマを追加/変更できます。
};

export default Account;
