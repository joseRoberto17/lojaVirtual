import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Storage } from '../services/storage'

export default class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: []
        }
    }

    componentDidMount() {
        this.loadItem();
    }

    goCard = () => {
        this.props.navigation.navigate('Card');
    }

    loadItem = async () => {
        const data = new Storage();
        const prod = await data.getData('card')

        if (prod != null) {
            this.setState({
                card: JSON.parse(prod)
            })
        }
        console.log("Itens carregados " + JSON.stringify(prod))
    }

    renderItem = ({ item }) => (
        <View style={styles.containerCard}>
            <View style={styles.containerInfo}>
                <Text style={styles.textName}> {item.name}</Text>
                <Text style={styles.textCredit}> {item.creditCard}</Text>
            </View>
            <TouchableOpacity style={styles.buttonRemove} onPress={() => { this.removeCard(item.name) }}>
                <Text style={styles.textRemove}> X </Text>
            </TouchableOpacity>
        </View>
    );

    removeCard = async (itemName) => {
        const store = new Storage();
        const data = this.state.card;


        const alterData = data.filter(function (e) {
            return e.name !== itemName
        });


        this.setState({
            card: alterData
        })
        await store.removeData('card', itemName);

        console.log("Alterou na View " + JSON.stringify(alterData));
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image
                        source={require('../assets/cardH.jpeg')}
                        style={{ width: 450, height: 250 }}
                    />
                </View>

                {this.state.card.length === 0
                    ?

                    <View style={styles.containerEmpty}>
                        <Text style={styles.empty}> Nenhum </Text>
                        <Image
                            source={require('../assets/card.png')}
                            style={{ width: 120, height: 100 }}
                        />
                        <Text style={styles.empty}> Cadastrado </Text>
                    </View>

                    : (


                        <ScrollView>
                            <View style={styles.containerList}>
                                <FlatList
                                    contentContainerStyle={styles.listItens}
                                    data={this.state.card}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this.renderItem}
                                />
                            </View>
                        </ScrollView>

                    )

                }
                <View>
                    <TouchableOpacity style={styles.card} onPress={() => { this.goCard() }}>
                        <Text style={styles.textCard}> Cadastre o Cartão Aqui </Text>
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
        flexDirection: "column",
        justifyContent: "space-between"
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
        borderBottomLeftRadius: 100,
        padding: 40
    },

    containerCard: {
        padding: 10,
        borderColor: "#03A9F4",
        borderWidth: 4,
        borderRadius: 18,
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    empty: {
        fontSize: 35,
        textAlign: "center",
        color: "#ff8533",
    },
    containerList: {
        flex: 1,
        padding: 10,
        marginTop: 7
    },
    containerInfo: {
        flexDirection: "column",
        padding: 5
    },
    buttonRemove: {
        backgroundColor: "red",
        borderRadius: 80,
        height: "40%"
    },
    textRemove: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        textAlign: "center"
    },
    textName: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textCredit: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        opacity: 0.3
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
})