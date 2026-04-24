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

type StatusType = 'NORMAL' | 'WARNING' | 'CRITICAL';

interface ReportCardProps {
  category: string;
  name: string;
  date: string;
  status: StatusType;
  onPress: () => void;
  c: any;
  isDark: boolean;
}

function ReportCard({ category, name, date, status, onPress, c, isDark }: ReportCardProps) {
  const statusColors: Record<StatusType, { bg: string; text: string }> = {
    NORMAL: { bg: isDark ? 'rgba(52,199,89,0.26)' : 'rgba(57,166,87,0.15)', text: c.primary },
    WARNING: { bg: isDark ? 'rgba(255,149,0,0.28)' : 'rgba(255,146,0,0.15)', text: c.warning },
    CRITICAL: { bg: isDark ? 'rgba(219,80,52,0.28)' : 'rgba(219,80,52,0.15)', text: c.error },
  };
  const { bg, text: statusText } = statusColors[status];

  return (
    <TouchableOpacity
      style={[
        styles.reportCard,
        {
          backgroundColor: c.card,
          borderColor: status === 'NORMAL'
            ? c.cardGlassBorder
            : status === 'WARNING'
              ? isDark ? 'rgba(201,243,0,0.1)' : 'rgba(255,146,0,0.2)'
              : isDark ? 'rgba(219,80,52,0.2)' : 'rgba(219,80,52,0.2)',
        },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {/* Top row: category label + date + status badge */}
      <View style={styles.cardTopRow}>
        <Text style={[styles.cardCategory, { color: c.textSecondary }]}>{category}</Text>
        <View style={styles.cardTopRight}>
          <View style={[styles.dateBadge, { backgroundColor: isDark ? 'rgba(242,242,242,0.06)' : c.divider }]}>
            <Text style={[styles.dateBadgeText, { color: isDark ? '#C5C6C2' : c.textSecondary }]}>{date}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: bg }]}>
            <Text style={[styles.statusBadgeText, { color: statusText }]}>{status}</Text>
          </View>
        </View>
      </View>

      {/* Report name */}
      <Text style={[styles.reportName, { color: c.text }]}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function AllHealthReportsScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');

  const reports = [
    { id: '1', category: 'MEDICAL REPORTS', name: 'Blood Report', date: '09-10-2026', status: 'NORMAL' as StatusType },
    { id: '2', category: 'SCANS', name: 'MRI Scan', date: '09-10-2026', status: 'WARNING' as StatusType },
  ];

  const filtered = reports.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

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
          <Text style={[styles.headerTitle, { color: c.text }]}>Health Reports</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Search + Filters */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
            <Ionicons name="search" size={21} color={c.primary} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: c.textSecondary }]}
              placeholder="SEARCH HEALTH REPORTS"
              placeholderTextColor={isDark ? 'rgba(170,170,170,0.5)' : c.inputPlaceholder}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity
              style={[styles.filterBtn, { backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : c.card, borderColor: isDark ? 'rgba(143,147,120,0.15)' : c.cardBorder }]}
              activeOpacity={0.7}
            >
              <Ionicons name="options-outline" size={10} color={c.textSubheading} />
              <Text style={[styles.filterBtnText, { color: c.textSubheading }]}>FILTERS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: c.primary }]}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('HealthReportUpload')}
            >
              <Text style={[styles.addBtnText, { color: c.textOnPrimary }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Report List */}
        {filtered.map(report => (
          <ReportCard
            key={report.id}
            category={report.category}
            name={report.name}
            date={report.date}
            status={report.status}
            onPress={() => navigation.navigate('HealthReportDetail')}
            c={c}
            isDark={isDark}
          />
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={40} color={c.textTertiary} />
            <Text style={[styles.emptyStateText, { color: c.textSecondary }]}>No reports found</Text>
          </View>
        )}
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
  },
  searchSection: {
    paddingHorizontal: 19,
    gap: 16,
    marginBottom: 16,
  },
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
    fontWeight: '800',
    fontFamily: 'Manrope',
    paddingLeft: 16,
    letterSpacing: 1.4,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterBtn: {
    height: 48,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    gap: 8,
  },
  filterBtnText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
  },
  addBtn: {
    height: 48,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
  },
  reportCard: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 19,
    marginBottom: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardCategory: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  cardTopRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateBadge: {
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  dateBadgeText: {
    fontSize: 8,
    fontWeight: '700',
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  reportName: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter',
  },
});
