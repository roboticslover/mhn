import React from 'react';
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
import Svg, { Path, Rect, Circle } from 'react-native-svg';

// ─── SVG Icons ────────────────────────────────────────────
function PrescriptionIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={18} viewBox="0 0 14 18" fill="none">
      <Path d="M9 1H2C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H12C12.5523 17 13 16.5523 13 16V5L9 1Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M9 1V5H13" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M4 9H10M4 12H7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ReportIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Rect x={1} y={1} width={16} height={16} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M5 7H9M5 11H13M5 4H13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function VaccineIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={19} viewBox="0 0 18 19" fill="none">
      <Path d="M11 2L16 7M13 4L6 11M9 8L5 12M8 13L4 17M14 5L17 2M6 11L3 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={9} cy={10} r={2} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function ChevronIcon({ color }: { color: string }) {
  return (
    <Svg width={7} height={12} viewBox="0 0 8 13" fill="none">
      <Path d="M1 1L7 6.5L1 12" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Avatar ────────────────────────────────────────────────
function MemberAvatar({ name, size = 128 }: { name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();
  const palette = ['#55EE71', '#60A5FA', '#F59E0B', '#EC4899', '#8B5CF6'];
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <View style={{ width: size, height: size, borderRadius: 24, backgroundColor: bg + '30', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: bg, fontSize: size * 0.28, fontWeight: '700', fontFamily: 'Inter-Bold' }}>{initials}</Text>
    </View>
  );
}

// ─── Data ──────────────────────────────────────────────────
const DOCUMENTS = [
  { id: '1', title: 'Prescription Test 1', date: 'Issued on Jan 21, 2026', icon: 'prescription' },
  { id: '2', title: 'Prescription Test 1', date: 'Issued on Jan 21, 2026', icon: 'report' },
  { id: '3', title: 'Prescription Test 1', date: 'Issued on Jan 21, 2026', icon: 'vaccine' },
];

export default function FamilySharedReportsScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const member = route?.params?.member || { name: 'Kajal', relation: 'Sister' };

  const primaryGreen = isDark ? '#55EE71' : '#39A657';
  const cardBg = isDark ? '#2A2A2A' : '#F2F2F2';
  const iconBg = isDark ? 'rgba(48,209,88,0.2)' : 'rgba(57,166,87,0.12)';
  const subText = isDark ? '#BCCBB7' : '#6B7280';
  const headText = isDark ? '#E2E2E2' : '#111827';

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
          <Text style={[styles.headerTitle, { color: c.text }]}>Family Connect</Text>
          <View style={{ width: 38 }} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Section ── */}
        <View style={styles.heroSection}>
          {/* Avatar with verified badge */}
          <View style={styles.heroAvatarWrapper}>
            <MemberAvatar name={member.name} size={128} />
            <View style={[styles.verifiedBadge, { borderColor: c.background }]}>
              <View style={[styles.verifiedDot, { backgroundColor: primaryGreen }]}>
                <Ionicons name="checkmark" size={12} color="#003910" />
              </View>
            </View>
          </View>

          {/* Big Title */}
          <Text style={[styles.heroTitle, { color: headText }]}>
            {'Shared Health\nReports'}
          </Text>
        </View>

        {/* ── Shared Documents Section ── */}
        <View style={styles.documentsSection}>
          <Text style={[styles.sectionLabel, { color: subText }]}>SHARED DOCUMENTS</Text>

          <View style={styles.docList}>
            {DOCUMENTS.map((doc) => (
              <TouchableOpacity
                key={doc.id}
                style={[styles.docCard, { backgroundColor: cardBg }]}
                activeOpacity={0.8}
              >
                {/* Icon */}
                <View style={[styles.docIconBg, { backgroundColor: iconBg }]}>
                  {doc.icon === 'prescription' && <PrescriptionIcon color={primaryGreen} />}
                  {doc.icon === 'report' && <ReportIcon color={primaryGreen} />}
                  {doc.icon === 'vaccine' && <VaccineIcon color={primaryGreen} />}
                </View>
                {/* Info */}
                <View style={styles.docInfo}>
                  <Text style={[styles.docTitle, { color: headText }]}>{doc.title}</Text>
                  <Text style={[styles.docDate, { color: subText }]}>{doc.date}</Text>
                </View>
                {/* Chevron */}
                <ChevronIcon color={subText} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 14,
  },
  backBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '700', fontFamily: 'Manrope-Bold' },
  scroll: { paddingHorizontal: 24, paddingTop: 4 },

  // Hero
  heroSection: { marginBottom: 32, gap: 32 },
  heroAvatarWrapper: { position: 'relative', alignSelf: 'flex-start' },
  verifiedBadge: {
    position: 'absolute', bottom: -8, right: -8,
    borderWidth: 4, borderRadius: 999,
  },
  verifiedDot: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 36, fontWeight: '800', fontFamily: 'Inter-ExtraBold',
    lineHeight: 40, letterSpacing: -1.8,
  },

  // Documents
  documentsSection: { paddingTop: 96 },
  sectionLabel: {
    fontSize: 14, fontWeight: '600', fontFamily: 'Inter-SemiBold',
    letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 24,
  },
  docList: { gap: 16 },
  docCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    padding: 20, borderRadius: 12,
  },
  docIconBg: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  docInfo: { flex: 1 },
  docTitle: { fontSize: 18, fontWeight: '600', fontFamily: 'Inter-SemiBold', lineHeight: 28 },
  docDate: { fontSize: 14, fontFamily: 'Inter', lineHeight: 20 },
});
