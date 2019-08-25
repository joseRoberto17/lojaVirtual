import { createStackNavigator } from 'react-navigation';
import { Image, Button, Text, View, TouchableOpacity } from 'react-native';
import Main from './pages/main';
import Description from './pages/description';
import Cart from './pages/cart';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


export default createStackNavigator({
  Main,
  Description,
  Cart
}, {
    navigationOptions: ({ navigation }) => ({

      headerTitle: (
        <TouchableOpacity onPress={() => { navigation.navigate('Main') }}>
          <View style={{ padding: 10 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}> Loja do Ze</Text>
            <Image
              source={require('./assets/logo.png')}
              style={{ width: 40, height: 40, left: 26 }}
            />
          </View>
        </TouchableOpacity>
          ),
    
          headerRight: (
            <TouchableOpacity
            onPress={() => { navigation.navigate('Cart') }}>
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