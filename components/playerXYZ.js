import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions , ToastAndroid, Platform, BackHandler, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';
import * as Font from 'expo-font';
import Toast from 'react-native-tiny-toast'


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
let timer

export default class Player extends Component{
        
        

        constructor(props){
            super(props);
    
           this.state = {
            playingStatus: "nosound",
            setIcon:require("../assets/play.png"),
            setMuteIcon: require("../assets/Mute.png"),
            isMuted: false,
            visible:false,
            message:"Radio Buffering...Please wait",
            defaultBackgroundImaage: require('../assets/player.png'),
            track: {}

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
                setIcon:require("../assets/pause.png"),

                
              });
          } else{
              this.setState({
                 message:"Radio Buffering...Please wait",
                  visible:true,   
              })
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
                setIcon:require("../assets/pause.png"),
               
                
              });
          }
       
      }
      
      _updateScreenForSoundStatus = (status) => {

                if(Platform.OS === 'android'){
                    if (status.isPlaying && this.state.playingStatus !== "playing") {
                     
                      this.setState({ playingStatus: "playing", setIcon:require("../assets/pause.png") });
                    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
                      this.setState({ playingStatus: "donepause", setIcon:require("../assets/play.png")  });
                      
                    }
                }
                else{
                    if (status.isPlaying && this.state.playingStatus !== "playing") {
                        
                      this.setState({ playingStatus: "playing", setIcon:require("../assets/pause.png"), });
                    } else if (!status.isPlaying && this.state.playingStatus === "playing") {
                      this.setState({ playingStatus: "donepause", setIcon:require("../assets/play.png")  });
                    
                    }
                }
      };
      
      async _pauseAndPlayRecording() {
            if(Platform.OS === 'ios'){
                if (this.sound != null) {
                    if (this.state.playingStatus == 'playing') {
                      await this.sound.pauseAsync();
                      this.setState({
                        playingStatus: 'donepause',
                        setIcon:require("../assets/play.png"),
                        message:"Radio Paused",
                        visible: true,
                      });
                    } else {
                      console.log('playing...');
                      await this.sound.playAsync();
                      console.log('playing!');
                      this.setState({
                        playingStatus: 'playing',
                        setIcon:require("../assets/pause.png"),
                        visible: false,
                      });
                    }
                  }

            }else{

                if (this.sound != null) {



                    if (this.state.playingStatus == 'playing') {
                      console.log('pausing...');
                      await this.sound.pauseAsync();
                      ToastAndroid.show('Radio Paused', ToastAndroid.SHORT); 
                      this.setState({
                        playingStatus: 'donepause',
                        setIcon:require("../assets/play.png"),
                      });
                    } else {
                      console.log('playing...');
                      await this.sound.playAsync();
                      this.setState({
                        playingStatus: 'playing',
                        setIcon:require("../assets/pause.png"),
                        visible: false,
                      });
                    }
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

      async getMusicFromApiAsync() {
        try {
          let response = await fetch('https:radioking.com/widgets/currenttrack.php?radio=144518&format=json');
          let deets = await response.json();
          let cover = deets.cover
          
          this.setState({
              track: deets,
              
          })

          return deets.duration
          
          
        } catch (error) {
          console.error(error);
        }
    }

      _muteSound = () => {
        console.log("Func called")
        if(this.sound.setVolumeAsync !== undefined){
            if (Platform.OS === 'ios'){
                if(this.state.playingStatus === "playing" && this.state.isMuted === false){
                    this.setState({
                        isMuted: true,
                        setMuteIcon:require("../assets/Unmute.png"),
                    }, () => this.sound.setVolumeAsync(0))  
                  }else{
                    this.sound.setVolumeAsync(1)
                    this.setState({
                        isMuted: false,
                        setMuteIcon:require("../assets/Mute.png"),   
                    })  
                }
              }  else
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
              
        }else{
            console.log('Time out!!!')
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
                { text: "YES", onPress: () => {

                    Audio.setAudioModeAsync({
                        staysActiveInBackground: false,
                    })
                    BackHandler.exitApp() 
                    
                    } }
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

    async componentWillMount(){ 

        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            playThroughEarpieceAndroid: false
          });
          
          

         
    }

    async componentDidMount(){

        // await Font.loadAsync({
        //     'khand-bold': require('../assets/fonts/khand-semibold.ttf'),
        //     'khand-light': require('../assets/fonts/khand-light.ttf'),
        //     'khand-regular': require('../assets/fonts/khand-regular.ttf'),
        //   }, this.setState({fontLoaded:true}));

        let timer = await this.getMusicFromApiAsync()
        setInterval(() => timer = this.getMusicFromApiAsync(), timer)   
    }


    render(){

        return (

            <View style={styles.mainContainer}>
      
            <Image style={styles.image} source={this.state.track.cover === null || undefined ? this.state.defaultBackgroundImaage : {uri:this.state.track.cover}} />
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.logoIcon} source={require('../assets/icon.png')}/>

                    </View>
                    

                    <View style={styles.textContainer}> 

                                <Text style={{textAlign:'center',  color:'red',fontSize:15, fontWeight: "bold"}}>Now Playing</Text>
                                <Text style={{textAlign:'center',  fontWeight: "bold",   fontSize:35, paddingTop:20}}>{this.state.track.title}</Text>
                                <Text style={{textAlign:'center', fontWeight: "bold",  fontSize:15, paddingTop:2, }}>{this.state.track.artist}</Text>
                    </View>
                    
                    <Toast
                        visible={this.state.visible}
                        position={50}
                        onHidden={()=>{
                        // onHidden
                        }}>{this.state.message}
                    </Toast>
              
                    <View style={styles.container}>
                        
                        <TouchableOpacity style={styles.tinyIconTouch} onPress={
                            () => {
                                if(this.sound !== undefined || null){
                                    this._muteSound()
                                }else{
                                    null
                                    console.log("Sound is null")
                                }
                            }
                            
                            } >
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
            </View>
      
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row', 
        justifyContent: 'center',
        marginTop:hp('55%'),

    },
    textContainer:{
        position:'absolute',
        justifyContent:'center',
        color:'white',
        marginTop:hp('40%'),
        borderWidth:7,
        borderColor:'transparent',
        marginLeft:wp('20%'),
        width:wp('60%')
        
    },
    mainContainer:{
        justifyContent: "center",
        marginTop:Platform.OS === 'ios' ? 0 : hp('3%'),
        // backgroundColor: 'rgba(0,0,0,0.3)',
        height:Platform.OS === 'ios' ? hp('80%') : hp('77%'),
    },
  image: {
   
    resizeMode: "cover",
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5
   
  },
  volumeIcon: {
    width: 25,
    height: 25,
    marginRight: 20,
    marginTop:22,
    opacity:0.9,
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
    width:75,
    height:75,

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
  },
   
});
