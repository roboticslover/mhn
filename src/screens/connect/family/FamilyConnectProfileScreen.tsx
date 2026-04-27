import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── SVG Icons ────────────────────────────────────────────
function ReportIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 19 18" fill="none">
      <Rect x={1} y={1} width={17} height={16} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M5 7H9M5 11H14M5 4H14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function PrescriptionIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={20} viewBox="0 0 14 18" fill="none">
      <Path d="M9 1H2C1.44772 1 1 1.44772 1 2V16C1 16.5523 1.44772 17 2 17H12C12.5523 17 13 16.5523 13 16V5L9 1Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M9 1V5H13" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M4 9H10M4 12H7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
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

function ScanIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={18} viewBox="0 0 18 18" fill="none">
      <Rect x={1} y={4} width={16} height={10} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M5 8H13M5 11H9" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
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

function ChevronDownIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={7} viewBox="0 0 13 8" fill="none">
      <Path d="M1 1L6.5 7L12 1" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function RemoveIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={7} stroke={color} strokeWidth={1.3} />
      <Path d="M5 8H11" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Avatar ────────────────────────────────────────────────
function MemberAvatar({ name, size = 112 }: { name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();
  const palette = ['#55EE71', '#60A5FA', '#F59E0B', '#EC4899', '#8B5CF6'];
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg + '30', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: bg, fontSize: size * 0.3, fontWeight: '700', fontFamily: 'Inter-Bold' }}>{initials}</Text>
    </View>
  );
}

