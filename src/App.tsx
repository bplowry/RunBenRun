import * as React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Main } from './Main';

export class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Platform.OS !== 'android' ? 0 : StatusBar.currentHeight,
  },
});
