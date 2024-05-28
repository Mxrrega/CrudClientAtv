import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function Inserir() {

  const [ clientId, setClientId ] = useState(0);
  const [ clientName, setClientName ] = useState();
  const [ clientEmail, setClientEmail] = useState();
  const [ clienteGenere, setClienteGenere] = useState();

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function Cadastro() {
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
          <Text>Obrigado por se Cadastrar. Seu cadastro foi realizado com sucesso</Text> 
          <TouchableOpacity style={css.button} onPress={() => {setSucesso(false)}}>
            <Text style={css.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
        
        :
        <>
      <View style={css.inputContainer}>     
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
      </View>
      <TouchableOpacity style={css.button} onPress={Cadastro}>
        <Text style={css.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      </>
}
      { erro && <Text>Revise Cuidadosamente os campos!</Text>}
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerCadastro: {
    width: '100%',
    marginBottom: 20,
    marginTop: 40
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 40
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});