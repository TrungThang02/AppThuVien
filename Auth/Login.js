import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Input, Button, Icon, Text } from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../context/UseContext';

import logo from '../assets/tdmulogo.jpg';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { loginUser } = useContext(UserContext);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        if (email && pass) {
            loginUser(email, pass)
                .then(() => {
                    setEmail("");
                    setPass("");
                    navigation.navigate("Home");
                })
                .catch(error => {
                    Alert.alert("Lỗi", error.message);
                });
        } else {
            Alert.alert("", "Vui lòng nhập email và mật khẩu!");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.logo}
                    source={logo}
                />
                <Text style={styles.title}>THƯ VIỆN SỐ ĐẠI HỌC THỦ DẦU MỘT</Text>
            </View>


            <View style={styles.formContainer}>
            <View style={styles.bgform}>

                <Input
                    placeholder="Nhập vào Email"
                    value={email}
                    onChangeText={setEmail}
                    leftIcon={{ type: 'font-awesome', name: 'envelope',color: 'white' }}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    placeholderTextColor="white"
      
     
                />
                <Input
                    placeholder="Nhập vào Password"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry={!showPassword}
                    leftIcon={{ type: 'font-awesome', name: 'lock',color: 'white' }}
                    placeholderTextColor="white"
                    rightIcon={
                        <Icon
                            type='font-awesome'
                            name={showPassword ? 'eye' : 'eye-slash'}
                            onPress={toggleShowPassword}
                        />
                    }
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                />
                <Button
                    title="Đăng nhập"
                    onPress={handleLogin}
                    buttonStyle={styles.loginButton}
                    titleStyle={styles.buttonTitle}
                />
                <Button
                    title="Đăng ký"
                    onPress={() => navigation.navigate("SignUp")}
                    buttonStyle={styles.signupButton}
                    titleStyle={styles.buttonTitle}
                    containerStyle={styles.buttonContainer}
                />
            </View>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '80%',
        height: 250,
        resizeMode: 'contain',
        marginBottom: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
       
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',

      

        backgroundColor: '#007bff', 
        borderRadius: 30,
        borderBottomEndRadius:0, 
        borderBottomStartRadius:0, 
        shadowColor: '#333',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 4,
        elevation: 8, 
    },
    bgform:{
        marginHorizontal: 30, 
        marginBottom:10
        
    },
    inputContainer: {
        marginBottom: 15,
        color: 'white',
    },
    input: {
        fontSize: 16,
        color: 'white',
      
    },
    loginButton: {
        backgroundColor: "#2284ff",
        borderRadius: 10,
        paddingVertical: 15,
        marginBottom: 10,
    },
    signupButton: {
        backgroundColor: "#4CAF50",
        borderRadius: 10,
        paddingVertical: 15,
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 10,
    },
});

export default Login;