// ─── Health Card (matching HealthWallet main screen) ──────
function HealthCard({ name, isDark }: { name: string; isDark: boolean }) {
  return (
    <View
      style={[
        styles.healthCard,
        isDark
          ? { backgroundColor: '#0f0f0f' }
          : { backgroundColor: '#EBEBEB' },
      ]}
    >
      {/* Top row: brand label + watermark icon */}
      <View style={styles.healthCardHeader}>
        <Text
          style={[
            styles.healthCardBrandLabel,
            { color: isDark ? 'rgba(255,255,255,0.6)' : '#38A62F' },
          ]}
        >
          MY HEALTH NOTION
        </Text>
        <Image
          source={require('../../../../assets/health-card-icon.png')}
          style={[
            styles.healthCardWatermark,
            { opacity: isDark ? 0.25 : 0.55 },
          ]}
        />
      </View>

      {/* Member ID section */}
      <View style={styles.healthCardSection}>
        <Text
          style={[
            styles.healthCardSectionLabel,
            { color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(20,20,20,0.55)' },
          ]}
        >
          MEMBER ID
        </Text>
        <Text
          style={[
            styles.healthCardId,
            { color: isDark ? '#FFFFFF' : '#111111' },
          ]}
        >
          4829  1042  9928
        </Text>
      </View>

      {/* Card Holder + HEALTH CARD badge */}
      <View style={styles.healthCardBottom}>
        <View>
          <Text
            style={[
              styles.healthCardSectionLabel,
              { color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(20,20,20,0.55)' },
            ]}
          >
            CARD HOLDER
          </Text>
          <Text
            style={[
              styles.healthCardName,
              { color: isDark ? '#FFFFFF' : '#141414' },
            ]}
          >
            {name}
          </Text>
        </View>
        <View
          style={[
            styles.healthCardBadge,
            { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(20,20,20,0.08)' },
          ]}
        >
          <Text
            style={[
              styles.healthCardBadgeText,
              { color: isDark ? '#FFFFFF' : '#141414' },
            ]}
          >
            HEALTH CARD
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Data ──────────────────────────────────────────────────
const RECORD_ITEMS = [
  { key: 'reports', icon: 'report', label: 'Health Reports', sub: '3 new reports available' },
  { key: 'prescriptions', icon: 'prescription', label: 'Prescriptions', sub: 'Updated yesterday • 2 active' },
  { key: 'vaccinations', icon: 'vaccine', label: 'Vaccinations', sub: 'Digital certificate verified' },
  { key: 'scans', icon: 'scan', label: 'Scans', sub: 'New medical updates available' },
];

// ─── Remove From Family Modal ──────────────────────────────
function RemoveFromFamilyModal({
  visible, name, onConfirm, onCancel,
}: { visible: boolean; name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.removeModal}>
          {/* Top glow area */}
          <View style={styles.removeModalHeader}>
            <View style={styles.removeGlow} />
            <View style={styles.removeAvatarRing}>
              <View style={styles.removeAvatarInner}>
                <MemberAvatar name={name} size={80} />
              </View>
              <View style={styles.removeXBadge}>
                <Ionicons name="close" size={14} color="#FFF" />
              </View>
            </View>
          </View>
          {/* Content */}
          <View style={styles.removeModalContent}>
            <Text style={styles.removeModalTitle}>Remove from Family?</Text>
            <Text style={styles.removeModalDesc}>
              {`Are you sure you want to\nremove ${name} from Family?`}
            </Text>
            <View style={styles.removeModalActions}>
              <TouchableOpacity style={styles.removeConfirmBtn} onPress={onConfirm} activeOpacity={0.85}>
                <Text style={styles.removeConfirmText}>Yes, Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeCancelBtn} onPress={onCancel} activeOpacity={0.8}>
                <Text style={styles.removeCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main Screen ───────────────────────────────────────────
export default function FamilyConnectProfileScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const member = route?.params?.member || { name: 'Kajal', relation: 'Sister' };

  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const primaryGreen = isDark ? '#55EE71' : '#39A657';
  const cardBg = isDark ? '#1F1F1F' : '#F2F2F2';
  const subText = isDark ? '#BCCBB7' : '#6B7280';
  const headText = isDark ? '#E2E2E2' : '#111827';
  const iconBg = isDark ? 'rgba(48,209,88,0.1)' : 'rgba(57,166,87,0.1)';

  const handleRemove = () => {
    setShowRemoveModal(false);
    navigation.goBack();
  };

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
          <TouchableOpacity
            onPress={() => navigation.navigate('FamilyMemberDetailScreen', { member })}
            style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)' }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="settings-outline" size={20} color={c.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Hero ── */}
        <View style={styles.profileHero}>
          <View style={styles.avatarWrapper}>
            <MemberAvatar name={member.name} size={96} />
            <View style={[styles.verifiedBadge, { borderColor: c.background }]}>
              <Ionicons name="checkmark-circle" size={28} color={primaryGreen} />
            </View>
          </View>
          <Text style={[styles.memberName, { color: headText }]}>{member.name}</Text>
          <Text style={[styles.memberRelation, { color: subText }]}>{member.relation || 'Sister'}</Text>
        </View>

        {/* ── Health Card (like HealthWallet main screen) ── */}
        <View style={styles.cardSection}>
          <HealthCard name={member.name} isDark={isDark} />
        </View>

        {/* ── Vital Insights ── */}
        <Text style={[styles.sectionLabel, { color: subText }]}>VITAL INSIGHTS</Text>

        {/* Stability Index Card */}
        <View style={[styles.vitalCard, { backgroundColor: cardBg }]}>
          <View style={styles.vitalCardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.vitalCardSubtitle, { color: subText }]}>Stability{'\n'}Index</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                <Text style={[styles.vitalCardValue, { color: headText }]}>88.4%</Text>
                <Text style={[styles.vitalCardTag, { color: primaryGreen }]}>Excellent</Text>
              </View>
            </View>
            <Ionicons name="shield-checkmark" size={18} color={primaryGreen} />
          </View>
          <View style={styles.progressSection}>
            <View style={styles.progressRow}>
              <Text style={[styles.progressLabel, { color: headText, opacity: 0.4 }]}>METABOLIC BALANCE</Text>
              <Text style={[styles.progressPct, { color: headText, opacity: 0.4 }]}>92%</Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: isDark ? '#0E0E0E' : '#E0E0E0' }]}>
              <LinearGradient
                colors={['#55EE71', '#30D158']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: '92%' }]}
              />
            </View>
            <View style={[styles.progressRow, { marginTop: 10 }]}>
              <Text style={[styles.progressLabel, { color: headText, opacity: 0.4 }]}>STRESS RECOVERY</Text>
              <Text style={[styles.progressPct, { color: headText, opacity: 0.4 }]}>84%</Text>
            </View>
            <View style={[styles.progressTrack, { backgroundColor: isDark ? '#0E0E0E' : '#E0E0E0' }]}>
              <LinearGradient
                colors={['#55EE71', '#30D158']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: '84%', opacity: 0.8 }]}
              />
            </View>
          </View>
        </View>

        {/* Heart Rate Trend Card */}
        <View style={[styles.vitalCard, { backgroundColor: cardBg, marginTop: 12 }]}>
          <View style={styles.vitalCardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.vitalCardSubtitle, { color: subText }]}>Heart Rate Trend</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                <Text style={[styles.vitalCardValue, { color: headText }]}>72</Text>
                <Text style={[styles.vitalCardUnit, { color: subText }]}>BPM AVG</Text>
              </View>
            </View>
            <Ionicons name="pulse-outline" size={18} color={primaryGreen} />
          </View>
          {/* Bar chart */}
          <View style={styles.barChart}>
            {[40, 55, 45, 70, 85, 60, 50, 75, 90, 70, 55, 45, 80, 95, 65, 50].map((h, i) => (
              <View
                key={i}
                style={[styles.bar, {
                  height: h * 0.96,
                  backgroundColor: primaryGreen,
                  opacity: 0.1 + (i / 16) * 0.55,
                }]}
              />
            ))}
          </View>
        </View>

        {/* ── Shared Records ── */}
        <Text style={[styles.sectionLabel, { color: subText, marginTop: 20, marginBottom: 12 }]}>SHARED RECORDS</Text>

        {/* View Records Row */}
        <View style={[styles.sharedRecordsContainer, { backgroundColor: isDark ? 'rgba(23,23,23,0.88)' : '#F5F5F5' }]}>
          <TouchableOpacity
            style={[styles.viewRecordsRow, { backgroundColor: cardBg }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FamilySharedReportsScreen', { member })}
          >
            <View style={[styles.recordIconBox, { backgroundColor: iconBg }]}>
              <ReportIcon color={primaryGreen} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.viewRecordsTitle, { color: headText }]}>VIEW RECORDS</Text>
              <Text style={[styles.viewRecordsSub, { color: subText }]}>3 new reports uploaded this week</Text>
            </View>
            <ChevronIcon color={subText} />
          </TouchableOpacity>

          {/* Record Items */}
          {RECORD_ITEMS.map(item => (
            <TouchableOpacity
              key={item.key}
              style={[styles.recordRow, { backgroundColor: cardBg }]}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('FamilySharedReportsScreen', { member, type: item.key });
              }}
            >
              <View style={[styles.recordIconBox, { backgroundColor: iconBg }]}>
                {item.icon === 'report' && <ReportIcon color={primaryGreen} />}
                {item.icon === 'prescription' && <PrescriptionIcon color={primaryGreen} />}
                {item.icon === 'vaccine' && <VaccineIcon color={primaryGreen} />}
                {item.icon === 'scan' && <ScanIcon color={primaryGreen} />}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.recordLabel, { color: headText }]}>{item.label}</Text>
                <Text style={[styles.recordSub, { color: subText }]}>{item.sub}</Text>
              </View>
              <ChevronIcon color={subText} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Remove from Family ── */}
        <TouchableOpacity
          style={[styles.removeBtn, { backgroundColor: isDark ? 'rgba(147,0,10,0.15)' : 'rgba(220,38,38,0.08)' }]}
          onPress={() => setShowRemoveModal(true)}
          activeOpacity={0.8}
        >
          <RemoveIcon color={isDark ? '#FFB4AB' : '#DC2626'} />
          <Text style={[styles.removeBtnText, { color: isDark ? '#FFB4AB' : '#DC2626' }]}>Remove from Family</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <RemoveFromFamilyModal
        visible={showRemoveModal}
        name={member.name}
        onConfirm={handleRemove}
        onCancel={() => setShowRemoveModal(false)}
      />
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
  scroll: { paddingHorizontal: 20, paddingTop: 4 },

  // Profile Hero
  profileHero: { alignItems: 'center', marginBottom: 20, gap: 4 },
  avatarWrapper: { position: 'relative', marginBottom: 12 },
  verifiedBadge: {
    position: 'absolute', bottom: -2, right: -2,
    borderWidth: 3, borderRadius: 999,
    backgroundColor: '#000',
  },
  memberName: { fontSize: 26, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: -0.5, marginTop: 4 },
  memberRelation: { fontSize: 14, fontFamily: 'Inter' },

  // Health Card (matching HealthWallet)
  cardSection: { marginBottom: 16 },
  healthCard: {
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  healthCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  healthCardWatermark: {
    width: 22,
    height: 36,
    resizeMode: 'contain',
  },
  healthCardBrandLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
    lineHeight: 15,
  },
  healthCardSection: { marginBottom: 24 },
  healthCardSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
    lineHeight: 15,
    marginBottom: 4,
  },
  healthCardId: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 28,
    letterSpacing: 2,
  },
  healthCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  healthCardName: { fontSize: 18, fontWeight: '600', fontFamily: 'Inter', lineHeight: 28 },
  healthCardBadge: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  healthCardBadgeText: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter', lineHeight: 15 },

  // Vital Insights
  sectionLabel: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 },
  vitalCard: { borderRadius: 24, padding: 24, overflow: 'hidden' },
  vitalCardHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  vitalCardSubtitle: { fontSize: 12, fontFamily: 'Inter-Medium', lineHeight: 16 },
  vitalCardValue: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: -0.6 },
  vitalCardTag: { fontSize: 12, fontFamily: 'Inter' },
  vitalCardUnit: { fontSize: 12, fontFamily: 'Inter' },
  progressSection: { marginTop: 12 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: 0.5, textTransform: 'uppercase' },
  progressPct: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: 0.5 },
  progressTrack: { height: 6, borderRadius: 999, overflow: 'hidden', marginBottom: 4 },
  progressFill: { height: '100%', borderRadius: 999 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 96, marginTop: 16 },
  bar: { flex: 1, borderTopLeftRadius: 2, borderTopRightRadius: 2 },

  // Shared Records
  sharedRecordsContainer: { borderRadius: 33, padding: 12, gap: 10, marginBottom: 16 },
  viewRecordsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 16, borderRadius: 22,
  },
  viewRecordsTitle: { fontSize: 12, fontWeight: '800', fontFamily: 'Inter-Bold', letterSpacing: 1, textTransform: 'uppercase' },
  viewRecordsSub: { fontSize: 12, fontFamily: 'Inter', marginTop: 2 },
  recordRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 16, borderRadius: 22,
  },
  recordIconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  recordLabel: { fontSize: 14, fontWeight: '700', fontFamily: 'Inter-Bold', lineHeight: 22 },
  recordSub: { fontSize: 12, fontFamily: 'Inter', marginTop: 1 },

  // Remove
  removeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 56, borderRadius: 40, marginTop: 4,
  },
  removeBtnText: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter-SemiBold' },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  removeModal: {
    width: '100%', maxWidth: 400, backgroundColor: '#131313',
    borderRadius: 48, overflow: 'hidden',
  },
  removeModalHeader: {
    height: 256, backgroundColor: '#0E0E0E',
    alignItems: 'center', justifyContent: 'center',
  },
  removeGlow: {
    position: 'absolute', width: 192, height: 192, borderRadius: 96,
    backgroundColor: 'rgba(213,61,24,0.2)', top: 32,
  },
  removeAvatarRing: {
    width: 128, height: 128, borderRadius: 64,
    borderWidth: 2, borderColor: 'rgba(213,61,24,0.3)',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(38,38,38,0.5)',
  },
  removeAvatarInner: {
    width: 96, height: 96, borderRadius: 48,
    overflow: 'hidden', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#1A1A1A',
  },
  removeXBadge: {
    position: 'absolute', bottom: -8, right: -8,
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#FF7351', borderWidth: 4, borderColor: '#131313',
    alignItems: 'center', justifyContent: 'center',
  },
  removeModalContent: { padding: 32, gap: 7 },
  removeModalTitle: {
    fontSize: 24, fontWeight: '700', fontFamily: 'Manrope-Bold',
    color: '#FFFFFF', textAlign: 'center', letterSpacing: -0.6,
  },
  removeModalDesc: {
    fontSize: 18, fontFamily: 'Manrope', color: '#ABABAB',
    textAlign: 'center', lineHeight: 29,
  },
  removeModalActions: { gap: 12, marginTop: 16 },
  removeConfirmBtn: {
    backgroundColor: '#6FFB85', height: 58, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
  },
  removeConfirmText: { fontSize: 18, fontWeight: '700', fontFamily: 'Manrope-Bold', color: '#005D21', letterSpacing: -0.45 },
  removeCancelBtn: {
    backgroundColor: '#262626', height: 52, borderRadius: 999,
    alignItems: 'center', justifyContent: 'center',
  },
  removeCancelText: { fontSize: 16, fontWeight: '600', fontFamily: 'Manrope-SemiBold', color: '#FFFFFF' },
});
