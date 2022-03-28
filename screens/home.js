import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    FlatList, StyleSheet, Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';



const Home = () => {

    const [nome, setNome] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [users, setUsers] = useState([]);

    const route = useRoute();
    const navigation = useNavigation();

    useEffect(() => {
        axios.get('http://10.0.2.2:3000/users')
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((error) => console.log(error));
    }, [route.params?.res])

    const salvarUsuario = () => {
        axios.post('http://10.0.2.2:3000/users', {
            nome: nome,
            localizacao: localizacao
        }).then((res) => {
            const tempList = [...users, res.data];
            setUsers(tempList);

            alert('Salvo com sucesso!');
        }).catch((error) => {
            alert('Erro ao salvar: ' + error);
        })
    }

    const removerUsuario = (idUsuario) => {
        axios.delete('http://10.0.2.2:3000/users/' + idUsuario)
            .then((res) => {
                const tempList = users.filter((item) => item.id != idUsuario);
                setUsers(tempList);

                alert('Removido com suesso!')
            }).catch((error) => {
                alert('Erro ao remover: ' + error)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>CRUD USUÁRIOS</Text>

            <TextInput style={styles.input} placeholder='Nome do Usuário'
                onChangeText={(value) => setNome(value)} />

            <TextInput style={styles.input} placeholder='Localidade'
                onChangeText={(value) => setLocalizacao(value)} />

            <TouchableOpacity style={styles.button} onPress={salvarUsuario}>
                <Text style={styles.txtButton}>Cadastrar</Text>
            </TouchableOpacity>

            <FlatList keyExtractor={(item, index) => item.id.toString()} style={{ marginTop: 10 }} data={users} renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { usuario: item })}>
                        <Text>{item.nome} - {item.localizacao}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red' }} onPress={() => removerUsuario(item.id)}>Apagar</Text>
                </View>
            )} />
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

export default Home;
