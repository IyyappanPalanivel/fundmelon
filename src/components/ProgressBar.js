import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors';

const ProgressBar = ({ progress }) => (
    <View style={styles.container}>
        <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
);

export default ProgressBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progress: {
        height: 8,
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
    },
})