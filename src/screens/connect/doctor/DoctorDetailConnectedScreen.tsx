import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
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

export default function DoctorDetailConnectedScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [selectedVisibility, setSelectedVisibility] = useState('3 Hours');
  const [starRating, setStarRating] = useState(4);

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : [c.primary, c.primaryDark];
  const cardBg = isDark ? '#1F1F1F' : c.card;
  const statCardBg = isDark ? '#1B1B1B' : c.surface;
  const btnBg = isDark ? '#353535' : c.skeleton;
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

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarCircle, { backgroundColor: isDark ? '#2A2A2A' : c.skeleton }]}>
            <Ionicons name="person" size={56} color={isDark ? '#BCCBB7' : c.textSecondary} />
            <View style={[styles.verifiedDot, { backgroundColor: primaryGreen, borderColor: c.background }]}>
              <Ionicons name="checkmark" size={10} color="#003910" />
            </View>
          </View>
        </View>

        {/* Name */}
        <View style={styles.nameBlock}>
          <Text style={[styles.doctorName, { color: headText, fontFamily: 'Inter-Bold' }]}>Dr. Priya Darshini</Text>
          <Text style={[styles.doctorSpec, { color: primaryGreen }]}>SENIOR ORTHODONTIST</Text>
          <View style={styles.ratingRow}>
            <StarIcon color={primaryGreen} size={15} />
            <Text style={[styles.ratingVal, { color: primaryGreen, fontFamily: 'Inter-Bold' }]}>4.5</Text>
            <Text style={[styles.ratingOf, { color: subText, fontFamily: 'Inter' }]}>/ 5.0</Text>
            <Text style={[styles.dot, { color: isDark ? '#3D4A3B' : c.divider }]}>•</Text>
            <Text style={[styles.reviews, { color: subText, fontFamily: 'Inter' }]}>120+ Reviews</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: btnBg }]} activeOpacity={0.8}>
            <ShareIcon color={headText} />
            <Text style={[styles.actionBtnText, { color: headText, fontFamily: 'Inter' }]}>Share Profile</Text>
          </TouchableOpacity>
          <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.actionBtn, { overflow: 'hidden' }]}>
            <TouchableOpacity style={styles.connectedBtnInner} activeOpacity={0.8}>
              <Ionicons name="checkmark-circle" size={18} color="#003910" />
              <Text style={[styles.actionBtnText, { color: '#003910', fontFamily: 'Inter' }]}>Connected</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Report Visibility */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>REPORT VISIBILITY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.visibilityScroll}>
            {REPORT_VISIBILITY.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.visChip,
                  {
                    backgroundColor: selectedVisibility === opt ? primaryGreen : btnBg,
                    borderColor: selectedVisibility === opt ? primaryGreen : 'transparent',
                  },
                ]}
                onPress={() => setSelectedVisibility(opt)}
              >
                <Text style={[styles.visChipText, {
                  color: selectedVisibility === opt ? '#003910' : headText,
                  fontFamily: 'Inter',
                }]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: statCardBg }]}>
            <Text style={[styles.statVal, { color: primaryGreen, fontFamily: 'Inter-Bold' }]}>2,400+</Text>
            <Text style={[styles.statLabel, { color: subText, fontFamily: 'Inter' }]}>PATIENTS TREATED</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: statCardBg }]}>
            <Text style={[styles.statVal, { color: primaryGreen, fontFamily: 'Inter-Bold' }]}>12 Yrs</Text>
            <Text style={[styles.statLabel, { color: subText, fontFamily: 'Inter' }]}>EXPERIENCE</Text>
          </View>
        </View>

        {/* Professional Bio */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>PROFESSIONAL BIO</Text>
          <View style={[styles.bioCard, { backgroundColor: cardBg }]}>
            <Text style={[styles.bioText, { color: subText, fontFamily: 'Inter' }]}>
              Dr. Priya Darshini is a distinguished specialist in advanced orthodontics and dentofacial orthopedics. With over a decade of practice, she specializes in aesthetic dentistry, Invisalign, and complex jaw realignment procedures.{'\n\n'}Her editorial approach to patient care emphasizes minimally invasive techniques and long-term vitality, ensuring every smile is as healthy as it is beautiful.
            </Text>
          </View>
        </View>

        {/* Credentials */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>CREDENTIALS</Text>
          <View style={styles.credList}>
            {CREDENTIALS.map((item, i) => (
              <View key={i} style={[styles.credItem, { backgroundColor: cardBg }]}>
                <View style={[styles.credIcon, { backgroundColor: isDark ? '#2A2A2A' : c.skeleton }]}>
                  {item.icon === 'hospital' && <HospitalIcon color={primaryGreen} />}
                  {item.icon === 'degree' && <DegreeIcon color={primaryGreen} />}
                  {item.icon === 'work' && <WorkIcon color={primaryGreen} />}
                </View>
                <View style={styles.credText}>
                  <Text style={[styles.credLabel, { color: headText, fontFamily: 'Inter' }]}>{item.label}</Text>
                  <Text style={[styles.credSub, { color: subText, fontFamily: 'Inter' }]}>{item.sub}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Associated Hospitals */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>ASSOCIATED HOSPITALS</Text>
          {HOSPITALS.map((h, i) => (
            <TouchableOpacity key={i} style={[styles.hospitalRow, { backgroundColor: cardBg }]} activeOpacity={0.8}>
              <HospitalIcon color={subText} />
              <Text style={[styles.hospitalName, { color: headText, fontFamily: 'Inter' }]}>{h}</Text>
              <Ionicons name="chevron-forward" size={16} color={c.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Patient Experience - Rating */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>PATIENT EXPERIENCE</Text>
          <View style={[styles.rateCard, { backgroundColor: cardBg }]}>
            <Text style={[styles.rateQuestion, { color: c.text, fontFamily: 'Inter' }]}>How was your consultation?</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map(s => (
                <TouchableOpacity key={s} onPress={() => setStarRating(s)}>
                  <StarIcon color={s <= starRating ? primaryGreen : btnBg} size={30} />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[styles.shareExpBtn, { backgroundColor: btnBg, borderColor: isDark ? 'rgba(61,74,59,0.3)' : c.cardBorder }]}>
              <Text style={[styles.shareExpText, { color: subText, fontFamily: 'Inter' }]}>Share your experience...</Text>
              <Ionicons name="pencil" size={12} color={subText} />
            </TouchableOpacity>
            <LinearGradient colors={['#30D158', '#30D158']} style={styles.saveReviewBtn}>
              <TouchableOpacity style={styles.saveReviewBtnInner} activeOpacity={0.8}>
                <Text style={[styles.saveReviewText, { fontFamily: 'Inter-Bold' }]}>Save Review</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Delete Record */}
        <TouchableOpacity style={[styles.deleteBtn, { borderColor: c.error }]} activeOpacity={0.8}>
          <TrashIcon color={c.error} />
          <Text style={[styles.deleteBtnText, { color: c.error, fontFamily: 'Manrope-Bold' }]}>DELETE RECORD</Text>
        </TouchableOpacity>

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
  scroll: { paddingHorizontal: 24, paddingTop: 8 },
  avatarSection: { alignItems: 'center', marginBottom: 16 },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameBlock: { alignItems: 'center', marginBottom: 20 },
  doctorName: { fontSize: 30, fontWeight: '800', letterSpacing: -0.75, lineHeight: 38, textAlign: 'center' },
  doctorSpec: { fontSize: 12, fontWeight: '500', letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 4, fontFamily: 'Inter' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  ratingVal: { fontSize: 16, fontWeight: '700', lineHeight: 24 },
  ratingOf: { fontSize: 14, lineHeight: 20 },
  dot: { fontSize: 16 },
  reviews: { fontSize: 14, lineHeight: 20 },
  actionRow: { flexDirection: 'row', gap: 12, marginBottom: 24, justifyContent: 'center' },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
  },
  connectedBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  actionBtnText: { fontSize: 14, fontWeight: '600' },
  section: { marginBottom: 24 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  visibilityScroll: { marginBottom: 4 },
  visChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
    borderWidth: 1,
  },
  visChipText: { fontSize: 14, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 16, padding: 16, gap: 4 },
  statVal: { fontSize: 24, fontWeight: '700', lineHeight: 28 },
  statLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  bioCard: { borderRadius: 24, padding: 20 },
  bioText: { fontSize: 14, lineHeight: 22 },
  credList: { gap: 8 },
  credItem: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderRadius: 16 },
  credIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  credText: { flex: 1 },
  credLabel: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  credSub: { fontSize: 12, lineHeight: 16, marginTop: 2 },
  hospitalRow: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16, borderRadius: 16, marginBottom: 8 },
  hospitalName: { flex: 1, fontSize: 16, fontWeight: '500', lineHeight: 24 },
  rateCard: { borderRadius: 24, padding: 32, alignItems: 'center', gap: 16 },
  rateQuestion: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  starsRow: { flexDirection: 'row', gap: 8 },
  shareExpBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 17,
    borderRadius: 16,
    borderWidth: 1,
  },
  shareExpText: { fontSize: 14, fontWeight: '500' },
  saveReviewBtn: { borderRadius: 16, width: '100%' },
  saveReviewBtnInner: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  saveReviewText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', lineHeight: 24 },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 40,
    height: 61,
    marginBottom: 16,
  },
  deleteBtnText: { fontSize: 12, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase' },
});
