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
import BottomNavBar from '../../../components/BottomNavBar';

function PrescriptionCard({
  name, date, timeline, status, statusLabel, isLatest, onPress, onEdit, colors,
}: {
  name: string; date: string; timeline: string; status: string; statusLabel: string; isLatest?: boolean; onPress?: () => void; onEdit?: () => void; colors: any;
}) {
  const isActive = status === 'In Progress';
  return (
    <TouchableOpacity style={[styles.prescriptionCard, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]} activeOpacity={0.7} onPress={onPress}>
      {isLatest && (
        <View style={[styles.latestBadge, { backgroundColor: colors.accentSoft, borderColor: colors.primary + '70' }]}>
          <Text style={[styles.latestBadgeText, { color: colors.primary, fontFamily: 'Inter' }]}>LATEST</Text>
        </View>
      )}
      {!isLatest && (
        <View style={styles.finishedBadgeRow}>
          <Text style={[styles.prescriptionName, { color: colors.text, fontFamily: 'Inter' }]}>{name}</Text>
          <View style={[styles.finishedBadge, { backgroundColor: colors.accentSoft, borderColor: colors.primary + '70' }]}>
            <Text style={[styles.finishedBadgeText, { color: colors.primary, fontFamily: 'Inter' }]}>{statusLabel}</Text>
          </View>
        </View>
      )}
      {isLatest && <Text style={[styles.prescriptionName, { color: colors.text, fontFamily: 'Inter', marginTop: 8 }]}>{name}</Text>}
      <Text style={[styles.prescriptionMeta, { color: colors.textSecondary, fontFamily: 'Inter' }]}>
        Date: {date}              Timeline: {timeline}
      </Text>

      {isActive && (
        <View style={styles.statusSection}>
          <Text style={[styles.statusLabel, { color: colors.textSecondary, fontFamily: 'Inter' }]}>Prescription status</Text>
          <Text style={[styles.statusValue, { color: colors.text, fontFamily: 'Inter' }]}>{status}</Text>
          <View style={styles.progressRow}>
            <Text style={[styles.endDate, { color: colors.textSecondary, fontFamily: 'Inter' }]}>END DATE: 31 March</Text>
            <Text style={[styles.progressPercent, { color: colors.text, fontFamily: 'Inter' }]}>85%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: colors.cardGlassBorder }]}>
            <View style={[styles.progressFill, { width: '85%', backgroundColor: colors.primary }]} />
          </View>
        </View>
      )}

      {!isActive && (
        <View style={styles.statusSection}>
          <Text style={[styles.completedStatus, { color: colors.text, fontFamily: 'Inter' }]}>Course Completed</Text>
          <View style={[styles.completedLine, { backgroundColor: colors.cardGlassBorder }]} />
        </View>
      )}

      <View style={styles.cardActions}>
        <TouchableOpacity style={[styles.viewDigitalBtn, { backgroundColor: colors.primary }]}>
          <Text style={[styles.viewDigitalText, { color: colors.textOnPrimary, fontFamily: 'Inter' }]}>VIEW DIGITAL{'\n'}COPY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.downloadBtn, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]}>
          <Text style={[styles.downloadBtnText, { color: colors.text, fontFamily: 'Inter' }]}>DOWNLOAD</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.editIcon} onPress={onEdit}>
        <Ionicons name="create-outline" size={15} color={colors.textSecondary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.expandIcon}>
        <Ionicons name="chevron-up" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function AllPrescriptionsScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Prescriptions</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search + Filters */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
            <Ionicons name="search" size={20} color={c.textSecondary} />
            <TextInput style={[styles.searchInput, { color: c.text, fontFamily: 'Inter' }]} placeholder="SEARCH PRESCRIPTION" placeholderTextColor={c.inputPlaceholder} value={search} onChangeText={setSearch} />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}>
              <Ionicons name="options-outline" size={12} color={c.text} />
              <Text style={[styles.filterBtnText, { color: c.text, fontFamily: 'Inter' }]}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: c.primary }]} onPress={() => navigation.navigate('PrescriptionUpload')}>
              <Text style={[styles.addBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter' }]}>Active Prescriptions</Text>
        <PrescriptionCard name="Nexus Prescription" date="23 March" timeline="3 months" status="In Progress" statusLabel="LATEST" isLatest={true} onPress={() => navigation.navigate('PrescriptionDetail')} onEdit={() => navigation.navigate('PrescriptionEdit')} colors={c} />

        <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter', marginTop: 24 }]}>All Prescriptions</Text>
        <PrescriptionCard name="Apollo" date="23 March" timeline="3 months" status="Completed" statusLabel="FINISHED" onPress={() => navigation.navigate('PrescriptionDetail')} onEdit={() => navigation.navigate('PrescriptionEdit')} colors={c} />
        <PrescriptionCard name="Apollo" date="23 March" timeline="3 months" status="Completed" statusLabel="FINISHED" onPress={() => navigation.navigate('PrescriptionDetail')} onEdit={() => navigation.navigate('PrescriptionEdit')} colors={c} />

        <TouchableOpacity style={styles.seeAllBtn}>
          <Text style={[styles.seeAllText, { color: c.primary, fontFamily: 'Inter' }]}>See All</Text>
          <Ionicons name="chevron-down" size={14} color={c.primary} />
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar activeTab="card" navigation={navigation} />
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
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 24 },
  searchBar: { height: 58, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, gap: 12 },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '500' },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: { height: 48, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 8 },
  filterBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  addBtn: { height: 48, borderRadius: 33, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  addBtnText: { fontSize: 18, fontWeight: '800', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6, paddingHorizontal: 25, marginBottom: 16 },
  prescriptionCard: { marginHorizontal: 20, borderRadius: 33, borderWidth: 1, padding: 24, marginBottom: 16, position: 'relative' },
  latestBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 4, alignSelf: 'flex-start' },
  latestBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  finishedBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  finishedBadge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 4 },
  finishedBadgeText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  prescriptionName: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6 },
  prescriptionMeta: { fontSize: 12, marginTop: 6, marginBottom: 12 },
  statusSection: { marginBottom: 16 },
  statusLabel: { fontSize: 12, marginBottom: 4 },
  statusValue: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  endDate: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  progressPercent: { fontSize: 12, fontWeight: '700' },
  progressTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 2 },
  completedStatus: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  completedLine: { height: 2, borderRadius: 1 },
  cardActions: { flexDirection: 'row', gap: 12 },
  viewDigitalBtn: { borderRadius: 33, paddingHorizontal: 16, paddingVertical: 10 },
  viewDigitalText: { fontSize: 10, fontWeight: '800', textAlign: 'center', textTransform: 'uppercase' },
  downloadBtn: { borderRadius: 33, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 14, justifyContent: 'center' },
  downloadBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  editIcon: { position: 'absolute', top: 24, right: 48 },
  expandIcon: { position: 'absolute', top: 24, right: 24 },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12 },
  seeAllText: { fontSize: 16, fontWeight: '600' },
});
