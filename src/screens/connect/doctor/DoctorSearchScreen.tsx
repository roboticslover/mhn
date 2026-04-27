import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
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

function StarIcon({ color }: { color: string }) {
  return (
    <Svg width={11} height={10} viewBox="0 0 12 11" fill={color}>
      <Path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" />
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

function DoctorAvatar({
  name, verified, primaryGreen, bg, borderColor,
}: { name: string; verified?: boolean; primaryGreen: string; bg: string; borderColor: string }) {
  const initials = name.replace('Dr. ', '').slice(0, 2).toUpperCase();
  return (
    <View style={{ position: 'relative', width: 56, height: 56 }}>
      <View style={{
        width: 56, height: 56, borderRadius: 18,
        backgroundColor: bg,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Text style={{ color: primaryGreen, fontSize: 17, fontFamily: 'Inter-Bold', fontWeight: '700' }}>{initials}</Text>
      </View>
      {verified && (
        <View style={{
          position: 'absolute', bottom: -1, right: -1,
          width: 16, height: 16, borderRadius: 8,
          backgroundColor: primaryGreen,
          alignItems: 'center', justifyContent: 'center',
          borderWidth: 2, borderColor,
        }}>
          <Ionicons name="checkmark" size={8} color="#003910" />
        </View>
      )}
    </View>
  );
}

export default function DoctorSearchScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [searchText, setSearchText] = useState('');

  const primaryGreen = isDark ? '#55EE71' : '#39A657';
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : ['#39A657', '#2D8A47'];
  const cardBg = isDark ? '#2A2A2A' : '#F3F4F6';
  const avatarBg = isDark ? '#1E1E1E' : '#E5E7EB';
  const subText = isDark ? '#BCCBB7' : '#6B7280';
  const headText = isDark ? '#E2E2E2' : '#111827';

  const filtered = SEARCH_RESULTS.filter(d =>
    d.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={{ paddingTop: insets.top + 6 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)' }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Doctors Connect</Text>
          <View style={{ width: 40 }} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <View style={[styles.searchBar, {
          backgroundColor: isDark ? 'rgba(31,31,31,0.7)' : 'rgba(243,244,246,0.95)',
          borderColor: isDark ? 'rgba(143,147,120,0.15)' : 'rgba(209,213,219,0.5)',
        }]}>
          {/* Search icon */}
          <SearchIcon color={isDark ? 'rgba(255,255,255,0.4)' : '#9CA3AF'} />

          {/* Input */}
          <TextInput
            style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#111827' }]}
            placeholder="SEARCH BY DOCTOR NAME"
            placeholderTextColor={isDark ? 'rgba(255,255,255,0.15)' : '#C4C9D4'}
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          {/* Small enter/clear button */}
          <TouchableOpacity
            onPress={() => {
              if (searchText.length > 0) setSearchText('');
              Keyboard.dismiss();
            }}
            style={[styles.enterBtn, {
              backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            }]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={searchText.length > 0 ? 'close' : 'return-down-back'}
              size={14}
              color={isDark ? 'rgba(255,255,255,0.5)' : '#888'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Doctor List */}
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cardList}>
          {filtered.map(doc => (
            <TouchableOpacity
              key={doc.id}
              style={[styles.doctorCard, { backgroundColor: cardBg }]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('DoctorDetailConnectedScreen', { doctor: doc })}
            >
              <DoctorAvatar
                name={doc.name}
                verified={doc.verified}
                primaryGreen={primaryGreen}
                bg={avatarBg}
                borderColor={c.background}
              />
              <View style={styles.doctorInfo}>
                <Text style={[styles.doctorName, { color: headText }]}>{doc.name}</Text>
                <Text style={[styles.doctorSpecialty, { color: subText }]}>{doc.specialty}</Text>
                <View style={styles.ratingRow}>
                  <StarIcon color={primaryGreen} />
                  <Text style={[styles.ratingText, { color: primaryGreen }]}>{doc.rating}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={isDark ? '#555' : '#C4C9D4'} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Can't find CTA */}
        <View style={styles.addBtnWrap}>
          <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.addBtn}>
            <TouchableOpacity
              style={styles.addBtnInner}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('DoctorAddScreen')}
            >
              <Text style={styles.addBtnText}>Can't find your doctor? Add here</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22, fontWeight: '700', fontFamily: 'Manrope-Bold',
  },
  searchWrap: { paddingHorizontal: 20, marginBottom: 14 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 50,
    paddingLeft: 18,
    paddingRight: 10,
    paddingVertical: 11,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Manrope-ExtraBold',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    paddingVertical: 0,
  },
  enterBtn: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { paddingHorizontal: 20 },
  cardList: { gap: 10 },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 24,
  },
  doctorInfo: { flex: 1 },
  doctorName: {
    fontSize: 15, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 22,
  },
  doctorSpecialty: {
    fontSize: 12, fontFamily: 'Inter', lineHeight: 16, marginTop: 2,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  ratingText: { fontSize: 9, fontWeight: '700', fontFamily: 'Inter-Bold' },
  addBtnWrap: { marginTop: 14 },
  addBtn: { borderRadius: 999 },
  addBtnInner: {
    height: 56, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24,
  },
  addBtnText: {
    fontSize: 16, fontWeight: '700', fontFamily: 'Inter-Bold',
    color: '#003910', textAlign: 'center',
  },
});
