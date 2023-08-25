import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image,RefreshControl, TextInput,TouchableOpacity  } from 'react-native';
import { Text, Card} from 'react-native-elements';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { listProfiles } from './graphql/queries';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppleStyleSwipeableRow from './components/AppleStylewipeableRow';
import { useNavigation } from '@react-navigation/native'; 

const Home = () => {
    const [searchText, setSearchText] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation(); 

    useEffect(() => {
        fetchProfiles();
      }, []);

    const fetchProfiles = async () => {
        try {
          const profileData = await API.graphql(graphqlOperation(listProfiles));
          const profileList = profileData.data.listProfiles.items;
          const augmentedProfileList = await Promise.all(
            profileList.map(async profile => {
              const imageUri = await Storage.get(profile.photoName);
              return { ...profile, imageUri };
            })
          );
    
          setProfiles(augmentedProfileList);
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      };

      const onRefresh = () => {
        setRefreshing(true);
        fetchProfiles().then(() => {
            setRefreshing(false);
        });
    };

    const handleSearch = async () => {
        try {
            const result = await API.graphql(graphqlOperation(listProfiles));
            
            const searchAttributes = ["name", "company", "expertize", "introduction", "offers", "needs", "description", "photoName"];
            
            const matchedProfiles = result.data.listProfiles.items.reduce((acc, profile) => {
                for (let attribute of searchAttributes) {
                    if (profile[attribute] && profile[attribute].includes(searchText)) {
                        acc.push(profile);
                        break;
                    }
                }
                return acc;
            }, []);
    
            const augmentedMatchedProfiles = await Promise.all(
                matchedProfiles.map(async profile => {
                    const imageUri = await Storage.get(profile.photoName);
                    return { ...profile, imageUri };
                })
            );
            
            setProfiles(augmentedMatchedProfiles);
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    };

    const resetSearch = () => {
        setSearchText(''); // 検索テキストをリセット
        fetchProfiles();
    };

    const handleResetSearch = () => {
        setSearchText(''); // TextInputの内容をリセット
        // ここで、全てのデータを取得またはフィルタリングせずに表示する処理を実施します
        fetchDataOrResetFilter(); 
    }
    

      return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1, padding: 10 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
       <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="検索キーワードを入力"
        />
         {searchText ? ( // searchTextが存在する場合にのみ表示
            <TouchableOpacity onPress={resetSearch} style={styles.resetIconContainer}>
                <Text style={styles.resetIcon}>✖︎</Text>
            </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={30} color="#000" />
        </TouchableOpacity>
      </View>
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <AppleStyleSwipeableRow key={index} profile={profile} navigation={navigation}  />
        ))
        ) : (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>now downloading...</Text>
        </View>
        )}
        </ScrollView>
      );
    };

    const styles = StyleSheet.create({
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
          fontSize: 16,
          marginTop: 5,
        },
        searchContainer: {
            flexDirection: 'row',
            marginBottom: 10
          },
          searchInput: {
            flex: 0.95,
            padding: 10,
            borderWidth: 1,
            borderColor: 'gray',
            marginRight: 10,
            marginLeft:20
          },
          searchButton: {
            backgroundColor: '#007BFF',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 5
          },
          highlightedText: {
            color: 'white'
          },
          emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          emptyText: {
            fontSize: 16,
            color: 'gray',
            textAlign: 'center',
          },
          inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1, // これがテキストボックスの境界線
            borderColor: '#ccc',
        },
        searchInput: {
            flex:1,
            borderWidth: 0, // TextInputの境界線を削除
            padding:10, // 必要に応じて調整
        },
        resetIconContainer: {
            padding: 10, // 必要に応じて調整
        },
        resetIcon: {
            fontSize: 18,
        }
      });

export default Home;
