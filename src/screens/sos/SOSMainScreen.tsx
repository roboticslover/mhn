import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

/* ─── Icons ─────────────────────────────────────────────── */
function WarningTriangleIcon({ size = 80 }: { size?: number }) {
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

function AddContactIcon({ color = '#141414' }: { color?: string }) {
  return (
    <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
      <Path d="M15 8H19M17 6V10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M1 14C1 11.7909 2.79086 10 5 10H11C13.2091 10 15 11.7909 15 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={8} cy={4} r={3} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function SOSMainScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [countdown, setCountdown] = useState(3);
  const [isPressed, setIsPressed] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Outer glow pulse
  const ringScale = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(ringScale, { toValue: 1.18, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(ringScale, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(ringOpacity, { toValue: 0.15, duration: 1500, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.5, duration: 1500, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  const handlePressIn = useCallback(() => {
    setIsPressed(true);
    setCountdown(3);
    let sec = 3;
    countdownRef.current = setInterval(() => {
      sec -= 1;
      setCountdown(sec);
      if (sec <= 0) {
        if (countdownRef.current) clearInterval(countdownRef.current);
        navigation.navigate('SOSSending');
      }
    }, 1000);
  }, [navigation]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
    if (countdownRef.current) clearInterval(countdownRef.current);
    setCountdown(3);
  }, []);

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader title="Emergency Contacts" onBack={() => navigation.navigate('EmergencyContacts')} />
      </View>

      {/* ── IMMEDIATE RESPONSE REQUIRED ── */}
      <Text style={styles.urgentLabel}>IMMEDIATE RESPONSE REQUIRED</Text>

      {/* ── Emergency SOS title ── */}
      <View style={styles.titleBlock}>
        <Text style={[styles.titleEmergency, { color: isDark ? '#FFF' : c.text }]}>Emergency</Text>
        <Text style={styles.titleSOS}>SOS</Text>
      </View>

      {/* ── SOS Button ── */}
      <View style={styles.buttonContainer}>
        <Animated.View style={[styles.glowRing, { opacity: ringOpacity, transform: [{ scale: ringScale }] }]} />
        <TouchableOpacity
          style={styles.sosButton}
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <WarningTriangleIcon size={80} />
        </TouchableOpacity>
      </View>

      {/* ── Countdown ── */}
      <View style={styles.countdownBlock}>
        <View style={styles.countdownRow}>
          <View style={[styles.digit, { backgroundColor: 'rgba(42,42,42,0.4)', borderColor: 'rgba(255,59,48,0.2)' }]}>
            <Text style={[styles.digitText, { color: '#DB5034' }]}>0</Text>
          </View>
          <View style={[styles.digit, { backgroundColor: 'rgba(42,42,42,0.4)', borderColor: 'rgba(255,59,48,0.2)' }]}>
            <Text style={[styles.digitText, { color: '#DB5034' }]}>0</Text>
          </View>
          <Text style={[styles.colon, { color: 'rgba(255,59,48,0.4)' }]}>:</Text>
          <View style={[styles.digitActive, { backgroundColor: 'rgba(255,59,48,0.1)', borderColor: 'rgba(255,59,48,0.4)' }]}>
            <Text style={[styles.digitText, { color: '#DB5034' }]}>
              {String(countdown).padStart(2, '0')}
            </Text>
          </View>
        </View>
        <Text style={[styles.hint, { color: c.textSecondary }]}>
          Long press for 3 seconds to trigger SOS broadcast
        </Text>
      </View>

      {/* ── Add Contact CTA ── */}
      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: c.primary }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddContactFromFamily')}
      >
        <AddContactIcon color="#141414" />
        <Text style={styles.addBtnText}>Add Emergency Contact</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1 },

  urgentLabel: {
    fontSize: 12, fontWeight: '800', letterSpacing: 3.6,
    textTransform: 'uppercase', textAlign: 'center',
    marginTop: 16, color: '#DB5034', fontFamily: 'Manrope-ExtraBold',
  },

  titleBlock: { alignItems: 'center', marginTop: 16, marginBottom: 8 },
  titleEmergency: {
    fontSize: 60, fontWeight: '700', lineHeight: 64, letterSpacing: -3, fontFamily: 'Inter-Bold',
  },
  titleSOS: {
    fontSize: 60, fontWeight: '700', lineHeight: 64, letterSpacing: -3,
    color: '#DB5034', fontFamily: 'Inter-Bold',
  },

  buttonContainer: {
    alignItems: 'center', justifyContent: 'center', height: 270,
  },
  glowRing: {
    position: 'absolute', width: 260, height: 260, borderRadius: 130,
    backgroundColor: 'rgba(228,40,40,0.18)',
  },
  sosButton: {
    width: 196, height: 196, borderRadius: 98,
    backgroundColor: '#E42828',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#7E1111', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25, shadowRadius: 20, elevation: 10,
  },

  countdownBlock: { alignItems: 'center', marginTop: 8, paddingHorizontal: 24 },
  countdownRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  digit: {
    borderWidth: 1, borderRadius: 4, paddingHorizontal: 13, paddingVertical: 5, alignItems: 'center',
  },
  digitActive: {
    borderWidth: 1, borderRadius: 4, paddingHorizontal: 13, paddingVertical: 5, alignItems: 'center', minWidth: 60,
  },
  digitText: { fontSize: 48, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 50 },
  colon: { fontSize: 48, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 50 },
  hint: {
    fontSize: 16, fontWeight: '500', textAlign: 'center', marginTop: 16, lineHeight: 24, fontFamily: 'Inter-Medium',
  },

  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    height: 58, borderRadius: 33, marginHorizontal: 24, marginTop: 32,
  },
  addBtnText: {
    fontSize: 14, fontWeight: '800', lineHeight: 20, color: '#141414',
    fontFamily: 'Manrope-ExtraBold', textTransform: 'capitalize',
  },
});
