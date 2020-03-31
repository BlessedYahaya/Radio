import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Dimensions , ToastAndroid, Platform, BackHandler, Alert} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Audio } from 'expo-av';
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


            if(Platform === 'ios'){
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
                      ToastAndroid.show('Radio Paused', ToastAndroid.LONG); 
                      this.setState({
                        playingStatus: 'donepause',
                        setIcon:require("../assets/play.png"),
                        
                      });
                    } else {
                      console.log('playing...');
                      await this.sound.playAsync();
                      ToastAndroid.show('Radio Paused', ToastAndroid.LONG); 
                      console.log('playing!');
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

    componentWillMount(){

       
        

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
        let timer = await this.getMusicFromApiAsync()

        setInterval(() => timer = this.getMusicFromApiAsync(), timer)

        
    }


    render(){

        return (
      
            <ImageBackground style={styles.image} source={{uri:this.state.track.cover}}>
                <View style={styles.redCover}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.logoIcon} source={require('../assets/icon.png')}/>

                    </View>
                    

                    <View style={styles.textContainer}> 
                            
                            <Text style={{textAlign:'center',  color:'black', fontWeight: "bold"}}>Now Playing</Text>
                            <Text style={{textAlign:'center', color:'white', fontWeight: "bold", fontSize:20, paddingTop:20}}>{this.state.track.title}</Text>
                            <Text style={{textAlign:'center', fontWeight: "bold", fontSize:10, paddingTop:2, color:'white'}}>{this.state.track.artist}</Text>
                    </View>

                    
                    <Toast
                        visible={this.state.visible}
                        position={50}
                        onHidden={()=>{
                        // onHidden
                        }}>{this.state.message}
                    </Toast>
                    


                        
                    <View style={styles.container}>
                        
                        <TouchableOpacity style={styles.volumeIconTouch} onPress={
                                () => {
                                    if(this.sound !== undefined){
                                        this._muteSound
                                    }else{
                                        null
                                    }
                                } 
                                
                                } >
                                <Image style={styles.volumeIcon} source={this.state.setMuteIcon}/>
                            </TouchableOpacity>
                    

                            <TouchableOpacity style={styles.play_pauseIconTouch} onPress={this._playAndPause}>
                                <Image style={styles.play_pauseIcon}  source={this.state.setIcon}/>
                            </TouchableOpacity>


                            

                            <TouchableOpacity style={styles.powerIconTouch} onPress={this._powerDown} >
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
        marginTop:hp('55%'),
        borderColor:'yellow',
        borderWidth:2,

    },
    redCover:{
        backgroundColor:'rgba(147,7,33,0.5)', 
        height:Platform.OS === 'ios' ? hp('80%') : hp('77%'),
    },
    textContainer:{

        position:'absolute',
        justifyContent:'center',
        color:'white',
        marginTop:hp('40%'),
        marginLeft:wp('35%'),
        
    },
  image: {
   
    resizeMode: "cover",
    justifyContent: "center",
    marginTop:Platform.OS === 'ios' ? 0 : hp('3%'),
    // backgroundColor: 'rgba(0,0,0,0.3)',
    height:Platform.OS === 'ios' ? hp('80%') : hp('77%'),
  },
  volumeIcon: {
    width: 25,
    height: 25,
    // marginRight: 20,
    marginTop:22,
    
  },
  volumeIconTouch:{
    width: 50,
    height: 50,
    // marginRight: 10,
  },
  powerIcon: {
    width: 25,
    height: 25,
    // marginLeft: 10,
    marginTop:22,
  },
  powerIconTouch:{
    width: 50,
    height: 50,
    // marginRight: 10,
  },

  play_pauseIcon: {
    width: 70,
    height: 70,
   
    marginRight: 25,
  },
  play_pauseIconTouch:{
    width: 70,
    height: 70,

    
    marginRight: 25,
  },

  logoIcon:{
    width:70,
    height:70,

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
