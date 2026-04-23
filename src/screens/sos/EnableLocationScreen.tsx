import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

/* ─── Icons ─────────────────────────────────────────────── */
function MapTargetIcon({ color = '#6FFB85', size = 80 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Circle cx={40} cy={40} r={22} stroke={color} strokeWidth={3} />
      <Circle cx={40} cy={40} r={9} fill={color} />
      <Line x1={40} y1={4}  x2={40} y2={18} stroke={color} strokeWidth={2.5} />
      <Line x1={40} y1={62} x2={40} y2={76} stroke={color} strokeWidth={2.5} />
      <Line x1={4}  y1={40} x2={18} y2={40} stroke={color} strokeWidth={2.5} />
      <Line x1={62} y1={40} x2={76} y2={40} stroke={color} strokeWidth={2.5} />
    </Svg>
  );
}

function ChevronRight({ color = '#6FFB85' }: { color?: string }) {
  return (
    <Svg width={8} height={12} viewBox="0 0 8 12" fill="none">
      <Path d="M1 1L6 6L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/* ─── Component ──────────────────────────────────────────── */
export default function EnableLocationScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader title="Emergency Contacts" onBack={() => navigation.goBack()} />
      </View>

      {/* ── Glass Modal ── */}
      <View style={[styles.modal, {
        backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
        borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
      }]}>

        {/* Map preview area */}
        <View style={[styles.mapBox, {
          backgroundColor: isDark ? '#131313' : '#EAEAEA',
          borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.cardBorder,
        }]}>
          {/* Grid lines */}
          {[15, 30, 45, 60, 75, 90].map(p => (
            <View key={`gh${p}`} style={[styles.gridH, { top: `${p}%`, backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)' }]} />
          ))}
          {[15, 30, 45, 60, 75, 90].map(p => (
            <View key={`gv${p}`} style={[styles.gridV, { left: `${p}%`, backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)' }]} />
          ))}
          <MapTargetIcon color={c.primary} size={80} />
          {/* Green dot top-right */}
          <View style={[styles.greenDot, { backgroundColor: c.primary }]} />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: isDark ? '#FFF' : c.text }]}>Enable Location</Text>

        {/* Description */}
        <Text style={[styles.desc, { color: c.textSecondary }]}>
          We'll only use your location when you send an SOS, so your loved ones know where you are and can be there for you when it matters most.
        </Text>

        {/* Continue */}
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EmergencyContacts')}
        >
          <Text style={styles.continueBtnText}>Continue</Text>
        </TouchableOpacity>

        {/* Emergency Contacts link */}
        <TouchableOpacity style={styles.linkRow} onPress={() => navigation.navigate('EmergencyContacts')}>
          <Text style={[styles.linkText, { color: c.primary }]}>EMERGENCY CONTACTS</Text>
          <ChevronRight color={c.primary} />
        </TouchableOpacity>

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : c.divider }]}>
          <Text style={[styles.footerText, { color: c.textSecondary }]}>
            Stay prepared for any emergency. Add your emergency contacts to make sure your SOS alert is sent to the right people when every second counts.
          </Text>
        </View>
      </View>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1 },

  modal: {
    marginHorizontal: 18, borderRadius: 33, borderWidth: 1,
    overflow: 'hidden', flex: 1, marginBottom: 100,
  },

  mapBox: {
    marginHorizontal: 48, marginTop: 19, height: 210,
    borderRadius: 32, borderWidth: 1,
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
  },
  gridH: { position: 'absolute', left: 0, right: 0, height: 1 },
  gridV: { position: 'absolute', top: 0, bottom: 0, width: 1 },
  greenDot: {
    position: 'absolute', top: 42, right: 62,
    width: 10, height: 10, borderRadius: 5,
  },

  title: {
    fontSize: 24, fontWeight: '700', textAlign: 'center',
    marginTop: 32, letterSpacing: -0.6, lineHeight: 32, fontFamily: 'Inter-Bold',
  },
  desc: {
    fontSize: 16, fontWeight: '500', textAlign: 'center',
    marginTop: 16, marginHorizontal: 32, lineHeight: 24, fontFamily: 'Inter-Medium',
  },

  continueBtn: {
    marginHorizontal: 40, marginTop: 32, height: 58,
    borderRadius: 33, alignItems: 'center', justifyContent: 'center',
  },
  continueBtnText: {
    fontSize: 18, fontWeight: '700', lineHeight: 28,
    color: '#141414', fontFamily: 'Inter-Bold',
  },

  linkRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24,
  },
  linkText: {
    fontSize: 12, fontWeight: '700', letterSpacing: 0.6,
    textTransform: 'uppercase', lineHeight: 16, fontFamily: 'Inter-Bold',
  },

  footer: {
    borderTopWidth: 1, marginTop: 16, marginHorizontal: 40,
    paddingTop: 10, paddingBottom: 40,
  },
  footerText: {
    fontSize: 12, fontWeight: '400', textAlign: 'center', lineHeight: 16, fontFamily: 'Inter',
  },
});
