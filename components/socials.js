import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,Dimensions, Platform } from 'react-native';
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

      _handlePressWhatsapp = () => {
          Linking.openURL("https://wa.me/2348142925299?text=Hey,%0D%0AI%20love%20your%20radio%0D%0AI'd%20like%20to%20place%20a%20song%20request")
      }


      _handlePressAfrica = () => {
        Linking.openURL('http://www.africa-online.com/');
    } 

      render(){

        return (
            <View style={styles.container}>
                
                <TouchableOpacity onPress={this._handlePressAfrica}>
                    <Image style={styles.tinyLogo} source={require('../assets/Africa.png')}/>
                </TouchableOpacity>

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
                <TouchableOpacity onPress={this._handlePressWhatsapp}>
                    <Image style={styles.tinyLogo} source={require('../assets/whatsapp.png')}/>
                </TouchableOpacity>

                <Text style={styles.footer}>All The Best in African Music & Beyond</Text>
    
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
    marginTop: Platform.OS === 'ios' ? hp('78%') : hp('80%'),
    marginBottom:0,
    height:hp('20%'), 
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
