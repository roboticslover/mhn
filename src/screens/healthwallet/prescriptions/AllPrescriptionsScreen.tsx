import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

function ActivePrescriptionCard({ onPress, onEdit, c }: { onPress: () => void; onEdit: () => void; c: any }) {
  return (
    <TouchableOpacity style={[styles.activeCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]} activeOpacity={0.8} onPress={onPress}>
      <TouchableOpacity style={styles.editIconBtn} onPress={onEdit}>
        <Ionicons name="create-outline" size={15} color={c.textMuted} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.collapseIconBtn}>
        <Ionicons name="chevron-up" size={16} color={c.textSecondary} />
      </TouchableOpacity>

      <View style={[styles.latestBadge, { backgroundColor: c.successSoft, borderColor: c.primary + '70' }]}>
        <Text style={[styles.latestBadgeText, { color: c.primary }]}>LATEST</Text>
      </View>

      <Text style={[styles.activePrescName, { color: c.text }]}>Nexus Prescription</Text>
      <Text style={[styles.activePrescMeta, { color: c.textSecondary }]}>Date: 23 March              Timeline: 3 months</Text>

      <Text style={[styles.statusLabel, { color: c.textSecondary }]}>Prescription status</Text>
      <Text style={[styles.statusValue, { color: c.text }]}>In Progress</Text>

      <View style={styles.progressRow}>
        <Text style={[styles.endDateText, { color: c.textSecondary }]}>END DATE: 31 March</Text>
        <Text style={[styles.progressPct, { color: c.text }]}>85%</Text>
      </View>
      <View style={[styles.progressTrack, { backgroundColor: c.divider }]}>
        <View style={[styles.progressFill, { width: '85%', backgroundColor: c.primary }]} />
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={[styles.viewDigitalBtn, { backgroundColor: c.primary }]}>
          <Text style={[styles.viewDigitalText, { color: c.textOnPrimary }]}>VIEW DIGITAL{'\n'}COPY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <Text style={[styles.downloadBtnText, { color: c.text }]}>DOWNLOAD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function FinishedPrescriptionCard({
  name, onPress, onEdit, collapsed, c,
}: { name: string; onPress: () => void; onEdit: () => void; collapsed?: boolean; c: any }) {
  return (
    <TouchableOpacity style={[styles.finishedCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]} activeOpacity={0.8} onPress={onPress}>
      <TouchableOpacity style={styles.editIconBtn} onPress={onEdit}>
        <Ionicons name="create-outline" size={15} color={c.textMuted} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.collapseIconBtn}>
        <Ionicons name={collapsed ? 'chevron-down' : 'chevron-up'} size={16} color={c.textSecondary} />
      </TouchableOpacity>

      <View style={styles.finishedTopRow}>
        <Text style={[styles.finishedName, { color: c.text }]}>{name}</Text>
        <View style={[styles.finishedBadge, { backgroundColor: c.successSoft, borderColor: c.primary + '70' }]}>
          <Text style={[styles.finishedBadgeText, { color: c.primary }]}>FINISHED</Text>
        </View>
      </View>
      <Text style={[styles.finishedMeta, { color: c.textSecondary }]}>Date: 23 March              Timeline: 3 months</Text>
      <Text style={[styles.completedStatus, { color: c.text }]}>Course Completed</Text>
      <View style={[styles.completedLine, { backgroundColor: c.primary }]} />
      <View style={styles.cardActions}>
        <TouchableOpacity style={[styles.viewDigitalBtn, { backgroundColor: c.primary }]}>
          <Text style={[styles.viewDigitalText, { color: c.textOnPrimary }]}>VIEW DIGITAL{'\n'}COPY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <Text style={[styles.downloadBtnText, { color: c.text }]}>DOWNLOAD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function AllPrescriptionsScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Prescriptions</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Search + Filters */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
            <Ionicons name="search" size={20} color={c.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: c.textSecondary }]}
              placeholder="SEARCH PRESCRIPTION"
              placeholderTextColor={c.inputPlaceholder}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
              <Ionicons name="options-outline" size={10} color={c.text} />
              <Text style={[styles.filterBtnText, { color: c.text }]}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: c.primary }]}
              onPress={() => navigation.navigate('PrescriptionUpload')}
              activeOpacity={0.8}
            >
              <Text style={[styles.addBtnText, { color: c.textOnPrimary }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Prescriptions */}
        <Text style={[styles.sectionTitle, { color: c.text }]}>Active Prescriptions</Text>
        <ActivePrescriptionCard
          onPress={() => navigation.navigate('PrescriptionDetail')}
          onEdit={() => navigation.navigate('PrescriptionEdit')}
          c={c}
        />

        {/* All Prescriptions */}
        <Text style={[styles.sectionTitle, { color: c.text, marginTop: 16 }]}>All Prescriptions</Text>
        <FinishedPrescriptionCard name="Apollo" onPress={() => navigation.navigate('PrescriptionDetail')} onEdit={() => navigation.navigate('PrescriptionEdit')} c={c} />
        <FinishedPrescriptionCard name="Apollo" onPress={() => navigation.navigate('PrescriptionDetail')} onEdit={() => navigation.navigate('PrescriptionEdit')} c={c} />
        <FinishedPrescriptionCard name="Apollo" onPress={() => navigation.navigate('PrescriptionDetail')} onEdit={() => navigation.navigate('PrescriptionEdit')} collapsed c={c} />

        {/* See All */}
        <TouchableOpacity style={styles.seeAllBtn}>
          <Text style={[styles.seeAllText, { color: c.primary }]}>See All</Text>
          <Ionicons name="chevron-down" size={14} color={c.primary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 29,
    paddingBottom: 16,
  },
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter' },
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 20 },
  searchBar: {
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  searchIcon: { marginRight: 0 },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    paddingLeft: 16,
  },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: {
    height: 48,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    gap: 8,
  },
  filterBtnText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', textTransform: 'uppercase' },
  addBtn: {
    height: 48,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  addBtnText: { fontSize: 18, fontWeight: '800', fontFamily: 'Manrope', textTransform: 'uppercase' },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.6,
    paddingHorizontal: 25,
    marginBottom: 16,
  },
  activeCard: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    padding: 32,
    marginBottom: 16,
    position: 'relative',
  },
  editIconBtn: { position: 'absolute', top: 24, right: 52 },
  collapseIconBtn: { position: 'absolute', top: 24, right: 24 },
  latestBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  latestBadgeText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1 },
  activePrescName: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6, marginBottom: 6 },
  activePrescMeta: { fontSize: 12, fontFamily: 'Inter', marginBottom: 16 },
  statusLabel: { fontSize: 12, fontFamily: 'Inter', marginBottom: 4 },
  statusValue: { fontSize: 20, fontWeight: '700', fontFamily: 'Inter', marginBottom: 8 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  endDateText: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter', textTransform: 'uppercase' },
  progressPct: { fontSize: 12, fontWeight: '700', fontFamily: 'Inter' },
  progressTrack: { height: 4, borderRadius: 2, overflow: 'hidden', marginBottom: 20 },
  progressFill: { height: '100%', borderRadius: 2 },
  cardActions: { flexDirection: 'row', gap: 12 },
  viewDigitalBtn: { borderRadius: 33, paddingHorizontal: 16, paddingVertical: 10 },
  viewDigitalText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', textAlign: 'center', textTransform: 'uppercase' },
  downloadBtn: { borderRadius: 33, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 14, justifyContent: 'center' },
  downloadBtnText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', textTransform: 'uppercase' },
  finishedCard: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
    position: 'relative',
  },
  finishedTopRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6, marginRight: 60 },
  finishedName: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6 },
  finishedBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  finishedBadgeText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1 },
  finishedMeta: { fontSize: 12, fontFamily: 'Inter', marginBottom: 12 },
  completedStatus: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', marginBottom: 8 },
  completedLine: { height: 2, borderRadius: 1, marginBottom: 16 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 16 },
  seeAllText: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter', textAlign: 'center' },
});
