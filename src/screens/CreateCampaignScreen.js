import { Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../utils/Colors'
import { ConnectWallet, useContract, useContractWrite, useConnectedWallet } from "@thirdweb-dev/react-native";
import DatePicker from 'react-native-date-picker';
import { ethers } from 'ethers';
import Loader from '../components/Loader';

const CreateCampaignScreen = ({ navigation }) => {

    const { contract } = useContract("0xFE3a91C3a4C3B24c467CCF6E657cCAc2bC9212Cd");
    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign")
    const address = useConnectedWallet()

    const [creatorAccount, setCreatorAccount] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('https://geekawhat.com/wp-content/uploads/2022/05/3070-High-End-Build-Feature-Image.jpg');
    const [targetAmount, setTargetAmount] = useState('');
    const [deadline, setDeadline] = useState('');

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [loading, setLoading] = useState(false);

    const submit = async () => {

        if (name == '' || description == '' || image == '' || targetAmount == '' || deadline == '') {
            Alert.alert('Please Fill All Details');
        }
        else if (creatorAccount == '') {
            Alert.alert('Please Connect To Wallet');
        }
        else {
            console.log('submit', [creatorAccount, name, description, image, ethers.utils.parseUnits(targetAmount.toString(), 18), deadline]);

            try {
                setLoading(true);
                const data = await createCampaign([creatorAccount, name, description, image, ethers.utils.parseUnits(targetAmount.toString(), 18), deadline]);
                setLoading(false);
                console.info("contract call successs", data);
                Alert.alert('Campaigns Created Successfully in Blockchain')
            } catch (err) {
                setLoading(false);
                console.error("contract call failure", err);
            }
        }
    }

    useEffect(() => {
        if (address) {
            console.log('address', address.connection.signer._address);
            setCreatorAccount(address.connection.signer._address);
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <ScrollView>

                {/* Toolbar */}
                <View style={styles.toolbar}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="chevron-left" color={'black'} size={30} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Create Campaign</Text>
                    <MaterialCommunityIcons name="home" color={'black'} size={30} />
                </View>

                {/* Account Number */}
                <View styles={{ margin: 30 }} >
                    <ConnectWallet theme={'dark'} />
                </View>


                <TextInput
                    style={styles.inputBox}
                    placeholder="Campaign Name"
                    placeholderTextColor={'grey'}
                    value={name}
                    onChangeText={(value) => setName(value)}
                />

                <TextInput
                    style={styles.inputBox}
                    placeholder="Description"
                    placeholderTextColor={'grey'}
                    value={description}
                    onChangeText={(value) => setDescription(value)}
                />

                <TextInput
                    style={styles.inputBox}
                    placeholder="Image URL"
                    placeholderTextColor={'grey'}
                    value={image}
                    onChangeText={(value) => setImage(value)}
                />

                <TextInput
                    style={styles.inputBox}
                    placeholder="Target Amount"
                    placeholderTextColor={'grey'}
                    value={targetAmount}
                    onChangeText={(value) => setTargetAmount(value)}
                />

                {/* Date Picker */}
                <TouchableOpacity style={styles.inputBox} onPress={() => setOpen(true)} >
                    <Text style={{ color: 'black' }}> {date.toLocaleString()}</Text>
                </TouchableOpacity>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        setDeadline(date.getTime())
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />

                {/* Create Campaign Button */}
                <TouchableOpacity style={styles.button} onPress={() => submit()}>
                    <Text>Create Campaign</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView >
    )
}

export default CreateCampaignScreen

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
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
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
    }
})