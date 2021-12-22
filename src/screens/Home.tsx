import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { getUniqueId } from 'react-native-device-info';
import { twilio } from 'utils/jwt';

const Home = ({ navigation }: any) => {

  const [quote, setQuote] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    BootSplash.hide({ fade: true });

    // FIXME: ***** Testing ONLY *****
    // throw new Error('💥 CABOOM 💥');
    // FIXME: ***** Testing ONLY *****

    const room = 'test';
    const uid = getUniqueId();

    // Ping Kanye {W}EST API
    fetch('https://api.kanye.rest')
      .then((res) => res.json())
      .then((res) => setQuote(res.quote))
      .catch((err) => console.warn('Error Kanye Quote: ', err?.message));
    
    // Generate a Twilio JWT Token
    const jwt = twilio(uid, room);
    if(jwt){
      setToken(jwt);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{quote} {quote && ' - Kanye'}</Text>
      {!!token && <Button 
        onPress={() => navigation.navigate('Video', { token })} 
        title={'Video Chat'}
        color={'black'}
      />}
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