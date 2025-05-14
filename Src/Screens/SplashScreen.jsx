import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {color} from '../utils/Theme';
import {StackActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {UserLogIn, UserLogOut} from '../Redux/Slice/AuthSlice';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(UserLogIn({ email: user.email, uid: user.uid }));
        navigation.dispatch(StackActions.replace('HomeScreen'));
        console.log('User is Current Screen: HomeScreen');
      } else {
        dispatch(UserLogOut());
        navigation.dispatch(StackActions.replace('LoginScreen'));
        console.log('User is Current Screen: LoginScreen');
      }
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24, fontWeight: 800, color: color.BGD2F3}}>
        Welcome to ToDo Item
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
