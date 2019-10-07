import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Alert} from 'react-native';

class Forgot extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false,
            errors: []
        }
    }

    _handleForgot = async () => {
        const userInfo = []
        userInfo.push({
            id: 1, email: 'root', password: '123'
        })
        const {navigation} = this.props;
        const {email} = this.state;
        const errors = [];
        Keyboard.dismiss();
        this.setState({
            loading: true
        })
        setTimeout(() => {
        if(email !== userInfo[0].email){
            errors.push('email');
        }
        this.setState({errors: errors, loading: false});
        if(!errors.length){
            Alert.alert(
                'Senha Enviado com Sucesso :)',
                'Por favor verifique seu e-mail.',
                [
                    {
                        text: 'OK', onPress: () => {
                            navigation.navigate('Login')
                        }
                    }
                ],
                {cancelable: false}
            )
        }else{
            Alert.alert(
                'Erro :(',
                'Por favor verifique se digitou o e-mail corretamente.',
                [
                    {
                        text: 'Tente Novamente'
                    }
                ],
                {cancelable: false}
            )
        }

    }, 3000);

    }

    goLogin = () =>{
        this.props.navigation.navigate('Login')
    }

    render() {
        const { loading, errors } = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
        return (
            <KeyboardAvoidingView style={styles.container}>
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

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._handleForgot}
                    >
                        {loading ? <ActivityIndicator size="small" color="red" /> :
                           (<Text style={styles.textButton}>Entrar</Text>)
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {this.goLogin()}}>
                       <Text style={styles.textBack}> Voltar </Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
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
    textBack:{
        textDecorationLine: 'underline',
        textAlign:'center'
    }

});

export default Forgot;