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

type PolicyCardProps = {
  title: string;
  policyNo: string;
  coverage: string;
  onPress?: () => void;
  onDownload?: () => void;
  c: any;
};

function PolicyCard({ title, policyNo, coverage, onPress, onDownload, c }: PolicyCardProps) {
  return (
    <TouchableOpacity style={[styles.policyCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.cardTopRow}>
        <View style={styles.cardLeft}>
          <Text style={[styles.activePolicyLabel, { color: c.primary }]}>Active Policy</Text>
          <Text style={[styles.policyTitle, { color: c.text }]}>{title}</Text>
        </View>
        <View style={[styles.verifiedBadge, { backgroundColor: c.successSoft, borderColor: c.primary + '33' }]}>
          <Ionicons name="checkmark-circle" size={9} color={c.primary} />
          <Text style={[styles.verifiedText, { color: c.primary }]}>VERIFIED</Text>
        </View>
      </View>

      <View style={styles.detailDividerRow}>
        <Text style={[styles.detailLabel, { color: c.textMuted }]}>Policy No.</Text>
        <Text style={[styles.detailValue, { color: c.text }]}>{policyNo}</Text>
      </View>
      <View style={[styles.rowDivider, { backgroundColor: c.divider }]} />
      <View style={styles.detailDividerRow}>
        <Text style={[styles.detailLabel, { color: c.textMuted }]}>Coverage</Text>
        <Text style={[styles.detailValue, { color: c.text }]}>{coverage}</Text>
      </View>

      <View style={styles.cardBottom}>
        <TouchableOpacity onPress={onDownload} activeOpacity={0.7} style={[styles.downloadLinkWrap, { borderBottomColor: c.primary }]}>
          <Text style={[styles.downloadLinkText, { color: c.primary }]}>Download PDF</Text>
        </TouchableOpacity>
        <Ionicons name="chevron-forward" size={18} color={c.textMuted} />
      </View>
    </TouchableOpacity>
  );
}

export default function InsuranceListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Insurance</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Search + Filter row */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
            <Ionicons name="search" size={20} color={c.textSecondary} style={{ marginRight: 4 }} />
            <TextInput
              style={[styles.searchInput, { color: c.textSecondary }]}
              placeholder="SEARCH POLICIES..."
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
              onPress={() => navigation.navigate('InsuranceAdd')}
            >
              <Text style={[styles.addBtnText, { color: c.textOnPrimary }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Policy cards */}
        <View style={styles.cardsList}>
          <PolicyCard title="Astra Prime Health" policyNo="NX-8829-APP" coverage="Oct 2023 — Oct 2024" onPress={() => navigation.navigate('InsuranceDetail')} c={c} />
          <PolicyCard title="Dental Shield Pro" policyNo="NX-1142-DSP" coverage="Jan 2024 — Jan 2025" onPress={() => navigation.navigate('InsuranceDetail')} c={c} />
        </View>

        {/* Extend Protection card */}
        <View style={[styles.extendCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={[styles.extendIconBox, { backgroundColor: c.divider }]}>
            <Ionicons name="shield-checkmark-outline" size={28} color={c.textSecondary} />
          </View>
          <Text style={[styles.extendTitle, { color: c.text }]}>Extend Protection</Text>
          <Text style={[styles.extendSubtitle, { color: c.textSecondary }]}>
            {'Nexus provides integrated coverage\nfor cybernetic implants and digital\ntwin assets.'}
          </Text>
          <TouchableOpacity style={[styles.exploreTiersBtn, { borderColor: c.cardGlassBorder }]}>
            <Text style={[styles.exploreTiersText, { color: c.text }]}>EXPLORE TIERS</Text>
          </TouchableOpacity>
        </View>
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
  backBtn: { width: 20, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter' },
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 18 },
  searchBar: {
    height: 58,
    borderRadius: 48,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
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
  cardsList: { paddingHorizontal: 25, gap: 18, marginBottom: 18 },
  policyCard: {
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 },
  cardLeft: { flex: 1 },
  activePolicyLabel: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter', lineHeight: 16, marginBottom: 4 },
  policyTitle: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter', lineHeight: 32, letterSpacing: -0.6 },
  verifiedBadge: {
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    gap: 4,
  },
  verifiedText: { fontSize: 9, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: -0.45 },
  detailDividerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 9 },
  rowDivider: { height: 1, marginBottom: 9 },
  detailLabel: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter', lineHeight: 16 },
  detailValue: { fontSize: 14, fontWeight: '800', fontFamily: 'Manrope', textTransform: 'capitalize' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  downloadLinkWrap: { borderBottomWidth: 1, paddingBottom: 1 },
  downloadLinkText: { fontSize: 14, fontWeight: '800', fontFamily: 'Manrope', textTransform: 'capitalize' },
  extendCard: {
    marginHorizontal: 25,
    borderRadius: 33,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 12,
    overflow: 'hidden',
  },
  extendIconBox: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  extendTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', textAlign: 'center' },
  extendSubtitle: { fontSize: 14, fontWeight: '400', fontFamily: 'Inter', textAlign: 'center', lineHeight: 20 },
  exploreTiersBtn: { marginTop: 8, borderRadius: 33, borderWidth: 1, paddingHorizontal: 24, paddingVertical: 12 },
  exploreTiersText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', textTransform: 'uppercase', letterSpacing: 1 },
});
