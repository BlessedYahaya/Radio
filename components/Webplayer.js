import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Player extends Component{

    constructor(props){
        super(props);

        this._handlePressPlayRadio = this._handlePressPlayRadio.bind(this) 
        this._handlePressPower = this._handlePressPower.bind(this) 
        this._handlePressVolume = this._handlePressVolume.bind(this) 



    }

    componentWillMount(){
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
          });

          console.log(screenWidth)
    }

   

    _handlePressPlayRadio = () => {
       

    }


    

    _handlePressPower = () => {
        console.log("Power!!")
    } 
    
    _handlePressVolume = () => {
        console.log("Volume")
    }




































    render(){

        return (
      
             <View style={styles.container}>
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: "https://www.radioking.com/widgets/player/player.php?id=144518&c=%23d35400&c2=%23FFFFFF&ii=&p=1&pp=1&i=0&eq=1&po=1&t=1&f=v&v=2&s=0&li=0&h=365&l=470&a=0&plc=0&popup=0"}}
                    style = {{ width:1282}}
                />

            </View>


  
        )
    }
        
    

}

const styles = StyleSheet.create({
    container:{
        height:hp('83%'),
        width:wp('100%')

    },
  image: {
   
    resizeMode: "cover",
    justifyContent: "center",
   
    height:hp('83%'),
  },
  tinyIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
    marginTop:20,
  },
  smallIcon: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  tinyIconTouch:{
    width: 50,
    height: 50,
    marginRight: 10,
  },

  header:{
      color:'white',
      fontSize:20,
  
      justifyContent:'center',
      marginTop:10
  }
});
