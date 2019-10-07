import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import ListCart from './listCart';
import { Storage } from '../services/storage'

class Teste extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            i: 0,
            p: 0,
            card: [],
            totalQuantity: 0,
            totalPrice: 0
        }
    }

    componentDidMount() {
        this.loadItem();
    }

    loadItem = async () => {
        const data = new Storage();
        const prod = await data.getData('prodS')
        const userId = await data.getData('user')
        const id = await data.getData('userLog')

        console.log("User " + JSON.stringify(userId))
        console.log("User id " + parseInt(id))


        if (prod != null) {
            this.setState({
                products: JSON.parse(prod)
            })
        }

        console.log("Itens carregados " + JSON.stringify(prod))
        const alterData = await prod.filter(function (e) {
            return e.idUser.forEach((item) => {
                return item === parseInt(id)
            })
        })

        console.log("User id igual " + JSON.stringify(alterData))

        const i = await this.props.navigation.state.params.i;
        const p = await this.props.navigation.state.params.p;
        this.setState({ i: i, p: p })
        console.log("incrmento " + i);
    }


    onSubtract = async (item, index) => {
        const products = [...this.state.products];
        const data = new Storage();

        if (products[index].quantity > 1) {
            products[index].quantity -= 1;
            this.setState({ products });
        }
        else {

            const alterData = products.filter(function (e) {
                return e.name !== products[index].name
            });

            this.setState({
                products: alterData
            })
            await data.removeData('prodS', products[index].name)
            // this.setState({ products: [] });
        }
    }

    onAdd = (item, index) => {
        const products = [...this.state.products];
        products[index].quantity += 1;
        this.setState({ products });
    }


    removeData = async () => {
        const data = new Storage();
        this.setState({ products: [] });
        data.removeAll('users')
    }

    goBuy = () => {
        const price = this.state.totalPrice;
        this.props.navigation.navigate('Buy', parseFloat(price));
        console.log('asa' + parseFloat(price));
    }

    render() {
        const { products } = this.state;


        products.forEach((item) => {
            this.state.totalQuantity += item.quantity;
            this.state.totalPrice += item.quantity * item.price;
        })

        return (
            <View style={styles.containerList}>
                {this.state.products.length === 0
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
                            <View style={styles.top}>
                                <Text style={styles.textQuantity}>Quantidade: {this.state.totalQuantity}</Text>
                                <Text style={styles.textPrice}>Total: R$ {this.state.totalPrice}</Text>
                            </View>
                            <ScrollView>
                                <View style={styles.scrollList}>
                                    <FlatList
                                        contentContainerStyle={styles.listItem}
                                        data={this.state.products}
                                        renderItem={({ item, index }) => (
                                            <ListCart
                                                item={item}
                                                onSubtract={() => this.onSubtract(item, index)}
                                                onAdd={() => this.onAdd(item, index)}
                                            />
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </ScrollView>
                            <View style={styles.footer}>
                                <TouchableOpacity style={styles.buttonFanally} onPress={() => { this.goBuy() }}>
                                    <Text style={styles.textFinally}> Finalizar Compra </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonRemove} onPress={() => { this.removeData() }}>
                                    <Text style={styles.textRemove}> Deletar o(s) item(s) </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    scrollList: {
        flex: 1
    },
    containerList: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white"
    },

    containerEmpty: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
        borderWidth: 3,
        borderColor:'#03A9F4',
        borderBottomRightRadius: 100,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 100,
        padding: 80
    },

    empty: {
        fontSize: 40,
        textAlign: "center",
        fontWeight:'bold',
        color: "black",

    },

    textPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000066"
    },

    textQuantity: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#03A9F4",
        padding: 10
    },

    buttonAlign: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    top: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderColor: "#03A9F4",
        borderWidth: 5,
        borderRadius: 20,
        marginTop: 10
    },

    buttonFanally: {
        backgroundColor: "#33cc33",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
        padding: 3
    },
    textFinally: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    },

    buttonRemove: {
        backgroundColor: "#ff5c33",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    textRemove: {
        color: "white",
        fontSize: 20,
        fontWeight: 'bold'
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-around"
    }

})

export default Teste;



/*
    removeData = async (idItem) => {
        // const itemC = await AsyncStorage.getItem('prodS');
        // const id = item.id
        // const alterData = JSON.parse(itemC).filter(itemC => itemC.id === id);
        // const alterData = JSON.parse(itemC).splice(itemC.findIndex(x => x.id === id));

        // if(alterData){

        try {
            if (idItem === null) {
                let itemC = await AsyncStorage.getItem('prodS');
                let item = JSON.parse(itemC);
                alteredItem = item.filter(function (e) {
                    return e.id !== idItem.id

                })
                AsyncStorage.setItem('prodS', JSON.stringify(alteredItem));
                this.setState({
                    products: alteredItem
                })
            } else {
                await AsyncStorage.removeItem('prodS');
                this.setState({ products: [] });
                console.log("Remove " + await AsyncStorage.getItem('prodS'));
            }

        }
        catch (error) {
            console.log(error)
        }
        //}

        //console.log("Removido " + JSON.stringify(alterData));
    }


*/