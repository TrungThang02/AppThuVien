import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, Pressable, Text, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UseContext';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [showPassword, setShowPassword] = useState(false);
    let { loginUser } = useContext(UserContext);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const HandleLogin = () => {
        if (pass != null || email != null || pass != "" || email != "") {
            loginUser(email, pass);
            setEmail("");
            setPass("");
            navigation.navigate("Home");
        } else {
            Alert.alert("", "Please enter mail or password !");
        }

    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', margin: 10, borderRadius: 20 }}>
            <View style={{alignItems:'center'}}>
            <Image
                style={styles.tinyLogo}
                source={{
                    uri: 'https://www.louisvillelibrary.org/sites/default/files/Louisville%20Public%20Library%20Logo_0.png',
                }}
            />
   </View>
            <TextInput
                style={{ ...styles.TextInput, margin: 10, borderRadius: 10 }}
                label="Nhập vào Email"
                value={email}
                underlineColor='transparent'
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                style={{ ...styles.TextInput, margin: 10, borderRadius: 10 }}
                label="Nhập vào Password"
                value={pass}
                underlineColor='transparent'
                onChangeText={pass => setPass(pass)}
                secureTextEntry={!showPassword}
                right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={toggleShowPassword} />}
            />

            <View style={{ justifyContent: 'center', padding: 10 }}>
                <Pressable
                    style={{
                        backgroundColor: "#2284ff",
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 10,
                    }}
                    onPress={HandleLogin}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Đăng nhập</Text>
                </Pressable>
                {/* <Pressable
                    onPress={
                        () => onGoogleButtonPress()
                            .then(() => {
                                navigation.navigate("Home");
                                console.log("User signed in using Google");
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                    style={{
                        backgroundColor: "red",
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 10,
                        marginTop: 10,

                    }}
                >
                     <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Sign In with Google</Text>
                </Pressable> */}
            </View>
            <View style={{ justifyContent: 'center', padding: 10, paddingTop: 0 }}>
                <Pressable
                    style={{
                        backgroundColor: "#2284ff",
                        alignItems: 'center',
                        padding: 15,
                        borderRadius: 10,
                    }}
                    onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Đăng ký</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    TextInput: {
        width: 350,
        alignSelf: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 5,
        backgroundColor: 'white',
    },
    tinyLogo: {
        width: '90%',
        height:150,
        marginBottom: 20,
      },
})

export default Login;
