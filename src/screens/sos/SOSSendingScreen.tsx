import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

function WarningIcon({ size = 100, color = '#FFF' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Path
        d="M50 15L90 85H10L50 15Z"
        stroke={color}
        strokeWidth={4}
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={50} cy={70} r={4} fill={color} />
      <Path d="M50 40V60" stroke={color} strokeWidth={4} strokeLinecap="round" />
    </Svg>
  );
}

export default function SOSSendingScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();

  // Pulsing ring animations
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createPulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

    createPulse(ring1, 0).start();
    createPulse(ring2, 600).start();
    createPulse(ring3, 1200).start();
  }, []);

  const getRingStyle = (anim: Animated.Value, baseSize: number) => ({
    width: anim.interpolate({ inputRange: [0, 1], outputRange: [baseSize, baseSize * 1.5] }),
    height: anim.interpolate({ inputRange: [0, 1], outputRange: [baseSize, baseSize * 1.5] }),
    borderRadius: anim.interpolate({ inputRange: [0, 1], outputRange: [baseSize / 2, (baseSize * 1.5) / 2] }),
    opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.6, 0.3, 0] }),
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#740707" translucent />

      {/* Pulsing rings */}
      <View style={styles.ringContainer}>
        <Animated.View style={[styles.ring, getRingStyle(ring1, 330), { backgroundColor: 'rgba(180,20,20,0.3)' }]} />
        <Animated.View style={[styles.ring, getRingStyle(ring2, 444), { backgroundColor: 'rgba(160,15,15,0.2)' }]} />
        <Animated.View style={[styles.ring, getRingStyle(ring3, 596), { backgroundColor: 'rgba(140,10,10,0.15)' }]} />

        {/* Center SOS Button */}
        <View style={styles.sosButton}>
          <WarningIcon size={80} color="#FFF" />
        </View>
      </View>

      {/* EMERGENCY Text */}
      <View style={styles.textSection}>
        <Text style={styles.emergencyText}>EMERGENCY</Text>
        <Text style={styles.sendingText}>Sending SOS to your contacts</Text>
      </View>

      {/* Cancel button */}
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#740707',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 0,
  },
  sosButton: {
    width: 196,
    height: 196,
    borderRadius: 98,
    backgroundColor: '#E42828',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7E1111',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.23,
    shadowRadius: 4,
    elevation: 8,
  },
  textSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  emergencyText: {
    fontSize: 52,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.624,
    lineHeight: 44,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  sendingText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#F7F4F2',
    letterSpacing: -0.16,
    marginTop: 16,
    fontFamily: 'Inter',
  },
  cancelBtn: {
    position: 'absolute',
    bottom: 60,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Inter',
  },
});
