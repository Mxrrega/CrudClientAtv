import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Inserir() {

  const [ clientId, setClientId ] = useState(0);
  const [ clientName, setClientName ] = useState();
  const [ clientEmail, setClientEmail] = useState();
  const [ clienteGenere, setClienteGenere] = useState();

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function Cadastro() {
    if ( !clientName || !clientEmail || !clienteGenere) {
      Alert.alert('Erro', 'Por Favor, preencha todos os campos.');
      return;
    }

    await fetch('http://10.139.75.24:5251/api/Clients/InsertClients',{
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:JSON.stringify(
            {
              clientId: clientId,
              clientName: clientName,
              clientEmail: clientEmail,
              clienteGenere: clienteGenere
            }
        )
        
    })
    .then(res=> (res.ok == true ) ? res.json() : false)
    .then(json => (json.clientId ? setSucesso(true) : setErro(true)) )
    .catch(err => setErro( true ) )
  };

  return (
    <View style={css.container}>
        { sucesso ? 
        <View style={css.containerCadastro}>
          <Text style={css.textCadastro}>Obrigado por se Cadastrar. Seu cadastro foi realizado com sucesso</Text> 
          <TouchableOpacity style={css.btnCreate} onPress={() => {setSucesso(false), setClientName(''), setClientEmail(''), setClienteGenere('')}}>
            <Text style={css.btnLoginText}>Voltar</Text>
          </TouchableOpacity>
        </View>
        
        :
      <View style={css.editar}>     
        <TextInput
          style={css.input}
          placeholder='Nome Cliente'
          value={clientName}
          onChangeText={setClientName}
        />
        <TextInput
          style={css.input}
          placeholder='Email Cliente'
          value={clientEmail}
          onChangeText={setClientEmail}
        />
        <TextInput
          style={css.input}
          placeholder='Genero Cliente'
          value={clienteGenere}
          onChangeText={setClienteGenere}
        />
      
      <TouchableOpacity style={css.btnCreate} onPress={Cadastro}>
        <Text style={css.btnLoginText}>Cadastrar</Text>
      </TouchableOpacity>
      </View>
}
      { erro && <Text>Revise Cuidadosamente os campos!</Text>}
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212', 
    padding: 16,
  },
  containerCadastro: {
    marginTop: 50,
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 30,
    marginVertical: 8,
  },
  textCadastro: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 30,
  },
  btnLoginText: {
    color: '#FFFFFF', 
    fontSize: 16,
    textAlign: 'center',
  },
  editar: {
    backgroundColor: '#1E1E1E', 
    padding: 16,
    borderRadius: 8,
    marginTop: 60
  },
  input: {
    backgroundColor: '#333333', 
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
  },
  btnCreate: {
    backgroundColor: '#03DAC9', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
     marginTop: 30
  },
});