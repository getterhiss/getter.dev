import React, { useRef, useState, useEffect } from 'react';

import {
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

const Video = ({ navigation, route }: any) => {

  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('disconnected');
  const [videoTracks, setVideoTracks] = useState<any>(new Map());

  const token = route?.params?.token;
  // console.log('Token passed: ', token);

  const twilioRef = useRef<any>(null);

  useEffect(() => {
    if (token && twilioRef.current) {
      twilioRef.current.connect({ accessToken: token });
      setStatus('connecting');
    }
  }, []);
  
  const _onEndButtonPress = () => {
    twilioRef?.current?.disconnect();
    navigation.pop();
  };

  const _onMuteButtonPress = () => {
    twilioRef?.current
      ?.setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled: any) => setIsAudioEnabled(isEnabled));
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
  };

  const _onRoomDidFailToConnect = (error: any) => {
    console.log('[FailToConnect]ERROR: ', error);

    setStatus('disconnected');
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

          <TwilioVideoLocalView
            enabled={true}
            style={styles.localVideo}
          />

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
  localVideo: {
    flex: 1,
    width: 150,
    height: 250,
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 99,
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