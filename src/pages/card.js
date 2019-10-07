import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { Storage } from '../services/storage'

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creditCard: '',
            dt: '',
            name: '',
            card: [],
            user: []
        }
    }

    componentDidMount() {
        this.loadItem();
    }
    saveCard = async (key, value) => {
        console.log('vamosssss ' + key + value)
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.log(error)
        }

        console.log('storge ' + await AsyncStorage.getItem('card'))
    };

    loadItem = async () => {
        const store = new Storage();
        const itemC = await store.getData('card');
        const user = await store.getData('user');

        if (itemC != null) {
            this.setState({
                card: JSON.parse(itemC),
                user: JSON.parse(user)
            });
        }
    }

    goCard = () => {
        this.props.navigation.navigate('CardView');
    }


    handleSubmit = () => {
        const date = [...this.state.card]
        const store = new Storage();

        date.push({
            name: this.state.name,
            creditCard: this.state.creditCard,
            dt: this.state.dt
        });


        store.saveData('card', JSON.stringify(date));
        this.goCard();
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.textCardTitle}> Cadastro do Cartão </Text>
                    <Image
                        source={require('../assets/card.png')}
                        style={{ width: 35, height: 30 }}
                    />
                </View>

                <View>
                    <Text style={styles.textCenter}> Nome do Titular </Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Ex: José Roberto Xavier'
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                    />

                    <Text style={styles.textCenter}> Numero do Cartão </Text>
                    <TextInputMask
                        style={styles.inputTextC}
                        placeholder='Ex: 3421 324314 35454'
                        type={'credit-card'}
                        options={{
                            obfuscated: false,
                            issuer: 'amex',
                            error: 'esta errado'
                        }}
                        value={this.state.creditCard}
                        onChangeText={text => {
                            this.setState({
                                creditCard: text
                            })
                        }}
                    />
                    <Text style={styles.textCenter}> Data de Vencimento </Text>
                    <TextInputMask
                        style={styles.inputTextD}
                        placeholder='Ex: 20/12/2022'
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={this.state.dt}
                        onChangeText={text => {
                            this.setState({
                                dt: text
                            })
                        }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.handleSubmit}
                >
                <Text style={styles.textC}> Cadastrar </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
        borderBottomRightRadius: 80,
        borderTopLeftRadius: 80,
        justifyContent: "center"
    },

    containerTitle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    textCardTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#1ac6ff'
    },
    textCenter: {
        fontSize: 18,
        padding: 4,
        marginTop: 10,
        fontWeight: 'bold'
    },
    inputText: {
        borderColor: '#1ac6ff',
        borderWidth: 3,
        borderRadius: 20
    },
    inputTextC: {
        borderColor: '#1ac6ff',
        borderWidth: 3,
        borderRadius: 20,
        width:'50%'
    },
    inputTextD: {
        borderColor: '#1ac6ff',
        borderWidth: 3,
        borderRadius: 20,
        width:'35%'
    },
    button:{
        backgroundColor:"#1ac6ff",
        marginTop: 20,
        borderRadius: 20,
        padding: 4
    },
    textC:{
        fontSize: 20,
        textAlign: 'center',
        color:'white',
        fontWeight:'bold',
        padding: 2
    }
});
