import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet, View, Animated, Easing } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  size?: number;
}

const TOGGLE_WIDTH = 52;
const TOGGLE_HEIGHT = 32;
const THUMB_SIZE = 24;
const PADDING_X = 2;

export default function ThemeToggle({ size }: Props) {
  const { isDark, toggleTheme, theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [isDark]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [PADDING_X, TOGGLE_WIDTH - THUMB_SIZE - PADDING_X],
  });

  const thumbColor = theme.colors.primary;
  const bgColor = isDark ? '#27272A' : '#E4E4E7';

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.9}
      style={styles.touchable}
    >
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
        <View style={styles.iconsContainer}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="sunny-outline"
              size={16}
              color={!isDark ? '#000' : '#71717A'}
            />
          </View>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="moon"
              size={16}
              color={isDark ? '#000' : '#71717A'}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: PADDING_X,
  },
  thumb: {
    position: 'absolute',
    top: 4,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  iconWrapper: {
    width: (TOGGLE_WIDTH - PADDING_X * 2) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
