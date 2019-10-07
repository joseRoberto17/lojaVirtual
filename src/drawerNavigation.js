import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import {StyleSheet, View, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import React from 'react'
import Main from './pages/main';
import TesteScreen from './pages/teste';

const WIDTH = Dimensions.get('window').width;

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{flex: 1}}>
        <View style={{height: 150, backgroundColor:'red'}}>
            <Image source={require('./assets/logo.png')} style={{height: 30, width: 30}} />
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)

const DrawerNavigator = createDrawerNavigator({
        Home: TesteScreen
},{
    contentComponent: CustomDrawerComponent
})

export default DrawerNavigator;