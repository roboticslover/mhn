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
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

function AddPersonIcon({ color = '#003910' }: { color?: string }) {
  return (
    <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
      <Path d="M15 8H19M17 6V10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M1 14C1 11.7909 2.79086 10 5 10H11C13.2091 10 15 11.7909 15 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={8} cy={4} r={3} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function DocIcon({ color }: { color: string }) {
  return (
    <Svg width={14} height={17} viewBox="0 0 14 17" fill="none">
      <Path d="M8.5 1H2C1.44772 1 1 1.44772 1 2V15C1 15.5523 1.44772 16 2 16H12C12.5523 16 13 15.5523 13 15V5.5L8.5 1Z" stroke={color} strokeWidth={1.3} strokeLinejoin="round" />
      <Path d="M8 1V6H13" stroke={color} strokeWidth={1.3} strokeLinejoin="round" />
      <Path d="M4 9H10M4 12H7" stroke={color} strokeWidth={1.3} strokeLinecap="round" />
    </Svg>
  );
}

function IncomingIcon({ color }: { color: string }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
      <Circle cx={7.5} cy={7.5} r={6.5} stroke={color} strokeWidth={1.3} />
      <Path d="M5 7.5H10M7.5 5L10 7.5L7.5 10" stroke={color} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SentIcon({ color }: { color: string }) {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
      <Path d="M1 2L14 7.5L1 13V9L10 7.5L1 6V2Z" stroke={color} strokeWidth={1.3} strokeLinejoin="round" />
    </Svg>
  );
}

function MemberAvatar({ name, size = 56 }: { name: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const colors = ['#55EE71', '#60A5FA', '#F59E0B', '#EC4899', '#8B5CF6'];
  const bg = colors[name.charCodeAt(0) % colors.length];
  return (
    <View style={{
      width: size, height: size,
      borderRadius: size === 56 ? 16 : size / 2,
      backgroundColor: bg + '33',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ color: bg, fontSize: size * 0.3, fontWeight: '700', fontFamily: 'Inter-Bold' }}>
        {initials}
      </Text>
    </View>
  );
}

const MEMBERS = [
  { id: '1', name: 'Sarah Mitchell', relation: 'Family' },
  { id: '2', name: 'Elena Chen', relation: 'Friend' },
  { id: '3', name: 'David Chen', relation: 'Family' },
  { id: '4', name: 'Julian Vance', relation: 'Friend' },
];

const INCOMING = [
  { id: '5', name: 'Marcus Reed', relation: 'Friend' },
  { id: '6', name: 'Dr. Julian Vance', relation: 'Doctor' },
];

const SENT = [
  { id: '7', phone: '+91 000 000 0000', status: 'PENDING APPROVAL' },
];

export default function FamilyListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : [c.primary, c.primaryDark];
  const cardBg = isDark ? '#1F1F1F' : c.card;
  const memberCardBg = isDark ? '#1F1F1F' : c.card;
  const subText = isDark ? '#BCCBB7' : c.textSecondary;
  const headText = isDark ? '#E2E2E2' : c.text;
  const sectionBg = isDark ? '#1B1B1B' : c.surface;
  const btnBg = isDark ? '#353535' : c.skeleton;
  const totalActive = MEMBERS.length;

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
        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: subText, fontFamily: 'Inter' }]}>
          Securely bridge health data with your inner circle to monitor well-being in real-time.
        </Text>

        {/* Active Connections Summary */}
        <View style={[styles.summaryCard, { backgroundColor: cardBg }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryCount, { color: primaryGreen, fontFamily: 'Inter-Bold' }]}>{totalActive}</Text>
            <Text style={[styles.summaryLabel, { color: subText, fontFamily: 'Inter' }]}> Active Connections</Text>
          </View>
          <View style={styles.progressBar}>
            {Array(10).fill(0).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressSegment,
                  { backgroundColor: i < totalActive ? primaryGreen : btnBg },
                ]}
              />
            ))}
          </View>
        </View>

        {/* Add Family Member Button */}
        <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.addBtn}>
          <TouchableOpacity
            style={styles.addBtnInner}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('FamilyAddScreen')}
          >
            <AddPersonIcon color="#003910" />
            <Text style={[styles.addBtnText, { fontFamily: 'Inter-Bold' }]}>Add Family Member</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Family & Friends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: headText, fontFamily: 'Inter-Bold' }]}>Family & Friends</Text>
            <View style={[styles.verifiedBadge, { backgroundColor: isDark ? 'rgba(85,238,113,0.1)' : c.successSoft }]}>
              <Text style={[styles.verifiedText, { color: primaryGreen, fontFamily: 'Inter' }]}>VERIFIED</Text>
            </View>
          </View>
          <View style={[styles.memberList, { backgroundColor: sectionBg }]}>
            {MEMBERS.map((member, idx) => (
              <TouchableOpacity
                key={member.id}
                style={[
                  styles.memberRow,
                  idx < MEMBERS.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(61,74,59,0.1)' : c.divider },
                ]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('FamilyMemberDetailScreen', { member })}
              >
                <MemberAvatar name={member.name} size={48} />
                <Text style={[styles.memberName, { color: headText, fontFamily: 'Inter-Bold' }]}>{member.name}</Text>
                <TouchableOpacity
                  style={[styles.docBtn, { backgroundColor: btnBg }]}
                  onPress={() => navigation.navigate('FamilySharedReportsScreen', { member })}
                >
                  <DocIcon color={subText} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Incoming Requests */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.incomingTitleRow}>
              <IncomingIcon color={primaryGreen} />
              <Text style={[styles.sectionTitle, { color: headText, fontFamily: 'Inter-Bold' }]}>Incoming Requests</Text>
            </View>
          </View>
          <View style={[styles.memberList, { backgroundColor: sectionBg }]}>
            {INCOMING.map((req, idx) => (
              <View
                key={req.id}
                style={[
                  styles.memberRow,
                  idx < INCOMING.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(61,74,59,0.1)' : c.divider },
                ]}
              >
                <MemberAvatar name={req.name} size={48} />
                <View style={styles.memberInfo}>
                  <Text style={[styles.memberName, { color: headText, fontFamily: 'Inter-Bold' }]}>{req.name}</Text>
                </View>
                <TouchableOpacity style={[styles.actionIconBtn, { backgroundColor: btnBg }]}>
                  <Ionicons name="close" size={18} color={subText} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionIconBtn, { backgroundColor: primaryGreen }]}>
                  <Ionicons name="checkmark" size={18} color="#003910" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Sent Invitations */}
        <View style={styles.section}>
          <View style={styles.incomingTitleRow}>
            <SentIcon color={primaryGreen} />
            <Text style={[styles.sectionTitle, { color: headText, fontFamily: 'Inter-Bold' }]}>Sent Invitations</Text>
          </View>
          {SENT.map(inv => (
            <View key={inv.id} style={[styles.sentRow, { backgroundColor: sectionBg }]}>
              <View style={[styles.sentAvatar, { backgroundColor: btnBg }]}>
                <Ionicons name="person" size={16} color={subText} />
              </View>
              <View style={styles.sentInfo}>
                <Text style={[styles.sentPhone, { color: headText, fontFamily: 'Inter-Bold' }]}>{inv.phone}</Text>
                <Text style={[styles.sentStatus, { color: primaryGreen, fontFamily: 'Inter' }]}>{inv.status}</Text>
              </View>
              <TouchableOpacity style={[styles.withdrawBtn, { borderColor: primaryGreen }]}>
                <Text style={[styles.withdrawText, { color: primaryGreen, fontFamily: 'Inter-Bold' }]}>WITHDRAW</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  scroll: { paddingHorizontal: 24 },
  subtitle: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  summaryCard: {
    borderRadius: 33,
    padding: 24,
    marginBottom: 20,
    gap: 12,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'baseline' },
  summaryCount: { fontSize: 16, fontWeight: '900', lineHeight: 16 },
  summaryLabel: { fontSize: 16, lineHeight: 24 },
  progressBar: { flexDirection: 'row', gap: 4, height: 12 },
  progressSegment: { flex: 1, borderRadius: 999, height: '100%' },
  addBtn: { borderRadius: 999, marginBottom: 24 },
  addBtnInner: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addBtnText: { fontSize: 16, fontWeight: '700', color: '#003910', lineHeight: 24, letterSpacing: -0.4 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', lineHeight: 28 },
  verifiedBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  verifiedText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  incomingTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  memberList: { borderRadius: 33, overflow: 'hidden' },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  memberInfo: { flex: 1 },
  memberName: { flex: 1, fontSize: 16, fontWeight: '700', lineHeight: 24 },
  docBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionIconBtn: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 33,
    marginBottom: 8,
  },
  sentAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  sentInfo: { flex: 1 },
  sentPhone: { fontSize: 14, fontWeight: '700', lineHeight: 20 },
  sentStatus: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase', lineHeight: 15 },
  withdrawBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1 },
  withdrawText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
});
