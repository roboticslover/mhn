import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import ScreenHeader from '../../../components/ScreenHeader';

const BAR_DATA = [
  { day: 'SUN', height: 40, isHighlight: false },
  { day: 'MON', height: 72, isHighlight: false },
  { day: 'TUE', height: 98, isHighlight: false },
  { day: 'WED', height: 72, isHighlight: false },
  { day: 'THU', height: 96, isHighlight: false },
  { day: 'FRI', height: 63, isHighlight: false },
  { day: 'SAT', height: 105, isHighlight: true },
];

const HEATMAP_DATA = [
  [0.1, 0.4, 0.2, 0.8, 0.1, 0.6, 0.4],
  [0.2, 0.1, 0.6, 0.3, 0.9, 0.2, 0.5],
  [0.8, 0.4, 0.3, 0.6, 0.2, 0.7, 0.1],
  [0.3, 0.5, 0.7, 0.1, 0.4, 0.8, 0.6],
];

export default function AlcoholSummaryScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const glassCardBg = isDark ? 'rgba(23,23,23,0.4)' : 'rgba(240,240,240,0.8)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const primaryGreen = c.primary;
  const errorRed = '#DB5034';

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <ScreenHeader title="Alcohol" onBack={() => navigation.goBack()} />
          <TouchableOpacity style={[styles.editBtn, { backgroundColor: primaryGreen }]}>
            <Ionicons name="create" size={16} color="#141414" />
            <Text style={[styles.editBtnText, { fontFamily: 'Inter' }]}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Last Intake */}
        <View style={[styles.lastIntakeCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={styles.lastIntakeLeft}>
            <View style={[styles.clockIcon, { backgroundColor: isDark ? 'rgba(48,209,88,0.2)' : 'rgba(57,166,87,0.15)' }]}>
              <Ionicons name="time" size={18} color={primaryGreen} />
            </View>
            <View>
              <Text style={[styles.lastIntakeLabel, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>LAST INTAKE</Text>
              <Text style={[styles.lastIntakeValue, { color: c.text, fontFamily: 'Inter' }]}>Saturday, 10:45 PM</Text>
            </View>
          </View>
          <View style={[styles.agoChip, { backgroundColor: isDark ? '#2a2a2a' : '#e5e5e5' }]}>
            <Text style={[styles.agoText, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>14h ago</Text>
          </View>
        </View>

        {/* Status Header */}
        <View style={styles.statusRow}>
          <View>
            <Text style={[styles.statusTitle, { color: errorRed, fontFamily: 'Inter' }]}>High intake</Text>
            <Text style={[styles.statusSub, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>Average alcohol consumption</Text>
          </View>
          <View style={styles.trendCol}>
            <View style={styles.trendRow}>
              <Ionicons name="trending-up" size={14} color={errorRed} />
              <Text style={[styles.trendValue, { color: errorRed, fontFamily: 'Inter' }]}>12.5%</Text>
            </View>
            <Text style={[styles.trendLabel, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>VS LAST MONTH</Text>
          </View>
        </View>

        {/* Bar Chart Card */}
        <View style={[styles.chartCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={[styles.weeklyToggle, { borderColor: primaryGreen }]}>
            <Text style={[styles.weeklyText, { color: c.text, fontFamily: 'Inter' }]}>Weekly</Text>
            <Ionicons name="chevron-down" size={12} color={c.textSecondary} />
          </View>

          <View style={styles.barsContainer}>
            {BAR_DATA.map((bar, i) => (
              <View key={i} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: bar.height,
                      backgroundColor: bar.isHighlight ? errorRed : (isDark ? '#808080' : '#bbb'),
                      borderRadius: 8,
                    },
                  ]}
                />
                <Text style={[styles.barLabel, { color: c.text, fontFamily: 'Inter' }]}>{bar.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGridRow}>
          <View style={[styles.gridStatCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
            <View style={styles.gridStatHeader}>
              <Ionicons name="wine" size={14} color={primaryGreen} />
              <Text style={[styles.gridStatLabel, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>AVG DRINKS</Text>
            </View>
            <View style={styles.gridStatBottom}>
              <Text style={[styles.gridStatValue, { color: c.text, fontFamily: 'Inter' }]}>4.2</Text>
              <Text style={[styles.gridStatUnit, { color: '#aaa', fontFamily: 'Inter' }]}>avg</Text>
            </View>
          </View>
        </View>

        {/* Intake History */}
        <Text style={[styles.historyTitle, { color: '#aaa', fontFamily: 'Manrope' }]}>Intake History</Text>

        {/* Heatmap */}
        <View style={[styles.heatmapCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={styles.heatmapDayRow}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <Text key={i} style={[styles.heatmapDayLabel, { color: '#8e8e93', fontFamily: 'Inter' }]}>{d}</Text>
            ))}
          </View>
          {HEATMAP_DATA.map((row, ri) => (
            <View key={ri} style={styles.heatmapRow}>
              {row.map((val, ci) => (
                <View
                  key={ci}
                  style={[
                    styles.heatmapCell,
                    { backgroundColor: `rgba(48,209,88,${val})` },
                  ]}
                />
              ))}
            </View>
          ))}
          <View style={styles.heatmapLegend}>
            <Text style={[styles.heatmapLegendText, { color: '#aaa', fontFamily: 'Inter' }]}>Less</Text>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
              <View key={i} style={[styles.heatmapLegendCell, { backgroundColor: `rgba(48,209,88,${v})` }]} />
            ))}
            <Text style={[styles.heatmapLegendText, { color: '#aaa', fontFamily: 'Inter' }]}>More</Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: primaryGreen }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.continueBtnText, { fontFamily: 'Inter' }]}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#141414" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 24 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  editBtnText: { fontSize: 12, fontWeight: '700', color: '#141414' },

  // Last intake
  lastIntakeCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 8,
  },
  lastIntakeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  clockIcon: { width: 31, height: 31, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  lastIntakeLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  lastIntakeValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  agoChip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  agoText: { fontSize: 10, fontWeight: '700' },

  // Status
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statusTitle: { fontSize: 30, fontWeight: '800', letterSpacing: -0.75 },
  statusSub: { fontSize: 16, fontWeight: '500', marginTop: 4 },
  trendCol: { alignItems: 'flex-end' },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendValue: { fontSize: 14, fontWeight: '700' },
  trendLabel: { fontSize: 10, fontWeight: '700', letterSpacing: -0.5, textTransform: 'uppercase', marginTop: 2 },

  // Chart
  chartCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    marginBottom: 16,
  },
  weeklyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  weeklyText: { fontSize: 12, fontWeight: '700' },
  barsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  barCol: { alignItems: 'center', gap: 8 },
  bar: { width: 27 },
  barLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },

  // Stats
  statsGridRow: { paddingHorizontal: 24, marginBottom: 24 },
  gridStatCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridStatHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  gridStatLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  gridStatBottom: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  gridStatValue: { fontSize: 28, fontWeight: '700' },
  gridStatUnit: { fontSize: 12, fontWeight: '400' },

  // History
  historyTitle: { fontSize: 16, fontWeight: '800', paddingHorizontal: 24, marginBottom: 16, textTransform: 'capitalize' },

  // Heatmap
  heatmapCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    padding: 25,
    marginBottom: 24,
  },
  heatmapDayRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  heatmapDayLabel: { fontSize: 10, fontWeight: '700', width: 37, textAlign: 'center' },
  heatmapRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  heatmapCell: { width: 37, height: 37, borderRadius: 4 },
  heatmapLegend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 },
  heatmapLegendText: { fontSize: 10, fontWeight: '400' },
  heatmapLegendCell: { width: 16, height: 16, borderRadius: 3 },

  // Continue
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 33,
    gap: 12,
  },
  continueBtnText: { fontSize: 18, fontWeight: '700', color: '#141414' },
});
