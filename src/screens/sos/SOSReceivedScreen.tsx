import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle, Rect, G, Defs, Stop, LinearGradient as SvgLG } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

/* ─── Icons ─────────────────────────────────────────────── */
function PhoneIcon({ color = '#6FFB85', size = 17 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M18.308 15.275C18.308 15.575 18.242 15.883 18.1 16.183C17.958 16.483 17.775 16.767 17.533 17.033C17.125 17.483 16.675 17.808 16.167 18.017C15.667 18.225 15.125 18.333 14.542 18.333C13.692 18.333 12.783 18.133 11.825 17.725C10.867 17.317 9.908 16.767 8.958 16.075C8 15.375 7.092 14.6 6.225 13.742C5.367 12.875 4.592 11.967 3.9 11.017C3.217 10.067 2.667 9.117 2.267 8.175C1.867 7.225 1.667 6.317 1.667 5.45C1.667 4.883 1.767 4.342 1.967 3.842C2.167 3.333 2.483 2.867 2.925 2.45C3.458 1.925 4.042 1.667 4.658 1.667C4.892 1.667 5.125 1.717 5.333 1.817C5.55 1.917 5.742 2.067 5.892 2.283L7.825 5.008C7.975 5.217 8.083 5.408 8.158 5.592C8.233 5.767 8.275 5.942 8.275 6.1C8.275 6.3 8.217 6.5 8.1 6.692C7.992 6.883 7.833 7.083 7.633 7.283L7 7.942C6.908 8.033 6.867 8.142 6.867 8.275C6.867 8.342 6.875 8.4 6.892 8.467C6.917 8.533 6.942 8.583 6.958 8.633C7.108 8.908 7.367 9.267 7.733 9.7C8.108 10.133 8.508 10.575 8.942 11.017C9.392 11.458 9.825 11.867 10.267 12.242C10.7 12.608 11.058 12.858 11.342 13.008C11.383 13.025 11.433 13.05 11.492 13.075C11.558 13.1 11.625 13.108 11.7 13.108C11.842 13.108 11.95 13.058 12.042 12.967L12.675 12.342C12.883 12.133 13.083 11.975 13.275 11.875C13.467 11.758 13.658 11.7 13.867 11.7C14.025 11.7 14.192 11.733 14.375 11.808C14.558 11.883 14.75 11.992 14.958 12.133L17.717 14.092C17.933 14.242 18.083 14.417 18.175 14.625C18.258 14.833 18.308 15.042 18.308 15.275Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

function HeartIcon() {
  return (
    <Svg width={19} height={17} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.51 17.12C10.23 17.22 9.77 17.22 9.49 17.12C7.04 16.26 1.67 12.91 1.67 7.23C1.67 4.73 3.69 2.7 6.17 2.7C7.63 2.7 8.92 3.39 9.75 4.47C10.21 3.9 10.8 3.44 11.47 3.13C12.14 2.82 12.87 2.66 13.61 2.67C16.09 2.67 18.11 4.7 18.11 7.2C18.11 12.88 12.74 16.23 10.51 17.12Z"
        stroke="#FF6B6B"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MedicalDocIcon({ color = '#AAAAAA' }: { color?: string }) {
  return (
    <Svg width={19} height={19} viewBox="0 0 20 20" fill="none">
      <Rect x={3} y={1} width={14} height={18} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M7 6H13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7 10H13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7 14H10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ChevronRightSmall({ color = '#AAAAAA' }: { color?: string }) {
  return (
    <Svg width={7} height={12} viewBox="0 0 7 12" fill="none">
      <Path d="M1 1L6 6L1 11" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MapCopyIcon({ color = '#E2E2E2' }: { color?: string }) {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
      <Rect x={0.5} y={0.5} width={6} height={6} rx={1} stroke={color} strokeWidth={0.8} />
      <Rect x={3.5} y={3.5} width={6} height={6} rx={1} stroke={color} strokeWidth={0.8} />
    </Svg>
  );
}

/* ─── Shielded Age icon ──────────────────────────────────── */
function ShieldAgeIcon({ color = '#BCCBB7' }: { color?: string }) {
  return (
    <Svg width={17} height={19} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.64 20.59 3.09 16.01 3.09 11.12V6.73C3.09 5.91 3.71 4.98 4.48 4.67L10.05 2.39C11.3 1.88 12.71 1.88 13.96 2.39L19.53 4.67C20.29 4.98 20.92 5.91 20.92 6.73L20.91 11.12Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function GenderIcon({ color = '#BCCBB7' }: { color?: string }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
      <Path d="M12 16V21M10 19H14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={12} cy={10} r={6} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

/* ─── Map Section ────────────────────────────────────────── */
function MapSection({ isDark }: { isDark: boolean }) {
  return (
    <View style={mapStyles.container}>
      {/* Map bg */}
      <View style={[mapStyles.mapBg, { backgroundColor: isDark ? '#1C3220' : '#DCEADC' }]}>
        {/* Grid for map feel */}
        {[20, 35, 50, 65, 80].map(p => (
          <View key={`mh${p}`} style={[mapStyles.lineH, { top: `${p}%`, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />
        ))}
        {[15, 30, 45, 60, 75, 90].map(p => (
          <View key={`mv${p}`} style={[mapStyles.lineV, { left: `${p}%`, backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }]} />
        ))}
        {/* City labels */}
        <Text style={[mapStyles.cityLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', top: '30%', left: '20%' }]}>Secunderabad</Text>
        <Text style={[mapStyles.cityLabel, { color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)', top: '48%', left: '10%' }]}>Map Preview</Text>
        {/* Location pin */}
        <View style={mapStyles.pinContainer}>
          <View style={mapStyles.pin} />
          <View style={mapStyles.pinShadow} />
        </View>
        {/* City name near pin */}
        <View style={mapStyles.cityRow}>
          <Text style={[mapStyles.cityName, { color: isDark ? '#E2E2E2' : '#333' }]}>Hyderabad</Text>
          <Text style={[mapStyles.cityNameTelugu, { color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }]}>హైదరాబాద్</Text>
        </View>
      </View>
      {/* Gradient overlay at bottom */}
      <View style={[mapStyles.gradient, { backgroundColor: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)' }]} />
      {/* Open in Google Maps button */}
      <TouchableOpacity
        style={[mapStyles.mapsBtn, { backgroundColor: isDark ? 'rgba(53,53,53,0.8)' : 'rgba(200,200,200,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)' }]}
        onPress={() => Linking.openURL('https://maps.google.com/?q=Hyderabad')}
      >
        <MapCopyIcon color={isDark ? '#E2E2E2' : '#333'} />
        <Text style={[mapStyles.mapsBtnText, { color: isDark ? '#E2E2E2' : '#333' }]}>OPEN IN GOOGLE MAPS</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  container: { height: 432, overflow: 'hidden' },
  mapBg: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  lineH: { position: 'absolute', left: 0, right: 0, height: 1 },
  lineV: { position: 'absolute', top: 0, bottom: 0, width: 1 },
  cityLabel: { position: 'absolute', fontSize: 11, fontFamily: 'Inter', letterSpacing: 0.3 },
  pinContainer: { position: 'absolute', top: '38%', left: '40%', alignItems: 'center' },
  pin: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#E42828', zIndex: 2, shadowColor: '#E42828', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.9, shadowRadius: 10, elevation: 6 },
  pinShadow: { width: 12, height: 4, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.3)', marginTop: 2 },
  cityRow: { position: 'absolute', top: '52%', left: '38%' },
  cityName: { fontSize: 13, fontWeight: '600', fontFamily: 'Inter' },
  cityNameTelugu: { fontSize: 10, fontFamily: 'Inter' },
  gradient: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 140 },
  mapsBtn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 13,
  },
  mapsBtnText: { fontSize: 12, fontWeight: '400', letterSpacing: 0.6, textTransform: 'uppercase', fontFamily: 'Inter' },
});

/* ─── Screen Component ───────────────────────────────────── */
export default function SOSReceivedScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Emergency Contacts" onBack={() => navigation.goBack()} />

        {/* ── Map ── */}
        <MapSection isDark={isDark} />

        {/* ── Content Card (glass morphism) ── */}
        <View style={[styles.card, {
          backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
          borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
        }]}>

          {/* Status alert */}
          <View style={styles.alertRow}>
            <View style={styles.alertDot} />
            <Text style={[styles.alertText, { color: isDark ? '#FFF' : c.text }]}>
              {'Emergency signal was received \nfrom Praneeth Velpuri'}
            </Text>
          </View>

          {/* Date + Name */}
          <View style={styles.mainInfo}>
            <Text style={[styles.dateText, { color: '#AAAAAA' }]}>6 Apr 2026 at 10:36 am</Text>
            <Text style={[styles.personName, { color: isDark ? '#FFF' : c.text }]}>
              Praneeth Velpuri
            </Text>
          </View>

          {/* Phone row */}
          <View style={[styles.phoneRow, {
            backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
          }]}>
            <PhoneIcon color={c.primary} size={17} />
            <Text style={[styles.phoneText, { color: isDark ? '#E2E2E2' : c.text }]}>+91 73860 34229</Text>
            <ChevronRightSmall color={isDark ? '#AAAAAA' : c.textSecondary} />
          </View>

          {/* Age + Gender chips */}
          <View style={styles.detailsRow}>
            <View style={[styles.detailChip, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : c.inputBackground }]}>
              <ShieldAgeIcon color={isDark ? '#BCCBB7' : c.textSecondary} />
              <View>
                <Text style={[styles.detailLabel, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>AGE</Text>
                <Text style={[styles.detailValue, { color: isDark ? '#E2E2E2' : c.text }]}>57 Yrs</Text>
              </View>
            </View>
            <View style={[styles.detailChip, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : c.inputBackground }]}>
              <GenderIcon color={isDark ? '#BCCBB7' : c.textSecondary} />
              <View>
                <Text style={[styles.detailLabel, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>GENDER</Text>
                <Text style={[styles.detailGenderVal, { color: isDark ? '#E2E2E2' : c.text }]}>Female</Text>
              </View>
            </View>
          </View>

          {/* Blood Group */}
          <View style={styles.bloodRow}>
            <View style={[styles.bloodLabelPill, {
              backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground,
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
            }]}>
              <Text style={[styles.bloodLabelText, { color: isDark ? '#FFF' : c.text }]}>Blood Group</Text>
            </View>
            <View style={[styles.bloodValuePill, { backgroundColor: c.primary }]}>
              <Text style={styles.bloodValueText}>O+</Text>
            </View>
          </View>

          {/* Call Emergency Contact */}
          <TouchableOpacity style={[styles.callBtn, { backgroundColor: c.primary }]} activeOpacity={0.8}>
            <PhoneIcon color="#141414" size={18} />
            <Text style={styles.callBtnText}>Call Emergency Contact</Text>
          </TouchableOpacity>
        </View>

        {/* ── Health Data Bento ── */}
        <View style={styles.healthGrid}>
          <View style={[styles.healthCard, { backgroundColor: isDark ? '#1B1B1B' : c.card }]}>
            <HeartIcon />
            <Text style={[styles.healthLabel, { color: '#AAAAAA' }]}>Last Heart Rate</Text>
            <View style={styles.healthValRow}>
              <Text style={[styles.healthVal, { color: isDark ? '#E2E2E2' : c.text }]}>112 </Text>
              <Text style={[styles.healthUnit, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>BPM</Text>
            </View>
          </View>
          <View style={[styles.healthCard, { backgroundColor: isDark ? '#1B1B1B' : c.card }]}>
            <MedicalDocIcon color="#AAAAAA" />
            <Text style={[styles.healthLabel, { color: '#AAAAAA' }]}>Medical Information</Text>
            <Text style={[styles.healthLink, { color: isDark ? '#E2E2E2' : c.text }]}>View documents</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Content Card */
  card: {
    marginHorizontal: 20,
    borderRadius: 40,
    borderWidth: 1,
    padding: 32,
    marginTop: -20,
  },
  alertRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 16 },
  alertDot: {
    width: 12, height: 12, borderRadius: 6, backgroundColor: '#DB5034', marginTop: 6,
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 12, elevation: 4,
  },
  alertText: { fontSize: 16, fontWeight: '500', lineHeight: 24, flex: 1, fontFamily: 'Inter-Medium' },

  mainInfo: { gap: 4, marginBottom: 24 },
  dateText: { fontSize: 12, fontWeight: '400', lineHeight: 16, fontFamily: 'Inter' },
  personName: { fontSize: 34, fontWeight: '700', letterSpacing: -0.68, fontFamily: 'WorkSans-Bold' },

  phoneRow: {
    flexDirection: 'row', alignItems: 'center', height: 72, borderRadius: 33, borderWidth: 1,
    paddingHorizontal: 20, gap: 16, marginBottom: 16,
  },
  phoneText: { fontSize: 18, fontWeight: '700', flex: 1, fontFamily: 'Inter-Bold' },

  detailsRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  detailChip: {
    flex: 1, borderRadius: 33, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 16, height: 77,
  },
  detailLabel: { fontSize: 10, fontWeight: '400', letterSpacing: 1, textTransform: 'uppercase', lineHeight: 15, fontFamily: 'Inter' },
  detailValue: { fontSize: 14, fontWeight: '800', lineHeight: 20, fontFamily: 'Manrope-ExtraBold', textTransform: 'capitalize' },
  detailGenderVal: { fontSize: 18, fontWeight: '700', lineHeight: 28, fontFamily: 'Inter-Bold' },

  bloodRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  bloodLabelPill: {
    flex: 1, borderRadius: 33, borderWidth: 1, height: 58, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12,
  },
  bloodLabelText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter-Bold' },
  bloodValuePill: {
    width: 108, height: 58, borderRadius: 40, alignItems: 'center', justifyContent: 'center',
  },
  bloodValueText: { fontSize: 32, fontWeight: '500', color: '#141414', fontFamily: 'Inter-Medium', lineHeight: 36 },

  callBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 58, borderRadius: 999,
  },
  callBtnText: { fontSize: 18, fontWeight: '700', lineHeight: 28, color: '#141414', fontFamily: 'Inter-Bold' },

  /* Health bento */
  healthGrid: { flexDirection: 'row', marginHorizontal: 20, gap: 16, marginTop: 24 },
  healthCard: { flex: 1, borderRadius: 24, padding: 20, gap: 4 },
  healthLabel: { fontSize: 12, fontWeight: '400', lineHeight: 16, marginTop: 4, fontFamily: 'Inter' },
  healthValRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  healthVal: { fontSize: 24, fontWeight: '700', lineHeight: 32, letterSpacing: -0.6, fontFamily: 'Inter-Bold' },
  healthUnit: { fontSize: 16, fontWeight: '500', lineHeight: 24, fontFamily: 'Inter-Medium' },
  healthLink: { fontSize: 16, fontWeight: '500', lineHeight: 24, fontFamily: 'Inter-Medium' },
});
