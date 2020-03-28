import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Linking } from 'expo';




const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Socials extends Component {

    constructor(props) {
        super(props);
        this._handlePressInstagram = this._handlePressInstagram.bind(this) 
        this._handlePressYoutube = this._handlePressYoutube.bind(this) 
        this._handlePressTwitter = this._handlePressTwitter.bind(this) 
        this._handlePressFacebook = this._handlePressFacebook.bind(this) 
    }

    _handlePressFacebook = () => {
        Linking.openURL('https://www.facebook.com/worldbeatradio/ ');
      };

    _handlePressTwitter = () => {
        Linking.openURL('https://twitter.com/worldbeatradio');
      };

    _handlePressYoutube = () => {
        Linking.openURL('https://www.youtube.com/channel/UCsRWm1k72VVTB_dEs4fMzvQ');
      };

    _handlePressInstagram = () => {
        Linking.openURL('https://www.instagram.com/worldbeatradio/?hl=en');
      };

      _handlePressPower = () => {
        console.log("Welcome!!")
    } 

      render(){

        return (
            <View style={styles.container}>
    
       
                <TouchableOpacity  onPress={this._handlePressFacebook}>
                    <Image style={styles.tinyLogo} source={require('../assets/facebook.png')}/>
                </TouchableOpacity>
                    
                <TouchableOpacity  onPress={this._handlePressTwitter}>
                    <Image style={styles.tinyLogo} source={require('../assets/twitter.png')}/>
                </TouchableOpacity>
                    
                <TouchableOpacity onPress={this._handlePressYoutube} >
                    <Image style={styles.tinyLogo} source={require('../assets/youtube.png')}/>
                </TouchableOpacity>
    
                <TouchableOpacity onPress={this._handlePressInstagram}>
                    <Image style={styles.tinyLogo} source={require('../assets/instagram.png')}/>
                </TouchableOpacity>

                <Text style={styles.footer}>Share</Text>
    
            </View>
    
    

      
    
    )

        }

}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor: 'black',
    justifyContent: 'center',

    flexDirection:'row', 
    alignContent:'center', 
    backgroundColor:'black', 
    marginTop:hp('80%'),
    height:hp('17%'), 
    width:wp('100%'),
  },
  tinyLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: '50%'
  },
  footer:{
      color:'white',
      position:'absolute',
      marginTop:'20%'
  }
});
