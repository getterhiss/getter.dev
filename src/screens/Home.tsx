import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { getUniqueId } from 'react-native-device-info';
import Config from 'react-native-config';

const Home = ({ navigation }: any) => {

  const [quote, setQuote] = useState('');
  const [token, setToken] = useState('');

  useEffect(()=>{
    BootSplash.hide({ fade: true });

    // FIXME: ***** Testing ONLY *****
    // throw new Error('💥 CABOOM 💥');
    // FIXME: ***** Testing ONLY *****

    const endpoint = Config.TWILIO_JWT_ENDPOINT;
    const room = 'test';
    const uid = getUniqueId();

    // Ping Kanye {W}EST API
    fetch('https://api.kanye.rest')
      .then((res) => res.json())
      .then((res) => setQuote(res.quote))
      .catch((err) => console.warn('Error Kanye Quote: ', err?.message));
    
    // Get a Twilio JWT Token
    fetch(`${endpoint}?room=${room}&uid=${uid}`)
      .then((res) => res.json())
      .then((res) => {
        console.log('Twilio JWT: ', res.token);
        setToken(res.token);
      })
      .catch((err) => console.log('Error JWT Token: ', err?.message));

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{quote} {quote && ' - Kanye'}</Text>
      <Button 
        onPress={() => navigation.navigate('Video', { token })} 
        title={'Video Chat'}
        color={'black'}
      />
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
  text: {
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 40
  },
});