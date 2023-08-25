import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { listProfiles } from './graphql/queries';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSearch = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listProfiles));
  
      const searchAttributes = ["name", "company", "expertize", "introduction", "offers", "needs", "description"];
  
      const matchedProfiles = result.data.listProfiles.items.reduce((acc, profile) => {
        for (let attribute of searchAttributes) {
          if (profile[attribute] && profile[attribute].includes(searchText)) {
            acc.push({
              ...profile,
              matchedAttribute: attribute
            });
            break;
          }
        }
        return acc;
      }, []);
  
      setProfiles(matchedProfiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };
  
  console.log(profiles)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="フリーワード検索"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
      <Text style={styles.highlightedText}>検索</Text>
      </TouchableOpacity>

      {profiles.map(profile => (
        <TouchableOpacity key={profile.id} onPress={() => setSelectedProfile(profile)}>
           <Text>{profile.name}:{profile[profile.matchedAttribute]}</Text>
        </TouchableOpacity>
      ))}

      {selectedProfile && (
        <Modal
          visible={true}
          onRequestClose={() => setSelectedProfile(null)}
        >
          <View style={styles.modalContainer}>
            <Text>{selectedProfile.name}</Text>
            <Text>背景:{selectedProfile.company}</Text>
            <Text>得意分野:{selectedProfile.expertize}</Text>
            <Text>自己紹介:{selectedProfile.introduction}</Text>
            <Text>提供できます:{selectedProfile.offers}</Text>
            <Text>これが欲しい:{selectedProfile.needs}</Text>
            <Text>他に一言:{selectedProfile.description}</Text>
            {/* ... Add other details here ... */}
            <TouchableOpacity onPress={() => setSelectedProfile(null)} style={styles.closeButton}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>✖️</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 150, 
  },
  input: {
    width: 300,
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 216, 230, 0.3)', // 薄いブルー
    marginVertical: '70%', // 上下30%を空ける
    marginTop:'50%',
    marginBottom:'70%',
    marginHorizontal: '10%', // 左右10%を空ける
    padding: 20, // 内部のパディング
    borderRadius: 10, // 角を少し丸くする
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#2196F3', // 色を変更します。
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute', // 右上に配置するための絶対配置
    top: 10,
    right: 10,
    padding: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white', // テキスト色を白に
    fontSize: 18,
  },
});

export default Search;
