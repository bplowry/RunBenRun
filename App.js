// @flow
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AuthSession, Fingerprint } from 'expo';

function add(first: number, second: number) {
  return first + second;
}

function toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

export default class App extends Component<{}> {
  async onPress() {
    const fingerprint = await Fingerprint.authenticateAsync();
    if (fingerprint.success) {
      const redirectUrl = AuthSession.getRedirectUri();
      const returnUrl = AuthSession.getDefaultReturnUrl();
      const auth = await AuthSession.startAsync({
        authUrl: '<my auth url>' + toQueryString({
          redirect_uri: redirectUrl,
        }),
      });
    } else {

    }

  }

  render() {
    const b = add(1, 2);
    const p = Platform.OS;
    
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
