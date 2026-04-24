import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

function StarIcon({ color, size = 10 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 11" fill={color}>
      <Path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" />
    </Svg>
  );
}

function ShareIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M15 12C14.1 12 13.3 12.4 12.7 13L6.9 9.7C6.97 9.47 7 9.24 7 9C7 8.76 6.97 8.53 6.9 8.3L12.6 5C13.2 5.6 14 6 15 6C16.7 6 18 4.7 18 3C18 1.3 16.7 0 15 0C13.3 0 12 1.3 12 3C12 3.24 12.03 3.47 12.1 3.7L6.4 7C5.8 6.4 5 6 4 6C2.3 6 1 7.3 1 9C1 10.7 2.3 12 4 12C5 12 5.8 11.6 6.4 11L12.1 14.3C12.04 14.53 12 14.76 12 15C12 16.7 13.3 18 15 18C16.7 18 18 16.7 18 15C18 13.3 16.7 12 15 12Z" fill={color} />
    </Svg>
  );
}

function ConnectIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Circle cx={9} cy={9} r={7} stroke={color} strokeWidth={1.5} />
      <Path d="M6 9H12M9 6V12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
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

const CREDENTIALS = [
  { icon: 'hospital', label: 'City Hospital & Research Centre', sub: 'Senior Orthodontic Consultant • 2016 - Present' },
  { icon: 'degree', label: 'Master of Dental Surgery (MDS)', sub: 'All India Institute of Medical Sciences (AIIMS)' },
  { icon: 'work', label: 'Board Certified Orthodontist', sub: 'Indian Board of Orthodontics (IBO)' },
];

const HOSPITALS = ['City Cardiac Center', 'Global Health Institute'];

const REVIEWS = [
  {
    initials: 'JD',
    name: 'James D.',
    rating: 5,
    text: '"Dr. Velpuri was extremely thorough and professional. He explained my condition in simple terms that I could actually understand. Highly recommended."',
  },
];

export default function DoctorDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isConnected, setIsConnected] = useState(false);

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

        {/* Name & rating */}
        <View style={styles.nameBlock}>
          <Text style={[styles.doctorName, { color: headText, fontFamily: 'Inter-Bold' }]}>
            Dr. Priya Darshini
          </Text>
          <Text style={[styles.doctorSpec, { color: primaryGreen, fontFamily: 'Inter' }]}>
            SENIOR ORTHODONTIST
          </Text>
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
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: isConnected ? primaryGreen : btnBg }]}
            activeOpacity={0.8}
            onPress={() => setIsConnected(v => !v)}
          >
            <ConnectIcon color={isConnected ? '#003910' : headText} />
            <Text style={[styles.actionBtnText, { color: isConnected ? '#003910' : headText, fontFamily: 'Inter' }]}>
              {isConnected ? 'Connected' : 'Connect'}
            </Text>
          </TouchableOpacity>
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

        {/* Patient Feedback */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>PATIENT FEEDBACK</Text>
          {REVIEWS.map((r, i) => (
            <View key={i} style={[styles.reviewCard, { backgroundColor: statCardBg }]}>
              <View style={styles.reviewHeader}>
                <View style={[styles.reviewAvatar, { backgroundColor: btnBg }]}>
                  <Text style={[styles.reviewInitials, { color: primaryGreen, fontFamily: 'Inter-Bold' }]}>{r.initials}</Text>
                </View>
                <View>
                  <Text style={[styles.reviewName, { color: c.text, fontFamily: 'Inter-Bold' }]}>{r.name}</Text>
                  <View style={styles.starsRow}>
                    {Array(r.rating).fill(0).map((_, s) => (
                      <StarIcon key={s} color={primaryGreen} size={10} />
                    ))}
                  </View>
                </View>
                <View style={styles.quoteIcon}>
                  <Text style={{ fontSize: 40, color: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', lineHeight: 44 }}>"</Text>
                </View>
              </View>
              <Text style={[styles.reviewText, { color: subText, fontFamily: 'Inter' }]}>{r.text}</Text>
            </View>
          ))}
        </View>

        {/* Connect CTA */}
        <View style={styles.ctaBlock}>
          <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaBtn}>
            <TouchableOpacity
              style={styles.ctaBtnInner}
              activeOpacity={0.85}
              onPress={() => setIsConnected(true)}
            >
              <Text style={[styles.ctaBtnText, { fontFamily: 'Inter-Bold' }]}>Connect</Text>
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
  doctorSpec: { fontSize: 12, fontWeight: '500', letterSpacing: 0.3, textTransform: 'uppercase', marginTop: 4 },
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
  actionBtnText: { fontSize: 14, fontWeight: '600' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  statVal: { fontSize: 24, fontWeight: '700', lineHeight: 28 },
  statLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  section: { marginBottom: 24 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
  },
  bioCard: { borderRadius: 24, padding: 20 },
  bioText: { fontSize: 14, lineHeight: 22 },
  credList: { gap: 8 },
  credItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
  },
  credIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  credText: { flex: 1 },
  credLabel: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  credSub: { fontSize: 12, lineHeight: 16, marginTop: 2 },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  hospitalName: { flex: 1, fontSize: 16, fontWeight: '500', lineHeight: 24 },
  reviewCard: { borderRadius: 24, padding: 24 },
  reviewHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  reviewInitials: { fontSize: 16, fontWeight: '700', lineHeight: 24 },
  reviewName: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  starsRow: { flexDirection: 'row', gap: 2, marginTop: 4 },
  quoteIcon: { marginLeft: 'auto' },
  reviewText: { fontSize: 14, fontStyle: 'italic', lineHeight: 22 },
  ctaBlock: { marginBottom: 8 },
  ctaBtn: { borderRadius: 999 },
  ctaBtnInner: { height: 56, alignItems: 'center', justifyContent: 'center' },
  ctaBtnText: { fontSize: 18, fontWeight: '700', color: '#003910', lineHeight: 28 },
});
