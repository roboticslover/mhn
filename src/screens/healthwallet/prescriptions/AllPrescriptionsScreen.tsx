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
function ActivePrescriptionCard({ onPress, onEdit }: { onPress: () => void; onEdit: () => void }) {
  return (
    <TouchableOpacity style={styles.activeCard} activeOpacity={0.8} onPress={onPress}>
      <TouchableOpacity style={styles.editIconBtn} onPress={onEdit}>
        <Ionicons name="create-outline" size={15} color="rgba(255,255,255,0.74)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.collapseIconBtn}>
        <Ionicons name="chevron-up" size={16} color="rgba(255,255,255,0.5)" />
      </TouchableOpacity>

      <View style={styles.latestBadge}>
        <Text style={styles.latestBadgeText}>LATEST</Text>
      </View>

      <Text style={styles.activePrescName}>Nexus Prescription</Text>
      <Text style={styles.activePrescMeta}>Date: 23 March              Timeline: 3 months</Text>

      <Text style={styles.statusLabel}>Prescription status</Text>
      <Text style={styles.statusValue}>In Progress</Text>

      <View style={styles.progressRow}>
        <Text style={styles.endDateText}>END DATE: 31 March</Text>
        <Text style={styles.progressPct}>85%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: '85%' }]} />
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.viewDigitalBtn}>
          <Text style={styles.viewDigitalText}>VIEW DIGITAL{'\n'}COPY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadBtnText}>DOWNLOAD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function FinishedPrescriptionCard({
  name, onPress, onEdit, collapsed,
}: { name: string; onPress: () => void; onEdit: () => void; collapsed?: boolean }) {
  return (
    <TouchableOpacity style={styles.finishedCard} activeOpacity={0.8} onPress={onPress}>
      <TouchableOpacity style={styles.editIconBtn} onPress={onEdit}>
        <Ionicons name="create-outline" size={15} color="rgba(255,255,255,0.74)" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.collapseIconBtn}>
        <Ionicons name={collapsed ? 'chevron-down' : 'chevron-up'} size={16} color="rgba(255,255,255,0.5)" />
      </TouchableOpacity>

      <View style={styles.finishedTopRow}>
        <Text style={styles.finishedName}>{name}</Text>
        <View style={styles.finishedBadge}>
          <Text style={styles.finishedBadgeText}>FINISHED</Text>
        </View>
      </View>
      <Text style={styles.finishedMeta}>Date: 23 March              Timeline: 3 months</Text>
      <Text style={styles.completedStatus}>Course Completed</Text>
      <View style={styles.completedLine} />
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.viewDigitalBtn}>
          <Text style={styles.viewDigitalText}>VIEW DIGITAL{'\n'}COPY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadBtnText}>DOWNLOAD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function AllPrescriptionsScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prescriptions</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Search + Filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="SEARCH PRESCRIPTION"
              placeholderTextColor="rgba(170,170,170,0.5)"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={10} color="#E2E2E2" />
              <Text style={styles.filterBtnText}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('PrescriptionUpload')}
              activeOpacity={0.8}
            >
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Prescriptions */}
        <Text style={styles.sectionTitle}>Active Prescriptions</Text>
        <ActivePrescriptionCard
          onPress={() => navigation.navigate('PrescriptionDetail')}
          onEdit={() => navigation.navigate('PrescriptionEdit')}
        />

        {/* All Prescriptions */}
        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>All Prescriptions</Text>
        <FinishedPrescriptionCard
          name="Apollo"
          onPress={() => navigation.navigate('PrescriptionDetail')}
          onEdit={() => navigation.navigate('PrescriptionEdit')}
        />
        <FinishedPrescriptionCard
          name="Apollo"
          onPress={() => navigation.navigate('PrescriptionDetail')}
          onEdit={() => navigation.navigate('PrescriptionEdit')}
        />
        <FinishedPrescriptionCard
          name="Apollo"
          onPress={() => navigation.navigate('PrescriptionDetail')}
          onEdit={() => navigation.navigate('PrescriptionEdit')}
          collapsed
        />

        {/* See All */}
        <TouchableOpacity style={styles.seeAllBtn}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-down" size={14} color="#6FFB85" />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 20 },
  searchBar: {
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
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
    color: '#AAAAAA',
    paddingLeft: 16,
  },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: {
    height: 48,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(143,147,120,0.15)',
    backgroundColor: 'rgba(31,31,31,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    gap: 8,
  },
  filterBtnText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    textTransform: 'uppercase',
  },
  addBtn: {
    height: 48,
    borderRadius: 33,
    backgroundColor: '#6FFB85',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#141414',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    letterSpacing: -0.6,
    paddingHorizontal: 25,
    marginBottom: 16,
  },
  activeCard: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    padding: 32,
    marginBottom: 16,
    position: 'relative',
  },
  editIconBtn: { position: 'absolute', top: 24, right: 52 },
  collapseIconBtn: { position: 'absolute', top: 24, right: 24 },
  latestBadge: {
    borderWidth: 1,
    borderColor: 'rgba(52,199,89,0.44)',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(52,199,89,0.13)',
    marginBottom: 8,
  },
  latestBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
  },
  activePrescName: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    letterSpacing: -0.6,
    marginBottom: 6,
  },
  activePrescMeta: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#AAAAAA',
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#AAAAAA',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  endDateText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    textTransform: 'uppercase',
  },
  progressPct: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#6FFB85',
  },
  cardActions: { flexDirection: 'row', gap: 12 },
  viewDigitalBtn: {
    borderRadius: 33,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#6FFB85',
  },
  viewDigitalText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#141414',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  downloadBtn: {
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: 'center',
    backgroundColor: 'rgba(23,23,23,0.4)',
  },
  downloadBtnText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  finishedCard: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    padding: 24,
    marginBottom: 16,
    position: 'relative',
  },
  finishedTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
    marginRight: 60,
  },
  finishedName: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.6,
  },
  finishedBadge: {
    borderWidth: 1,
    borderColor: 'rgba(52,199,89,0.44)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: 'rgba(52,199,89,0.13)',
  },
  finishedBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
  },
  finishedMeta: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#AAAAAA',
    marginBottom: 12,
  },
  completedStatus: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  completedLine: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#6FFB85',
    marginBottom: 16,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 16,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#6FFB85',
    textAlign: 'center',
  },
});
