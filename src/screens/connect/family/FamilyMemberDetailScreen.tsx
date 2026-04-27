import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

function TrashIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={14} viewBox="0 0 12 14" fill="none">
      <Path d="M1 3H11M4 3V2C4 1.44772 4.44772 1 5 1H7C7.55228 1 8 1.44772 8 2V3M5 6V10M7 6V10M2 3L2.66667 12C2.66667 12.5523 3.11438 13 3.66667 13H8.33333C8.88562 13 9.33333 12.5523 9.33333 12L10 3H2Z" stroke={color} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function WalletIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={18} viewBox="0 0 19 18" fill="none">
      <Rect x={1} y={4} width={17} height={13} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M1 7H18" stroke={color} strokeWidth={1.5} />
      <Path d="M13 12H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M5 1H14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function UploadIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={20} viewBox="0 0 16 20" fill="none">
      <Rect x={1} y={5} width={14} height={14} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M8 1V13M5 4L8 1L11 4" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function AnalyticsIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M1 17L6 10L10 13L15 6L17 8" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M1 1V17H17" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function PeriodIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Circle cx={9} cy={9} r={8} stroke={color} strokeWidth={1.5} />
      <Path d="M6 9C6 7.34315 7.34315 6 9 6C10.6569 6 12 7.34315 12 9C12 10.6569 10.6569 12 9 12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={9} cy={9} r={2} fill={color} />
    </Svg>
  );
}

function MemberAvatar({ name, size = 100 }: { name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase();
  const palette = ['#55EE71', '#60A5FA', '#F59E0B', '#EC4899', '#8B5CF6'];
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg + '30', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: bg, fontSize: size * 0.28, fontWeight: '700', fontFamily: 'Inter-Bold' }}>{initials}</Text>
    </View>
  );
}

const PERMISSION_ITEMS = [
  { icon: 'wallet',    key: 'healthWallet',  label: 'Access to Health Wallet', sub: 'View summaries and balances' },
  { icon: 'upload',   key: 'uploadRecords', label: 'Modify/Upload Records',    sub: 'Permission to add health logs' },
  { icon: 'analytics',key: 'analytics',     label: 'Access to Analytics',      sub: 'View health trends and metrics' },
  { icon: 'period',   key: 'period',        label: 'Share Period Tracking',    sub: 'Share Period tracking data' },
];

const RELATION_OPTIONS = ['Friend', 'Family', 'Parent', 'Partner'];

