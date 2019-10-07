import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

class ListCart extends React.Component {

    render() {
        const { item } = this.props;

        return (
            <View style={styles.containerProduct}>
                <View style={styles.imgContainer} >
                    <Image style={styles.avatar} source={item.img} />
                </View>

                <View style={styles.buttonContainer}>

                    <Text style={styles.productTitle}> {item.name}</Text>
                    <Text style={styles.textPrice}>R$ {item.price}</Text>
                    <View style={styles.buttonAlign}>
                        <TouchableOpacity style={styles.productButtonAdd} title="+" onPress={this.props.onAdd}>
                            <Text style={styles.buttonTitle}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.textQuantity}>{item.quantity}</Text>
                        <TouchableOpacity style={styles.productButtonRemove} title="-" onPress={this.props.onSubtract}>
                            <Text style={styles.buttonTitle}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerProduct: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 10,
        borderColor: "white",
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
        borderRadius: 100,
        width: "20%",
        height: "55%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    productButtonRemove: {
        backgroundColor: "#ff5c33",
        borderRadius: 100,
        width: "20%",
        height: "55%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonTitle: {
        textAlign: "center",
        fontSize: 27,
        fontWeight: 'bold',
        color: "#000066"
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
    }

})

export default ListCart;