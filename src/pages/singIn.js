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

class SingIn extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors:[]
        }
    }

    _login = async () => {
        const userInfo = []
        userInfo.push({
            id: 1, email: 'root', password: '123'
        })
        const id = userInfo[0].id;
        const {navigation} = this.props;
        const {email, password} = this.state;
        const errors = [];
        Keyboard.dismiss();
        this.setState({
            loading: true
        })
        setTimeout(() => {
        if(email !== userInfo[0].email){
            errors.push('email');
        }

        if(password !== userInfo[0].password){
            errors.push('password');
        }
        if(errors.length){
            this.setState({errors: errors, loading: false});
            alert("Usuário ou senha incorreta :( ")
        }else{
            this.setState({loading: false})
            navigation.navigate('Main')
        }

        /*

        if (userInfo[0].email === email && userInfo[0].password === password) {
            
            try {
                await api.post('/', {
                  username: this.userInfo
                });
            
            const data = new Storage();
            data.saveData('user', JSON.stringify(userInfo));
            data.saveData('userLog', JSON.stringify(id));

            if(this.state.loading === true){
                this.props.navigation.navigate('Main')
            }else{
                alert('Falha ao logar');
            }
            
            
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Main' }),
                    ],
                  });
                  this.props.navigation.dispatch(resetAction);
                

              } catch (_err) {
                console.log(_err);
              } 

        } else {
            alert('username or password is incorrect')
            this.setState({loading: false})
        }
        */
    }, 3000);

    }

    goForgot = () => {
        this.props.navigation.navigate('Forgot');
    }

    render() {
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null; 
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                
                <View style={styles.containerInput}>
                    <TextInput
                        style={[styles.inputText, hasErrors("email")]}
                        error={hasErrors("email")}
                        placeholder="Digite seu Usuário"
                        onChangeText={(username) => this.setState({ email: username })}
                        value={this.state.email}
                        //returnKeyType='next'
                        autoCorrect={false}
                    />
                    <TextInput
                        style={[styles.inputText, hasErrors("password")]}
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
                        onPress={this._login}
                    >
                        {loading ? <ActivityIndicator size="small" color="red" /> :
                           (<Text style={styles.textButton}>Entrar</Text>)
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.goForgot()}}>
                       <Text style={styles.textForgot}> Esqueceu a senha? </Text>
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

export default SingIn;