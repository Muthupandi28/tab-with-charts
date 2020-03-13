import * as React from 'react';
import { Text, View,Image,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';

import {CustomHeader,CustomDrawerContent} from './src'
import {SIOPScreen,SIOPScreenDetail,MPSScreen,MPSScreenDetail} from './src/tab'
import {NotificationsScreen} from './src/drawer'
import {RegisterScreen,LoginScreen} from './src/auth'

import {IMAGE} from './src/constant/Image'

const Tab = createBottomTabNavigator();

const navOptionHandler =()=>({
  headerShown:false
});

const StackSIOP=createStackNavigator();

function SIOPStack()
{
  return(
  <StackSIOP.Navigator initialRouteName="SIOP">
    <StackSIOP.Screen name="SIOP" component={SIOPScreen} options={navOptionHandler}/>
    <StackSIOP.Screen name="SIOPDetails" component={SIOPScreenDetail} options={navOptionHandler}/>
</StackSIOP.Navigator>);
}

const StackSetting=createStackNavigator();

function MPSStack()
{
  return (
    <StackSetting.Navigator initialRouteName="MPS">
      <StackSetting.Screen name="MPS" component={MPSScreen} options={navOptionHandler}/>
      <StackSetting.Screen name="MPSDetails" component={MPSScreenDetail} options={navOptionHandler}/>
  </StackSetting.Navigator>
  );
  
}




function TabNavigator()
{
      return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'SIOP') {
                  iconName = focused
                    ? IMAGE.ICON_SIOP
                    : IMAGE.ICON_SIOPCOLOR
                } else if (route.name === 'MPS') {
                  iconName = focused ?  IMAGE.ICON_MPS :  IMAGE.ICON_MPSCOLOR;
                }
                // You can return any component that you like here!
                return <Image source={iconName} style={{width:20,height:20}} resizeMode='contain' />;
              },
            })}
            tabBarOptions={{
              activeBackgroundColor:'white',
              activeTintColor: 'violet',
              inactiveTintColor: 'black',
            }}
          >
            <Tab.Screen name="SIOP" component={SIOPStack} />
            <Tab.Screen name="MPS" component={MPSStack} />
      </Tab.Navigator>
      );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation({navigation})
{
  return(
    <Drawer.Navigator initialRouteName="MenuTab" drawerContent={()=><CustomDrawerContent navigation={navigation}/>}>
            <Drawer.Screen name="MenuTab" component={TabNavigator} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const StackApp=createStackNavigator();
function App() {

  return (
    <NavigationContainer>
         <StackApp.Navigator initialRouteName="Login">
         <StackApp.Screen name="SIOPApp" component={DrawerNavigation} options={navOptionHandler}/>
         <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler}/>
         <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler}/>
  </StackApp.Navigator>
    </NavigationContainer>
  );
}

export default App;