// ─── Delete Connection Modal ───────────────────────────────
function DeleteConnectionModal({
  visible, name, onConfirm, onCancel,
}: { visible: boolean; name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={mStyles.overlay}>
        <View style={mStyles.modal}>
          {/* Glow bg */}
          <View style={mStyles.glowPurple} />
          <View style={mStyles.glowGreen} />
          <View style={mStyles.glassBorder}>
            {/* Icon area */}
            <View style={mStyles.iconArea}>
              <View style={mStyles.iconGlow} />
              <View style={mStyles.iconBox}>
                <Ionicons name="link-outline" size={48} color="rgba(213,61,24,0.6)" />
                <View style={mStyles.dotRow}>
                  <View style={mStyles.dot} />
                  <View style={mStyles.dot} />
                </View>
              </View>
            </View>
            {/* Text */}
            <View style={mStyles.textArea}>
              <Text style={mStyles.title}>Decline Request?</Text>
              <Text style={mStyles.desc}>{`Are you sure you want to decline\n${name}'s connection request?`}</Text>
            </View>
            {/* Actions */}
            <View style={mStyles.actions}>
              <TouchableOpacity style={mStyles.confirmBtn} onPress={onConfirm} activeOpacity={0.85}>
                <Text style={mStyles.confirmText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={mStyles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
                <Text style={mStyles.cancelText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modal: { width: '100%', maxWidth: 400, position: 'relative', alignItems: 'center' },
  glowPurple: { position: 'absolute', width: 500, height: 500, borderRadius: 250, backgroundColor: 'rgba(117,8,165,0.05)', top: -88, right: -20 },
  glowGreen: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: 'rgba(29,185,77,0.05)', bottom: -88, left: -20 },
  glassBorder: {
    width: '100%', borderRadius: 32,
    borderWidth: 1, borderColor: 'rgba(72,72,72,0.15)',
    backgroundColor: 'rgba(38,38,38,0.4)',
    overflow: 'hidden',
    shadowColor: 'rgba(213,61,24,0.15)', shadowOpacity: 1, shadowRadius: 60, shadowOffset: { width: 0, height: 0 },
  },
  iconArea: { height: 220, backgroundColor: 'rgba(14,14,14,0.9)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  iconGlow: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(213,61,24,0.2)', top: 20 },
  iconBox: { width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(38,38,38,0.6)', borderWidth: 1, borderColor: 'rgba(72,72,72,0.2)', alignItems: 'center', justifyContent: 'center', gap: 8 },
  dotRow: { flexDirection: 'row', gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(213,61,24,0.4)' },
  textArea: { padding: 32, paddingBottom: 0, gap: 12 },
  title: { fontSize: 16, fontWeight: '700', fontFamily: 'Manrope-Bold', color: '#FFFFFF', textAlign: 'center' },
  desc: { fontSize: 16, fontFamily: 'Manrope', color: '#ABABAB', textAlign: 'center', lineHeight: 26 },
  actions: { padding: 32, gap: 12 },
  confirmBtn: { backgroundColor: '#D53D18', height: 56, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  confirmText: { fontSize: 18, fontWeight: '700', fontFamily: 'Manrope-Bold', color: '#FFFFFF', letterSpacing: 0.9 },
  cancelBtn: { height: 52, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontSize: 16, fontFamily: 'Manrope', color: '#ABABAB' },
});

// ─── Remove From Family Modal ─────────────────────────────
function RemoveFromFamilyModal({
  visible, name, onConfirm, onCancel,
}: { visible: boolean; name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={rmStyles.overlay}>
        <View style={rmStyles.modal}>
          {/* Top area with avatar */}
          <View style={rmStyles.header}>
            <View style={rmStyles.headerGlow} />
            <View style={rmStyles.avatarRing}>
              <View style={rmStyles.avatarInner}>
                <MemberAvatar name={name} size={80} />
              </View>
              <View style={rmStyles.xBadge}>
                <Ionicons name="close" size={14} color="#FFF" />
              </View>
            </View>
          </View>
          {/* Content */}
          <View style={rmStyles.content}>
            <Text style={rmStyles.title}>Remove from Family?</Text>
            <Text style={rmStyles.desc}>
              {`Are you sure you want to\nremove ${name} from Family?`}
            </Text>
            <View style={rmStyles.actions}>
              <TouchableOpacity style={rmStyles.confirmBtn} onPress={onConfirm} activeOpacity={0.85}>
                <Text style={rmStyles.confirmText}>Yes, Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity style={rmStyles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
                <Text style={rmStyles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const rmStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modal: { width: '100%', maxWidth: 400, backgroundColor: '#131313', borderRadius: 48, overflow: 'hidden' },
  header: { height: 256, backgroundColor: '#0E0E0E', alignItems: 'center', justifyContent: 'center' },
  headerGlow: { position: 'absolute', width: 192, height: 192, borderRadius: 96, backgroundColor: 'rgba(213,61,24,0.2)', top: 32 },
  avatarRing: {
    width: 128, height: 128, borderRadius: 64, borderWidth: 2,
    borderColor: 'rgba(213,61,24,0.3)', alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(38,38,38,0.5)',
  },
  avatarInner: { width: 96, height: 96, borderRadius: 48, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A1A1A' },
  xBadge: {
    position: 'absolute', bottom: -8, right: -8, width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#FF7351', borderWidth: 4, borderColor: '#131313', alignItems: 'center', justifyContent: 'center',
  },
  content: { padding: 32, gap: 7 },
  title: { fontSize: 24, fontWeight: '700', fontFamily: 'Manrope-Bold', color: '#FFFFFF', textAlign: 'center', letterSpacing: -0.6 },
  desc: { fontSize: 18, fontFamily: 'Manrope', color: '#ABABAB', textAlign: 'center', lineHeight: 29 },
  actions: { gap: 12, marginTop: 16 },
  confirmBtn: { backgroundColor: '#6FFB85', height: 58, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  confirmText: { fontSize: 18, fontWeight: '700', fontFamily: 'Manrope-Bold', color: '#005D21', letterSpacing: -0.45 },
  cancelBtn: { backgroundColor: '#262626', height: 52, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontSize: 16, fontWeight: '600', fontFamily: 'Manrope-SemiBold', color: '#FFFFFF' },
});

// ─── Main Screen ───────────────────────────────────────────
export default function FamilyMemberDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const member = route?.params?.member || { name: 'Jaswanth', relation: 'Friend' };

  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    healthWallet: true,
    uploadRecords: false,
    analytics: true,
    period: true,
  });
  const [relationTag, setRelationTag] = useState(member.relation || 'Friend');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [descText, setDescText] = useState('');

  const primaryGreen = isDark ? '#55EE71' : '#39A657';
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : ['#39A657', '#2D8A47'];
  const cardBg = isDark ? '#1F1F1F' : '#F3F4F6';
  const subText = isDark ? '#BCCBB7' : '#6B7280';
  const headText = isDark ? '#E2E2E2' : '#111827';
  const iconBg = isDark ? 'rgba(85,238,113,0.1)' : 'rgba(57,166,87,0.1)';
  const toggleOffBg = isDark ? '#353535' : '#D1D5DB';

  const togglePermission = (key: string) => setPermissions(prev => ({ ...prev, [key]: !prev[key] }));

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    navigation.goBack();
  };

  const handleRemoveConfirm = () => {
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
          <View style={{ width: 38 }} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Profile Header ── */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradientRing}
            >
              <View style={[styles.avatarInner, { borderColor: c.background }]}>
                <MemberAvatar name={member.name} size={96} />
              </View>
            </LinearGradient>
            <View style={[styles.relationTag, { backgroundColor: primaryGreen }]}>
              <Text style={styles.relationTagText}>{relationTag.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={[styles.memberName, { color: headText }]}>{member.name}</Text>
          <Text style={[styles.connectedSince, { color: subText }]}>Connected since Oct 2023</Text>
        </View>

        {/* ── Describe Relationship ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText, opacity: 0.6 }]}>Describe Relationship</Text>
          <View style={[styles.descInput, {
            backgroundColor: isDark ? '#0E0E0E' : '#F3F4F6',
            borderColor: isDark ? 'rgba(68,73,51,0.2)' : 'rgba(209,213,219,0.4)',
          }]}>
            <TextInput
              style={[styles.descInputText, { color: isDark ? '#E2E2E2' : '#111827' }]}
              placeholder="e.g. My best friend since college..."
              placeholderTextColor={subText}
              value={descText}
              onChangeText={setDescText}
              multiline
            />
          </View>
        </View>

        {/* ── Relationship Context ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>RELATIONSHIP CONTEXT</Text>
          <View style={styles.relationsGrid}>
            {RELATION_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.relationChip,
                  { backgroundColor: relationTag === opt ? primaryGreen : cardBg },
                ]}
                onPress={() => setRelationTag(opt)}
                activeOpacity={0.8}
              >
                <Text style={[styles.relationChipText, {
                  color: relationTag === opt ? '#003910' : headText,
                }]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Data Permissions ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>DATA PERMISSIONS</Text>
          <View style={styles.permissionList}>
            {PERMISSION_ITEMS.map(item => (
              <View key={item.key} style={[styles.permissionRow, { backgroundColor: cardBg }]}>
                <View style={[styles.permIconBg, { backgroundColor: iconBg }]}>
                  {item.icon === 'wallet'    && <WalletIcon color={primaryGreen} />}
                  {item.icon === 'upload'    && <UploadIcon color={primaryGreen} />}
                  {item.icon === 'analytics' && <AnalyticsIcon color={primaryGreen} />}
                  {item.icon === 'period'    && <PeriodIcon color={primaryGreen} />}
                </View>
                <View style={styles.permText}>
                  <Text style={[styles.permLabel, { color: headText }]}>{item.label}</Text>
                  <Text style={[styles.permSub, { color: subText }]}>{item.sub}</Text>
                </View>
                <Switch
                  value={permissions[item.key]}
                  onValueChange={() => togglePermission(item.key)}
                  trackColor={{ true: primaryGreen, false: toggleOffBg }}
                  thumbColor={permissions[item.key] ? '#003910' : (isDark ? '#BCCBB7' : '#9CA3AF')}
                  ios_backgroundColor={toggleOffBg}
                />
              </View>
            ))}
          </View>
        </View>

        {/* ── Remove from Family ── */}
        <TouchableOpacity
          style={[styles.removeFromFamilyBtn, { backgroundColor: isDark ? 'rgba(147,0,10,0.15)' : 'rgba(220,38,38,0.08)' }]}
          activeOpacity={0.8}
          onPress={() => setShowRemoveModal(true)}
        >
          <Ionicons name="remove-circle-outline" size={16} color={isDark ? '#FFB4AB' : '#DC2626'} />
          <Text style={[styles.removeFromFamilyText, { color: isDark ? '#FFB4AB' : '#DC2626' }]}>Remove from Family</Text>
        </TouchableOpacity>

        {/* ── Delete Connection ── */}
        <TouchableOpacity
          style={[styles.deleteBtn, { backgroundColor: 'rgba(147,0,10,0.2)' }]}
          activeOpacity={0.8}
          onPress={() => setShowDeleteModal(true)}
        >
          <TrashIcon color="#FFB4AB" />
          <Text style={[styles.deleteBtnText, { color: '#FFB4AB' }]}>Delete Connection</Text>
        </TouchableOpacity>

        {/* ── Update Connection ── */}
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.updateBtn}>
          <TouchableOpacity
            style={styles.updateBtnInner}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.updateBtnText}>Update Connection</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>

      {/* Delete Modal */}
      <DeleteConnectionModal
        visible={showDeleteModal}
        name={member.name}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Remove from Family Modal */}
      <RemoveFromFamilyModal
        visible={showRemoveModal}
        name={member.name}
        onConfirm={handleRemoveConfirm}
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

  // Profile
  profileSection: { alignItems: 'center', marginBottom: 28, gap: 6 },
  avatarContainer: { position: 'relative', marginBottom: 14 },
  avatarGradientRing: { width: 116, height: 116, borderRadius: 58, padding: 3, alignItems: 'center', justifyContent: 'center' },
  avatarInner: { flex: 1, width: '100%', borderRadius: 54, borderWidth: 3, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  relationTag: {
    position: 'absolute', bottom: -10,
    alignSelf: 'center', left: '20%', right: '20%',
    paddingHorizontal: 12, paddingVertical: 3,
    borderRadius: 999, alignItems: 'center',
  },
  relationTagText: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter-Bold', color: '#003910', letterSpacing: 1 },
  memberName: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter-Bold', letterSpacing: -0.6 },
  connectedSince: { fontSize: 14, fontFamily: 'Inter' },

  // Sections
  section: { marginBottom: 22 },
  sectionLabel: {
    fontSize: 10, fontWeight: '700', fontFamily: 'Inter-Bold',
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12,
  },

  // Describe input
  descInput: {
    borderRadius: 24, borderWidth: 1,
    padding: 17, minHeight: 80,
  },
  descInputText: { fontSize: 14, fontFamily: 'Inter', lineHeight: 22 },

  // Relations
  relationsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  relationChip: { flex: 1, minWidth: '40%', paddingVertical: 16, paddingHorizontal: 12, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  relationChipText: { fontSize: 14, fontWeight: '600', fontFamily: 'Inter-SemiBold', lineHeight: 20 },

  // Permissions
  permissionList: { gap: 8 },
  permissionRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, gap: 16 },
  permIconBg: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  permText: { flex: 1 },
  permLabel: { fontSize: 14, fontWeight: '600', fontFamily: 'Inter-SemiBold', lineHeight: 20 },
  permSub: { fontSize: 12, fontFamily: 'Inter', lineHeight: 16, marginTop: 2 },

  // Buttons
  removeFromFamilyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 56, borderRadius: 40, marginBottom: 12,
  },
  removeFromFamilyText: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter-SemiBold' },
  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, height: 56, borderRadius: 40, marginBottom: 12,
  },
  deleteBtnText: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter-SemiBold', lineHeight: 24 },
  updateBtn: { borderRadius: 999 },
  updateBtnInner: { height: 56, alignItems: 'center', justifyContent: 'center' },
  updateBtnText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter-Bold', color: '#003910', lineHeight: 28 },
});
