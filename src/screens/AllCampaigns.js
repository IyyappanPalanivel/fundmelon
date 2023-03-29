import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useContract, useContractRead } from "@thirdweb-dev/react-native";
import Colors from '../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ethers } from 'ethers';
import ProgressBar from '../components/ProgressBar';
import { DeviceDimen } from '../utils/Dimen';
import Loader from '../components/Loader';
import CampaignItem from '../components/CampaignItem';
import { useNavigation } from '@react-navigation/native';

const AllCampaigns = () => {

    const navigation = useNavigation();

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

    const renderCampaign = ({item}) => (
        <CampaignItem item={item}/>
    )

    return (
        <SafeAreaView style={styles.container}>
            
            {/* Toolbar */}
            <View style={styles.toolbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" color={'black'} size={30} />
                </TouchableOpacity>
                <Text style={styles.title}>Campaign Details</Text>
                <MaterialCommunityIcons name="home" color={'black'} size={30} />
            </View>

            <FlatList
                data={campaignsList}
                renderItem={renderCampaign}
            />
        </SafeAreaView>
    )
}

export default AllCampaigns

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        flex: 1,
        fontSize: 16,

    },
})