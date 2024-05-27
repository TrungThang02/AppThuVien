import React, { useEffect, useState, useContext } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../context/UseContext';

const CheckOutOrReturn = ({ navigation }) => {
  const [checkouts, setCheckouts] = useState([]);
  const { userInfo } = useContext(UserContext);
  const userEmail = userInfo && userInfo.email ? userInfo.email : null; 
  console.log(userEmail);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const checkoutData = [];
        const snapshot = await firestore().collection('checkout').where('email', '==', userEmail).get();
      
        snapshot.forEach(doc => {
          const data = doc.data();
          const borrowTime = data.borrowTime.toDate(); 
          const checkoutInfo = {
            email: data.email,
            bookName: data.bookName,
            author: data.author,
            borrowTime: borrowTime.toLocaleString(), 
            borrowCode: data.borrowCode,
            status: data.status
          };
          checkoutData.push(checkoutInfo);
        });
        console.log(checkoutData); 
        setCheckouts(checkoutData);
      } catch (error) {
        console.error('Error fetching checkouts: ', error);
      }
    };
    

    if (userEmail) {
      fetchCheckouts();
    }
  }, [userEmail]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>Tên sách: {item.bookName}</Text>
      <Text style={styles.text}>Tác giả: {item.author}</Text>
      <Text style={styles.text}>Thời gian mượn: {item.borrowTime}</Text>
      <Text style={styles.text}>Code: {item.borrowCode}</Text>
    </View>
  );

  return (
    <FlatList
      data={checkouts}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: '#F0F0F0', 
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 13,
    marginBottom: 5,
    color:'#333'
  },
});

export default CheckOutOrReturn;
