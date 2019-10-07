import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Alert,
    TextInput,
    AsyncStorage,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import { Storage } from '../services/storage'

class SingUp extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            username: null,
            password: null,
            loading: false,
            errors: [],
            users: [],
            equals: []
        }
    }
    componentDidMount() {
        this.loadItem();
    }

    loadItem = async () => {
        const data = new Storage();
        const users = await data.getData('users');
        if (users !== null) {
            this.setState({
                users: JSON.parse(users)
            })
        }
        console.log("Itens carregados " + JSON.stringify(users))
    }
    _verificar = () =>{
        const {users, email, equals} = this.state;
        const alterData = users.filter(users => users.email === email);
        console.log("Tem esse intem? " + JSON.stringify(alterData));

        if (alterData.length >= 1) {
            this.setState({
                equals: alterData
            })
        }
        
        console.log("Funcionou equals? " + equals)

    }


    _handleSignUp = async () => {
        const { navigation } = this.props;
        const { email, username, password, equals } = this.state;
        const errors = [];
        Keyboard.dismiss();
        this.setState({
            loading: true
        })
        this._verificar();
        console.log("equals2 " + equals.length)
        setTimeout(() => {
            if (!email) errors.push('email');
            if (!username) errors.push('username');
            if (!password) errors.push('password');

            this.setState({ errors: errors, loading: false });

            if (!errors.length && !equals.length) {
                const date = [...this.state.users]
                const store = new Storage();
                    date.push({
                        email: this.state.email,
                        password: this.state.password,
                        username: this.state.username
                    });
                    store.saveData('users', JSON.stringify(date));
                
                console.log('alterdate ' + this.state.equals.length)
                Alert.alert(
                    'Cadastro com Sucesso :)',
                    'Sua Conta Criado com Sucesso.',
                    [
                        {
                            text: 'Continue', onPress: () => {
                                navigation.navigate('Login')
                            }
                        }
                    ],
                    { cancelable: false }
                )
            }else{
                if(errors.length){
                    alert('Erro no preenchimento')
                }
                if(equals.length >= 1){
                    alert('Usuário já Cadastrado')
                }
            }
        }, 3000);

    }
    goLogin = () => {
        this.props.navigation.navigate('Login')
    }


    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
        return (
            <KeyboardAvoidingView  style={styles.container}>
                <View style={styles.containerInput}>

                    <TextInput
                        style={[styles.inputText, hasErrors("email")]}
                        error={hasErrors("email")}
                        placeholder="Digite seu E-mail"
                        onChangeText={(username) => this.setState({ email: username })}
                        value={this.state.email}
                        //returnKeyType='next'
                        autoCorrect={false}
                    />

                    <TextInput
                        style={[styles.inputText, hasErrors("username")]}
                        error={hasErrors("username")}
                        placeholder="Digite seu Usuário"
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        //returnKeyType='next'
                        autoCorrect={false}
                    />
                    <TextInput
                        style={[styles.inputTextP, hasErrors("password")]}
                        error={hasErrors("password")}
                        placeholder="Digite sua Senha"
                        secureTextEntry
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        returnKeyType='go'
                        autoCorrect={false}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {this._verificar(), this._handleSignUp()}}
                    >
                        {loading ? <ActivityIndicator size="small" color="red" /> :
                            (<Text style={styles.textButton}>Finalizar Cadastro</Text>)
                        }
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.buttonBack} onPress={() => { this.goLogin() }}>
                        <Text style={styles.textBack}> Voltar </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent:'center',
        flexDirection: "column",
        padding: 5
    },

    hasErrors: {
        borderColor: 'red'
    },
    inputText: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#03A9F4",
        padding: 10,
        borderRadius: 100
    },
    inputTextP: {
        marginTop: 10,
        borderWidth: 2,
        borderColor: "#03A9F4",
        padding: 10,
        borderRadius: 100,
        width: 170
    },
    button: {
        marginTop: 10,
        padding: 15,
        backgroundColor: "#03A9F4",
        left: 100,
        width: 200,
        marginBottom: 3,
        borderRadius: 10
    },
    textButton: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center"
    },
    textBack: {
        textDecorationLine: 'underline',
        textAlign: 'center'
    },

    buttonBack:{
        marginTop: 50
    }

});

export default SingUp;