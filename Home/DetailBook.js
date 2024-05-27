import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { UserContext } from '../context/UseContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DetailBook = ({ route, navigation }) => {
  const { bookName, author, publisher, imageUrl, detail, categoryName, count, bookId } = route.params; // Assume bookId is passed as well
  const { userInfo } = useContext(UserContext);

  const generateBorrowCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const CheckOut = () => {
    Alert.alert(
      'Xác nhận mượn sách',
      'Bạn có chắc chắn muốn mượn cuốn sách này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Mượn',
          onPress: async () => {
            try {
              const bookRef = firestore().collection('books').doc(bookId);
              const bookDoc = await bookRef.get();

              if (!bookDoc.exists) {
                Alert.alert('Lỗi', 'Cuốn sách không tồn tại.');
                return;
              }

              const currentCount = bookDoc.data().count;

              if (currentCount <= 0) {
                Alert.alert('Lỗi', 'Không còn sách để mượn.');
                return;
              }

              const borrowCode = generateBorrowCode();
              const borrowTime = new Date();

      
              await firestore().runTransaction(async (transaction) => {
                const updatedBookDoc = await transaction.get(bookRef);

                if (!updatedBookDoc.exists) {
                  throw 'Cuốn sách không tồn tại.';
                }

                const updatedCount = updatedBookDoc.data().count;

                if (updatedCount <= 0) {
                  throw 'Không còn sách để mượn.';
                }

              
                transaction.set(firestore().collection('checkout').doc(), {
                  email: userInfo.email,
                  bookName: bookName,
                  author: author,
                  borrowTime: borrowTime,
                  borrowCode: borrowCode,
                  status: false
                });

                transaction.update(bookRef, {
                  count: updatedCount - 1,
                });
              });

              Alert.alert('Thành công', 'Bạn đã mượn sách thành công.');
            } catch (error) {
              console.error(error);
              Alert.alert('Lỗi', `Đã xảy ra lỗi khi mượn sách: ${error}`);
            }
          },
        },
      ],
      { cancelable: false }
    );
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

      <Image source={{ uri: imageUrl }} style={styles.image} />

      {userInfo && userInfo.role !== 'admin' && (
        <TouchableOpacity onPress={CheckOut} style={styles.button}>
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
