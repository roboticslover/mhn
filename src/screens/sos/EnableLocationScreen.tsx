import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

// Crosshair/target location icon
function TargetIcon({ color = '#6FFB85', size = 80 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Circle cx={40} cy={40} r={20} stroke={color} strokeWidth={3} />
      <Circle cx={40} cy={40} r={8} fill={color} />
      <Line x1={40} y1={5} x2={40} y2={20} stroke={color} strokeWidth={2} />
      <Line x1={40} y1={60} x2={40} y2={75} stroke={color} strokeWidth={2} />
      <Line x1={5} y1={40} x2={20} y2={40} stroke={color} strokeWidth={2} />
      <Line x1={60} y1={40} x2={75} y2={40} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

// Chevron right icon
function ChevronRight({ color = '#6FFB85', size = 12 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 8 12" fill="none">
      <Path d="M1 1L6 6L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function EnableLocationScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

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

      {/* Modal Dialog */}
      <View
        style={[
          styles.modal,
          {
            backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
          },
        ]}
      >
        {/* Map graphic area */}
        <View style={[styles.mapPreview, { backgroundColor: isDark ? '#131313' : '#E8E8E8', borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.cardBorder }]}>
          {/* Grid lines for map effect */}
          <View style={styles.mapGrid}>
            {[...Array(6)].map((_, i) => (
              <View key={`h${i}`} style={[styles.gridLineH, { top: `${(i + 1) * 14}%`, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)' }]} />
            ))}
            {[...Array(6)].map((_, i) => (
              <View key={`v${i}`} style={[styles.gridLineV, { left: `${(i + 1) * 14}%`, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)' }]} />
            ))}
          </View>
          <TargetIcon color={c.primary} size={80} />
          {/* Small green dot */}
          <View style={[styles.greenDot, { backgroundColor: c.primary }]} />
        </View>

        {/* Title */}
        <Text style={[styles.modalTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
          Enable Location
        </Text>

        {/* Description */}
        <Text style={[styles.modalDesc, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>
          We'll only use your location when you send an SOS, so your loved ones know where you are and can be there for you when it matters most.
        </Text>

        {/* Continue button */}
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.continueBtnText, { color: c.textOnPrimary, fontFamily: 'Inter-Bold' }]}>
            Continue
          </Text>
        </TouchableOpacity>

        {/* Emergency Contacts link */}
        <TouchableOpacity
          style={styles.emergencyLink}
          onPress={() => navigation.navigate('EmergencyContacts')}
        >
          <Text style={[styles.emergencyLinkText, { color: c.primary, fontFamily: 'Inter-Bold' }]}>
            EMERGENCY CONTACTS
          </Text>
          <ChevronRight color={c.primary} />
        </TouchableOpacity>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : c.divider }]}>
          <Text style={[styles.footerText, { color: c.textSecondary, fontFamily: 'Inter' }]}>
            Stay prepared for any emergency. Add your emergency contacts to make sure your SOS alert is sent to the right people when every second counts.
          </Text>
        </View>
      </View>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modal: {
    marginHorizontal: 18,
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
    flex: 1,
    marginBottom: 100,
  },
  mapPreview: {
    marginHorizontal: 48,
    marginTop: 35,
    height: 200,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mapGrid: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLineH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
  },
  greenDot: {
    position: 'absolute',
    top: 40,
    right: 60,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 32,
    letterSpacing: -0.6,
    lineHeight: 32,
  },
  modalDesc: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
    marginHorizontal: 48,
    lineHeight: 24,
  },
  continueBtn: {
    marginHorizontal: 40,
    marginTop: 32,
    height: 56,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  emergencyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  emergencyLinkText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  footer: {
    borderTopWidth: 1,
    marginTop: 16,
    marginHorizontal: 40,
    paddingTop: 10,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
  },
});
