import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
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

function MemberAvatar({ name, size = 112 }: { name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const colors = ['#55EE71', '#60A5FA', '#F59E0B', '#EC4899', '#8B5CF6'];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return (
    <View style={{
      width: size, height: size,
      borderRadius: size / 2,
      backgroundColor: bg + '33',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ color: bg, fontSize: size * 0.28, fontWeight: '700', fontFamily: 'Inter-Bold' }}>
        {initials}
      </Text>
    </View>
  );
}

const PERMISSION_ITEMS = [
  { icon: 'wallet', key: 'healthWallet', label: 'Access to Health Wallet', sub: 'View summaries and balances' },
  { icon: 'upload', key: 'uploadRecords', label: 'Modify/Upload Records', sub: 'Permission to add health logs' },
  { icon: 'analytics', key: 'analytics', label: 'Access to Analytics', sub: 'View health trends and metrics' },
  { icon: 'period', key: 'period', label: 'Share Period Tracking', sub: 'Share Period tracking data' },
];

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
  const RELATION_OPTIONS = ['Friend', 'Family', 'Parent', 'Partner'];

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : [c.primary, c.primaryDark];
  const cardBg = isDark ? '#1F1F1F' : c.card;
  const subText = isDark ? '#BCCBB7' : c.textSecondary;
  const headText = isDark ? '#E2E2E2' : c.text;
  const iconBg = isDark ? 'rgba(85,238,113,0.1)' : c.accentSoft;
  const toggleOffBg = isDark ? '#353535' : c.toggleInactive;

  const togglePermission = (key: string) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDelete = () => {
    Alert.alert(
      'Remove Connection',
      `Are you sure you want to remove ${member.name} from your health circle?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

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
        {/* Profile Header */}
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
            {/* Relation tag */}
            <View style={[styles.relationTag, { backgroundColor: primaryGreen }]}>
              <Text style={[styles.relationText, { fontFamily: 'Inter-Bold' }]}>{relationTag.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={[styles.memberName, { color: headText, fontFamily: 'Inter-Bold' }]}>{member.name}</Text>
          <Text style={[styles.connectedSince, { color: subText, fontFamily: 'Inter' }]}>Connected since Oct 2023</Text>
        </View>

        {/* Relationship Context */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>RELATIONSHIP CONTEXT</Text>
          <View style={styles.relationsGrid}>
            {RELATION_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.relationChip,
                  {
                    backgroundColor: relationTag === opt ? primaryGreen : (isDark ? '#1F1F1F' : c.card),
                    shadowColor: relationTag === opt ? primaryGreen : 'transparent',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: relationTag === opt ? 3 : 0,
                  },
                ]}
                onPress={() => setRelationTag(opt)}
                activeOpacity={0.8}
              >
                <Text style={[styles.relationChipText, {
                  color: relationTag === opt ? '#003910' : headText,
                  fontFamily: 'Inter',
                }]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Data Permissions */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: subText }]}>DATA PERMISSIONS</Text>
          <View style={styles.permissionList}>
            {PERMISSION_ITEMS.map(item => (
              <View key={item.key} style={[styles.permissionRow, { backgroundColor: cardBg }]}>
                <View style={[styles.permIconBg, { backgroundColor: iconBg }]}>
                  {item.icon === 'wallet' && <WalletIcon color={primaryGreen} />}
                  {item.icon === 'upload' && <UploadIcon color={primaryGreen} />}
                  {item.icon === 'analytics' && <AnalyticsIcon color={primaryGreen} />}
                  {item.icon === 'period' && <PeriodIcon color={primaryGreen} />}
                </View>
                <View style={styles.permText}>
                  <Text style={[styles.permLabel, { color: headText, fontFamily: 'Inter' }]}>{item.label}</Text>
                  <Text style={[styles.permSub, { color: subText, fontFamily: 'Inter' }]}>{item.sub}</Text>
                </View>
                <Switch
                  value={permissions[item.key]}
                  onValueChange={() => togglePermission(item.key)}
                  trackColor={{ true: primaryGreen, false: toggleOffBg }}
                  thumbColor={permissions[item.key] ? '#003910' : subText}
                  ios_backgroundColor={toggleOffBg}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Delete Connection */}
        <TouchableOpacity
          style={[styles.deleteBtn, { backgroundColor: isDark ? 'rgba(147,0,10,0.2)' : c.errorSoft }]}
          activeOpacity={0.8}
          onPress={handleDelete}
        >
          <TrashIcon color={c.error} />
          <Text style={[styles.deleteBtnText, { color: c.error, fontFamily: 'Inter' }]}>Delete Connection</Text>
        </TouchableOpacity>

        {/* Update Button */}
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.updateBtn}>
          <TouchableOpacity
            style={styles.updateBtnInner}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.updateBtnText, { fontFamily: 'Inter-Bold' }]}>Update Connection</Text>
          </TouchableOpacity>
        </LinearGradient>

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
  profileSection: { alignItems: 'center', marginBottom: 32, gap: 8 },
  avatarContainer: { position: 'relative', marginBottom: 8 },
  avatarGradientRing: {
    width: 116,
    height: 116,
    borderRadius: 58,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    flex: 1,
    width: '100%',
    borderRadius: 55,
    borderWidth: 3,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  relationTag: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    left: '20%',
    right: '20%',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 999,
    alignItems: 'center',
  },
  relationText: { fontSize: 10, fontWeight: '700', color: '#003910', letterSpacing: 1, lineHeight: 15 },
  memberName: { fontSize: 24, fontWeight: '700', lineHeight: 32, letterSpacing: -0.6, marginTop: 12 },
  connectedSince: { fontSize: 14, lineHeight: 20 },
  section: { marginBottom: 24 },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  relationsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  relationChip: {
    flex: 1,
    minWidth: '40%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  relationChipText: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  permissionList: { gap: 8 },
  permissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  permIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  permText: { flex: 1 },
  permLabel: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  permSub: { fontSize: 12, lineHeight: 16, marginTop: 2 },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 56,
    borderRadius: 40,
    marginBottom: 12,
  },
  deleteBtnText: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  updateBtn: { borderRadius: 999, marginBottom: 8 },
  updateBtnInner: { height: 56, alignItems: 'center', justifyContent: 'center' },
  updateBtnText: { fontSize: 18, fontWeight: '700', color: '#003910', lineHeight: 28 },
});
