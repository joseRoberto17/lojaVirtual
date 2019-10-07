import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, Button, Text, View, TouchableOpacity } from 'react-native';
import Main from './pages/main';
import Description from './pages/description';
import Teste from './pages/teste'
import Cart from './pages/cart';
import Card from './pages/card';
import CardView from './pages/cardView';
import Login from './pages/login';
import Buy from './pages/buy';
import Forgot from './pages/forgot';
import SingUp from './pages/signUp';
import SingIn from './pages/singIn';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const AppNavigator = createStackNavigator({
  Login,
  SingUp,
  SingIn,
  Main,
  Buy,
  Forgot,
  CardView,
  Cart,
  Card,
  Description,
  Teste
}, {
  defaultNavigationOptions: ({ navigation }) => ({

      headerTitle: (
        <TouchableOpacity onPress={() => { navigation.navigate('Main') }}>
          <View style={{ padding: 10 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}> ZeShoes </Text>
            <Image
              source={require('./assets/logo.png')}
              style={{ width: 40, height: 35, left: 15 }}
            />
          </View>
        </TouchableOpacity>
          ),
    
          headerRight: (
            <TouchableOpacity
            onPress={() => { navigation.navigate('Teste') }}>
            <View style={{ padding: 13, backgroundColor: "white", width:"90%", height:"80%", borderRadius: 16 }}>
              <Image
                source={require('./assets/cart.png')}
                style={{ width: 27, height: 27 }}
              />
            </View>
            </TouchableOpacity>
          ),
      headerStyle: {
            backgroundColor: "#1ac6ff",
        },
        headerTintColor: "white"
      })
  
  
  
  });

export default createAppContainer(AppNavigator);