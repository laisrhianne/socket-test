import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://192.168.0.112:3333', {
    transports: ['websocket'],
    jsonp: false,
    auth: {
        token: 'Teste',
        cod_usuario: 130
    }
});

const Home: React.FC = () => {
    const [codUsuarioOrigem, setCodUsuarioOrigem] = useState('');
    const [codUsuarioDestino, setCodUsuarioDestino] = useState('');
    const [texto, setTexto] = useState('');

    useEffect(() => {
        socket.on('connect_error', (err) => {
            console.log(err.message);
        });
        socket.on('chat-private', ({ mensagem }) => console.log(mensagem));
        socket.on('group-message', ({ mensagem }) => console.log(mensagem));
    }, []);
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TextInput
                placeholder="Origem"
                value={codUsuarioOrigem}
                onChangeText={(text) => {
                    setCodUsuarioOrigem(text);
                }}
            />
            <TextInput
                placeholder="Destino"
                value={codUsuarioDestino}
                onChangeText={(text) => {
                    setCodUsuarioDestino(text);
                }}
            />
            <TextInput
                placeholder="Mensagem"
                value={texto}
                onChangeText={(text) => {
                    setTexto(text);
                }}
            />
            <Button
                title="Enviar"
                onPress={() => {
                    socket.emit('send-group-message', {
                        cod_grupo: 1,
                        cod_usuario_origem: codUsuarioOrigem,
                        cod_usuario_destino: codUsuarioDestino,
                        mensagem: texto
                    });
                }}
            />
            <Button
                title="Entrar em grupo"
                onPress={() => {
                    socket.emit('join-group', {
                        cod_grupo: 1,
                        username: 'Dev',
                        cod_usuario_origem: codUsuarioOrigem,
                        cod_usuario_destino: codUsuarioDestino,
                        mensagem: texto
                    });
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Home;
