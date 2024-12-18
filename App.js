import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1F44" />
      <View style={styles.blueHeader} />
      <SafeAreaView style={styles.content}>
        <SignUpScreen />
      </SafeAreaView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  blueHeader: {
    height: 200,
    backgroundColor: '#0A1F44',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    flex: 1,
  },
});
