import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BootSplash from 'react-native-bootsplash';

const Home = () => {

  useEffect(()=>{
    BootSplash.hide({ fade: true });
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