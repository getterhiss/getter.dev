/**
 * Draggable Example
 * https://docs.swmansion.com/react-native-gesture-handler/docs/1.10.3/api/gesture-handlers/pan-gh/#example
 * re: https://github.com/software-mansion/react-native-gesture-handler/blob/main/example/src/basic/draggable/index.tsx
 */
import React, { Component } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
 
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

type DraggableBoxProps = {
  minDist?: number;
  boxStyle?: StyleProp<ViewStyle>;
};

export default class DraggableBox extends Component<DraggableBoxProps> {
  private translateX: Animated.Value;
  private translateY: Animated.Value;
  private lastOffset: { x: number; y: number };
  private onGestureEvent: (event: PanGestureHandlerGestureEvent) => void;
  
  constructor(props: DraggableBoxProps) {
    super(props);
    
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.lastOffset = { x: 0, y: 0 };

    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );
  }

  private onHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);
    }
  };

  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}
        minDist={this.props.minDist}>
        <Animated.View
          style={[
            {
              transform: [
                { translateX: this.translateX },
                { translateY: this.translateY },
              ],
            },
            this.props.boxStyle,
          ]}
        >
          {this.props.children}
        </Animated.View>
      </PanGestureHandler>
    );
  }
}