import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Button,
  Image,
} from 'react-native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createProfile } from './graphql/mutations';
import { v4 as uuidv4 } from 'uuid';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const initialFormState = {
    id: uuidv4(),
    name: '', 
    company: '',
    expertize: '',
    introduction: '',
    offers: '',
    needs: '',
    description: '',
    photoName: ''
};

const Register = () => {
  const [formState, setFormState] = useState(initialFormState);
  const [photoUri, setPhotoUri] = useState(null);


  function setInput(key, value) {
    setFormState({...formState, [key]: value});
  }

  async function addProfile() {
    try {
      if (!formState.name || !formState.description) return;
      if (photoUri) {
        const photoName = `${uuidv4()}.jpg`;
        const response = await fetch(photoUri);
        const blob = await response.blob();
        await Storage.put(photoName, blob, {
            contentType: 'image/jpeg',
          });
        formState.photoName = photoName;
      }
      await API.graphql(graphqlOperation(createProfile, {input: formState}));
      setFormState(initialFormState);
      setPhotoUri(null); 
    } catch (err) {
      console.log('error creating profile:', err);
    }
  }
  
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
    <TextInput
        onChangeText={value => setInput('name', value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
    />
    <TextInput
        onChangeText={value => setInput('company', value)}
        style={styles.input}
        value={formState.company}
        placeholder="Company"
    />
    <TextInput
        onChangeText={value => setInput('expertize', value)}
        style={styles.input}
        value={formState.expertize}
        placeholder="Expertize"
    />
    <TextInput
        onChangeText={value => setInput('introduction', value)}
        style={styles.input}
        value={formState.introduction}
        placeholder="Introduction"
    />
    <TextInput
        onChangeText={value => setInput('offers', value)}
        style={styles.input}
        value={formState.offers}
        placeholder="Offers"
    />
    <TextInput
        onChangeText={value => setInput('needs', value)}
        style={styles.input}
        value={formState.needs}
        placeholder="Needs"
    />
    <TextInput
        onChangeText={value => setInput('description', value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
    />
   <Button title="Pick an image" onPress={pickImage} />
    {photoUri && <Image source={{ uri: photoUri }} style={styles.imageStyle} />}
    <Pressable onPress={addProfile} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Create Profile</Text>
    </Pressable>
    </ScrollView>
  );
};
export default Register;

const styles = StyleSheet.create({
    imageStyle: {
        width: 150,     // 画像の幅を変更
        height: 150,    // 画像の高さを変更
        alignSelf: 'center', // 画像を中央に配置
        marginVertical: 20,  // 上下の余白を追加
      },
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