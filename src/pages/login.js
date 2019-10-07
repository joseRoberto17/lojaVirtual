import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    TextInput,
    AsyncStorage,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import { Storage } from '../services/storage'
import api from '../services/api';
import { StackActions, NavigationActions, ThemeColors, ThemeContext } from 'react-navigation';

class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.containerImg}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={{ width: '50%', height: '50%' }}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.textWelcome}> Seja Bem-vindo  </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.props.navigation.navigate('SingIn')}}
                    >
                        <Text>Efetuar Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this.props.navigation.navigate('SingUp')}}
                    >
                        <Text>Novo? realize seu cadastro</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
        padding: 5
    },
    containerImg: {
        borderWidth: 6,
        borderColor: '#03A9F4',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    containerInput: {
        backgroundColor: 'white',
        padding: 20
    },
    textWelcome: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: '#03A9F4',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        textAlign: "center",
        padding: 5,
        color: "white"
    },
    inputText: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#03A9F4",
        padding: 10,
        borderRadius: 100
    },
    button: {
        marginTop: 10,
        padding: 15,
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "#03A9F4",
        alignItems: "center",
        left: 110,
        width: 150,
        marginBottom: 1,
        borderRadius: 100
    },
    textButton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#03A9F4"
    },
    textForgot:{
        textDecorationLine: 'underline',
        textAlign:'center'
    },
    hasErrors:{
        borderColor: 'red'
    }
})

export default Login;