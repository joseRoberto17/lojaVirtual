import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { Component } from 'react';
import { ProductService } from '../services/products'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: []
    }
  }

  componentDidMount() {
    this.loadProducst();
  }

  loadProducst = async () =>{
    const service = new ProductService();
    const prod = await service.getProducts();  
    this.setState({ prod });
  }

  goDescription = (item) => {
    this.props.navigation.navigate('Description', item);
  }

  renderItem = ({item}) => (
    <View style={styles.containerProduct}>
              <Text style={styles.productTitle}> {item.name}</Text>
              <View style={styles.imgContainer} >
              <Image style={styles.avatar} source={item.img} />
              </View>
        <TouchableOpacity style={styles.productButton} onPress={() =>{
          this.goDescription(item);
        }}>
             <Text style={styles.buttonTitle}> Comprar </Text>
        </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.containerList}>
        <FlatList
          contentContainerStyle={styles.listItens}
          data={this.state.prod}
          keyExtractor={(item) => item.id}
          renderItem={this.renderItem}
        />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fafafa"
    },

    containerList:{
      flex: 1,
      padding: 15,
      backgroundColor: "white"
    },

    containerProduct:{
      backgroundColor: "#03A9F4",
      borderWidth:2,
      borderColor: "#fafafa",
      borderRadius:12,
      padding: 2,
      marginBottom: 20
    },

    productTitle:{
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      textAlign:"center"
    },

    productButton:{
      height: 42,
      borderRadius: 5,
      borderWidth: 2,
      borderColor:"#03A9F4",
      backgroundColor: "#1ac6ff",
      justifyContent: "center",
      alignItems: "center", 
      marginTop: 1
    },

    buttonTitle:{
      fontSize: 25,
      fontWeight: 'bold',
      color: "white"
    },

    imgContainer:{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"white"
    },
    avatar:{
        height:250,
        width:250,
        padding: 15,
    },
    logo:{
      height: 40,
      width: 40
    }

});

export default Main;