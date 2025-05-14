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

import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {createUser} from '../Redux/Slice/AuthSlice';

const SignupScreen = ({navigation}) => {
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();

  const handalSignup = async () => {
    try {
      const isUserCreated = await createUserWithEmailAndPassword(
        getAuth(),
        emailInput,
        passInput,
      );
      const uId = isUserCreated.user.uid;
      const userEmail = isUserCreated.user.email;
      dispatch(createUser({email: userEmail, uid: uId})); // Store as object
      setEmailInput('');
      setPassInput('');
      setErrorMsg('');
      navigation.navigate('HomeScreen');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Password should be at least 6 characters!');
      } else {
        setErrorMsg('Signup failed. Please try again.');
      }
      console.log('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={color.BGD2F3} barStyle={'light-content'} />
      <Text style={styles.header}>Signup</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={emailInput}
          onChangeText={value => setEmailInput(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={passInput}
          onChangeText={value => setPassInput(value)}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.forgot}>Alredy Log In?</Text>
      </TouchableOpacity>
      <Text style={{color: 'red', textAlign: 'center'}}>{errorMsg}</Text>
      <Button title="Sign Up" onPress={handalSignup} />
      <Text style={styles.or}>OR</Text>
      <Button title="Signup with " image={Images.google} />
      <Button title="Signup with " image={Images.facebook} />
    </View>
  );
};

export default SignupScreen;

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
