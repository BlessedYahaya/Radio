import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions , ToastAndroid, Platform, BackHandler, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default class Player extends Component{
        
        

        constructor(props){
            super(props);
    
           this.state = {
            playingStatus: "nosound",
            setIcon: require("../assets/play.png"),
            setMuteIcon: require("../assets/Mute.png"),
            isMuted: false
          };
    
    
    
        }


        
      
      async _playRecording() {
          if(Platform.OS === 'android'){
            ToastAndroid.show('Radio Buffering. Please wait....', ToastAndroid.LONG); 
            const { sound } = await Audio.Sound.createAsync(
                {uri:'https://www.radioking.com/play/worldbeat'},
                {
                  shouldPlay: true,
                  isLooping: false,
                  rate: 1.0,
                  shouldCorrectPitch: true,
                  volume: 1.0,
                  isMuted: false,
                },
                this._updateScreenForSoundStatus,
              );
              this.sound = sound;
      
              
              this.setState({
                playingStatus: 'playing',
                
              });
          } else{
            const { sound } = await Audio.Sound.createAsync(
                {uri:'https://www.radioking.com/play/worldbeat'},
                {
                  shouldPlay: true,
                  isLooping: false,
                  rate: 1.0,
                  shouldCorrectPitch: true,
                  volume: 1.0,
                  isMuted: false,
                },
                this._updateScreenForSoundStatus,
              );
              this.sound = sound;
      
              
              this.setState({
                playingStatus: 'playing',
                setIcon:require("../assets/pause.png") 
                
              });
          }
       
      }
      
      _updateScreenForSoundStatus = (status) => {

                if(Platform.OS === 'android'){
                    if (status.isPlaying && this.state.playingStatus !== "playing") {
                        ToastAndroid.show('Radio . Please wait....', ToastAndroid.LONG); 
                      this.setState({ playingStatus: "playing", setIcon:require("../assets/pause.png") });
                    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
                      this.setState({ playingStatus: "donepause", setIcon:require("../assets/play.png")  });
                      ToastAndroid.show('Radio Paused!', ToastAndroid.SHORT);
                    }
                }
                else{
                    if (status.isPlaying && this.state.playingStatus !== "playing") {
                        
                      this.setState({ playingStatus: "playing", setIcon:require("../assets/pause.png") });
                    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
                      this.setState({ playingStatus: "donepause", setIcon:require("../assets/play.png")  });
                    
                    }
                }


      };
      
      async _pauseAndPlayRecording() {
        if (this.sound != null) {
          if (this.state.playingStatus == 'playing') {
            console.log('pausing...');
            await this.sound.pauseAsync();
            console.log('paused!');
            this.setState({
              playingStatus: 'donepause',
              setIcon:require("../assets/play.png")
            });
          } else {
            console.log('playing...');
            await this.sound.playAsync();
            console.log('playing!');
            this.setState({
              playingStatus: 'playing',
              setIcon:require("../assets/pause.png")
            });
          }
        }
      }
      
      _syncPauseAndPlayRecording() {
        if (this.sound != null) {
          if (this.state.playingStatus == 'playing') {
            this.sound.pauseAsync();
          } else {
            this.sound.playAsync();
          }
        }
      }
      
      _playAndPause = () => {
        switch (this.state.playingStatus) {
          case 'nosound':
            this._playRecording();
            break;
          case 'donepause':
          case 'playing':
            this._pauseAndPlayRecording();
            break;
        }
      }

      _muteSound = () => {

          if (Platform.OS === 'ios'){
            if(this.state.playingStatus === "playing" && this.state.isMuted === false){
                this.sound.setVolumeAsync(0)
                this.setState({
                    isMuted: true,
                    setMuteIcon:require("../assets/Unmute.png")
                })
               
                  
              }else{
                this.sound.setVolumeAsync(1)
                this.setState({
                    isMuted: false,
                    setMuteIcon:require("../assets/Mute.png")
                })
               
              }

          }
          else
          {
            if(this.state.playingStatus === "playing" && this.state.isMuted === false){
                ToastAndroid.show('Radio Muted', ToastAndroid.SHORT);
                this.sound.setVolumeAsync(0)
                this.setState({
                    isMuted: true,
                    setMuteIcon:require("../assets/Unmute.png")
                })
                  
              }else{
                this.sound.setVolumeAsync(1)
                ToastAndroid.show('Radio Unmuted', ToastAndroid.SHORT);
                this.setState({
                    isMuted: false,
                    setMuteIcon:require("../assets/Mute.png")
                })
               
              }

          }
          
          
      }

      _powerDown = () =>{
          if(Platform.OS === 'android'){
            Alert.alert("Hold on!", "Are you sure you want to quit the radio?", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
              ]);
          } else{
            Alert.alert("Hold on!", "Are you sure you want to quit the radio?", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: () => {
                    Alert.alert("Thanks for listening", "Please press the home key to close app", [
                        {
                          text: "Cancel",
                          onPress: () => null,
                          style: "cancel"
                        },
                       
                      ]);
                } }
              ]);
              
          }
      }

    componentWillMount(){
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false
          });
    }


    render(){

        return (
      
            <ImageBackground style={styles.image} source={require('../assets/player.png')}>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.logoIcon} source={require('../assets/icon.png')}/>

                    </View>

                    <View style={styles.textContainer}> 
                            
                            <Text style={{textAlign:'center', color:'black', fontWeight: "bold"}}>Now Playing</Text>
                            <Text style={{textAlign:'center', color:'white', fontWeight: "bold", fontSize:15, paddingTop:20}}>All the best in African music and beyond</Text>
                            <Text style={{textAlign:'center', fontWeight: "bold", fontSize:10, paddingTop:2, color:'white'}}>worldbeatradio.com</Text>
                    </View>
                     
                    


                        
                    <View style={styles.container}>
                        
                        <TouchableOpacity style={styles.tinyIconTouch} onPress={this._muteSound} >
                            <Image style={styles.volumeIcon} source={this.state.setMuteIcon}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.smallIcon} onPress={this._playAndPause}>
                            <Image style={styles.smallIcon}  source={this.state.setIcon}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tinyIconTouch} onPress={this._powerDown} >
                            <Image style={styles.powerIcon} source={require('../assets/power.png')}  />
                        </TouchableOpacity>
                    </View>
                </View>
                
                
            </ImageBackground>
      
        )
    }
        
    

}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        justifyContent: 'center',
        marginTop:hp('60%'),

    },
    textContainer:{

        position:'absolute',
        justifyContent:'center',
        color:'white',
        marginTop:hp('45%'),
        marginLeft:wp('15%'),
        
    },
  image: {
   
    resizeMode: "cover",
    justifyContent: "center",
    marginTop:Platform.OS === 'ios' ? 0 : 20,
   
    height:hp('80%'),
  },
  volumeIcon: {
    width: 25,
    height: 25,
    marginRight: 20,
    marginTop:22,
  },
  powerIcon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop:22,
  },
  smallIcon: {
    width: 70,
    height: 70,
    marginRight: 20,
  },

  logoIcon:{
    width:70,
    height:70,

  },
  tinyIconTouch:{
    width: 50,
    height: 50,
    marginRight: 10,
  },
  imageContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },

  header:{
      color:'white',
      fontSize:20,
  
      justifyContent:'center',
      marginTop:10
  }
});
