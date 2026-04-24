import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

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

function ShieldIcon({ color }: { color: string }) {
  return (
    <Svg width={10} height={12} viewBox="0 0 10 12" fill="none">
      <Path d="M5 1L9 2.5V6C9 8.5 7 10.5 5 11C3 10.5 1 8.5 1 6V2.5L5 1Z" stroke={color} strokeWidth={1.2} strokeLinejoin="round" />
      <Path d="M3.5 6L4.5 7L6.5 5" stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const SEARCH_RESULTS = [
  { id: '1', name: 'Dr. Abhi', specialty: 'Orthodontist', rating: 4.5, verified: true },
  { id: '2', name: 'Dr. Abhinav', specialty: 'Cardiologist', rating: 4.5, verified: false },
  { id: '3', name: 'Dr. Abhi D', specialty: 'Orthodontist', rating: 4.5, verified: true },
  { id: '4', name: 'Dr. Abhinash', specialty: 'Cardiologist', rating: 4.5, verified: false },
  { id: '5', name: 'Dr. Abhiram', specialty: 'Orthodontist', rating: 4.5, verified: true },
  { id: '6', name: 'Dr. Abhi', specialty: 'Cardiologist', rating: 4.5, verified: false },
  { id: '7', name: 'Dr. Abhimanyu', specialty: 'Orthodontist', rating: 4.5, verified: true },
  { id: '8', name: 'Dr. Abhishek', specialty: 'Cardiologist', rating: 4.5, verified: false },
];

function DoctorAvatar({ name, size = 56 }: { name: string; size?: number }) {
  const initials = name.replace('Dr. ', '').slice(0, 2).toUpperCase();
  return (
    <View style={{ width: size, height: size, borderRadius: 16, backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#6FFB85', fontSize: 16, fontFamily: 'Inter-Bold', fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}

export default function DoctorSearchScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [searchText, setSearchText] = useState('');

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : [c.primary, c.primaryDark];
  const doctorCardBg = isDark ? '#2A2A2A' : c.cardElevated;
  const subText = isDark ? '#BCCBB7' : c.textSecondary;
  const headText = isDark ? '#E2E2E2' : c.text;

  const filtered = SEARCH_RESULTS.filter(d =>
    d.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
          <SearchIcon color={isDark ? 'rgba(255,255,255,0.5)' : c.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: c.text, fontFamily: 'Manrope-Bold' }]}
            placeholder="SEARCH BY DOCTOR NAME"
            placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : c.searchPlaceholder}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          <FilterIcon color={isDark ? 'rgba(255,255,255,0.3)' : c.textSecondary} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {filtered.map(doc => (
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
                {doc.verified && (
                  <View style={styles.shieldWrap}>
                    <ShieldIcon color={primaryGreen} />
                  </View>
                )}
                <StarIcon color={primaryGreen} />
                <Text style={[styles.ratingText, { color: primaryGreen }]}>{doc.rating}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={c.textTertiary} />
          </TouchableOpacity>
        ))}

        {/* Can't find? Add manually */}
        <View style={styles.addBtnWrap}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.addBtn}
          >
            <TouchableOpacity
              style={styles.addBtnInner}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('DoctorAddScreen')}
            >
              <Text style={[styles.addBtnText, { fontFamily: 'Inter-Bold' }]}>
                Can't find your doctor? Add here
              </Text>
            </TouchableOpacity>
          </LinearGradient>
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
  scroll: { paddingHorizontal: 24 },
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
  shieldWrap: { marginRight: 2 },
  ratingText: { fontSize: 8, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 16 },
  addBtnWrap: { marginTop: 8, marginBottom: 8 },
  addBtn: { borderRadius: 999 },
  addBtnInner: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  addBtnText: { fontSize: 18, fontWeight: '700', color: '#003910', lineHeight: 28, textAlign: 'center' },
});
