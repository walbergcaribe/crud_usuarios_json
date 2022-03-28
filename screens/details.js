import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet, Text,
    TextInput,
    TouchableOpacity, View
} from 'react-native';


const Details = () => {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        const usuario = route.params.usuario;
        setId(usuario.id);
        setNome(usuario.nome);
        setLocalizacao(usuario.localizacao);
    }, [])

    const atualizar = () => {
        console.log("####### ID: " + id)
        console.log("####### NOME: " + nome)
        console.log("####### LOCALIZACAO: " + localizacao)

        axios.patch('http://10.0.2.2:3000/users/' + id, {
            nome,
            localizacao
        }).then((res) => {
            alert('Atualizado com sucesso!');
            navigation.navigate('Home', { res });
        }).catch((error) => {
            alert('Erro ao atualizar: ' + error);
        });
    }

    return (
        <View style={styles.container}>
            <TextInput value={nome} onChangeText={(value) => setNome(value)} style={styles.input} placeholder='Digite o nome...' />
            <TextInput value={localizacao} onChangeText={(value) => setLocalizacao(value)} style={styles.input} placeholder='Digite o localização...' />
            <TouchableOpacity style={styles.button} onPress={atualizar}>
                <Text style={styles.txtButton}>Atualizar</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({

    container: {
        padding: 10
    },

    text: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    input: {
        borderWidth: 1,
        borderColor: '#545454',
        marginVertical: 10,
        padding: 5,
        height: 45,
        fontSize: 16
    },

    txtButton: {
        fontSize: 16,
        fontWeight: '600'
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Details;
