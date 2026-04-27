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
import Svg, { Path, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

function StarIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 11" fill={color}>
      <Path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" />
    </Svg>
  );
}

function ShareIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M3 9V15C3 15.5523 3.44772 16 4 16H14C14.5523 16 15 15.5523 15 15V9" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M9 2V12M6 5L9 2L12 5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function HospitalIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={20} viewBox="0 0 16 20" fill="none">
      <Rect x={1} y={5} width={14} height={14} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M6 19V13H10V19" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M8 1V5M6 3H10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function DegreeIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={18} viewBox="0 0 20 18" fill="none">
      <Path d="M10 1L19 6L10 11L1 6L10 1Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M5 8.5V13.5C5 13.5 7 16 10 16C13 16 15 13.5 15 13.5V8.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function WorkIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={16} viewBox="0 0 20 16" fill="none">
      <Rect x={1} y={4} width={18} height={11} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M7 4V3C7 1.89543 7.89543 1 9 1H11C12.1046 1 13 1.89543 13 3V4" stroke={color} strokeWidth={1.5} />
      <Path d="M1 8H19" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function TrashIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
      <Path d="M1 3H11M4 3V2C4 1.44772 4.44772 1 5 1H7C7.55228 1 8 1.44772 8 2V3M5 6V10M7 6V10M2 3L2.66667 12C2.66667 12.5523 3.11438 13 3.66667 13H8.33333C8.88562 13 9.33333 12.5523 9.33333 12L10 3H2Z" stroke={color} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const REPORT_VISIBILITY = ['3 Hours', '1 Day', 'Forever', 'Custom'];

const CREDENTIALS = [
  { icon: 'hospital', label: 'City Hospital & Research Centre', sub: 'Senior Orthodontic Consultant • 2016 - Present' },
  { icon: 'degree', label: 'Master of Dental Surgery (MDS)', sub: 'All India Institute of Medical Sciences (AIIMS)' },
  { icon: 'work', label: 'Board Certified Orthodontist', sub: 'Indian Board of Orthodontics (IBO)' },
];

const HOSPITALS = ['City Cardiac Center', 'Global Health Institute'];

const REVIEWS = [
  { initials: 'RM', name: 'Rohan Mehta', time: '2 days ago', rating: 5, text: '"Dr. Priya is incredibly professional. My orthodontic journey was painless and the results are amazing."' },
  { initials: 'SA', name: 'Sneha Agarwal', time: '1 week ago', rating: 4, text: '"Very thorough and explained everything clearly. Highly recommend her practice."' },
];

