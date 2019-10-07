import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import { Storage } from '../services/storage'


class Buy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            price: 0,
            card: []
        }
    }

    componentDidMount() {
        this.loadParams();
        this.loadCard();
    }

    loadParams = async () => {
        const price = await this.props.navigation.state.params;
        console.log("Passou " + price)
        this.setState({ price: price });
    }

    loadCard = async () => {
        const data = new Storage();
        const prod = await data.getData('card')

        if (prod != null) {
            this.setState({
                card: JSON.parse(prod)
            })
        }
        console.log("Card carregados " + JSON.stringify(prod))
    }

    cardSelect = async (itemNumb) => {
        const data = this.state.card;


        const alterData = data.filter(function (e) {
            return e.creditCard === itemNumb
        });


        this.setState({
            card: alterData
        })

        console.log("Alterou na View " + JSON.stringify(alterData));
    }

    renderItem = ({ item }) => (
        <View style={styles.containerCard}>
            <Text style={styles.textCredit}> {item.creditCard}</Text>
            {
                this.state.card.length > 1
                    ?
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => { this.cardSelect(item.creditCard) }}>
                            <Text style={styles.textAdd}> + </Text>
                        </TouchableOpacity>

                    </View>

                    : (
                        <View></View>
                    )

            }

        </View>
    );

    goFinally = () => {
        const data = new Storage();
        if (this.state.card.length > 1) {
            alert('Selecione apenas um cartão')
        } else {

            alert('Compra efetuada com sucesso');
            data.removeAll('prodS');
            this.props.navigation.navigate('Main');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerElements}>
                    <Text style={styles.textPrice}> R$ {this.state.price}  </Text>
                    {
                        this.state.card.length > 1
                        ?
                        <View>
                            <Text style={styles.textSelect}>Adicione o cartão </Text>
                        </View>

                        :
                        (
                            <View> 
                                <Text style={styles.textSelect}> Finalize sua Compra :) </Text>
                            </View>
                        )
                    }
                    
                    <View style={styles.scrollViewHolder}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                        >
                            <FlatList
                                contentContainerStyle={styles.listItens}
                                data={this.state.card}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={this.renderItem}
                            />

                        </ScrollView>
                    </View>
                </View>
                <TouchableOpacity style={styles.buttonF} onPress={() => { this.goFinally() }}>
                    <Text> Finalizar Compra </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    containerElements: {
        backgroundColor: '#1ac6ff',
        padding: 20,
        borderBottomRightRadius: 60,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 10
    },

    containerCard: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textPrice: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: 'bold'
    },
    textSelect: {
        fontSize: 15,
        textAlign: 'right',
        padding: 2,
        marginTop: 10,
        color: 'white'
    },
    textCredit: {
        fontSize: 20,
        color: 'white'
    },
    textAdd: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    scrollViewHolder:
    {
        borderBottomWidth: 4,
        borderBottomColor: 'white',
        marginTop: 50
    },
    listItens: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        padding: 3,
        left: 4
    },
    buttonF: {
        backgroundColor: 'transparent',
        borderColor: '#1ac6ff',
        borderWidth: 3,
        padding: 10,
        borderRadius: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Buy;