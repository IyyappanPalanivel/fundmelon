import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {

    const navigate = () => {
        navigation.navigate('Wallet')
    }

    const navigateToCampaign = () => {
        navigation.navigate('Campaigns')
    }

    const navigateToCreateCampaign = () => {
        navigation.navigate('CreateCampaign')
    }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={()=>navigate()}>
        <Text>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>navigateToCampaign()}>
        <Text>Campaigns List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>navigateToCreateCampaign()}>
        <Text>Create Campaign</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    button: {
        width:'90%',
        backgroundColor:'red',
        alignSelf:'center',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    }
})