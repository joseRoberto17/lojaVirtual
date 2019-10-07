import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet, Image } from 'react-native';
import { Component } from 'react';
import { Storage } from '../services/storage'

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: [],
            prodS: [],
            equals:[],
            idUser: 0
        }
    }

    componentDidMount() {
        this.loadParams();
        this.loadItem();
    }


    loadParams = async () => {
        const { item, id } = await this.props.navigation.state.params;
        console.log("Teste id " + id)
        this.setState({
            params: item,
            idUser: id
        });
    }

    loadItem = async () => {
        const data = new Storage();
        const prod = await data.getData('prodS');

        let id = this.state.params.id;
        const alterData = JSON.parse(prod).filter(prodS => prodS.id === id);
        console.log("Tem esse intem? " + JSON.stringify(alterData));

        if (prod != null) {
            this.setState({
                prodS: JSON.parse(prod),
                equals: alterData
            })
        }
        console.log("Itens carregados " + JSON.stringify(prod))
    }

    handleSubmit = () => {
        const date = [...this.state.prodS]
        const user = [this.state.idUser]
        const store = new Storage();
        
        if (this.state.equals.length >= 1) {
            alert('item no carrinho')
        } else {
            date.push({
                id: this.state.params.id,
                name: this.state.params.name,
                description: this.state.params.description,
                price: this.state.params.price,
                img: this.state.params.img,
                quantity: this.state.params.quantity + 1,
                idUser: user
            });
            store.saveData('prodS', JSON.stringify(date));
            alert("Item adicionado ao carrinho");
        }
        console.log('alterdate ' + this.state.equals.length)
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.textPrice}>R$ {this.state.params.price}</Text>
                <View style={styles.containerSub}>
                    <Image style={styles.avatar} source={this.state.params.img} />
                </View>
                <View style={styles.containerInfo}>
                    <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                        <Text style={styles.textSave}> Adicionar </Text>
                    </TouchableOpacity>

                    <Text style={styles.textProd}> {this.state.params.name}</Text>
                    <Text style={styles.textDes}>Descrição: {this.state.params.description}</Text>
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
        justifyContent: "space-between",
        marginTop: 10,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },

    containerSub: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 3,
        borderRadius: 150,
        width: "90%",
        left: 20
    },

    containerInfo: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 10
    },

    textProd: {
        color: "#000066",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 5
    },

    avatar: {
        height: 250,
        width: 250,
        padding: 15,
        borderRadius: 100
    },

    button: {
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "#03A9F4",
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5
    },

    textPrice: {
        padding: 15,
        fontSize: 30,
        color: "white",
        textAlign: "center"
    },
    textSave: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#03A9F4"
    },
    textDes: {
        fontSize: 15,
        textAlign:'justify',
        marginTop: 7,
        padding: 15
    }
});



export default Description;

/*
    saveData = async () => {
        const prodS =  this.state.params;
        const valor = 'prodS';
        const newArray = [];
        const itemCart = await AsyncStorage.getItem('prodS');

        if(itemCart != null){
        newArray.push(JSON.parse(itemCart))
        }
         newArray.push(JSON.stringify(prodS))

        try {
            await AsyncStorage.setItem(valor, newArray);
            console.log(await AsyncStorage.getItem('prodS'))
        } catch (error) {
            alert(error);
        }
        alert(JSON.stringify(prodS));
        console.log("new Array" + newArray);
    }



    saveData = async () => {
        const prodS =  this.state.params;
        const valor = 'prodS';
        const newArray = [];
        let i = 0;
        let idProdS = prodS.id;
        const itemCart = await AsyncStorage.getItem('prodS');
        i++;
        prodS.quantity = i;
        const item = await AsyncStorage.getItem('prodS');
        const itenCart = item ? JSON.parse(item).push(prodS) : [prodS];

       // const alterData = JSON.parse(itemC).filter(itemC => itemC.id === id);

        try {
            await AsyncStorage.setItem(valor, JSON.stringify(itenCart));
            const p = parseFloat(prodS.price);
            this.props.navigation.navigate('Teste', {i: i, p: p});
            console.log("Salvo " + await AsyncStorage.getItem('prodS'))
        } catch (error) {
            alert(error);
        }
        console.log("item " + item);
        console.log("itemCart " + JSON.stringify(itenCart));
        console.log("parse " + JSON.parse(item));
        console.log("prodS " + JSON.stringify(prodS));
        console.log("i " + i);
        console.log("id ProdS " + idProdS);
        console.log("param p " + p)
    }

*/