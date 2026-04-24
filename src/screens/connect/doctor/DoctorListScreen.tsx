import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';

function SearchIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={9} cy={9} r={6} stroke={color} strokeWidth={1.5} />
      <Path d="M13.5 13.5L17 17" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function FilterIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={17} viewBox="0 0 22 17" fill="none">
      <Path d="M1 1H21M5 8.5H17M9 16H13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function StarIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={11} viewBox="0 0 12 11" fill={color}>
      <Path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" />
    </Svg>
  );
}

function VerifiedIcon({ color }: { color: string }) {
  return (
    <Svg width={10} height={10} viewBox="0 0 10 10" fill="none">
      <Circle cx={5} cy={5} r={4} fill={color} />
      <Path d="M3 5L4.5 6.5L7.5 3.5" stroke="#000" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const MOCK_CONNECTED = [
  { id: '1', name: 'Dr. Yashooda', specialty: 'Orthodontist', rating: 4.5, verified: true, avatar: null },
  { id: '2', name: 'Dr. Aris Thorne', specialty: 'Cardiologist', rating: 4.5, verified: false, avatar: null },
];

const MOCK_PENDING = [
  { id: '3', name: 'Dr. Julian S.', specialty: 'General Practitioner' },
  { id: '4', name: 'Dr. Elena Vos', specialty: 'Neurologist' },
];

function DoctorAvatar({ name, size = 56 }: { name: string; size?: number }) {
  const initials = name.split(' ').filter(w => w.startsWith('Dr.') ? false : true).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'DR';
  return (
    <View style={{ width: size, height: size, borderRadius: 16, backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#6FFB85', fontSize: 18, fontFamily: 'Inter-Bold', fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

export default function DoctorListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [searchText, setSearchText] = useState('');

  const totalConnections = MOCK_CONNECTED.length + MOCK_PENDING.length;
  const progressPct = Math.min(1, totalConnections / 20);

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const cardBg = isDark ? '#1F1F1F' : c.card;
  const doctorCardBg = isDark ? '#2A2A2A' : c.cardElevated;
  const pendingCardBg = isDark ? '#1F1F1F' : c.card;
  const subText = isDark ? '#BCCBB7' : c.textSecondary;
  const headText = isDark ? '#E2E2E2' : c.text;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <View style={{ paddingTop: insets.top + 4 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: c.cardGlassBorder }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Manrope-Bold' }]}>
            Doctors Connect
          </Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <View style={[styles.searchBar, {
          backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : c.searchBackground,
          borderColor: isDark ? 'rgba(143,147,120,0.15)' : c.cardBorder,
        }]}>
          <SearchIcon color={isDark ? 'rgba(255,255,255,0.3)' : c.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: c.text, fontFamily: 'Manrope-Bold' }]}
            placeholder="SEARCH BY DOCTOR NAME"
            placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : c.searchPlaceholder}
            value={searchText}
            onChangeText={setSearchText}
          />
          <FilterIcon color={isDark ? 'rgba(255,255,255,0.3)' : c.textSecondary} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Total Connections Card */}
        <View style={[styles.summaryCard, { backgroundColor: cardBg }]}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={[styles.summaryLabel, { color: subText }]}>TOTAL CONNECTIONS</Text>
              <View style={styles.summaryCountRow}>
                <Text style={[styles.summaryCount, { color: headText }]}>{totalConnections}</Text>
                <Text style={[styles.summaryBadge, { color: primaryGreen }]}>+2 this month</Text>
              </View>
            </View>
            <View style={[styles.summaryIcon, { backgroundColor: isDark ? 'rgba(85,238,113,0.1)' : c.accentSoft }]}>
              <Ionicons name="people" size={26} color={primaryGreen} />
            </View>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: isDark ? '#0E0E0E' : c.progressBackground }]}>
            <View style={[styles.progressFill, { width: `${progressPct * 100}%`, backgroundColor: primaryGreen }]} />
          </View>
        </View>

        {/* Connected Doctors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: headText }]}>Connected Doctors</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: primaryGreen }]}>View All</Text>
            </TouchableOpacity>
          </View>
          {MOCK_CONNECTED.map(doc => (
            <TouchableOpacity
              key={doc.id}
              style={[styles.doctorCard, { backgroundColor: doctorCardBg }]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('DoctorDetailScreen', { doctor: doc })}
            >
              <DoctorAvatar name={doc.name} />
              <View style={styles.doctorInfo}>
                <Text style={[styles.doctorName, { color: headText }]}>{doc.name}</Text>
                <Text style={[styles.doctorSpecialty, { color: subText }]}>{doc.specialty}</Text>
                <View style={styles.ratingRow}>
                  <StarIcon color={primaryGreen} />
                  <Text style={[styles.ratingText, { color: primaryGreen }]}>{doc.rating}</Text>
                </View>
              </View>
              {doc.verified && (
                <View style={styles.verifiedBadge}>
                  <VerifiedIcon color={primaryGreen} />
                </View>
              )}
              <Ionicons name="chevron-forward" size={20} color={c.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Pending Verifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: headText }]}>Pending Verifications</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pendingScroll}>
            {MOCK_PENDING.map(doc => (
              <View key={doc.id} style={[styles.pendingCard, { backgroundColor: pendingCardBg }]}>
                <View style={[styles.pendingAvatarBg, { backgroundColor: isDark ? '#353535' : c.skeleton }]}>
                  <Ionicons name="person" size={16} color={isDark ? '#BCCBB7' : c.textSecondary} />
                </View>
                <View style={styles.pendingInfo}>
                  <Text style={[styles.pendingName, { color: headText }]}>{doc.name}</Text>
                  <Text style={[styles.pendingSpec, { color: subText }]}>{doc.specialty.toUpperCase()}</Text>
                </View>
                <View style={[styles.pendingBadge, { backgroundColor: isDark ? '#353535' : c.skeleton }]}>
                  <Text style={[styles.pendingBadgeText, { color: primaryGreen }]}>PENDING</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: insets.bottom + 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
  headerRight: { width: 40 },
  searchWrap: { paddingHorizontal: 20, marginBottom: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 48,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: '800', letterSpacing: 1.4 },
  scroll: { paddingHorizontal: 24, paddingTop: 4 },
  summaryCard: {
    borderRadius: 33,
    padding: 24,
    marginBottom: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 4,
  },
  summaryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  summaryLabel: { fontSize: 12, fontWeight: '500', letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: 'Inter', marginBottom: 4 },
  summaryCountRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  summaryCount: { fontSize: 48, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: -2.4, lineHeight: 52 },
  summaryBadge: { fontSize: 14, fontWeight: '600', fontFamily: 'Inter' },
  summaryIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { height: 6, borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 999 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '600', fontFamily: 'Inter', letterSpacing: -0.5 },
  viewAll: { fontSize: 14, fontWeight: '500', fontFamily: 'Inter' },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 33,
    marginBottom: 12,
  },
  doctorInfo: { flex: 1 },
  doctorName: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 24 },
  doctorSpecialty: { fontSize: 12, fontFamily: 'Inter', lineHeight: 16, marginTop: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ratingText: { fontSize: 8, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 16 },
  verifiedBadge: { marginRight: 4 },
  pendingScroll: { marginTop: 8 },
  pendingCard: {
    width: 192,
    borderRadius: 33,
    padding: 16,
    marginRight: 16,
    gap: 12,
  },
  pendingAvatarBg: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingInfo: { gap: 4 },
  pendingName: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 20 },
  pendingSpec: { fontSize: 10, fontFamily: 'Inter', letterSpacing: 0.5, lineHeight: 15 },
  pendingBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  pendingBadgeText: { fontSize: 10, fontWeight: '600', fontFamily: 'Inter', lineHeight: 15 },
});
