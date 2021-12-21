import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import { getUniqueId } from 'react-native-device-info';

const Home = () => {

  useEffect(()=>{
    BootSplash.hide({ fade: true });

    // FIXME: ***** Testing ONLY *****
    // throw new Error('💥 CABOOM 💥');
    // FIXME: ***** Testing ONLY *****

    const uid = getUniqueId();
    console.log({ uid });
    
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
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