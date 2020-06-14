import React, {Component} from 'react';  
import {Text, View, ImageBackground, TouchableHighlight} from 'react-native';  
  
export default function Welcome({navigation}) { 
    return ( 
    <ImageBackground source={require('../assets/bg1.jpg')} style={{width: '100%', height: '100%'}}> 
      <View style={{ flex: 1, justifyContent: 'center', padding: 30 }}>  
        <Text style={{ color: '#e4feff', textAlign: 'center', fontSize: 37, fontWeight: '700', paddingBottom: 20}}>
            ReactSeals Movie Review App
        </Text>
        <TouchableHighlight onPress={() => navigation.navigate('Browse')}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '300', width: 200, padding: 10, marginLeft: 50, marginVertical: 10, borderColor: 'white', borderRadius: 30, borderWidth: 1, textAlign: 'center' } }>
                  Browse</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => navigation.navigate('Welcome')}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '300', width: 200, padding: 10, marginLeft: 50, marginVertical: 10, borderColor: 'white', borderRadius: 30, borderWidth: 1, textAlign: 'center' } }>
                  Login</Text>
        </TouchableHighlight>
      </View> 
    </ImageBackground>
    );  
  }  