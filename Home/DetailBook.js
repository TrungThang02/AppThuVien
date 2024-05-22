import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { UserContext } from '../context/UseContext';

const DetailBook = ({ route, navigation }) => {
  const { bookName, author, publisher, imageUrl, detail, categoryName, count } = route.params;
  const { userInfo } = useContext(UserContext);

  const OrderService = () => {
    // Implement your order functionality here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Tên sách:</Text>
        <Text style={styles.text}>{bookName}</Text>
        <Text style={styles.title}>Chi tiết sách:</Text>
        <Text style={styles.text}>{detail}</Text>
        <Text style={styles.title}>Tác giả:</Text>
        <Text style={styles.text}>{author}</Text>
        <Text style={styles.title}>Nhà xuất bản:</Text>
        <Text style={styles.text}>{publisher}</Text>
        <Text style={styles.title}>Thể loại:</Text>
        <Text style={styles.text}>{categoryName}</Text>
        <Text style={styles.title}>Số lượng sách:</Text>
        <Text style={styles.text}>{count + " " + "cuốn"}</Text>
      </View>

      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
     
      {userInfo.role !== 'admin' && (
        <TouchableOpacity
          onPress={OrderService}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Mượn sách</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#f44336",
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DetailBook;
