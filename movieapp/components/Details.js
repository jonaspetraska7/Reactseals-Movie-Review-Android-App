import React, {Component} from 'react';  
import {StyleSheet, Text, View, ImageBackground, TouchableHighlight} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';  

export default function Details({route}) {
    const { original_title } = route.params;
    const { vote_average } = route.params;
    const { overview } = route.params;
    const { selectedVideo } = route.params;
    return ( 
        <View style={styles.popup}>
                  <Text style={styles.poptitle}>{original_title}</Text>
                  <Text style={styles.poptitle2}>Rating : {vote_average} </Text>
                  <Text style={styles.poptxt}>{overview}</Text>
                  <Text style={styles.trailer}>🍿 Movie Trailer 🍿</Text>
                  <YoutubePlayer height={'30%'} width={'100%'} videoId={selectedVideo}/>
                </View>
    )}  

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
  