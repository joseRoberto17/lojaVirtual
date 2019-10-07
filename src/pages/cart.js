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

            ],
            total: 0
        }
    }

    componentDidMount() {
        this.loadItem();
        this.sumItens();
    }
    

    loadItem = async () => {
        try {
            const itemC = await AsyncStorage.getItem('prodS');

            if (itemC != null) {
                this.setState({ itemC: JSON.parse(itemC) });
            }

            //    console.log(itemCart.filter(i => 
            //        i.name === 'Banana'))

            console.log("taman " + JSON.parse(itemC));
            console.log("Itens" + JSON.stringify(itemC));
            console.log("Test " + this.state.itemC);
        }
        catch (error) {
            alert(error);
        }
    }

    sumItens = () => {

        const total = this.state.itemC.forEach(function(item){
            let sum = sum + parseFloat(item.price);
            console.log("Preco " + item.price);
        })

        console.log("tOTAL " + total);
        console.log("price " + this.state.itemC.price);
        this.setState({ total: total });
    }

    onSubtract = () =>{
        
    }

    renderItem = ({ item }) => (
        <View style={styles.containerProduct}>
            <View style={styles.imgContainer} >
                <Image style={styles.avatar} source={item.img} />
            </View>

            <View style={styles.buttonContainer}>

                <Text style={styles.productTitle}> {item.name}</Text>

                <TouchableOpacity style={styles.productButtonAdd} onPress={() => {
                }}>
                    <Image style={{ width: 25, height: 25 }} source={require('../assets/buy.png')} />
                    <Text style={styles.buttonTitle}> Comprar </Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.productButtonRemove} onPress={() => {
                }}>
                    <Image style={{ width: 25, height: 30 }} source={require('../assets/delete.png')} />
                    <Text style={styles.buttonTitle}> Delete </Text>

                </TouchableOpacity>

            </View>
        </View>
    );

    render() {
        return (
            <View style={styles.containerList}>
                {this.state.itemC.length === 0
                    ?

                    <View style={styles.containerEmpty}>
                        <Text style={styles.empty}> Sem Itens no </Text>
                        <Image
                            source={require('../assets/cart.png')}
                            style={{ width: 60, height: 60 }}
                        />
                    </View>

                    : (

                        <View style={styles.container}>

                            <Text> Total: {this.state.total}</Text>
                            <View style={styles.containerList}>
                                <FlatList
                                    contentContainerStyle={styles.listItem}
                                    data={this.state.itemC}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                        </View>

                    )
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({

    containerProduct: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 10,
        borderColor: "#fafafa",
        borderRadius: 12,
        padding: 2,
        marginBottom: 20,
        backgroundColor: "#03A9F4",
        marginTop: 10,
        borderRadius: 20
    },

    buttonContainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-around",
        alignItems: "center"
    },

    productButtonAdd: {
        backgroundColor: "#66ff66",
        borderRadius: 60,
        width: "70%",
        flexDirection: "row",
        padding: 14
    },

    productButtonRemove: {
        backgroundColor: "#ff5c33",
        borderRadius: 60,
        width: "70%",
        flexDirection: "row",
        padding: 14
    },

    buttonTitle: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold',
        padding: 2,
        color: "white"
    },

    avatar: {
        height: 180,
        width: 180,
        padding: 15,
    },
    productTitle: {
        color: "#03A9F4",
        textAlign: "center",
        marginTop: 5,
        fontWeight: "bold",
        padding: 5,
        fontSize: 25
    },
    containerEmpty: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        borderWidth: 3,
        borderColor:'#03A9F4',
        borderBottomRightRadius: 100,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 100
    },

    empty: {
        fontSize: 50,
        padding: 50,
        textAlign: "center",
        color: "white",

    }
});


export default Cart;