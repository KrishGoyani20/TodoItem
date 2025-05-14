import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { store } from './Src/Redux/Store/Store'
import { Provider } from 'react-redux'
import MainNavigation from './Src/navigation/MainNavigation'

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})






























