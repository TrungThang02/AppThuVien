import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';
import Slider from '../components/Slider';
import Search from '../components/Search';
import Icon from 'react-native-vector-icons/FontAwesome';
const Book = ({ navigation }) => {
    const [Books, setBooks] = useState([]);
    const { userInfo } = useContext(UserContext);
    const [filterBooks, setfilterBooks] = useState([]);
    const [selectedGender, setSelectedGender] = useState('nam');

    useEffect(() => {
        const unsubscribe = firestore().collection('books').onSnapshot((snapshot) => {
            const BooksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBooks(BooksData);
            setfilterBooks(BooksData);
        });
        return () => unsubscribe();
    }, []);

    const handleDetails = (book) => {
        navigation.navigate('DetailsBook', {
            audioUrl: "https://firebasestorage.googleapis.com/v0/b/appthuvien-e72bc.appspot.com/o/audio%2Fy2mate.com%20-%20G%E1%BA%A5u%20c%C3%B4%20h%E1%BB%93n%20H%E1%BB%92I%20%E1%BB%A8C%20V%E1%BB%80%20B%C3%80%20%20Ho%E1%BA%A1t%20h%C3%ACnh%20g%E1%BA%A5u%20h%C3%A0i%20h%C6%B0%E1%BB%A1c%20trung%20qu%E1%BB%91c.mp3?alt=media&token=4ebe7de3-9163-4c2b-837e-ea3e7a728fc7",
            bookName: book.title,
            detail: book.description,
            author: "Cao Văn Hiệp",
            publisher: "Kim Đồng",
            imageUrl: book.coverImage,
            categoryName: "Lịch sử",
            count: book.quantity,
            bookId: book.id,
        });
    };

    const truncateText = (text, limit) => {
        if (typeof text !== 'string' || text.length <= limit) return text;
        return text.substring(0, limit) + '...';
    };


    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={{ width: "95%", alignItems: 'center', alignSelf: 'center', margin: 10 }}>
                <Search />
            </View>

            <ScrollView>
                <Slider />

                <View style={styles.categories}>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Thể loại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Xếp hạng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Bộ lọc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Tin tức</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.textheader}>Sách mới cập nhật</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AllBooks')}>
                        <Text style={{...styles.arrow, marginRight:20}}> <Icon name="chevron-right" size={15} style={{ color: "black" }} /></Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filterBooks}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => handleDetails(item)} style={styles.item}>
                                <Image source={{ uri: item.coverImage }} style={styles.image} />
                                <Text style={styles.bookName}>{truncateText(item.title || '', 30)}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />

                <View style={styles.headerContainer}>
                    <Text style={styles.textheader}>Sách đọc nhiều</Text>
                </View>
                <FlatList
                    data={filterBooks}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => handleDetails(item)} style={styles.item}>
                                <Image source={{ uri: item.coverImage }} style={styles.image} />
                                <Text style={styles.bookName}>{truncateText(item.title || '', 30)}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />

                <View style={styles.headerContainer}>
                    <Text style={styles.textheader}>Sách mượn nhiều</Text>
                </View>
                <FlatList
                    data={filterBooks}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => handleDetails(item)} style={styles.item}>
                                <Image source={{ uri: item.coverImage }} style={styles.image} />
                                <Text style={styles.bookName}>{truncateText(item.title || '', 30)}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContainer}
                />

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
        height: 80,
        marginTop: 10,
        fontSize: 15,
        textAlign: 'center',
        color: 'black',
    },
    textheader: {
        padding: 10,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 20,
        color: 'black',
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    categoryButton: {
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default Book;
