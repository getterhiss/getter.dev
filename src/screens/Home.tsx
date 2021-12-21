import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { getUniqueId } from 'react-native-device-info';

const Home = () => {

  const [quote, setQuote] = useState('');

  useEffect(()=>{
    BootSplash.hide({ fade: true });

    // FIXME: ***** Testing ONLY *****
    // throw new Error('💥 CABOOM 💥');
    // FIXME: ***** Testing ONLY *****

    const uid = getUniqueId();

    // Ping Kanye {W}EST API
    fetch('https://api.kanye.rest')
      .then((res) => res.json())
      .then((res) => setQuote(res.quote))
      .catch((err) => console.warn('Error Kanye Quote: ', err?.message));
    
  }, []);

  return (
    <View style={styles.container}>
      <Text>{quote}</Text>
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
  }
});