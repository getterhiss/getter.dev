import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';
import source from '../../assets/g-icon.json';

import BootSplash from 'react-native-bootsplash';

// TODO: Fix any TypeScript parameters
const Splash = ({ navigation }: any) => {
  const animation = useRef(null);
  
  /**
   * Show the animation
   */
  useEffect(()=>{
    const timer = setTimeout(() => {
      BootSplash.hide({ fade: true });
      //@ts-ignore
      animation?.current?.play();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Navigate to home screen after animation
   */
  useEffect(()=>{
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Lottie
        ref={animation}
        style={{width: 300, height: 300}}
        loop={false}
        speed={1.8}
        source={source}
      />
    </View>
  );
}
export default Splash;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  flexDirection: 'column',
    backgroundColor: '#ffc0cb',
    justifyContent: "center",
    alignItems: 'center'
  }
});