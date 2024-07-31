import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
const Search = () => {
    const [services, setServices] = useState([]);
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


    const handleSearch = (query) => {
        const filterData = services.filter((service) =>
            service.bookName.toLowerCase().includes(query.toLowerCase())
        );
        setfilterServices(filterData);
    };
    return (
       <>
        <Searchbar
                    style={styles.searchbar}
                    placeholder="Tìm kiếm sách..."
                    onChangeText={handleSearch}
                />
       </>
    );
}

const styles = StyleSheet.create({
    searchbar: {
        padding: 2,
        backgroundColor: 'transparent',
        margin: 0,
        height: 60,
        justifyContent: 'center',
    },
})

export default Search;
