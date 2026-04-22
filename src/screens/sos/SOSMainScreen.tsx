import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle, G } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

// Warning triangle icon for the SOS button
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

// Add contact icon
function AddContactIcon({ color = '#141414' }: { color?: string }) {
  return (
    <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
      <Path
        d="M15 8H19M17 6V10"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M1 14C1 11.7909 2.79086 10 5 10H11C13.2091 10 15 11.7909 15 14"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle cx={8} cy={4} r={3} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export default function SOSMainScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [countdown, setCountdown] = useState(3);
  const [isPressed, setIsPressed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const countdownTimer = useRef<NodeJS.Timeout | null>(null);

  // Pulse animation for the SOS button glow
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.8,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    setIsPressed(true);
    setCountdown(3);
    let sec = 3;
    countdownTimer.current = setInterval(() => {
      sec -= 1;
      setCountdown(sec);
      if (sec <= 0) {
        if (countdownTimer.current) clearInterval(countdownTimer.current);
        setIsSending(true);
        navigation.navigate('SOSSending');
      }
    }, 1000);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    setCountdown(3);
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader
          title="Emergency Contacts"
          onBack={() => navigation.goBack()}
        />
      </View>

      {/* Immediate Response Required */}
      <Text style={[styles.urgentLabel, { color: c.error }]}>
        IMMEDIATE RESPONSE REQUIRED
      </Text>

      {/* Emergency SOS Title */}
      <View style={styles.titleSection}>
        <Text style={[styles.emergencyTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
          Emergency
        </Text>
        <Text style={[styles.sosTitle, { color: c.error, fontFamily: 'Inter-Bold' }]}>
          SOS
        </Text>
      </View>

      {/* Big SOS Button */}
      <View style={styles.sosButtonContainer}>
        <Animated.View
          style={[
            styles.sosGlow,
            {
              opacity: pulseAnim,
              backgroundColor: 'rgba(228, 40, 40, 0.15)',
            },
          ]}
        />
        <TouchableOpacity
          style={styles.sosButton}
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <WarningIcon size={80} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Countdown Timer */}
      <View style={styles.countdownContainer}>
        <View style={styles.countdownRow}>
          <View style={[styles.countdownDigit, { backgroundColor: 'rgba(42,42,42,0.4)', borderColor: 'rgba(255,59,48,0.2)' }]}>
            <Text style={[styles.countdownText, { color: c.error }]}>0</Text>
          </View>
          <View style={[styles.countdownDigit, { backgroundColor: 'rgba(42,42,42,0.4)', borderColor: 'rgba(255,59,48,0.2)' }]}>
            <Text style={[styles.countdownText, { color: c.error }]}>0</Text>
          </View>
          <Text style={[styles.countdownColon, { color: 'rgba(255,59,48,0.4)' }]}>:</Text>
          <View style={[styles.countdownDigitActive, { backgroundColor: 'rgba(255,59,48,0.1)', borderColor: 'rgba(255,59,48,0.4)' }]}>
            <Text style={[styles.countdownText, { color: c.error }]}>
              {String(countdown).padStart(2, '0')}
            </Text>
          </View>
        </View>
        <Text style={[styles.countdownHint, { color: c.textSecondary, fontFamily: 'Inter' }]}>
          Long press for 3 seconds to trigger SOS broadcast
        </Text>
      </View>

      {/* Add Emergency Contact Button */}
      <TouchableOpacity
        style={[styles.addContactBtn, { backgroundColor: c.primary }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddContactFromFamily')}
      >
        <AddContactIcon color={c.textOnPrimary} />
        <Text style={[styles.addContactText, { color: c.textOnPrimary, fontFamily: 'Manrope-ExtraBold' }]}>
          Add Emergency Contact
        </Text>
      </TouchableOpacity>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  urgentLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3.6,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Manrope-ExtraBold',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  emergencyTitle: {
    fontSize: 60,
    fontWeight: '700',
    lineHeight: 60,
    letterSpacing: -3,
  },
  sosTitle: {
    fontSize: 60,
    fontWeight: '700',
    lineHeight: 60,
    letterSpacing: -3,
  },
  sosButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 260,
  },
  sosGlow: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
  },
  sosButton: {
    width: 196,
    height: 196,
    borderRadius: 98,
    backgroundColor: '#E42828',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E42828',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  countdownContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.8,
  },
  countdownDigit: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 13,
    paddingVertical: 5,
    alignItems: 'center',
  },
  countdownDigitActive: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 13,
    paddingVertical: 5,
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 48,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  countdownColon: {
    fontSize: 48,
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
  },
  countdownHint: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 32,
    lineHeight: 24,
  },
  addContactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 58,
    borderRadius: 33,
    marginHorizontal: 50,
    marginTop: 32,
  },
  addContactText: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
});
