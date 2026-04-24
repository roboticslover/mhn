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

const ACTIVE_VACCINES = [
  {
    id: '1',
    pathogenTarget: 'Hepatitis B',
    status: 'ACTIVE',
    from: '01 APR 2026',
    end: 'Lifetime',
    endIsLifetime: true,
  },
  {
    id: '2',
    pathogenTarget: 'Influenza',
    status: 'EXPIRED',
    from: 'OCT 2023',
    end: 'SEP 2024',
    endIsLifetime: false,
  },
];

const PAST_VACCINES = [
  { id: '3', name: 'Polio (IPV)', meta: 'Series Completion: 1998' },
  { id: '4', name: 'MMR (Measles, Mumps, Rubella)', meta: 'Series Completion: 2002' },
  { id: '5', name: 'Tetanus Booster', meta: 'Last Admin: 2018' },
];

function ActiveVaccineCard({
  vaccine,
  onViewDigital,
  c,
}: {
  vaccine: (typeof ACTIVE_VACCINES)[0];
  onViewDigital: () => void;
  c: any;
}) {
  const isExpired = vaccine.status === 'EXPIRED';
  return (
    <View style={[styles.activeCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
      {/* Status badge */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: isExpired ? c.errorSoft : c.successSoft },
        ]}
      >
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isExpired ? c.error : c.primary },
          ]}
        />
        <Text
          style={[
            styles.statusBadgeText,
            { color: isExpired ? c.error : c.primary },
          ]}
        >
          {vaccine.status}
        </Text>
      </View>

      <Text style={[styles.activeCardLabel, { color: c.textSecondary }]}>Pathogen Target</Text>
      <Text style={[styles.activeCardName, { color: c.text }]}>{vaccine.pathogenTarget}</Text>

      <View style={styles.activeCardDates}>
        <View>
          <Text style={[styles.activeCardDateLabel, { color: c.textSecondary }]}>From</Text>
          <Text style={[styles.activeCardDateValue, { color: c.text }]}>{vaccine.from}</Text>
        </View>
        <View>
          <Text style={[styles.activeCardDateLabel, { color: c.textSecondary }]}>END</Text>
          <Text
            style={[
              styles.activeCardDateValue,
              { color: isExpired ? c.error : c.text },
            ]}
          >
            {vaccine.end}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.viewDigitalBtn,
          { backgroundColor: isExpired ? 'transparent' : c.primary, borderColor: isExpired ? c.cardGlassBorder : 'transparent', borderWidth: isExpired ? 1 : 0 },
        ]}
        onPress={onViewDigital}
        activeOpacity={0.8}
      >
        <Text style={[styles.viewDigitalText, { color: isExpired ? c.textSecondary : c.textOnPrimary }]}>
          View Digital Copy
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function PastVaccineRow({
  vaccine,
  onPress,
  c,
}: {
  vaccine: (typeof PAST_VACCINES)[0];
  onPress: () => void;
  c: any;
}) {
  return (
    <TouchableOpacity
      style={[styles.pastRow, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.pastRowLeft}>
        <View style={[styles.pastRowIcon, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
          <Ionicons name="document-outline" size={18} color={c.textSecondary} />
        </View>
        <View>
          <Text style={[styles.pastRowName, { color: c.text }]}>{vaccine.name}</Text>
          <Text style={[styles.pastRowMeta, { color: c.textSecondary }]}>{vaccine.meta}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.pastRowDownload}>
        <Ionicons name="download-outline" size={18} color={c.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function AllVaccinesScreen({ navigation }: { navigation: any }) {
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
          <Text style={[styles.headerTitle, { color: c.text }]}>Vaccinations</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Search + Filters */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
            <Ionicons name="search" size={20} color={c.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: c.textSecondary }]}
              placeholder="SEARCH 128 PARAMETERS..."
              placeholderTextColor={c.inputPlaceholder}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: 'rgba(31,31,31,0.4)', borderColor: 'rgba(143,147,120,0.15)' }]}>
              <Ionicons name="options-outline" size={10} color={c.text} />
              <Text style={[styles.filterBtnText, { color: c.text }]}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: c.primary }]}
              onPress={() => navigation.navigate('VaccineAdd')}
              activeOpacity={0.8}
            >
              <Text style={[styles.addBtnText, { color: c.textOnPrimary }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Vaccinations Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Active Vaccinations</Text>
          <View style={[styles.sectionDivider, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
        </View>

        {ACTIVE_VACCINES.map((v) => (
          <ActiveVaccineCard
            key={v.id}
            vaccine={v}
            onViewDigital={() => navigation.navigate('VaccineDetail', { vaccineId: v.id })}
            c={c}
          />
        ))}

        {/* Past Vaccinations Section */}
        <View style={[styles.sectionHeader, { marginTop: 8 }]}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>Past Vaccinations</Text>
          <TouchableOpacity>
            <Text style={[styles.exportAllText, { color: c.textSecondary }]}>Export All{'\n'}(PDF)</Text>
          </TouchableOpacity>
        </View>

        {PAST_VACCINES.map((v) => (
          <PastVaccineRow
            key={v.id}
            vaccine={v}
            onPress={() => navigation.navigate('VaccineDetail', { vaccineId: v.id })}
            c={c}
          />
        ))}
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
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 24 },
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
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    paddingLeft: 16,
    letterSpacing: 1.4,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 27,
    marginBottom: 19,
    gap: 16,
  },
  sectionTitle: { fontSize: 30, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.75 },
  sectionDivider: { flex: 1, height: 1 },
  exportAllText: { fontSize: 12, fontFamily: 'Inter', textAlign: 'right', lineHeight: 16 },
  // Active card
  activeCard: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    padding: 33,
    marginBottom: 19,
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 5,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusBadgeText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  activeCardLabel: { fontSize: 12, fontFamily: 'Inter', marginBottom: 4 },
  activeCardName: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6, marginBottom: 20 },
  activeCardDates: { flexDirection: 'row', gap: 40, marginBottom: 20 },
  activeCardDateLabel: { fontSize: 10, fontWeight: '700', fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.5 },
  activeCardDateValue: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter' },
  viewDigitalBtn: {
    height: 48,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewDigitalText: { fontSize: 14, fontWeight: '800', fontFamily: 'Manrope' },
  // Past row
  pastRow: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 25,
    marginBottom: 18,
  },
  pastRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 24, flex: 1 },
  pastRowIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  pastRowName: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', marginBottom: 4, maxWidth: 200 },
  pastRowMeta: { fontSize: 12, fontFamily: 'Inter' },
  pastRowDownload: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
