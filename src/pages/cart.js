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

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemC: [],
            ite: [

                {
                    id: 1,
                    name: 'teste',
                },
                {
                    id: 2,
                    name: 'lala'
                }

            ]
        }
    }

    componentDidMount() {
        this.loadItem();
    }
    // 
    loadItem = async () => {
        try {
            const itemC = await AsyncStorage.getItem('prodS');

            if (itemC != null) {
                this.setState({ itemC });
            }

            //    console.log(itemCart.filter(i => 
            //        i.name === 'Banana'))

            console.log("taman " + JSON.parse(itemC));
            console.log("Itens" + itemC)
            console.log("Test " + this.state.itemC);
        }
        catch (error) {
            alert(error);
        }
    }

    renderItem = ({ item }) => (
        <View style={styles.containerProduct}>
            <Text> {this.state.itemC.length} </Text>
            <Text> {item.length}</Text>
            <Text style={styles.productTitle}> {item.name}</Text>

            <TouchableOpacity style={styles.productButton} onPress={() => {
            }}>
                <Text style={styles.buttonTitle}> Comprar </Text>
            </TouchableOpacity>
        </View>
    );

    render() {
        return (
            <View style={styles.containerList}>
                {this.state.itemC.length === 0
                    ? <Text style={styles.empty}> Sem Itens no Carrinho </Text>
                    : (

                        <View>
                            <FlatList
                                data={this.state.itemC}
                                renderItem={this.renderItem}
                                keyExtractor={(item) => item.id}
                            />
                        </View>

                    )
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({

    containerProduct: {

        borderWidth: 2,
        borderColor: "#fafafa",
        borderRadius: 12,
        padding: 2,
        marginBottom: 20
    },
    avatar: {
        height: 250,
        width: 250,
        padding: 15,
    },
    productTitle: {
        color: "#338"
    }
});


export default Cart;