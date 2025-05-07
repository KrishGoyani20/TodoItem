import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './Src/Screens/HomeScreen'
import { store } from './Src/Redux/Store/Store'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})






























