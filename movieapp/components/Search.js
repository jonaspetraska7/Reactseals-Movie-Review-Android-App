import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal, ImageBackground } from 'react-native';

export default function Search({navigation}) {
  const apiurl = "https://api.themoviedb.org/3/search/movie?api_key=d24c52c68333a633aa24bd3c71091439"
  const imageroot = "https://image.tmdb.org/t/p/w185"
  const searchroot = "https://api.themoviedb.org/3/movie/"
  const videoend = "/videos?api_key=d24c52c68333a633aa24bd3c71091439"
  const searchend = "?api_key=d24c52c68333a633aa24bd3c71091439"
  const [state, setState] = useState({s: "Search...", results: [],});

  const search = () => {
    axios(apiurl + "&query=" + state.s).then(({ data }) => { setState(prevState => { return { ...prevState, results: data.results }})})
  }

  const getVideo = id => {
    axios(searchroot + id + videoend).then(({ data }) => {openDetails(id,data.results[0].key)})
  }

  const openDetails = (id,video) => {
    axios(searchroot + id + searchend).then(({ data }) => {
      navigation.navigate('Details', {
        original_title: data.original_title, 
        vote_average: data.vote_average,
        overview: data.overview,
        selectedVideo: video })}) 
  }

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '100%'}}>
    <View style={styles.container}>
      <TextInput 
        autoFocus={true}
        style={styles.searchBox} 
        onFocus={() => setState(prevState => { return {...prevState, s: ""}})}
        onChangeText={text => setState(prevState => { return {...prevState, s: text}})}
        onSubmitEditing={search}
        value={state.s}
        />
        <ScrollView style={styles.results}>
          {Object.keys(state.results).map(result => (
            <TouchableHighlight key={state.results[result].id} onPress={ () => getVideo(state.results[result].id)}>
            <View style={styles.result}>
              <Image 
                source={{uri: imageroot + state.results[result].poster_path}}
                style={{height: 500,width: '100%'}}
                resizeMode="cover"/>
              <Text style={styles.heading}>{state.results[result].original_title}</Text>
            </View>
            </TouchableHighlight>
            ))}
        </ScrollView>
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
    flex: 1,
    width: '100%'
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 0
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    padding: 25,
    width: '100%',
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
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 5
  },
  poptitle2: {
    color: 'white',
    fontSize: 20,
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
  trailer: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    width: '100%',
    padding: 10,
    marginVertical: 10,
    textAlign: 'center',
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
