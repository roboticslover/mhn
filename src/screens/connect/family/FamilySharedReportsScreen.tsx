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
import Svg, { Path, Circle, Rect } from 'react-native-svg';

function PrescriptionIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={18} viewBox="0 0 14 18" fill="none">
      <Path d="M9 1H2C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H12C12.5523 17 13 16.5523 13 16V5L9 1Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M9 1V5H13" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M4 9H7M4 12H10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={7} cy={9} r={1} fill={color} />
    </Svg>
  );
}

function ScanIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M1 6V3C1 1.89543 1.89543 1 3 1H6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17 6V3C17 1.89543 16.1046 1 15 1H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M1 12V15C1 16.1046 1.89543 17 3 17H6" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17 12V15C17 16.1046 16.1046 17 15 17H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4 9H14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ReportIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={18} viewBox="0 0 19 18" fill="none">
      <Rect x={1} y={1} width={17} height={16} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M5 7H9M5 11H14M5 4H14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ChevronRightIcon({ color }: { color: string }) {
  return (
    <Svg width={7.4} height={12} viewBox="0 0 8 13" fill="none">
      <Path d="M1 1L7 6.5L1 12" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MemberAvatar({ name, size = 128 }: { name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const colors = ['#55EE71', '#60A5FA', '#F59E0B', '#EC4899', '#8B5CF6'];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return (
    <View style={{
      width: size, height: size,
      borderRadius: 24,
      backgroundColor: bg + '33',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ color: bg, fontSize: size * 0.28, fontWeight: '700', fontFamily: 'Inter-Bold' }}>
        {initials}
      </Text>
    </View>
  );
}

const SHARED_DOCS = [
  { id: '1', type: 'prescription', title: 'Prescription Test 1', date: 'Issued on Jan 21, 2026' },
  { id: '2', type: 'scan', title: 'Prescription Test 1', date: 'Issued on Jan 21, 2026' },
  { id: '3', type: 'report', title: 'Prescription Test 1', date: 'Issued on Jan 21, 2026' },
];

export default function FamilySharedReportsScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const member = route?.params?.member || { name: 'Sarah Mitchell' };

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const cardBg = isDark ? '#2A2A2A' : c.card;
  const iconBg = isDark ? 'rgba(48,209,88,0.2)' : c.accentSoft;
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
            Family Connect
          </Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            <MemberAvatar name={member.name} size={128} />
            <View style={[styles.onlineBadge, { backgroundColor: primaryGreen, borderColor: c.background }]}>
              <Ionicons name="checkmark" size={10} color="#003910" />
            </View>
          </View>
          <View style={styles.heroText}>
            <Text style={[styles.heroTitle, { color: headText, fontFamily: 'Inter-Bold' }]}>
              {'Shared Health\nReports'}
            </Text>
          </View>
        </View>

        {/* Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>SHARED DOCUMENTS</Text>
          <View style={styles.docList}>
            {SHARED_DOCS.map(doc => (
              <TouchableOpacity
                key={doc.id}
                style={[styles.docCard, { backgroundColor: cardBg }]}
                activeOpacity={0.8}
              >
                <View style={[styles.docIconBg, { backgroundColor: iconBg }]}>
                  {doc.type === 'prescription' && <PrescriptionIcon color={primaryGreen} />}
                  {doc.type === 'scan' && <ScanIcon color={primaryGreen} />}
                  {doc.type === 'report' && <ReportIcon color={primaryGreen} />}
                </View>
                <View style={styles.docInfo}>
                  <Text style={[styles.docTitle, { color: headText, fontFamily: 'Inter' }]}>{doc.title}</Text>
                  <Text style={[styles.docDate, { color: subText, fontFamily: 'Inter' }]}>{doc.date}</Text>
                </View>
                <ChevronRightIcon color={subText} />
              </TouchableOpacity>
            ))}
          </View>
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
  heroSection: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 40,
  },
  avatarWrapper: { position: 'relative' },
  onlineBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: { flex: 1, justifyContent: 'flex-end', paddingBottom: 8 },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: -1.8,
  },
  section: { marginBottom: 24 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  docList: { gap: 16 },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 12,
  },
  docIconBg: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: { flex: 1 },
  docTitle: { fontSize: 18, fontWeight: '600', lineHeight: 28 },
  docDate: { fontSize: 14, lineHeight: 20, marginTop: 2 },
});
