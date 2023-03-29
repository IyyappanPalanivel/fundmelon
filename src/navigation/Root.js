import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wallet from '../screens/Wallet';
import HomeScreen from '../screens/HomeScreen';
import CampaignsListScreen from '../screens/CampaignsListScreen';
import CreateCampaignScreen from '../screens/CreateCampaignScreen';
import CampaignDetails from '../screens/CampaignDetails';
import AllCampaigns from '../screens/AllCampaigns';


const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Campaigns' screenOptions={{
        headerShown: false
      }}> 
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{title: 'Connect Wallet'}}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Campaigns" component={CampaignsListScreen} />
        <Stack.Screen name="CreateCampaign" component={CreateCampaignScreen} />
        <Stack.Screen name="CampaignDetails" component={CampaignDetails} />
        <Stack.Screen name="AllCampaigns" component={AllCampaigns} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;