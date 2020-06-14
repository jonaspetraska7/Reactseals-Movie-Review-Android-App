import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal, ImageBackground } from 'react-native';



export default function Browse() {
  const apiurl = "https://api.themoviedb.org/3/search/movie?api_key=d24c52c68333a633aa24bd3c71091439"
  const imageroot = "https://image.tmdb.org/t/p/original"
  const searchroot = "https://api.themoviedb.org/3/movie/"
  const searchend = "?api_key=d24c52c68333a633aa24bd3c71091439"
  const [state, setState] = useState({
    s: "Search...",
    results: [],
    selected: "undefined"
  });

  const search = () => {
    axios(apiurl + "&query=" + state.s).then(({ data }) => {
      let results = data.results
      //console.log(results)
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }

  const openPopup = id => {
    axios(searchroot + id + searchend).then(({ data }) => {
      let result = data
      //console.log(result)
      setState(prevState => {
        return {...prevState, selected: result }
      })
    })
  }

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '100%'}}>
    <View style={styles.container}>
      <TextInput 
        autoFocus={true}
        key="input1"
        style={styles.searchBox} 
        onFocus={() => setState(prevState => { return {...prevState, s: ""}})}
        onChangeText={text => setState(prevState => { return {...prevState, s: text}})}
        onSubmitEditing={search}
        value={state.s}
        />
        <ScrollView style={styles.results}>
          {Object.keys(state.results).map(result => (
            <TouchableHighlight key={state.results[result].id} onPress={ () => openPopup(state.results[result].id)}>
            <View style={styles.result}>
              {/*console.log(state.results[result].poster_path)*/}
              <Image 
                source={{ uri: imageroot + state.results[result].poster_path}}
                style={{
                  height: 200,
                  width: '100%'
                }}
                resizeMode="cover"
              />
              <Text style={styles.heading}>
                {state.results[result].original_title}
              </Text>
            </View>
            </TouchableHighlight>
            ))}

        </ScrollView>

        <Modal 
          animationType="fade"
          transparent={false}
          visible={ (state.selected == "undefined" ) ? false : true }
        >
          {/*console.log(state.selected.original_title)*/}
          <View style={styles.popup}>
            <Text style={styles.poptitle}>{state.selected.original_title}</Text>
            <Text style={styles.poptitle}>Rating : {state.selected.vote_average} </Text>
            <Text style={styles.poptxt}>{state.selected.overview}</Text>
            <TouchableHighlight
            onPress= { () => setState(prevState => {
              return {...prevState, selected: "undefined" }
            })}>
              <Text style={styles.backBtn}>Back</Text>
            </TouchableHighlight>
          </View>
        </Modal>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
    width: 200,
    padding: 10,
    margin: 60,
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    textAlign: 'center' 
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    padding: 25,
    color: 'white',
    backgroundColor: 'black'
  },
  popup: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  poptitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  backBtn: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
    width: 200,
    padding: 10,
    margin: 60,
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    textAlign: 'center' 
  },
  modal: {
    color: 'black'
  },
  poptxt: {
    color: 'white'
  }
});
