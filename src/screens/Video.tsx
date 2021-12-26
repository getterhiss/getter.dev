import React, { useRef, useState, useEffect } from 'react';

import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc';

import { requestAndroidPermissions, requestiOSPermissions } from 'utils/permissions';

import DragIcon from 'assets/icons/DragIcon';
import DraggableBox from 'components/DraggableBox';

const Video = ({ navigation, route }: any) => {

  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('disconnected');
  const [videoTracks, setVideoTracks] = useState<any>(new Map());

  const token = route?.params?.token;

  const twilioRef = useRef<any>(null);

  useEffect(() => {
    if (token && twilioRef?.current && status === 'disconnected') {
      _connect();
    }

    return () => {
      console.log('Cleaning up TwilioVideo...');
			if(twilioRef && twilioRef.current) {
				twilioRef.current.disconnect();
				twilioRef.current = null;
			}
    };
  }, [token]);

  const _connect = async() => {
		setStatus('connecting'); 
		
		let granted = false;
		if(Platform.OS === 'android') {
      granted = await requestAndroidPermissions();
    } else {
      granted = await requestiOSPermissions();
    }

		if(!granted) {
			Alert.alert(
				'Permissions Error', 
				'Please grant use of your camera and microphone for video chat.', 
				[
          { text: 'Exit', onPress: () => navigation.pop(), style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings(), style: 'default' } 
        ]
      );
			return; 
		}

    twilioRef?.current?.connect({ accessToken: token});
	};

  const _onEndButtonPress = () => {
    Alert.alert(
			'Close Video Chat', 
			'Are you sure you want to close the video chat?', 
			[
        {text: 'Exit Chat', onPress: () => _onDisconnect(), style: 'default'},
        {text: 'Continue Chat', onPress: () => {}, style: 'cancel'}
      ]
		);
  };

  const _onDisconnect = () => {
    twilioRef?.current?.disconnect();
		navigation.pop();
  }

  const _onMuteButtonPress = () => {
    twilioRef?.current
      ?.setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled: boolean) => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioRef?.current?.flipCamera();
  };

  const _onRoomDidConnect = ({roomName, error}: any) => {
    console.log('onRoomDidConnect: ', roomName);
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({ roomName, error }: any) => {
    console.log('[Disconnect]ERROR: ', error);
    setStatus('disconnected');
    navigation.pop();
  };

  const _onRoomDidFailToConnect = (error: any) => {
    console.log('[FailToConnect]ERROR: ', error);
    setStatus('disconnected');
    Alert.alert(
      'Failed to Connect',
      'We were not able to connect to the video chat room.', 
		  [
        { onPress: () => navigation.pop() }, 
      ]
    );
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }: any) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }: any) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);

    setVideoTracks(videoTracksLocal);
  };

  return (
    <View style={styles.container}>
      {(status === 'connected' || status === 'connecting') &&
        <View style={styles.callContainer}>

          <DraggableBox boxStyle={styles.localVideoBox}>
            <DragIcon style={styles.localVideoIcon} />
            <TwilioVideoLocalView
              enabled={true}
              style={styles.localVideo}
            />
          </DraggableBox>

          {status === 'connected' && Array.from(videoTracks, ([trackSid, trackIdentifier]) => (
            <TwilioVideoParticipantView
              style={styles.remoteVideo}
              key={trackSid}
              trackIdentifier={trackIdentifier}
            />
          ))}

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onEndButtonPress}>
              <Text style={{fontSize: 12}}>End</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onMuteButtonPress}>
              <Text style={{fontSize: 12}}>{ isAudioEnabled ? 'Mute' : 'Unmute' }</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onFlipButtonPress}>
              <Text style={{fontSize: 12}}>Flip</Text>
            </TouchableOpacity>
          </View>
        </View>
      }

      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={ _onRoomDidConnect }
        onRoomDidDisconnect={ _onRoomDidDisconnect }
        onRoomDidFailToConnect= { _onRoomDidFailToConnect }
        onParticipantAddedVideoTrack={ _onParticipantAddedVideoTrack }
        onParticipantRemovedVideoTrack= { _onParticipantRemovedVideoTrack }
      />

    </View>
  );
}
export default Video;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  localVideoBox: {
    width: 150,
    height: 250,
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 99,
  },
  localVideoIcon: {
    position: 'absolute',
    left: 0,
    bottom: 2,
    zIndex: 100,
  },
  localVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
  },
  remoteVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: '#FFC0CB',
    justifyContent: 'center',
    alignItems: 'center',
  },
});