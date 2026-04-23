import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

/* ─── Warning Triangle ───────────────────────────────────── */
function WarningIcon({ size = 80 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Path
        d="M50 15L90 85H10L50 15Z"
        stroke="#FFF" strokeWidth={4} strokeLinejoin="round" fill="none"
      />
      <Circle cx={50} cy={70} r={4} fill="#FFF" />
      <Path d="M50 40V60" stroke="#FFF" strokeWidth={4} strokeLinecap="round" />
    </Svg>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function SOSSendingScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();

  // Three concentric pulsing rings
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;

  const makePulse = (anim: Animated.Value, delay: number) =>
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: 1, duration: 2200, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );

  useEffect(() => {
    makePulse(ring1, 0).start();
    makePulse(ring2, 700).start();
    makePulse(ring3, 1400).start();
  }, []);

  const ringStyle = (anim: Animated.Value, base: number) => ({
    width: base, height: base, borderRadius: base / 2,
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.8] }) }],
    opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0.6, 0.3, 0] }),
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#740707" translucent />

      {/* Pulsing rings + center button */}
      <View style={styles.scene}>
        <Animated.View style={[styles.ring, { backgroundColor: 'rgba(180,15,15,0.25)' }, ringStyle(ring3, 500)]} />
        <Animated.View style={[styles.ring, { backgroundColor: 'rgba(200,20,20,0.30)' }, ringStyle(ring2, 380)]} />
        <Animated.View style={[styles.ring, { backgroundColor: 'rgba(220,25,25,0.35)' }, ringStyle(ring1, 280)]} />
        <View style={styles.sosCircle}>
          <WarningIcon size={80} />
        </View>
      </View>

      {/* EMERGENCY text */}
      <View style={styles.textBlock}>
        <Text style={styles.emergencyText}>EMERGENCY</Text>
        <Text style={styles.sendingText}>Sending SOS to your contacts</Text>
      </View>

      {/* Output / Next Screen for Dev */}
      <TouchableOpacity
        style={[styles.cancelBtn, { bottom: insets.bottom + 30, backgroundColor: '#6FFB85', borderColor: '#6FFB85' }]}
        onPress={() => navigation.navigate('SOSReceived')}
        activeOpacity={0.7}
      >
        <Text style={[styles.cancelText, { color: '#141414', fontFamily: 'Inter-Bold' }]}>View Output</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#740707',
    alignItems: 'center', justifyContent: 'center',
  },
  scene: {
    width: 320, height: 320, alignItems: 'center', justifyContent: 'center',
  },
  ring: { position: 'absolute' },
  sosCircle: {
    width: 196, height: 196, borderRadius: 98,
    backgroundColor: '#E42828',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: 'rgba(126,17,17,0.23)', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1, shadowRadius: 4, elevation: 8,
  },
  textBlock: { alignItems: 'center', marginTop: 48, paddingHorizontal: 24 },
  emergencyText: {
    fontSize: 52, fontWeight: '700', color: '#FFFFFF',
    letterSpacing: -0.624, lineHeight: 52, fontFamily: 'Inter-Bold', textAlign: 'center',
  },
  sendingText: {
    fontSize: 20, fontWeight: '400', color: '#F7F4F2',
    letterSpacing: -0.16, marginTop: 12, fontFamily: 'Inter', textAlign: 'center',
  },
  cancelBtn: {
    position: 'absolute', paddingHorizontal: 32, paddingVertical: 14,
    borderRadius: 33, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  cancelText: {
    fontSize: 16, fontWeight: '600', color: '#FFFFFF', fontFamily: 'Inter',
  },
});
