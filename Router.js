import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Home from './Home/Home';

import Book from './Home/Books';
import AddBook from './Home/AddBook';
import DetailBook from './Home/DetailBook';
import EditBook from './Home/EditBook';
import AllBooks from './Home/AllBooks';
import CheckOutOrReturn from './Home/CheckOutOrReturn';
import Approve from './Home/Approve';

const Stack = createStackNavigator();

const Router = ({ navigation }) => {
  return (
    // <AddBook/>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="AddBook" component={AddBook} options={{ title: "Thêm sách" }}  />
      <Stack.Screen name="DetailsBook" component={DetailBook} options={{ title: "Chi tiết sách" }}  />
      <Stack.Screen name="EditBook" component={EditBook} options={{ title: "Chỉnh sửa sách" }}  />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="CheckOutOrReturn" component={CheckOutOrReturn} />
      <Stack.Screen name="Approve" component={Approve} />
      <Stack.Screen name="AllBooks" component={AllBooks} />


    </Stack.Navigator>


  );
}

const styles = StyleSheet.create({})

export default Router;
