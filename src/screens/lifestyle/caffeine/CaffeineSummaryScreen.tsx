import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import ScreenHeader from '../../../components/ScreenHeader';
import Svg, { Circle } from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

const DRINK_TYPES = [
  { key: 'coffee', label: 'Coffee', icon: 'cafe' },
  { key: 'tea', label: 'Tea', icon: 'cafe-outline' },
  { key: 'herbal', label: 'Herbal', icon: 'leaf' },
];

const HEATMAP_DATA = [
  [0.1, 0.4, 0.2, 0.8, 0.1, 0.6, 0.4],
  [0.2, 0.1, 0.6, 0.3, 0.9, 0.2, 0.5],
  [0.8, 0.4, 0.3, 0.6, 0.2, 0.7, 0.1],
  [0.3, 0.5, 0.7, 0.1, 0.4, 0.8, 0.6],
];

function ActivityRing({ size, strokeWidth, progress, color, trackColor }: {
  size: number; strokeWidth: number; progress: number; color: string; trackColor: string;
}) {
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
      <Circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={strokeWidth} fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
}

export default function CaffeineSummaryScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedDrink, setSelectedDrink] = useState('herbal');

  const glassCardBg = isDark ? 'rgba(23,23,23,0.4)' : 'rgba(240,240,240,0.8)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const primaryGreen = c.primary;

  const coffeeColor = '#F59E0B';
  const teaColor = '#D97706';
  const herbalColor = '#6FFB85';

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <ScreenHeader title="Caffeine" onBack={() => navigation.goBack()} />
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: primaryGreen }]}>
            <Ionicons name="add-circle" size={18} color="#141414" />
            <Text style={[styles.addBtnText, { fontFamily: 'Inter' }]}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Summary */}
        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: '#aaa', fontFamily: 'Manrope' }]}>Daily Summary</Text>
          <Text style={[styles.summaryValue, { color: c.text, fontFamily: 'Inter' }]}>3 cups</Text>
          <Text style={[styles.summarySub, { color: '#aaa', fontFamily: 'Inter' }]}>Average caffeine consumption per day</Text>
        </View>

        {/* Activity Rings Card */}
        <View style={[styles.ringsCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          {/* Daily/Weekly toggle */}
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }} />
            <View style={[styles.togglePill, { borderColor: primaryGreen }]}>
              <Text style={[styles.toggleText, { color: c.text, fontFamily: 'Inter' }]}>Daily</Text>
              <Ionicons name="chevron-down" size={12} color={c.textSecondary} />
            </View>
          </View>

          {/* Nested Rings */}
          <View style={styles.ringsCenter}>
            <View style={styles.ringAbsolute}>
              <ActivityRing size={200} strokeWidth={18} progress={0.75} color={coffeeColor} trackColor={isDark ? '#222' : '#e5e5e5'} />
            </View>
            <View style={[styles.ringAbsolute, { top: 25, left: 25 }]}>
              <ActivityRing size={150} strokeWidth={18} progress={0.6} color={teaColor} trackColor={isDark ? '#222' : '#e5e5e5'} />
            </View>
            <View style={[styles.ringAbsolute, { top: 50, left: 50 }]}>
              <ActivityRing size={100} strokeWidth={18} progress={0.45} color={herbalColor} trackColor={isDark ? '#222' : '#e5e5e5'} />
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: coffeeColor }]} />
              <Text style={[styles.legendLabel, { color: '#aaa', fontFamily: 'Inter' }]}>COFFEE</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: teaColor }]} />
              <Text style={[styles.legendLabel, { color: '#aaa', fontFamily: 'Inter' }]}>TEA</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: herbalColor }]} />
              <Text style={[styles.legendLabel, { color: '#aaa', fontFamily: 'Inter' }]}>HERBAL</Text>
            </View>
          </View>

          {/* Counts */}
          <View style={styles.countsRow}>
            <View style={styles.countItem}>
              <Text style={[styles.countValue, { color: c.text, fontFamily: 'Inter' }]}>4</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={[styles.countValue, { color: c.text, fontFamily: 'Inter' }]}>10</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={[styles.countValue, { color: c.text, fontFamily: 'Inter' }]}>3</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statDot, { backgroundColor: primaryGreen }]} />
              <Text style={[styles.statLabel, { color: primaryGreen, fontFamily: 'Inter' }]}>LAST INTAKE</Text>
            </View>
            <Text style={[styles.statValue, { color: c.text, fontFamily: 'Inter' }]}>1:45</Text>
            <Text style={[styles.statSub, { color: '#aaa', fontFamily: 'Inter' }]}>Hours ago</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
            <View style={styles.statHeader}>
              <Ionicons name="trending-up" size={14} color={primaryGreen} />
              <Text style={[styles.statLabel, { color: primaryGreen, fontFamily: 'Inter' }]}>INTAKE</Text>
            </View>
            <Text style={[styles.statValue, { color: c.text, fontFamily: 'Inter' }]}>+12%</Text>
            <Text style={[styles.statSub, { color: '#aaa', fontFamily: 'Inter' }]}>vs last week</Text>
          </View>
        </View>

        {/* Daily Insight */}
        <View style={[styles.insightCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={[styles.insightIcon, { backgroundColor: 'rgba(48,209,88,0.2)' }]}>
            <Ionicons name="bulb" size={20} color={primaryGreen} />
          </View>
          <View style={styles.insightText}>
            <Text style={[styles.insightTitle, { color: primaryGreen, fontFamily: 'Inter' }]}>Daily Insight</Text>
            <Text style={[styles.insightBody, { color: c.text, fontFamily: 'Inter' }]}>
              You should keep up the pace and be consistent.
            </Text>
          </View>
        </View>

        {/* Intake History */}
        <Text style={[styles.historyTitle, { color: '#aaa', fontFamily: 'Manrope' }]}>Intake History</Text>

        {/* Drink type filter */}
        <View style={styles.drinkFilterRow}>
          {DRINK_TYPES.map((dt) => {
            const isSelected = selectedDrink === dt.key;
            return (
              <TouchableOpacity
                key={dt.key}
                onPress={() => setSelectedDrink(dt.key)}
                style={[
                  styles.drinkFilterCard,
                  {
                    backgroundColor: glassCardBg,
                    borderColor: isSelected ? primaryGreen : glassBorder,
                    borderWidth: 1,
                  },
                ]}
              >
                <Ionicons name={dt.icon as any} size={20} color={isSelected ? primaryGreen : '#a1a1aa'} />
                <Text style={[styles.drinkFilterLabel, { color: isSelected ? c.text : '#a1a1aa', fontFamily: 'Inter' }]}>
                  {dt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Heatmap */}
        <View style={[styles.heatmapCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          {/* Day headers */}
          <View style={styles.heatmapDayRow}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <Text key={i} style={[styles.heatmapDayLabel, { color: '#8e8e93', fontFamily: 'Inter' }]}>{d}</Text>
            ))}
          </View>
          {/* Grid */}
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
          {/* Legend */}
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  addBtnText: { fontSize: 12, fontWeight: '700', color: '#141414' },

  // Summary
  summarySection: { paddingHorizontal: 24, marginBottom: 20 },
  summaryLabel: { fontSize: 16, fontWeight: '800', textTransform: 'capitalize' },
  summaryValue: { fontSize: 30, fontWeight: '700', letterSpacing: -0.75, marginTop: 5 },
  summarySub: { fontSize: 16, fontWeight: '500' },

  // Rings
  ringsCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 25,
    marginBottom: 16,
  },
  toggleRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10 },
  togglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  toggleText: { fontSize: 10, fontWeight: '700' },
  ringsCenter: { width: 200, height: 200, alignSelf: 'center', marginVertical: 10 },
  ringAbsolute: { position: 'absolute', top: 0, left: 0 },

  legendRow: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 32 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },

  countsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 8 },
  countItem: { alignItems: 'center' },
  countValue: { fontSize: 18, fontWeight: '700' },

  // Stats
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 16 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  statDot: { width: 8, height: 8, borderRadius: 4 },
  statLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  statValue: { fontSize: 24, fontWeight: '600' },
  statSub: { fontSize: 12, fontWeight: '400', marginTop: 2 },

  // Insight
  insightCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    padding: 21,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  insightIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightText: { flex: 1, gap: 2 },
  insightTitle: { fontSize: 14, fontWeight: '700', letterSpacing: 0.35 },
  insightBody: { fontSize: 15, fontWeight: '400', lineHeight: 19 },

  // History
  historyTitle: { fontSize: 16, fontWeight: '800', paddingHorizontal: 24, marginBottom: 16, textTransform: 'capitalize' },

  drinkFilterRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 16 },
  drinkFilterCard: {
    flex: 1,
    paddingVertical: 17,
    borderRadius: 33,
    alignItems: 'center',
    gap: 8,
  },
  drinkFilterLabel: { fontSize: 12, fontWeight: '500' },

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
