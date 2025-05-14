import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../utils/Theme';
import {Button} from '../component/Button';
import Images from '../assets/Image';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {createUser, UserLogIn} from '../Redux/Slice/AuthSlice';

const LoginScreen = ({navigation}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [isSecure, setIsSecure] = useState('');

  const dispatch = useDispatch();

  const handalLoginButton = async () => {
    try {
      const isUserLogIn = await signInWithEmailAndPassword(
        getAuth(),
        emailInput,
        passInput,
      );
      const uId = isUserLogIn.user.uid;
      const userEmail = isUserLogIn.user.email;
      dispatch(UserLogIn({ email: userEmail, uid: uId })); // Always store as object
      console.log('User Logged In Succesful Email: ', userEmail);
      console.log('User Logged In Succesful UID: ', uId);
      setEmailInput('');
      setPassInput('');
      setIsSecure('');
      navigation.dispatch(StackActions.replace('HomeScreen'));
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found') {
        setIsSecure('No user found with this email!');
      } else if (error.code === 'auth/wrong-password') {
        setIsSecure('Incorrect password!');
      } else if (error.code === 'auth/invalid-email') {
        setIsSecure('Invalid email address!');
      } else {
        setIsSecure('Invalid Email or Password!');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.BGD2F3} barStyle={'light-content'} />
      <Text style={styles.header}>LogIn</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={emailInput}
          onChangeText={setEmailInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={passInput}
          onChangeText={setPassInput}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
        <Text style={styles.forgot}>New Account?</Text>
      </TouchableOpacity>
      <Text style={{color: 'red', textAlign: 'center'}}>{isSecure}</Text>
      <Button title="Log In" onPress={() => handalLoginButton()} />

      <Text style={styles.or}>OR</Text>

      <Button title="Login with " image={Images.google} />

      <Button title="Login with " image={Images.facebook} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.BGD2F3,
    padding: 20,
  },
  header: {
    fontSize: 32,
    color: color.FFF,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 60,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: color.BG3E4,
    padding: 15,
    borderRadius: 10,
    color: color.FFF,
    marginVertical: 10,
  },
  forgot: {
    color: color.F7D26A,
    textAlign: 'right',
    marginBottom: 20,
  },
  or: {
    color: color.FFF,
    textAlign: 'center',
    marginVertical: 10,
  },
});

// ............firebase console sign in

// signInAnonymously(getAuth())
//   .then(() => {
//     console.log('User signed in anonymously');
//   })
//   .catch(error => {
//     if (error.code === 'auth/operation-not-allowed') {
//       console.log('Enable anonymous in your firebase console.');
//     }

//     console.error(error);
//   });
