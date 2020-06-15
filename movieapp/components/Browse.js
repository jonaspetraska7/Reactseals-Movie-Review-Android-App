import React, {useState , useEffect} from 'react';  
import { ScrollView, StyleSheet, Text, View, ImageBackground, TouchableHighlight, Image, Modal, BackHandler, Alert} from 'react-native';  
import axios from 'axios';
  
export default function Browse({navigation}) {
    const imageroot = "https://image.tmdb.org/t/p/w185"
    const searchroot = "https://api.tmdb.org/3/movie/"
    const videoend = "/videos?api_key=d24c52c68333a633aa24bd3c71091439"
    const searchend = "?api_key=d24c52c68333a633aa24bd3c71091439"
    const [state, setState] = useState({
      genresDone: "false",
      moviesDone: "false",
      movies: [],
      genres: [],
      results: [],
    });

    const getGenres = () => {
      axios("https://api.tmdb.org/3/genre/movie/list?api_key=d24c52c68333a633aa24bd3c71091439").then(resp => {
        setState(prevState => { return { ...prevState, genres: resp.data.genres, genresDone: "true" }})})
    }

    const getMovies = genreID => {
      axios("https://api.themoviedb.org/3/discover/movie?api_key=d24c52c68333a633aa24bd3c71091439&with_genres=" + genreID).then(resp => {
        let temp = state.movies
        temp.push(resp.data.results)
        setState(prevState => {return { ...prevState, movies: temp}})})
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

    if(state.genresDone == "false"){getGenres()}
    if(state.genresDone == "true" && state.moviesDone == "false")
    {
      state.genres.forEach(i => {
        getMovies(i.id)
      });
      setState(prevState => {return { ...prevState, moviesDone: "true"}})
    }
    
    if(state.movies.length == state.genres.length){
      return ( 
        <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '100%'}}> 
            <View style={styles.main}>
              <TouchableHighlight onPress={() => navigation.navigate('Search')}>
                    <Text style={styles.search}>Search</Text>
              </TouchableHighlight>  
            </View>
          <ScrollView style={styles.results}>
              { state.genres.map((i,index) => (
                <View key={i.id} style={styles.result}>
                  <ScrollView style={styles.results} horizontal={true}>
                      { state.movies[index].map(ii => (
                        <TouchableHighlight key={ii.id} onPress={ () => getVideo(ii.id)}>
                          <View key={ii.id} style={styles.result}>
                            <Image 
                                source={{ uri: imageroot + ii.poster_path}}
                                style={{height: 250,width: 185}}
                                resizeMode="cover"/>
                          </View>
                        </TouchableHighlight>
                      ))}
                    </ScrollView> 
                  <Text style={styles.heading}>  {i.name}  </Text>
                </View>
              ))}
            </ScrollView> 
        </ImageBackground>
        );  
    }
    else{
      return ( 
        <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '100%'}}> 
          <View style={styles.main}>
            <TouchableHighlight onPress={() => navigation.navigate('Search')}>
                  <Text style={styles.search}>Search</Text>
            </TouchableHighlight>  
          </View>
          <ScrollView style={styles.results}>
              { state.genres.map((i,index) => (
                <View key={i.id} style={styles.result}>
                  {/*console.log(i.name + " " + i.id)*/} 
                  <Text style={styles.heading}>  {i.name}  </Text>
                </View>
              ))}
            </ScrollView> 
        </ImageBackground>
        );  
    }
  }  

  const styles = StyleSheet.create({
    main: {
      padding: 30,
    },
    search: {
      fontSize: 20, 
      color: 'white', 
      fontWeight: '300',
      width: 200, 
      padding: 10, 
      marginLeft: 50, 
      marginVertical: 10, 
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
      marginBottom: 0,
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
      marginTop: 20,
      marginHorizontal: 50,
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
      textAlign: 'center'
    },
    modal: {
      color: 'black'
    },
    poptxt: {
      color: 'white'
    }
  });