import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {

  const [ clientes, setClientes ] = useState([]);
  const [ error, setError ] = useState( false );

  const [ clientId, setClientId ] = useState(0);
  const [ clientName, setClientName ] = useState();
  const [ clientEmail, setClientEmail] = useState();
  const [ clienteGenere, setClienteGenere] = useState();

  const[edicao, setEdicao] = useState(false);
  const[deleteResposta, setResposta] = useState(false);
  const[erro, setErro] = useState();

  async function getClientes()
  {
    await fetch('http://10.139.75.24:5251/api/Clients/GetAllClients',{
            method:'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => setClientes( json ))
        .catch(err => setError( true ) )
  }

  async function getCliente(id) {
    await fetch('http://10.139.75.24:5251/api/Clients/GetClientId/' + id,{
            method:'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
          setClientId(json.clientId);
          setClientName(json.clientName);
          setClientEmail(json.clientEmail);
          setClienteGenere(json.clienteGenere);
        })
  }

  async function editClient() {
    await fetch('http://10.139.75.24:5251/api/Clients/UpdateClients/' + clientId,{
            method:'PUT',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
              clientId: clientId,
              clientName: clientName,
              clientEmail: clientEmail,
              clienteGenere: clienteGenere
            })
        })
        .then((response) => response.json() )
        .then( json => console.log( json ) )
        .catch( err => console.log( err ) );
        getClientes();
        setEdicao(false);
  }

  function showAlert(id, clientName) {
    Alert.alert(
      '',
      'Deseja realmente excluir esse Cliente?',
      [
        { text: 'Sim', onPress: () => deleteCliente(id, clientName)},
        { text: 'Não', onPress: () =>('')},
      ],
      { cancelable: false}
    );
  }

  async function deleteCliente(id, clientName) {
    await fetch('http://10.139.75.24:5251/api/Clients/DeleteClients/' + id,{
            method:'DELETE',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
  })
  .then(res => res.json())
  .then(json => setResposta(json))
  .catch(err => setErro(true))

  if(deleteResposta == true)
    {
      Alert.alert(
        '',
        'Cliente ' + clientName + ' excluido com sucesso',
        [
          { text: '', onPress: () => ('')},
          { text: 'ok', onPress: () =>('')}
        ],
        { cancelable: false}
      );
      getClientes();
    }
    else{
      Alert.alert(
        '',
        'Cliente ' + clientName + ' não foi excluido',
        [
          { text: '', onPress: () => ('')},
          { text: 'ok', onPress: () =>('')}
        ],
        { cancelable: false}
      );
      getClientes();
    }
  }
  

  useEffect( () => {
    getClientes();
  }, [] )

  useFocusEffect(
    React.useCallback(() => {
      getClientes();
    }, [] )
  )


  return (
    <View style={styles.container}>
      { edicao == false ?
      <FlatList
      style={styles.flat}
      data={clientes}
      keyExtractor={(item) => item.clientId}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.userName}>{item.clientName}</Text>
          <TouchableOpacity style={styles.btnEdit} onPress={() => { setEdicao(true); getCliente(item.clientId) }}>
            <Text style={styles.btnLoginText}>EDITAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnDelete} onPress={() => showAlert(item.clientId, item.clientName) }>
            <Text style={styles.btnLoginText}>EXCLUIR</Text>
          </TouchableOpacity>
        </View>
      )}
    />
      :
      <View style={styles.editar}>
        <TextInput 
          inputMode="text"
          style={styles.input}
          value={clientName}
          onChangeText={(digitado) => setClientName(digitado)}
          placeholderTextColor="white"
        />
        <TextInput 
          inputMode="email"
          style={styles.input}
          value={clientEmail}
          onChangeText={(digitado) => setClientEmail(digitado)}
          placeholderTextColor="white"
        />
        <TextInput 
          inputMode="text"
          style={styles.input}
          value={clienteGenere}
          onChangeText={(digitado) => setClienteGenere(digitado)}
          placeholderTextColor="white"
        />
        <TouchableOpacity style={styles.btnCreate} onPress={() => editClient()}>
          <Text style={styles.btnLoginText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    padding: 16,
  },
  flat: {
    flex: 1,
    marginTop: 30,
  },
  itemContainer: {
    backgroundColor: '#1E1E1E', 
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  userName: {
    color: '#FFFFFF', 
    fontSize: 18,
    marginBottom: 8,
  },
  btnEdit: {
    backgroundColor: '#6200EE', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  btnDelete: {
    backgroundColor: '#B00020', 
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
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
  },
});