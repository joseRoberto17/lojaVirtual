import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    AsyncStorage
  } from 'react-native';
  import React, { Component } from 'react';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {
            itemCart: []
        }
    }

    componentDidMount(){
        this.loadItem();
    }
    
    loadItem  = async() => {
        try{
            const itemCart = await AsyncStorage.getItem('prodS');
            
            if(itemCart != null){
                this.setState({itemCart});
            }
            alert("N " + this.state.itemCart.length);
        }
        catch(error){
            alert(error);
        }
    }

    renderItem = ({item}) => (
        <View style={styles.containerProduct}>
                  <Text> {item.name} </Text>
                  <View>
                  <Image style={styles.avatar} source={item.img} />
                  </View>
            <TouchableOpacity onPress={() =>{}}>
                 <Text style={styles.buttonTitle}> Comprar </Text>
            </TouchableOpacity>
        </View>
      );

    render(){
        return(
            <View style={styles.containerList}> 
            { this.state.itemCart.length === 0 
                ? <Text style={styles.empty}> Sem Itens no Carrinho </Text>
            :(
        
                <View>
                <FlatList
                data={this.state.itemCart}
                keyExtractor={(x,i) => i++}
                renderItem={this.renderItem}
                />
                </View>

            )
            } 
            </View>
        );
    }

}

const styles = StyleSheet.create({
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
    avatar:{
        height:250,
        width:250,
        padding: 15,
    }
});


export default Cart;