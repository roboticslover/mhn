import React from 'react';
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
type PolicyCardProps = {
  statusLabel: string;
  title: string;
  policyNo: string;
  coverage: string;
  onPress?: () => void;
  onDownload?: () => void;
};

function PolicyCard({ statusLabel, title, policyNo, coverage, onPress, onDownload }: PolicyCardProps) {
  return (
    <TouchableOpacity style={styles.policyCard} activeOpacity={0.8} onPress={onPress}>
      {/* Top row */}
      <View style={styles.cardTopRow}>
        <View style={styles.cardLeft}>
          <Text style={styles.activePolicyLabel}>Active Policy</Text>
          <Text style={styles.policyTitle}>{title}</Text>
        </View>
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={9} color="#6FFB85" />
          <Text style={styles.verifiedText}>VERIFIED</Text>
        </View>
      </View>

      {/* Divider row */}
      <View style={styles.detailDividerRow}>
        <Text style={styles.detailLabel}>Policy No.</Text>
        <Text style={styles.detailValue}>{policyNo}</Text>
      </View>
      <View style={[styles.rowDivider]} />
      <View style={styles.detailDividerRow}>
        <Text style={styles.detailLabel}>Coverage</Text>
        <Text style={styles.detailValue}>{coverage}</Text>
      </View>

      {/* Bottom action */}
      <View style={styles.cardBottom}>
        <TouchableOpacity onPress={onDownload} activeOpacity={0.7} style={styles.downloadLinkWrap}>
          <Text style={styles.downloadLinkText}>Download PDF</Text>
        </TouchableOpacity>
        <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
      </View>
    </TouchableOpacity>
  );
}

export default function InsuranceListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Insurance</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Search + Filter row */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="rgba(170,170,170,0.5)" style={{ marginRight: 4 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="SEARCH 128 PARAMETERS..."
              placeholderTextColor="rgba(170,170,170,0.5)"
            />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterBtn}>
              <Ionicons name="options-outline" size={10} color="#E2E2E2" />
              <Text style={styles.filterBtnText}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('InsuranceAdd')}
            >
              <Text style={styles.addBtnText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Policy cards */}
        <View style={styles.cardsList}>
          <PolicyCard
            statusLabel="ACTIVE"
            title="Astra Prime Health"
            policyNo="NX-8829-APP"
            coverage="Oct 2023 — Oct 2024"
            onPress={() => navigation.navigate('InsuranceDetail')}
          />
          <PolicyCard
            statusLabel="ACTIVE"
            title="Dental Shield Pro"
            policyNo="NX-1142-DSP"
            coverage="Jan 2024 — Jan 2025"
            onPress={() => navigation.navigate('InsuranceDetail')}
          />
        </View>

        {/* Extend Protection card */}
        <View style={styles.extendCard}>
          <View style={styles.extendIconBox}>
            <Ionicons name="shield-checkmark-outline" size={28} color="rgba(255,255,255,0.6)" />
          </View>
          <Text style={styles.extendTitle}>Extend Protection</Text>
          <Text style={styles.extendSubtitle}>
            {'Nexus provides integrated coverage\nfor cybernetic implants and digital\ntwin assets.'}
          </Text>
          <TouchableOpacity style={styles.exploreTiersBtn}>
            <Text style={styles.exploreTiersText}>EXPLORE TIERS</Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
  },
  searchSection: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 18,
  },
  searchBar: {
    height: 58,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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
    color: 'rgba(170,170,170,0.5)',
    letterSpacing: 1.4,
  },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: {
    height: 48,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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
    backgroundColor: '#34C759',
    borderRadius: 33,
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
  cardsList: {
    paddingHorizontal: 25,
    gap: 18,
    marginBottom: 18,
  },
  policyCard: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    overflow: 'hidden',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 28,
  },
  cardLeft: { flex: 1 },
  activePolicyLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#6FFB85',
    lineHeight: 16,
    marginBottom: 4,
  },
  policyTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    lineHeight: 32,
    letterSpacing: -0.6,
  },
  verifiedBadge: {
    backgroundColor: 'rgba(52,199,89,0.1)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(52,199,89,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    gap: 4,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: -0.45,
  },
  detailDividerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 9,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 9,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.4)',
    lineHeight: 16,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    textTransform: 'capitalize',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  downloadLinkWrap: {
    borderBottomWidth: 1,
    borderBottomColor: '#6FFB85',
    paddingBottom: 1,
  },
  downloadLinkText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    textTransform: 'capitalize',
  },
  extendCard: {
    marginHorizontal: 25,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 12,
    overflow: 'hidden',
  },
  extendIconBox: {
    width: 72,
    height: 72,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  extendTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    textAlign: 'center',
  },
  extendSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 20,
  },
  exploreTiersBtn: {
    marginTop: 8,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  exploreTiersText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
