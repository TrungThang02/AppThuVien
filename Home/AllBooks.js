import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AllBooks = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = firestore()
            .collection('books')
            .onSnapshot(snapshot => {
                const booksData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBooks(booksData);
            });
        return () => fetchBooks();
    }, []);

    const handleDetails = (book) => {
        navigation.navigate('DetailsBook', {
            audioUrl: book.audioUrl,
            bookName: book.title,
            detail: book.description,
            author: book.author,
            publisher: book.publisher,
            imageUrl: book.coverImage,
            categoryName: book.category,
            count: book.quantity,
            bookId: book.id,
        });
    };

    const renderBookItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleDetails(item)}>
            <Image source={{ uri: item.coverImage }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookAuthor}>Tác giả: {item.author}</Text>
                <Text style={styles.bookStatus}>Tình trạng: {item.status}</Text>
                <Text style={styles.bookChapters}>Số chương: {item.pageCount}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={renderBookItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: 8,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    bookAuthor: {
        fontSize: 14,
        color: '#777',
    },
    bookStatus: {
        fontSize: 14,
        color: '#777',
    },
    bookChapters: {
        fontSize: 14,
        color: '#777',
    },
});

export default AllBooks;
