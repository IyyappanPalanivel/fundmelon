import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react-native";
import Colors from '../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ethers } from 'ethers';

const CampaignsListScreen = ({ navigation }) => {

    const { contract } = useContract("0xFE3a91C3a4C3B24c467CCF6E657cCAc2bC9212Cd");

    const [campaignsList, setCampaignsList] = useState([]);

    useEffect(() => {
        if (contract) getCampaigns();
    }, [contract])

    const getCampaigns = async () => {

        const campaigns = await contract.call("getCampaigns");

        const parsedCampaigns = campaigns.map((campaign) => ({
            id: campaign.id.toNumber(),
            campaign_creator: campaign.campaign_creator.toString(),
            name: campaign.name,
            description: campaign.description,
            image: campaign.image,
            targetAmount: ethers.utils.formatEther(campaign.targetAmount.toString()),
            collectedAmount: ethers.utils.formatEther(campaign.collectedAmount.toString()),
            deadline: campaign.collectedAmount.toNumber(),

        }));

        console.log('parsed campaigns', parsedCampaigns);
        setCampaignsList(parsedCampaigns);
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.campaignsListContainer}>
                <Image
                    style={styles.campaignImage}
                    source={{
                        uri: 'https://economictimes.indiatimes.com/thumb/msid-68595193,width-1200,height-900,resizemode-4,imgsize-965088/avengers-endgame.jpg?from=mdr',
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
        );
    };

    const ProgressBar = ({ progress }) => (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${progress * 100}%` }]} />
        </View>
    );

    const navigateToCreateCampaign = () => {
        navigation.navigate('CreateCampaign')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled={true} >

                {/* Toolbar Section */}
                <View style={styles.toolbar}>
                    <Text style={[styles.title, { flex: 1 }]}>Crowd Funding</Text>
                    <TouchableOpacity onPress={() => navigateToCreateCampaign()}>
                        <MaterialIcons name='add-circle-outline' color={Colors.primaryColor} size={30} />
                    </TouchableOpacity>
                </View>

                {/* Searchbar */}
                <View style={styles.searchbar}>
                    <MaterialIcons name='search' color={Colors.black} size={30} />
                    <Text style={{ marginStart: 10 }}>Search Campaign</Text>
                </View>

                {/* Banner Images */}
                <Image
                    style={styles.bannerImage}
                    source={{
                        uri: 'https://economictimes.indiatimes.com/thumb/msid-68595193,width-1200,height-900,resizemode-4,imgsize-965088/avengers-endgame.jpg?from=mdr',
                    }}
                />

                {/* Trending Campaigns Section */}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.title, { fontSize: 18, flex: 1, marginLeft: 20 }]}>Trending Campaigns</Text>
                    <Text style={[styles.title, { fontSize: 14, color: Colors.primaryColor, marginRight: 20 }]}>View All -{'>'} </Text>
                </View>

                <FlatList
                    data={campaignsList}
                    renderItem={renderItem}
                    nestedScrollEnabled={false}
                />

            </ScrollView>

        </SafeAreaView>
    )
}

export default CampaignsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold'
    },
    toolbar: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
    },
    button: {
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    campaignsListContainer: {
        width: '70%',
        backgroundColor: 'white',
        marginStart: 20,
        marginTop: 12,
        borderRadius: 10,
        paddingBottom: 10
    },
    campaignImage: {
        height: 150,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    bannerImage: {
        height: 200,
        width: "90%",
        borderRadius: 10,
        margin: 20
    },
    progress: {
        height: 8,
        backgroundColor: Colors.primaryColor,
        borderRadius: 10,
    },
    searchbar: {
        width: "90%",
        height: 40,
        backgroundColor: Colors.inputBoxGrey,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 15
    }
})