import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Searchbar } from 'react-native-paper';
import { UserContext } from '../context/UseContext';
import Slider from '../components/Slider';
const Service = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const { userInfo } = useContext(UserContext);
    const [filterServices, setfilterServices] = useState([]);

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
            bookName: book.bookName,
            detail: book.detail,
            author: book.author,
            publisher: book.publisher,
            imageUrl: book.imageUrl,
            categoryName: book.categoryName,
            count: book.count,
            bookId: book.id,
        });
    };

    const truncateText = (text, limit) => {
        if (text.length <= limit) return text;
        return text.substring(0, limit) + '...';
    };

    const handleSearch = (query) => {
        const filterData = services.filter((service) =>
            service.bookName.toLowerCase().includes(query.toLowerCase())
        );
        setfilterServices(filterData);
    };

    return (
      
        <View style={{ backgroundColor: 'white', height: '100%' }}>
         <View style={{ width: "95%", alignItems: 'center', alignSelf: 'center', margin: 10, }}>
                <Searchbar
                    style={styles.searchbar}
                    placeholder="Tìm kiếm sách..."
                    onChangeText={handleSearch}
                />
            </View>

         
           
            <ScrollView>
            <Slider></Slider>
                <View>
                    <Text style={styles.textheader}>Sách mới cập nhật</Text>
                    <FlatList
                        data={filterServices}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => handleDetails(item)} style={styles.item}>
                                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                    <Text style={styles.bookName}>{truncateText(item.bookName, 30)}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View>
                    <Text style={styles.textheader}>Sách đọc nhiều</Text>
                    <FlatList
                        data={filterServices}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => handleDetails(item)} style={styles.item}>
                                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                    <Text style={styles.bookName}>{truncateText(item.bookName, 30)}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>

                <View>
                    <Text style={styles.textheader}>Sách mượn nhiều</Text>
                    <FlatList
                        data={filterServices}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <TouchableOpacity onPress={() => handleDetails(item)} style={styles.item}>
                                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                                    <Text style={styles.bookName}>{truncateText(item.bookName, 30)}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    searchbar: {
        padding: 2,
        backgroundColor: 'transparent',
        margin: 0,
        height: 60,
        justifyContent: 'center',
        elevation: 20,
    shadowColor: '#52006A',
    

        
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    itemContainer: {
        width: 120,
        marginHorizontal: 5,
    },
    item: {
        borderColor: 'gray',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: 250,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        
    },
    bookName: {
        height:80,
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
    },
    textheader: {
        padding: 10,
        marginLeft: 10,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default Service;
