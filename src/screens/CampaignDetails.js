import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Image, Alert, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProgressBar from '../components/ProgressBar';
import { ConnectWallet, useConnectedWallet, useContract, useContractWrite } from '@thirdweb-dev/react-native';
import Loader from '../components/Loader';
import { ethers } from 'ethers';


const CampaignDetails = ({ navigation, route }) => {

    const { campaign } = route.params;

    const { contract } = useContract("0xFE3a91C3a4C3B24c467CCF6E657cCAc2bC9212Cd");
    const { mutateAsync: donateToCampaign, isLoading } = useContractWrite(contract, "donateToCampaign")
    const address = useConnectedWallet();

    const [creatorAccount, setCreatorAccount] = useState('');
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState('');

    const donate = async () => {
        if (creatorAccount == '') {
            Alert.alert('Please Connect To Wallet');
        } else {
            try {
                setLoading(true);
                const data = await donateToCampaign([campaign.id, { value: ethers.utils.parseEther(amount) }]);
                console.info("contract call successs", data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.error("contract call failure", err);
                Alert.alert(err.toString());
            }
        }

    }

    useEffect(() => {
        if (address) {
            //console.log('address', address.connection.signer._address);
            setCreatorAccount(address.connection.signer._address);
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />

            {/* Toolbar */}
            <View style={styles.toolbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="chevron-left" color={'black'} size={30} />
                </TouchableOpacity>
                <Text style={styles.title}>Campaign Details</Text>
                <MaterialCommunityIcons name="home" color={'black'} size={30} />
            </View>

            <ScrollView>
                {/* Account Number */}
                <View styles={{ margin: 30 }} >
                    <ConnectWallet theme={'dark'} />
                </View>

                {/* Banner */}
                <Image
                    style={styles.campaignImage}
                    source={{
                        uri: campaign.image,
                    }}
                />

                <View style={styles.detailsContainer}>
                    <Text style={[styles.title, { fontSize: 16, marginLeft: 5, marginTop: 10 }]}>{campaign.name}</Text>
                    <Text style={[styles.title, { fontSize: 16, fontWeight: '300', marginTop: 10, marginLeft: 5 }]}>{campaign.description}</Text>

                    <View style={{ backgroundColor: 'lightgrey', marginTop: 10, marginLeft: 5, borderRadius: 10, marginRight: 5 }}>
                        <ProgressBar progress={.8} />
                    </View>

                    <Text style={[styles.title, { fontSize: 16, fontWeight: '400', marginTop: 10, marginLeft: 5 }]}>Target: {campaign.targetAmount.toString()} ETH</Text>
                    <Text style={[styles.title, { fontSize: 16, fontWeight: '300', marginTop: 10, marginLeft: 5 }]}>Collected: {campaign.collectedAmount.toString()} ETH</Text>

                    <Text style={[styles.title, { fontSize: 16, fontWeight: '400', marginTop: 10, marginLeft: 5 }]}>Campaign Created by : {campaign.campaign_creator}</Text>

                </View>

                {/* Donate Input */}
                <TextInput
                    style={styles.inputBox}
                    placeholder="Donate Ex: 0 ETH"
                    placeholderTextColor={'grey'}
                    value={amount}
                    keyboardType='number-pad'
                    onChangeText={(value) => setAmount(value)}
                />

                {/* Donate Button */}
                <TouchableOpacity style={styles.button} onPress={() => donate()}>
                    <Text>Donate To Campaign</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default CampaignDetails;

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
    button: {
        margin: 20,
        width: '90%',
        backgroundColor: Colors.primaryColor,
        alignSelf: 'center',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    inputBox: {
        marginTop: 15,
        width: '90%',
        height: 40,
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: Colors.grey,
        paddingStart: 10,
        color: Colors.black,
        justifyContent: 'center',
    },
    campaignImage: {
        height: 300,
        width: "100%",
        marginTop: 10
    },
    detailsContainer: {
        width: '100%',
        marginTop: 12,
        borderRadius: 10,
        paddingBottom: 10
    },
})