import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
function SummaryCard({ value, label, color, colors }: { value: string; label: string; color: string; colors: any }) {
  return (
    <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]}>
      <Text style={[styles.summaryValue, { color, fontFamily: 'Inter' }]}>{value}</Text>
      <Text style={[styles.summaryLabel, { color: colors.textSecondary, fontFamily: 'Inter' }]}>{label}</Text>
    </View>
  );
}

function BiomarkerCard({
  name, value, unit, status, statusColor, statusBg, onPress, colors,
}: {
  name: string; value: string; unit: string; status: string; statusColor: string; statusBg: string; onPress?: () => void; colors: any;
}) {
  return (
    <TouchableOpacity style={[styles.biomarkerCard, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.biomarkerTop}>
        <Text style={[styles.biomarkerName, { color: colors.text, fontFamily: 'Inter' }]}>{name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
          <Text style={[styles.statusText, { color: statusColor, fontFamily: 'Inter' }]}>{status}</Text>
        </View>
      </View>
      <View style={styles.biomarkerBottom}>
        <Text style={[styles.biomarkerValue, { color: statusColor, fontFamily: 'Inter' }]}>{value}</Text>
        <Text style={[styles.biomarkerUnit, { color: statusColor, fontFamily: 'Inter' }]}>{unit}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function AnalyticsListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Analytics and Insights</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search + Filters */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
            <Ionicons name="search" size={20} color={c.primary} />
            <Text style={[styles.searchPlaceholder, { color: c.inputPlaceholder, fontFamily: 'Inter' }]}>SEARCH 128 PARAMETERS...</Text>
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterBtn, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
              <Ionicons name="options-outline" size={12} color={c.text} />
              <Text style={[styles.filterBtnText, { color: c.text, fontFamily: 'Inter' }]}>FILTERS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.exportBtn, { backgroundColor: c.primary }]}>
              <Ionicons name="download-outline" size={12} color={c.textOnPrimary} />
              <Text style={[styles.exportBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>EXPORT</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryScroll}
        >
          <SummaryCard value="24" label="Total Biomarkers" color={c.text} colors={c} />
          <SummaryCard value="18" label="Stable" color={c.primary} colors={c} />
          <SummaryCard value="6" label="Risk" color={c.warning} colors={c} />
        </ScrollView>

        {/* Biomarker Cards */}
        <View style={styles.biomarkersList}>
          <BiomarkerCard name="BLOOD GLUCOSE" value="88" unit="mg/dL" status="STABLE" statusColor={c.primary} statusBg={c.accentSoft} onPress={() => navigation.navigate('AnalyticsDetail')} colors={c} />
          <BiomarkerCard name="CHOLESTROL" value="100" unit="mg/dL" status="RISK" statusColor={c.warning} statusBg={c.warning + '44'} onPress={() => navigation.navigate('AnalyticsDetail')} colors={c} />
          <BiomarkerCard name="BLOOD GLUCOSE" value="88" unit="mg/dL" status="STABLE" statusColor={c.primary} statusBg={c.accentSoft} onPress={() => navigation.navigate('AnalyticsDetail')} colors={c} />
          <BiomarkerCard name="CHOLESTROL" value="100" unit="mg/dL" status="RISK" statusColor={c.warning} statusBg={c.warning + '44'} onPress={() => navigation.navigate('AnalyticsDetail')} colors={c} />
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
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  searchSection: { paddingHorizontal: 20, gap: 16, marginBottom: 16 },
  searchBar: { height: 58, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, gap: 12 },
  searchPlaceholder: { fontSize: 16, fontWeight: '500' },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterBtn: { height: 48, borderRadius: 40, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, gap: 8 },
  filterBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  exportBtn: { height: 48, borderRadius: 108, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32, gap: 8 },
  exportBtnText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  summaryScroll: { paddingHorizontal: 20, gap: 18, paddingVertical: 21, marginBottom: 8 },
  summaryCard: { width: 100, height: 100, borderRadius: 33, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  summaryLabel: { fontSize: 8, letterSpacing: -0.5 },
  biomarkersList: { paddingHorizontal: 20, gap: 12 },
  biomarkerCard: { borderRadius: 33, borderWidth: 1, padding: 25, height: 108, justifyContent: 'space-between' },
  biomarkerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  biomarkerName: { fontSize: 16, fontWeight: '500' },
  statusBadge: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  statusText: { fontSize: 10, fontWeight: '800', letterSpacing: -0.5 },
  biomarkerBottom: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  biomarkerValue: { fontSize: 34, fontWeight: '300', letterSpacing: -0.68 },
  biomarkerUnit: { fontSize: 14, fontWeight: '400' },
});
