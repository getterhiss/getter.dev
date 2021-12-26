import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { getUniqueId } from 'react-native-device-info';

import Quotable from 'components/Quote';
import { twilio } from 'utils/jwt';

import VideoIcon from 'assets/icons/VideoIcon';

const Home = ({ navigation }: any) => {

  const [token, setToken] = useState<string>('');

  useEffect(() => {
    BootSplash.hide({ fade: true });

    // FIXME: ***** Testing ONLY *****
    // throw new Error('💥 CABOOM 💥');
    // FIXME: ***** Testing ONLY *****

    const room = 'test';
    const uid = getUniqueId();

    // Generate a Twilio JWT Token
    const jwt = twilio(uid, room);
    if(jwt){
      setToken(jwt);
    }
    
  }, []);

  return (
    <View style={styles.container}>
      <Quotable />
      {!!token && (
        <TouchableOpacity onPress={() => navigation.navigate('Video', { token })}>
          <VideoIcon height={72} width={72}/>
        </TouchableOpacity>
      )}
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffc0cb',
    justifyContent: "center",
    alignItems: 'center'
  },
});