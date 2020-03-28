import React from 'react';
import { StyleSheet, Text, View,  Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Player    from './components/player'
import  Socials  from './components/socials'

export default function App() {
  return (
  //   <View style={{ marginTop:10, height: '50%', width:'100%' }}>
  //      <WebView
  //       originWhitelist={['*']}
  //       source={{ uri: "https://www.radioking.com/widgets/player/player.php?id=290620&c=%23ffffff&c2=%23d35400&ii=&p=1&pp=1&i=0&eq=1&po=1&t=1&f=v&v=2&s=0&li=1&h=100&l=100&a=0&plc=0&popup=0&fullsize" }}
  //       style = {{height:200, width:1000}}
  //     />

  //  </View>
  // );
<SafeAreaView>
  <View style={{ flex:1}}>
        <Player />
        <Socials />
    </View>
</SafeAreaView>
  
 
        
        
  

      
    

      

 


  )


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tinyLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  
});
