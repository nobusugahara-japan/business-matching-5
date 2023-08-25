
import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {
  withAuthenticator,
  useAuthenticator,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Register from './src/Register';
import Account from "./src/Account";
import Group from "./src/Group";
import Feed from "./src/Feed";
import Up from "./src/Up";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProfileDetail from "./src/ProfileDetail";
import Icon from 'react-native-vector-icons/FontAwesome5';


Amplify.configure(awsExports);

const userSelector = (context) => [context.user];
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  if (!user) return null;
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, {user.username}! Click here to sign out!
      </Text>
    </Pressable>
  );
};

// const TabNavigator = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Home" component={Home} />
//     <Tab.Screen name="Feed" component={Feed} />
//     <Tab.Screen name="Up" component={Up} />
//     <Tab.Screen name="Account" component={Account} />
//   </Tab.Navigator>
// );

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Group') {
          iconName = 'users';
        } else if (route.name === 'Feed') {
          iconName = 'rss-square';
        } else if (route.name === 'Up') {
          iconName = 'plus';
        } else if (route.name === 'Account') {
          iconName = 'user';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Group" component={Group} />
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="Up" component={Up} />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);


const App = () => {
  console.log("✅")
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetail} /> 
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {width: 400, flex: 1, padding: 20, alignSelf: 'center'},
  todo: {marginBottom: 15},
  input: {backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  todoName: {fontSize: 20, fontWeight: 'bold'},
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 8,
  },
  buttonText: {color: 'white', padding: 16, fontSize: 18},
});