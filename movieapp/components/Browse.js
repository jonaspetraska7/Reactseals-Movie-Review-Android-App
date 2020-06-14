import React, {Component} from 'react';  
import {StyleSheet, Text, View, ImageBackground, TouchableHighlight} from 'react-native';  
  
export default function Browse({navigation}) { 
    return ( 
    <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '100%'}}> 
      <View style={styles.main}>
      <TouchableHighlight onPress={() => navigation.navigate('Search')}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '300', width: 200, padding: 10, marginLeft: 50, marginVertical: 10, borderColor: 'white', borderRadius: 30, borderWidth: 1, textAlign: 'center' } }>
                  Search</Text>
        </TouchableHighlight>  
      </View> 
    </ImageBackground>
    );  
  }  

  const styles = StyleSheet.create({
    main: {
      padding: 30,
    }
  });