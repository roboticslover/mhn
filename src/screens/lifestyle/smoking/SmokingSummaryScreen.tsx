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

const DAYS = [
  { day: 'Mon', date: 12 },
  { day: 'Tue', date: 13 },
  { day: 'Wed', date: 14 },
  { day: 'Thu', date: 15 },
  { day: 'Fri', date: 16 },
];

const BAR_DATA = [
  { day: 'SUN', height: 30, isHighlight: false },
  { day: 'MON', height: 55, isHighlight: false },
  { day: 'TUE', height: 75, isHighlight: false },
  { day: 'WED', height: 55, isHighlight: false },
  { day: 'THU', height: 72, isHighlight: false },
  { day: 'FRI', height: 48, isHighlight: false },
  { day: 'SAT', height: 90, isHighlight: true },
];

const HEATMAP_DATA = [
  [0.1, 0.4, 0.2, 0.8, 0.1, 0.6, 0.4],
  [0.2, 0.1, 0.6, 0.3, 0.9, 0.2, 0.5],
  [0.8, 0.4, 0.3, 0.6, 0.2, 0.7, 0.1],
  [0.3, 0.5, 0.7, 0.1, 0.4, 0.8, 0.6],
];

export default function SmokingSummaryScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedDay, setSelectedDay] = React.useState(2);

  const glassCardBg = isDark ? 'rgba(23,23,23,0.4)' : 'rgba(240,240,240,0.8)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const primaryGreen = c.primary;
  const errorRed = '#DB5034';
  const mutedText = isDark ? '#aaa' : '#888';

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <ScreenHeader title="Smoking" onBack={() => navigation.goBack()} />
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: primaryGreen }]}>
            <Ionicons name="add-circle" size={16} color="#141414" />
            <Text style={[styles.addBtnText, { fontFamily: 'Inter' }]}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Date Selector */}
        <View style={styles.dateRow}>
          {DAYS.map((d, i) => {
            const isActive = i === selectedDay;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedDay(i)}
                style={styles.dateCol}
              >
                <Text style={[styles.dateDayText, {
                  color: isActive ? c.text : mutedText,
                  fontFamily: 'Inter',
                  fontWeight: isActive ? '600' : '400',
                }]}>
                  {d.day.toUpperCase()}
                </Text>
                <View style={[styles.dateCircle, isActive && { backgroundColor: primaryGreen }]}>
                  <Text style={[styles.dateDateText, {
                    color: isActive ? '#141414' : (isDark ? '#e5e5e5' : '#333'),
                    fontFamily: 'Inter',
                    fontWeight: isActive ? '700' : '400',
                  }]}>
                    {d.date}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Last Intake */}
        <View style={[styles.lastIntakeCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={styles.lastIntakeLeft}>
            <View style={[styles.clockIcon, { backgroundColor: 'rgba(48,209,88,0.2)' }]}>
              <Ionicons name="time" size={18} color={primaryGreen} />
            </View>
            <View>
              <Text style={[styles.lastIntakeLabel, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>LAST INTAKE</Text>
              <Text style={[styles.lastIntakeValue, { color: c.text, fontFamily: 'Inter' }]}>Saturday, 11:20 PM</Text>
            </View>
          </View>
          <View style={[styles.clockIconSmall, { backgroundColor: 'rgba(48,209,88,0.2)' }]}>
            <Ionicons name="time" size={18} color={primaryGreen} />
          </View>
        </View>

        {/* Monthly Trend */}
        <View style={[styles.trendCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <Text style={[styles.trendLabel, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>MONTHLY TREND</Text>
          <View style={styles.trendRow}>
            <Text style={[styles.trendValue, { color: primaryGreen, fontFamily: 'Inter' }]}>-15%</Text>
            <Text style={[styles.trendSub, { color: mutedText, fontFamily: 'Inter' }]}> vs Last Month</Text>
            <View style={styles.trendBars}>
              {[30, 50, 70, 40, 60].map((h, i) => (
                <View key={i} style={[styles.trendBar, { height: h * 0.5, backgroundColor: isDark ? '#555' : '#bbb' }]} />
              ))}
            </View>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={[styles.chartCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={[styles.weeklyToggle, { borderColor: primaryGreen }]}>
            <Text style={[styles.weeklyText, { color: c.text, fontFamily: 'Inter' }]}>Weekly</Text>
            <Ionicons name="chevron-down" size={12} color={c.textSecondary} />
          </View>

          {/* Level labels */}
          <View style={styles.chartArea}>
            <View style={styles.levelLabels}>
              <Text style={[styles.levelLabel, { color: mutedText, fontFamily: 'Inter' }]}>EXCESSIVE</Text>
              <Text style={[styles.levelLabel, { color: mutedText, fontFamily: 'Inter' }]}>MODERATE</Text>
              <Text style={[styles.levelLabel, { color: mutedText, fontFamily: 'Inter' }]}>OPTIMAL</Text>
            </View>
            <View style={styles.barsContainer}>
              {/* Dashed line */}
              <View style={[styles.dashedLine, { borderColor: isDark ? 'rgba(219,80,52,0.3)' : 'rgba(219,80,52,0.2)' }]} />
              {BAR_DATA.map((bar, i) => (
                <View key={i} style={styles.barCol}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: bar.height,
                        backgroundColor: bar.isHighlight
                          ? errorRed
                          : (isDark ? 'rgba(219,80,52,0.2)' : 'rgba(219,80,52,0.15)'),
                        borderRadius: 8,
                      },
                    ]}
                  />
                  <Text style={[styles.barLabel, { color: c.text, fontFamily: 'Inter' }]}>{bar.day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Intake History */}
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { color: mutedText, fontFamily: 'Manrope' }]}>Intake History</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: primaryGreen, fontFamily: 'Inter' }]}>View All</Text>
          </TouchableOpacity>
        </View>

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
                  style={[styles.heatmapCell, { backgroundColor: `rgba(48,209,88,${val})` }]}
                />
              ))}
            </View>
          ))}
          <View style={styles.heatmapLegend}>
            <Text style={[styles.heatmapLegendText, { color: mutedText, fontFamily: 'Inter' }]}>Less</Text>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
              <View key={i} style={[styles.heatmapLegendCell, { backgroundColor: `rgba(48,209,88,${v})` }]} />
            ))}
            <Text style={[styles.heatmapLegendText, { color: mutedText, fontFamily: 'Inter' }]}>More</Text>
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  addBtnText: { fontSize: 12, fontWeight: '700', color: '#141414' },

  // Date
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginBottom: 20, marginTop: 8 },
  dateCol: { alignItems: 'center' },
  dateDayText: { fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  dateCircle: { width: 40, height: 40, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  dateDateText: { fontSize: 16 },

  // Last intake
  lastIntakeCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  lastIntakeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  clockIcon: { width: 31, height: 31, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  clockIconSmall: { width: 31, height: 31, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  lastIntakeLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  lastIntakeValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },

  // Trend
  trendCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
  },
  trendLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  trendRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  trendValue: { fontSize: 24, fontWeight: '700' },
  trendSub: { fontSize: 14, fontWeight: '500' },
  trendBars: { flexDirection: 'row', gap: 4, marginLeft: 'auto', alignItems: 'flex-end' },
  trendBar: { width: 8, borderRadius: 4 },

  // Chart
  chartCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
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
  chartArea: { flexDirection: 'row' },
  levelLabels: { justifyContent: 'space-between', marginRight: 8, paddingBottom: 24 },
  levelLabel: { fontSize: 8, fontWeight: '500', letterSpacing: 0.5 },
  barsContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120, position: 'relative' },
  dashedLine: { position: 'absolute', top: 0, left: 0, right: 0, borderTopWidth: 1, borderStyle: 'dashed' },
  barCol: { alignItems: 'center', gap: 8 },
  bar: { width: 24 },
  barLabel: { fontSize: 8, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },

  // History
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  historyTitle: { fontSize: 16, fontWeight: '800', textTransform: 'capitalize' },
  viewAll: { fontSize: 12, fontWeight: '400' },

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
