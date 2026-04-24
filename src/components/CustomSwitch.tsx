import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface Props {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  style?: ViewStyle;
}

const SWITCH_WIDTH = 52;
const SWITCH_HEIGHT = 32;
const THUMB_SIZE = 24;
const THUMB_PADDING = 4;

export default function CustomSwitch({
  value,
  onValueChange,
  activeColor,
  inactiveColor,
  style,
}: Props) {
  const { theme, isDark } = useTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [value]);

  const defaultActive = theme.colors.primary;
  const defaultInactive = isDark ? '#3F3F46' : '#D1D5DB';

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor || defaultInactive, activeColor || defaultActive],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [THUMB_PADDING, SWITCH_WIDTH - THUMB_SIZE - THUMB_PADDING],
  });

  const thumbColor = isDark
    ? (value ? '#000' : '#FFF')
    : '#FFF';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[style]}
    >
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor: thumbColor,
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: 16,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
