import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image } from 'react-native';



export default function App() {
  const apiurl = "https://api.themoviedb.org/3/search/movie?api_key=d24c52c68333a633aa24bd3c71091439"
  const imageroot = "http://image.tmdb.org/t/p/original"
  const [state, setState] = useState({
    s: "Enter a movie...",
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurl + "&query=" + state.s).then(({ data }) => {
      let results = data.results
      console.log(results)
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text>Use this cool app to search for movies</Text>
      <TextInput 
        style={styles.searchBox} 
        onChangeText={text => setState(prevState => { return {...prevState, s: text}})}
        onSubmitEditing={search}
        value={state.s}
        />
        <ScrollView style={styles.results}>
          {Object.keys(state.results).map(result => (
            <View style={styles.result}>
              {console.log(state.results[result].poster_path)}
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
            ))}

        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    padding: 20
  }
});
