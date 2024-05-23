import React, { useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Text, Image } from 'react-native';
import { TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passrp, setPassrp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = async () => {
  if (pass === passrp) {
      try {
        const { user } = await auth().createUserWithEmailAndPassword(email, pass);
        await firestore().collection('users').doc(user.email).set({
          email: user.email,
          age :'0',
          address:'abc',
          role:'user'
        });
        navigation.navigate("Login");

        Alert.alert('Success', 'successfully');
      } catch (error) {
        // console.error('Error creating user: ', error);
        // Alert.alert('Error', 'An error occurred while creating the user');
      }
    } else {
    //   Alert.alert('Error', 'Passwords do not match');
    }
  };

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
      style={styles.TextInput}
      label="Nhập Email" 
      value={email} 
      onChangeText={(email) => setEmail(email)} 
      underlineColor='transparent'
      />
      <TextInput
       style={styles.TextInput}
        label="Nhập mật khẩu"
        value={pass}
        onChangeText={(pass) => setPass(pass)}
        secureTextEntry={!showPassword} 
        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={toggleShowPassword}/>}
        underlineColor='transparent'
      />
      <TextInput
       style={styles.TextInput}
        label="Nhập lại mật khẩu"
        value={passrp}
        onChangeText={(passrp) => setPassrp(passrp)}
        secureTextEntry={!showPassword} 
        right={<TextInput.Icon icon={showPassword ? 'eye' : 'eye-off'} onPress={toggleShowPassword}/>}
        underlineColor='transparent'
      />
       <View style={{justifyContent: 'center', padding: 10 }}>
                <Pressable 
                style={{backgroundColor: "#2284ff", 
                alignItems:'center',
                padding: 15, 
                borderRadius:10, 
        
               }}
            onPress={handleSignUp}>
                  <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>Đăng ký</Text>
                </Pressable>
            </View>
            <View style={{justifyContent: 'center', padding: 10,paddingTop:0 }}>
                <Pressable 
                style={{backgroundColor: "#2284ff", 
                alignItems:'center',
                padding: 15, 
                borderRadius:10, 
            }}
            onPress={()=> navigation.navigate("Login")}>
                   <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>Đăng nhập</Text>
                </Pressable>
                </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput:{
    width: 350,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 5,
    backgroundColor: 'white',
  
    // borderWidth: 1,
},
tinyLogo: {
  width: '90%',
  height:150,
  marginBottom: 20,
},
});

export default SignUp;
