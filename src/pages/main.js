import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import React, { Component } from 'react';
import logo from '../assets/logo.png';
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
    alert(this.state.prod.length); 
  }

  goDescription = (item) => {
    this.props.navigation.navigate('Description', item);
  }

  renderItem = ({item}) => (
    <View style={styles.containerProduct}>
              <Text style={styles.productTitle}> {item.name}</Text>
              <Text style={styles.productTitle}> {item.id}</Text>
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

      <View style={styles.containerTitle}>
      <Image style={styles.logo} source={logo}/>
        <Text style={styles.title}> Loja Virtual  </Text>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('Cart');
        }}> 
        <Text>Carrinho </Text>
        </TouchableOpacity>
      </View>

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

    containerTitle:{
      flexDirection: "row",
      justifyContent: "center",
      alignItems:"center",
      backgroundColor: "#03A9F4"
    },

    title:{
      fontSize: 25,
      color: "#fafafa"
    },

    containerList:{
      flex: 1,
      padding: 15
    },

    containerProduct:{

      borderWidth:2,
      borderColor: "#fafafa",
      borderRadius:12,
      padding: 2,
      marginBottom: 20
    },

    productTitle:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#338'
    },

    productButton:{
      height: 42,
      borderRadius: 5,
      borderWidth: 2,
      borderColor:"#03A9F4",
      backgroundColor: 'transparent',
      justifyContent: "center",
      alignItems: "center", 
      marginTop: 10
    },

    buttonTitle:{
      fontSize: 20,
      fontWeight: 'bold',
      color: '#338'
    },

    imgContainer:{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:"#999"
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