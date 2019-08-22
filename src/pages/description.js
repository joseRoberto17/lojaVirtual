import React from 'react';

import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet, Image } from 'react-native';
import { Component } from 'react';
import { thisTypeAnnotation } from '@babel/types';



class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: []
        }
    }

    componentDidMount() {
        this.loadParams();
    }


    loadParams = async () => {
        const params = await this.props.navigation.state.params;
        this.setState({ params });
    }

    saveData = async () => {
        let prodS = await this.state.params;

        try {
            await AsyncStorage.setItem('prodS', JSON.stringify(prodS));
        } catch (error) {
            alert(error);

        }
        alert(JSON.stringify(prodS));
    }


    displayConfirm = async () => {
        try {
            let prodInfo = await AsyncStorage.getItem('prodS');
            let parse = await JSON.parse(prodInfo);

            alert('Adicionado com Sucesso' + JSON.stringify(parse));
        }
        catch (error) {
            alert(error);
        }
    }
    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.textPrice}>R$ {this.state.params.price}</Text>
                <View style={styles.containerSub}>
                <Image style={styles.avatar} source={this.state.params.img} />
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={this.saveData}>
                        <Text> Save aqui </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.displayConfirm}>
                        <Text> Confirmar </Text>
                    </TouchableOpacity>

                </View>
                    <View style={styles.containerInfo}>
                        <Text>Produto: {this.state.params.name}</Text>
                        <Text>Descrição: {this.state.params.description}</Text>
                    </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#03A9F4",
        alignItems: "center"
    },

    containerSub:{
        backgroundColor:"white",
        width:"80%",
        alignItems:"center",
        borderRadius: 18
    },

    containerInfo: {
        width: "100%",
        height:"100%",
        backgroundColor: "white",
        marginTop:10
    },

    containerButton: {
        width: "100%",
        height:"2%",
        marginTop: 30,
        backgroundColor:"white"
    },

    avatar: {
        height: 250,
        width: 250,
        padding: 15
    },

    button: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#03A9F4",
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },

    textPrice:{
        padding: 25,
        fontSize: 30,
        color:"white"
    }
});



export default Description;