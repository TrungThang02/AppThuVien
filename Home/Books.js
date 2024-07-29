import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Pressable, Alert, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-virtualized-view'
import { UserProvider, UserContext } from '../context/UseContext';

const Service = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const { userInfo } = useContext(UserContext);
    const [filterServices, setfilterServices] = useState([]);
    const [book, setBook] = useState([]);
    const [detail, setDetail] = useState("");
    const [author, setAuthor] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [publisher, setPublisher] = useState("");
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const unsubscribe = firestore().collection('books').onSnapshot((snapshot) => {
            const servicesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setServices(servicesData);
            setfilterServices(servicesData);
        });

        return () => unsubscribe();
    }, []);

    const handleDetails = (book) => {
        navigation.navigate('DetailsService', {
            bookName:book.bookName,
            detail: book.detail,
            author: book.author,
            publisher: book.publisher,
            imageUrl: book.imageUrl,
            categoryName: book.categoryName,
            count: book.count,
            bookId: book.id, 
        });
    };

    const handleEdit = (book, categories) => {
        navigation.navigate('EditService', { 
          bookId: book.id, 
          categories 
        });
      };
      

    const handleDelete = async (service) => {
        try {
            Alert.alert(
                '',
                'Bạn chắc chứ?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Xóa',
                        onPress: async () => {
                            await firestore().collection('books').doc(service.id).delete();
                        },
                        style: 'destructive',
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error deleting service: ', error);
            Alert.alert('Error', 'An error occurred while deleting the service');
        }
    };

    const handleSearch = (query) => {
        const filterData = services.filter((service) =>
            service.serviceName.toLowerCase().includes(query.toLowerCase())
        );
        setfilterServices(filterData);
    };


    return (
        <View style={{backgroundColor:'#fff', height:'100%'}}>
             <View style={{flexDirection:'row', margin:5}}>
         
     
       </View>
            <View style={{ width: "95%", alignItems: 'center', alignSelf: 'center', margin: 10 }}>
                <Searchbar
                    style={{
                        ...styles.item,
                        padding: 2,
                        backgroundColor: 'transparent',
                        margin: 0,
                        height: 60,
                        justifyContent: 'center',
                    }}
                    placeholder="Tìm kiếm sách..."
                    onChangeText={handleSearch}
                />
            </View>
           
            <ScrollView>
                <FlatList
                    style={{ marginBottom: 150 }}
                    data={filterServices}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View style={styles.item}>
                                <TouchableOpacity 
                                onPress={() => handleDetails(item)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View>
                                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                        </View>
                                        <View style={{padding:10}}>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>Tên sách: {item.bookName}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>Nhà xuất bản: {item.publisher}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>Số lượng: {item.count}</Text>
                                        </View>
                                     
                                          {
                                           userInfo &&  userInfo.role === 'admin' &&(
                                                <View style={{ flexDirection: 'row' }}>
                                                
                                                
                                            </View>
                                            )
                                          }
                                       
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
       

    },
    item: {
        width: '100%',
        borderWidth: 1,
      
        height: 160,
        borderColor: 'gray',
        borderRadius: 10,
        justifyContent: 'center',
        
    },
    image: {
        width:150,
        height: 140,
        borderRadius: 10,
        marginLeft:10
      
      },
});

export default Service;
