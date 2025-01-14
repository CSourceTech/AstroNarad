import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

const Call_Screen = (props) => {
    const [callid, SetcallId] = useState("Astronarad_");

    useEffect(() => {
      SetcallId((prev)=> {
        return prev 
      })
    }, [])
    

  return (
    <View style={styles.container}>
    <ZegoUIKitPrebuiltCall
        appID={1223660544}
        appSign={'488f65f6f24db953f2342704e181da1c277ccb47eb61f864a4387f3507797095'}
        userID={userID} // userID can be something like a phone number or the user id on your own user system. 
        userName={userName}
        callID={callID} // callID can be any unique string. 

        config={{
            // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onCallEnd: (callID, reason, duration) => { props.navigation.navigate('AstrologerDesc') },
        }}
    />
</View>
  )
}

export default Call_Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
})