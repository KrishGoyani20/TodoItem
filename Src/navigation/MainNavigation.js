// this file is control navigation and pages
import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import SignupScreen from '../Screens/SignUpScreen';
import SplashScreen from '../Screens/SplashScreen';


const Stack = createNativeStackNavigator();
const MainNavigation = () => {


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='SignupScreen' component={SignupScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation

const styles = StyleSheet.create({
    logoutContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    logoutButton: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
