import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import React, { Component } from 'react';
import { ProductService } from '../services/products';
import Icon from 'react-native-vector-icons/FontAwesome';


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

  loadProducst = async () => {

    const service = new ProductService();
    const prod = await service.getProducts();
    this.setState({ prod });
  }

  goDescription = (item) => {
    const id = this.props.navigation.state.params;
    console.log("Id user " + id)
    this.props.navigation.navigate('Description', { item, id });
  }
  goCard = () => {
    const id = this.props.navigation.state.params;
    this.props.navigation.navigate('CardView', id);
  }

  renderItem = ({ item }) => (
    <View style={styles.containerProduct}>
      <Text style={styles.productTitle}> {item.name}</Text>
      <View style={styles.imgContainer} >
        <Image style={styles.avatar} source={item.img} />
      </View>
      <TouchableOpacity style={styles.productButton} onPress={() => {
        this.goDescription(item);
      }}>
        <Text style={styles.buttonTitle}> Conferir </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.containerScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}>
          <View style={styles.containerCarousel}>
            <Image
              source={require('../assets/shoes2.jpg')}
              style={{ width: 420, height: 165 }}
            />

          </View>

          <View style={styles.containerCarousel}>
            <Image
              source={require('../assets/shoes1.jpg')}
              style={{ width: 450, height: 250 }}
            />

          </View>

          <View style={styles.containerCarousel}>
            <Image
              source={require('../assets/promo.jpg')}
              style={{ width: 420, height: 165 }}
            />

          </View>
        </ScrollView>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}>
          <FlatList
            contentContainerStyle={styles.listItens}
            data={this.state.prod}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />

        </ScrollView>

        <View>
          <TouchableOpacity style={styles.card} onPress={() => { this.goCard() }}>
            <Text style={styles.textCard}> Gerenciamento de Cartões </Text>
            <Image
              source={require('../assets/card.png')}
              style={{ width: 25, height: 20 }}
            />
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  listItens: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },

  containerProduct: {
    backgroundColor: "#03A9F4",
    borderBottomLeftRadius: 100,
    borderTopLeftRadius:100,
    borderTopRightRadius: 100,
    borderBottomRightRadius:12,
    borderWidth: 10,
    borderColor:'white',
    padding: 3,
    left: 5,
    justifyContent:'space-between',
    
  },

  containerScroll: {
    marginTop: 4,
    borderColor: "white",
    borderWidth: 3,
    height: 150
  },

  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: "center"
  },

  productButton: {
    backgroundColor: "transparent",
    marginTop: 1,
    left: 10
  },

  buttonTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "white",
    textAlign:'center'
  },

  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius:150
   
  },
  avatar: {
    height: 250,
    width: 250,
    padding: 15,
    borderRadius: 100
  },
  logo: {
    height: 40,
    width: 40
  },

  card: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 4,
    borderColor: "#1ac6ff"
  },

  textCard: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#000066"
  }

});

export default Main;