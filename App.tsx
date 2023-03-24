/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ThirdwebProvider} from '@thirdweb-dev/react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import Root from './src/navigation/Root';

const App = () => {
  return (
    <ThirdwebProvider activeChain="goerli">
      <Root/>
    </ThirdwebProvider>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default App;
