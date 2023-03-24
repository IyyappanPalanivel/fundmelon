import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

import {ConnectWallet, ThirdwebProvider} from '@thirdweb-dev/react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const Wallet = () => {

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={styles.view}>
                <ConnectWallet />
            </View>
        </SafeAreaView>
    )
}

export default Wallet

const styles = StyleSheet.create({
    view: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
    },
})