import React, { useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Lottie from 'lottie-react-native';
import source from 'assets/g-icon.json';

import BootSplash from 'react-native-bootsplash';

// TODO: Fix any TypeScript parameters
const Splash = ({ navigation }: any) => {
  const animation = useRef(null);
  
  /**
   * Show the animation
   */
  useEffect(()=>{
    BootSplash.hide({ fade: true });
    //@ts-ignore
    animation?.current?.play();

    // Navigate to home screen after animation
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 1500);

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
        //onAnimationFinish = {() => {
          // https://github.com/lottie-react-native/lottie-react-native/blob/master/docs/api.md#component-api
          // This appears to fire in "normal" 1x speed, not the 1.8x above
          // console.log('onAnimationFinish....');
        //}}
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