export default function DoctorDetailConnectedScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [selectedVisibility, setSelectedVisibility] = useState('3 Hours');
  const [starRating, setStarRating] = useState(4);
  const [reviewText, setReviewText] = useState('');

  const primaryGreen = isDark ? '#55EE71' : '#39A657';
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : ['#39A657', '#2D8A47'];
  const cardBg = isDark ? '#1F1F1F' : '#F5F5F5';
  const statCardBg = isDark ? '#1A1A1A' : '#EBEBEB';
  const chipBg = isDark ? '#2A2A2A' : '#E8E8E8';
  const subText = isDark ? '#BCCBB7' : '#6B7280';
  const headText = isDark ? '#E2E2E2' : '#111827';
  const divColor = isDark ? '#3D4A3B' : '#D1D5DB';
  const errorColor = isDark ? '#FF4D4D' : '#DC2626';

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

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Avatar ── */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarCircle, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
            <Ionicons name="person" size={54} color={isDark ? '#BCCBB7' : '#9CA3AF'} />
            <View style={[styles.verifiedDot, { backgroundColor: primaryGreen, borderColor: c.background }]}>
              <Ionicons name="checkmark" size={10} color="#003910" />
            </View>
          </View>
        </View>

        {/* ── Name & Rating ── */}
        <View style={styles.nameBlock}>
          <Text style={[styles.doctorName, { color: headText }]}>Dr. Priya Darshini</Text>
          <Text style={[styles.doctorSpec, { color: primaryGreen }]}>SENIOR ORTHODONTIST</Text>
          <View style={styles.ratingRow}>
            <StarIcon color={primaryGreen} size={15} />
            <Text style={[styles.ratingVal, { color: primaryGreen }]}>4.5</Text>
            <Text style={[styles.ratingOf, { color: subText }]}>/ 5.0</Text>
            <Text style={[styles.dot, { color: divColor }]}>•</Text>
            <Text style={[styles.reviewCount, { color: subText }]}>120+ Reviews</Text>
          </View>
        </View>

        {/* ── Action Buttons ── */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: chipBg }]} activeOpacity={0.8}>
            <ShareIcon color={headText} />
            <Text style={[styles.actionBtnText, { color: headText }]}>Share Profile</Text>
          </TouchableOpacity>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.connectedGradientBtn}
          >
            <TouchableOpacity style={styles.connectedBtnInner} activeOpacity={0.8}>
              <Ionicons name="checkmark-circle" size={17} color="#003910" />
              <Text style={[styles.actionBtnText, { color: '#003910' }]}>Connected</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* ── Report Visibility ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>REPORT VISIBILITY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 4 }}>
            {REPORT_VISIBILITY.map(opt => (
              <TouchableOpacity
                key={opt}
                onPress={() => setSelectedVisibility(opt)}
                style={[
                  styles.visChip,
                  {
                    backgroundColor: selectedVisibility === opt ? primaryGreen : chipBg,
                  },
                ]}
              >
                <Text style={[styles.visChipText, {
                  color: selectedVisibility === opt ? '#003910' : headText,
                }]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: statCardBg }]}>
            <Text style={[styles.statVal, { color: primaryGreen }]}>2,400+</Text>
            <Text style={[styles.statLabel, { color: subText }]}>PATIENTS TREATED</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: statCardBg }]}>
            <Text style={[styles.statVal, { color: primaryGreen }]}>12 Yrs</Text>
            <Text style={[styles.statLabel, { color: subText }]}>EXPERIENCE</Text>
          </View>
        </View>

        {/* ── Professional Bio ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>PROFESSIONAL BIO</Text>
          <View style={[styles.bioCard, { backgroundColor: cardBg }]}>
            <Text style={[styles.bioText, { color: subText }]}>
              Dr. Priya Darshini is a distinguished specialist in advanced orthodontics and dentofacial orthopedics. With over a decade of practice, she specializes in aesthetic dentistry, Invisalign, and complex jaw realignment procedures.{'\n\n'}Her editorial approach to patient care emphasizes minimally invasive techniques and long-term vitality, ensuring every smile is as healthy as it is beautiful.
            </Text>
          </View>
        </View>

        {/* ── Credentials ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>CREDENTIALS</Text>
          <View style={styles.credList}>
            {CREDENTIALS.map((item, i) => (
              <View key={i} style={[styles.credItem, { backgroundColor: cardBg }]}>
                <View style={[styles.credIconBox, { backgroundColor: isDark ? '#2A2A2A' : '#E8E8E8' }]}>
                  {item.icon === 'hospital' && <HospitalIcon color={primaryGreen} />}
                  {item.icon === 'degree' && <DegreeIcon color={primaryGreen} />}
                  {item.icon === 'work' && <WorkIcon color={primaryGreen} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.credLabel, { color: headText }]}>{item.label}</Text>
                  <Text style={[styles.credSub, { color: subText }]}>{item.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ── Associated Hospitals ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>ASSOCIATED HOSPITALS</Text>
          <View style={styles.credList}>
            {HOSPITALS.map((h, i) => (
              <TouchableOpacity key={i} style={[styles.hospitalRow, { backgroundColor: cardBg }]} activeOpacity={0.8}>
                <HospitalIcon color={subText} />
                <Text style={[styles.hospitalName, { color: headText }]}>{h}</Text>
                <Ionicons name="chevron-forward" size={16} color={isDark ? '#555' : '#C4C9D4'} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Patient Experience – Rate ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>PATIENT EXPERIENCE</Text>
          <View style={[styles.rateCard, { backgroundColor: cardBg }]}>
            <Text style={[styles.rateQuestion, { color: isDark ? '#FFFFFF' : '#111827' }]}>How was your consultation?</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(s => (
                <TouchableOpacity key={s} onPress={() => setStarRating(s)} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                  <StarIcon color={s <= starRating ? primaryGreen : (isDark ? '#333' : '#DDD')} size={32} />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.reviewInput, { backgroundColor: isDark ? '#2A2A2A' : '#EBEBEB', borderColor: isDark ? 'rgba(61,74,59,0.3)' : 'rgba(209,213,219,0.5)' }]}
              activeOpacity={1}
            >
              <TextInput
                style={[styles.reviewInputText, { color: subText }]}
                placeholder="Share your experience..."
                placeholderTextColor={subText}
                value={reviewText}
                onChangeText={setReviewText}
                multiline={false}
              />
              <Ionicons name="pencil" size={13} color={subText} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveReviewBtn, { backgroundColor: isDark ? '#30D158' : '#39A657' }]} activeOpacity={0.85}>
              <Text style={styles.saveReviewText}>Save Review</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Patient Reviews ── */}
        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Text style={[styles.sectionLabel, { color: subText, marginBottom: 0 }]}>PATIENT REVIEWS</Text>
            <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={[styles.viewAllText, { color: primaryGreen }]}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewsList}>
            {REVIEWS.map((r, i) => (
              <View key={i} style={[styles.reviewCard, { backgroundColor: cardBg }]}>
                <View style={styles.reviewTop}>
                  <View style={[styles.reviewAvatar, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
                    <Text style={[styles.reviewInitials, { color: primaryGreen }]}>{r.initials}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.reviewName, { color: headText }]}>{r.name}</Text>
                    <View style={styles.reviewStars}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <StarIcon key={s} color={s <= r.rating ? primaryGreen : (isDark ? '#333' : '#DDD')} size={10} />
                      ))}
                    </View>
                  </View>
                  <Text style={[styles.reviewTime, { color: subText }]}>{r.time}</Text>
                </View>
                <Text style={[styles.reviewText, { color: subText }]}>{r.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Delete Record ── */}
        <TouchableOpacity
          style={[styles.deleteBtn, { borderColor: errorColor }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.deleteBtnText, { color: errorColor }]}>DELETE RECORD</Text>
          <TrashIcon color={errorColor} />
        </TouchableOpacity>
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
  headerTitle: { fontSize: 22, fontWeight: '700', fontFamily: 'Manrope-Bold' },
  scroll: { paddingHorizontal: 20, paddingTop: 4 },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: 14 },
  avatarCircle: {
    width: 110, height: 110, borderRadius: 55,
    alignItems: 'center', justifyContent: 'center',
  },
  verifiedDot: {
    position: 'absolute', bottom: 4, right: 4,
    width: 22, height: 22, borderRadius: 11, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },

  // Name
  nameBlock: { alignItems: 'center', marginBottom: 18 },
  doctorName: {
    fontSize: 26, fontWeight: '800', fontFamily: 'Inter-Bold',
    letterSpacing: -0.5, lineHeight: 34, textAlign: 'center',
  },
  doctorSpec: {
    fontSize: 11, fontWeight: '500', fontFamily: 'Inter',
    letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 4,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  ratingVal: { fontSize: 15, fontWeight: '700', fontFamily: 'Inter-Bold' },
  ratingOf: { fontSize: 13, fontFamily: 'Inter' },
  dot: { fontSize: 14 },
  reviewCount: { fontSize: 13, fontFamily: 'Inter' },

  // Actions
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 22, justifyContent: 'center' },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 999,
  },
  connectedGradientBtn: { borderRadius: 999, overflow: 'hidden' },
  connectedBtnInner: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    paddingHorizontal: 20, paddingVertical: 10,
  },
  actionBtnText: { fontSize: 13, fontWeight: '600', fontFamily: 'Inter-SemiBold' },

  // Section
  section: { marginBottom: 20 },
  sectionLabel: {
    fontSize: 10, fontWeight: '700', fontFamily: 'Inter-Bold',
    letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12,
  },

  // Visibility chips
  visChip: {
    paddingHorizontal: 18, paddingVertical: 10,
    borderRadius: 999, marginRight: 8,
  },
  visChipText: { fontSize: 13, fontWeight: '600', fontFamily: 'Inter-SemiBold' },

  // Stats
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, borderRadius: 16, padding: 16, gap: 4 },
  statVal: { fontSize: 22, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 28 },
  statLabel: {
    fontSize: 9, fontWeight: '700', fontFamily: 'Inter-Bold',
    letterSpacing: 0.5, textTransform: 'uppercase',
  },

  // Bio
  bioCard: { borderRadius: 18, padding: 18 },
  bioText: { fontSize: 13, lineHeight: 21, fontFamily: 'Inter' },

  // Credentials
  credList: { gap: 8 },
  credItem: {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, padding: 14, borderRadius: 16,
  },
  credIconBox: {
    width: 42, height: 42, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  credLabel: { fontSize: 13, fontWeight: '500', fontFamily: 'Inter-Medium', lineHeight: 19 },
  credSub: { fontSize: 11, fontFamily: 'Inter', lineHeight: 16, marginTop: 2 },

  // Hospitals
  hospitalRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, padding: 14, borderRadius: 16,
  },
  hospitalName: { flex: 1, fontSize: 15, fontWeight: '500', fontFamily: 'Inter-Medium', lineHeight: 22 },

  // Rate card
  rateCard: { borderRadius: 22, padding: 24, alignItems: 'center', gap: 16 },
  rateQuestion: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter-SemiBold', textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 10 },
  reviewInput: {
    width: '100%', flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18, paddingVertical: 14,
    borderRadius: 14, borderWidth: 1,
  },
  reviewInputText: { flex: 1, fontSize: 13, fontFamily: 'Inter-Medium', paddingVertical: 0 },
  saveReviewBtn: {
    width: '100%', borderRadius: 14,
    paddingVertical: 15, alignItems: 'center', justifyContent: 'center',
  },
  saveReviewText: {
    fontSize: 15, fontWeight: '700', fontFamily: 'Inter-Bold',
    color: '#FFFFFF', lineHeight: 22,
  },

  // Reviews list
  reviewsHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  viewAllText: { fontSize: 11, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: 0.5 },
  reviewsList: { gap: 10 },
  reviewCard: { borderRadius: 18, padding: 16, gap: 10 },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  reviewAvatar: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  reviewInitials: { fontSize: 13, fontWeight: '700', fontFamily: 'Inter-Bold' },
  reviewName: { fontSize: 13, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 18 },
  reviewStars: { flexDirection: 'row', gap: 3, marginTop: 3 },
  reviewTime: { fontSize: 11, fontFamily: 'Inter' },
  reviewText: { fontSize: 12, fontFamily: 'Inter', lineHeight: 18 },

  // Delete
  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderWidth: 1, borderRadius: 40, height: 58,
    marginTop: 6,
  },
  deleteBtnText: {
    fontSize: 11, fontWeight: '800', fontFamily: 'Manrope-ExtraBold',
    letterSpacing: 1.2, textTransform: 'uppercase',
  },
});
