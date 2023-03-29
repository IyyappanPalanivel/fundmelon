import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ProgressBar from './ProgressBar'

const CampaignItem = (props ) => {

    const item = props.item;
    console.log('campaign',item.image)
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.campaignsListContainer} onPress={() => navigation.navigate('CampaignDetails', { campaign: item })}>
            <Image
                style={styles.campaignImage}
                source={{
                    uri: item.image,
                }}
            />
            <Text style={[styles.title, { fontSize: 16, marginLeft: 5, marginTop: 10 }]}>{item.name}</Text>
            <Text style={[styles.title, { fontSize: 16, fontWeight: '300', marginTop: 10, marginLeft: 5 }]}>{item.description}</Text>

            <View style={{ backgroundColor: 'lightgrey', marginTop: 10, marginLeft: 5, borderRadius: 10, marginRight: 5 }}>
                <ProgressBar progress={.8} />
            </View>

            <Text style={[styles.title, { fontSize: 16, fontWeight: '400', marginTop: 10, marginLeft: 5 }]}>Target: {item.targetAmount.toString()} ETH</Text>
            <Text style={[styles.title, { fontSize: 16, fontWeight: '300', marginTop: 10, marginLeft: 5 }]}>Collected: {item.collectedAmount.toString()} ETH</Text>
        </TouchableOpacity>
    )
}

export default CampaignItem

const styles = StyleSheet.create({
    campaignsListContainer: {
        width: "90%",
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 12,
        borderRadius: 10,
        paddingBottom: 10,
        flex:1,
    },
    campaignImage: {
        height: 150,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
})