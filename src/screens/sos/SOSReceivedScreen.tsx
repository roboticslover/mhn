import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import BottomNavBar from '../../components/BottomNavBar';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

// Phone icon
function PhoneIcon({ color = '#6FFB85', size = 20 }: { color?: string; size?: number }) {
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

// Heart rate icon
function HeartIcon({ color = '#FF6B6B', size = 19 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10.51 17.12C10.23 17.22 9.77 17.22 9.49 17.12C7.04 16.26 1.67 12.91 1.67 7.23C1.67 4.73 3.69 2.7 6.17 2.7C7.63 2.7 8.92 3.39 9.75 4.47C10.21 3.9 10.8 3.44 11.47 3.13C12.14 2.82 12.87 2.66 13.61 2.67C16.09 2.67 18.11 4.7 18.11 7.2C18.11 12.88 12.74 16.23 10.51 17.12Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Medical document icon
function MedicalIcon({ color = '#AAAAAA', size = 19 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect x={3} y={1} width={14} height={18} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M7 6H13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7 10H13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7 14H10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// Map pin icon
function MapPinIcon({ size = 32 }: { size?: number }) {
  return (
    <Svg width={size} height={size * 1.25} viewBox="0 0 32 40" fill="none">
      <Path
        d="M16 0C7.163 0 0 7.163 0 16C0 28 16 40 16 40S32 28 32 16C32 7.163 24.837 0 16 0Z"
        fill="#E42828"
      />
      <Circle cx={16} cy={16} r={6} fill="#FFF" />
    </Svg>
  );
}

// Chevron right
function ChevronRight({ color = '#AAAAAA', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path d="M6 4L10 8L6 12" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function SOSReceivedScreen({ navigation }: { navigation: any }) {
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

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Emergency Contacts"
          onBack={() => navigation.goBack()}
        />

        {/* Map Section */}
        <View style={styles.mapSection}>
          <View style={[styles.mapPlaceholder, { backgroundColor: isDark ? '#1A2E1A' : '#E0EDE0' }]}>
            <MapPinIcon size={32} />
            <Text style={[styles.mapLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>
              Hyderabad
            </Text>
          </View>
          {/* Open in Google Maps button */}
          <TouchableOpacity style={[styles.mapCTA, { backgroundColor: isDark ? 'rgba(53,53,53,0.8)' : 'rgba(200,200,200,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.cardBorder }]}>
            <Text style={[styles.mapCTAText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter' }]}>
              OPEN IN GOOGLE MAPS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Card */}
        <View
          style={[
            styles.contentCard,
            {
              backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
            },
          ]}
        >
          {/* Status Alert */}
          <View style={styles.statusAlert}>
            <View style={styles.statusDot} />
            <Text style={[styles.statusText, { color: c.text, fontFamily: 'Inter-Medium' }]}>
              Emergency signal was received{'\n'}from Praneeth Velpuri
            </Text>
          </View>

          {/* Date & Name */}
          <View style={styles.mainInfo}>
            <Text style={[styles.dateText, { color: c.textSecondary, fontFamily: 'Inter' }]}>
              6 Apr 2026 at 10:36 am
            </Text>
            <Text style={[styles.personName, { color: c.text, fontFamily: 'Inter-Bold' }]}>
              Praneeth Velpuri
            </Text>
          </View>

          {/* Phone number */}
          <View style={[styles.infoRow, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
            <PhoneIcon color={c.primary} />
            <Text style={[styles.infoRowText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter' }]}>
              +91 73860 34229
            </Text>
            <ChevronRight color={c.textSecondary} />
          </View>

          {/* Age & Gender */}
          <View style={styles.detailsGrid}>
            <View style={[styles.detailChip, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
              <Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>AGE</Text>
              <Text style={[styles.detailValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Medium' }]}>57 Yrs</Text>
            </View>
            <View style={[styles.detailChip, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
              <Text style={[styles.detailLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>GENDER</Text>
              <Text style={[styles.detailValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Medium' }]}>Female</Text>
            </View>
          </View>

          {/* Blood Group */}
          <View style={styles.bloodGroupRow}>
            <View style={[styles.bloodGroupLabel, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.inputBackground, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
              <Text style={[styles.bloodGroupText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter' }]}>Blood Group</Text>
            </View>
            <View style={[styles.bloodGroupValue, { backgroundColor: c.primary }]}>
              <Text style={[styles.bloodGroupValueText, { color: c.textOnPrimary, fontFamily: 'Inter-Medium' }]}>O+</Text>
            </View>
          </View>

          {/* Call Emergency Contact button */}
          <TouchableOpacity style={[styles.callBtn, { backgroundColor: c.primary }]}>
            <PhoneIcon color={c.textOnPrimary} />
            <Text style={[styles.callBtnText, { color: c.textOnPrimary, fontFamily: 'Manrope-ExtraBold' }]}>
              Call Emergency Contact
            </Text>
          </TouchableOpacity>
        </View>

        {/* Secondary Health Data */}
        <View style={styles.healthDataGrid}>
          <View style={[styles.healthCard, { backgroundColor: isDark ? '#1B1B1B' : c.card, borderColor: isDark ? 'transparent' : c.cardBorder, borderWidth: isDark ? 0 : 1 }]}>
            <HeartIcon />
            <Text style={[styles.healthLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Last Heart Rate</Text>
            <View style={styles.healthValueRow}>
              <Text style={[styles.healthValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>112 </Text>
              <Text style={[styles.healthUnit, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Medium' }]}>BPM</Text>
            </View>
          </View>
          <View style={[styles.healthCard, { backgroundColor: isDark ? '#1B1B1B' : c.card, borderColor: isDark ? 'transparent' : c.cardBorder, borderWidth: isDark ? 0 : 1 }]}>
            <MedicalIcon color={c.textSecondary} />
            <Text style={[styles.healthLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Medical Information</Text>
            <Text style={[styles.healthLink, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Medium' }]}>View documents</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="sos" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapSection: {
    marginHorizontal: 0,
    height: 430,
    marginBottom: 0,
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapLabel: {
    fontSize: 14,
    marginTop: 8,
  },
  mapCTA: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapCTAText: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  contentCard: {
    marginHorizontal: 20,
    borderRadius: 40,
    borderWidth: 1,
    padding: 32,
    marginTop: -20,
  },
  statusAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 24,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#DB5034',
    marginTop: 6,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    flex: 1,
  },
  mainInfo: {
    gap: 4,
    marginBottom: 24,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  personName: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.68,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 72,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 16,
  },
  infoRowText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailChip: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  bloodGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  bloodGroupLabel: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  bloodGroupText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bloodGroupValue: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloodGroupValueText: {
    fontSize: 18,
    fontWeight: '600',
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 58,
    borderRadius: 33,
  },
  callBtnText: {
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  healthDataGrid: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 16,
    marginTop: 24,
  },
  healthCard: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    gap: 4,
  },
  healthLabel: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: 4,
  },
  healthValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  healthValue: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -0.6,
  },
  healthUnit: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  healthLink: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
