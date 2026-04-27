import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import ScreenHeader from '../../../components/ScreenHeader';
import Svg, { Circle, Path } from 'react-native-svg';

const DAYS = [
  { day: 'Mon', date: 12 },
  { day: 'Tue', date: 13 },
  { day: 'Wed', date: 14 },
  { day: 'Thu', date: 15 },
  { day: 'Fri', date: 16 },
];

const QUICK_AMOUNTS = [
  { label: '150ml', value: 150 },
  { label: '250ml', value: 250 },
  { label: '500ml', value: 500 },
];

const HEATMAP_DATA = [
  [0.1, 0.4, 0.2, 0.8, 0.1, 0.6, 0.4],
  [0.2, 0.1, 0.6, 0.3, 0.9, 0.2, 0.5],
  [0.8, 0.4, 0.3, 0.6, 0.2, 0.7, 0.1],
  [0.3, 0.5, 0.7, 0.1, 0.4, 0.8, 0.6],
];

function ProgressRing({ size, strokeWidth, progress, color, trackColor }: {
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

function WaveBackground({ progress, color }: { progress: number; color: string }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
  });

  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end', overflow: 'hidden', borderRadius: 33 }]}>
      <View style={{ height: `${Math.max(10, progress * 100)}%`, overflow: 'hidden' }}>
        <Animated.View style={{ width: 900, height: 400, transform: [{ translateX }] }}>
          <Svg width="900" height="400" viewBox="0 0 900 400">
            <Path
              d="M 0 20 Q 75 0 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 V 400 H 0 Z"
              fill={color}
              opacity={0.15}
            />
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
}

export default function WaterTrackingScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedDay, setSelectedDay] = useState(2);
  const [waterMl, setWaterMl] = useState(1500);
  const [selectedQuick, setSelectedQuick] = useState(1);
  const [dailyLimit, setDailyLimit] = useState(2500);

  const waterGoal = 2000;
  const waterProgress = Math.min(waterMl / waterGoal, 1);

  const glassCardBg = isDark ? 'rgba(23,23,23,0.4)' : 'rgba(240,240,240,0.8)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const primaryGreen = c.primary;
  const waterBlue = '#40A9FF';
  const mutedText = isDark ? '#aaa' : '#888';

  const addWater = (amount: number) => setWaterMl((prev) => prev + amount);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Water" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
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
                <Text style={[styles.dateDayText, { color: isActive ? c.text : mutedText, fontFamily: 'Inter', fontWeight: isActive ? '600' : '400' }]}>
                  {d.day.toUpperCase()}
                </Text>
                <View style={[
                  styles.dateCircle,
                  isActive && { backgroundColor: primaryGreen },
                ]}>
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

        {/* Hero Hydration Card */}
        <View style={[styles.heroCard, { backgroundColor: glassCardBg, borderColor: isDark ? 'rgba(64,169,255,0.4)' : 'rgba(59,130,246,0.3)' }]}>
          <WaveBackground progress={waterProgress} color={waterBlue} />
          <View style={styles.heroContent}>
            <View style={styles.heroRing}>
              <ProgressRing size={140} strokeWidth={12} progress={waterProgress} color={primaryGreen} trackColor={isDark ? '#222' : '#ddd'} />
              <View style={styles.heroRingCenter}>
                <Ionicons name="water" size={28} color={primaryGreen} />
              </View>
            </View>
            <Text style={[styles.heroLabel, { color: mutedText, fontFamily: 'Inter' }]}>Daily Hydration</Text>
            <Text style={[styles.heroValue, { color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.3)', fontFamily: 'Inter' }]}>
              {waterMl.toLocaleString()} / {waterGoal.toLocaleString()} ML
            </Text>
          </View>
        </View>

        {/* Quick Add */}
        <View style={styles.quickAddRow}>
          <TouchableOpacity
            style={[styles.counterBtn, { backgroundColor: isDark ? '#1a1a1a' : '#eee', borderColor: glassBorder }]}
            onPress={() => setWaterMl((prev) => Math.max(0, prev - 250))}
          >
            <Ionicons name="remove" size={20} color={c.textSecondary} />
          </TouchableOpacity>
          <View style={styles.quickCenter}>
            <Text style={[styles.quickValue, { color: c.text, fontFamily: 'Inter' }]}>{waterMl}</Text>
            <Text style={[styles.quickUnit, { color: mutedText, fontFamily: 'Manrope' }]}>Milliliters</Text>
          </View>
          <TouchableOpacity
            style={[styles.counterBtn, { borderColor: primaryGreen, borderWidth: 1, backgroundColor: 'transparent' }]}
            onPress={() => addWater(250)}
          >
            <Ionicons name="add" size={20} color={primaryGreen} />
          </TouchableOpacity>
        </View>

        {/* Amount chips */}
        <View style={styles.chipRow}>
          {QUICK_AMOUNTS.map((qa, i) => {
            const isSelected = selectedQuick === i;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => { setSelectedQuick(i); addWater(qa.value); }}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isSelected ? primaryGreen : glassCardBg,
                    borderColor: isSelected ? primaryGreen : glassBorder,
                    borderWidth: 1,
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: isSelected ? '#141414' : c.text, fontFamily: 'Inter' }]}>
                  {qa.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Daily Progress */}
        <View style={[styles.progressRow, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={[styles.progressIcon, { backgroundColor: 'rgba(48,209,88,0.2)' }]}>
            <Ionicons name="water" size={16} color={primaryGreen} />
          </View>
          <View style={styles.progressText}>
            <Text style={[styles.progressLabel, { color: primaryGreen, fontFamily: 'Inter' }]}>Daily Progress</Text>
            <Text style={[styles.progressValue, { color: mutedText, fontFamily: 'Inter' }]}>
              {waterMl.toLocaleString()}ml / {waterGoal.toLocaleString()}ml total
            </Text>
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
            <Text style={[styles.statSub, { color: mutedText, fontFamily: 'Inter' }]}>Hours ago</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
            <View style={styles.statHeader}>
              <Ionicons name="trending-up" size={14} color={primaryGreen} />
              <Text style={[styles.statLabel, { color: primaryGreen, fontFamily: 'Inter' }]}>ACTIVITY</Text>
            </View>
            <Text style={[styles.statValue, { color: c.text, fontFamily: 'Inter' }]}>+12%</Text>
            <Text style={[styles.statSub, { color: mutedText, fontFamily: 'Inter' }]}>vs last week</Text>
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

        {/* Today's Log */}
        <View style={styles.logSection}>
          <View style={styles.logHeader}>
            <Text style={[styles.logTitle, { color: c.text, fontFamily: 'Manrope' }]}>Today's Log</Text>
            <TouchableOpacity>
              <Text style={[styles.viewAll, { color: primaryGreen, fontFamily: 'Inter' }]}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.logItem, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
            <View style={[styles.logIcon, { backgroundColor: 'rgba(48,209,88,0.15)' }]}>
              <Ionicons name="water" size={18} color={primaryGreen} />
            </View>
            <View style={styles.logItemText}>
              <Text style={[styles.logItemTitle, { color: c.text, fontFamily: 'Inter' }]}>Glass of Water</Text>
              <Text style={[styles.logItemTime, { color: mutedText, fontFamily: 'Inter' }]}>10:24 AM</Text>
            </View>
            <Text style={[styles.logItemAmount, { color: c.text, fontFamily: 'Inter' }]}>250ml</Text>
          </View>

          <View style={[styles.logItem, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
            <View style={[styles.logIcon, { backgroundColor: 'rgba(48,209,88,0.15)' }]}>
              <Ionicons name="water" size={18} color={primaryGreen} />
            </View>
            <View style={styles.logItemText}>
              <Text style={[styles.logItemTitle, { color: c.text, fontFamily: 'Inter' }]}>Large Bottle</Text>
              <Text style={[styles.logItemTime, { color: mutedText, fontFamily: 'Inter' }]}>09:10 AM</Text>
            </View>
            <Text style={[styles.logItemAmount, { color: c.text, fontFamily: 'Inter' }]}>750ml</Text>
          </View>
        </View>

        {/* Avg Daily Intake */}
        <View style={styles.avgSection}>
          <View style={styles.avgRow}>
            <Ionicons name="flash" size={18} color={primaryGreen} />
            <View>
              <Text style={[styles.avgLabel, { color: mutedText, fontFamily: 'Inter' }]}>Avg Daily Intake</Text>
              <Text style={[styles.avgValue, { color: c.text, fontFamily: 'Inter' }]}>2.4 Liters</Text>
            </View>
          </View>
          <View style={[styles.avgRow, { marginTop: 16 }]}>
            <Ionicons name="calendar" size={18} color={c.error} />
            <View>
              <Text style={[styles.avgLabel, { color: mutedText, fontFamily: 'Inter' }]}>Missed Goals</Text>
              <Text style={[styles.avgValue, { color: c.text, fontFamily: 'Inter' }]}>3 Days</Text>
            </View>
          </View>
        </View>

        {/* Set Daily Limit */}
        <Text style={[styles.limitTitle, { color: c.text, fontFamily: 'Manrope' }]}>Set Daily Limit</Text>
        <View style={[styles.limitCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <View style={styles.limitRow}>
            <TouchableOpacity
              style={[styles.limitBtn, { borderColor: '#aaa' }]}
              onPress={() => setDailyLimit((prev) => Math.max(500, prev - 250))}
            >
              <Ionicons name="remove" size={18} color="#aaa" />
            </TouchableOpacity>
            <View style={styles.limitCenter}>
              <Text style={[styles.limitValue, { color: c.text, fontFamily: 'Inter' }]}>{dailyLimit}</Text>
              <Text style={[styles.limitUnit, { color: mutedText, fontFamily: 'Manrope' }]}>Milliliters</Text>
            </View>
            <TouchableOpacity
              style={[styles.limitBtn, { borderColor: '#aaa' }]}
              onPress={() => setDailyLimit((prev) => prev + 250)}
            >
              <Ionicons name="add" size={18} color="#aaa" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Intake History */}
        <View style={styles.historyHeader}>
          <Text style={[styles.historyTitle, { color: '#aaa', fontFamily: 'Manrope' }]}>Intake History</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: primaryGreen, fontFamily: 'Inter' }]}>View All</Text>
          </TouchableOpacity>
        </View>

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
            <Text style={[styles.heatmapLegendText, { color: '#aaa', fontFamily: 'Inter' }]}>Less</Text>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((v, i) => (
              <View key={i} style={[styles.heatmapLegendCell, { backgroundColor: `rgba(48,209,88,${v})` }]} />
            ))}
            <Text style={[styles.heatmapLegendText, { color: '#aaa', fontFamily: 'Inter' }]}>More</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Date selector
  dateRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginBottom: 24, marginTop: 8 },
  dateCol: { alignItems: 'center' },
  dateDayText: { fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  dateCircle: { width: 40, height: 40, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  dateDateText: { fontSize: 16 },

  // Hero
  heroCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroContent: { alignItems: 'center', zIndex: 1 },
  heroRing: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  heroRingCenter: { position: 'absolute' },
  heroLabel: { fontSize: 14, fontWeight: '500', marginTop: 16 },
  heroValue: { fontSize: 12, fontWeight: '600', marginTop: 4 },

  // Quick add
  quickAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 24,
    marginBottom: 16,
  },
  counterBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  quickCenter: { alignItems: 'center' },
  quickValue: { fontSize: 36, fontWeight: '700' },
  quickUnit: { fontSize: 12, fontWeight: '700', letterSpacing: 1, color: '#aaa' },

  chipRow: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 20, paddingHorizontal: 24 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 },
  chipText: { fontSize: 12, fontWeight: '700' },

  // Progress
  progressRow: {
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  progressIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  progressText: { flex: 1 },
  progressLabel: { fontSize: 12, fontWeight: '700' },
  progressValue: { fontSize: 12, fontWeight: '400', marginTop: 2 },

  // Stats
  statsRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 16 },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  statDot: { width: 8, height: 8, borderRadius: 4 },
  statLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  statValue: { fontSize: 24, fontWeight: '600' },
  statSub: { fontSize: 12, fontWeight: '400', marginTop: 2 },

  // Insight
  insightCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    padding: 21,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  insightIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  insightText: { flex: 1, gap: 2 },
  insightTitle: { fontSize: 14, fontWeight: '700', letterSpacing: 0.35 },
  insightBody: { fontSize: 15, fontWeight: '400', lineHeight: 19 },

  // Log
  logSection: { paddingHorizontal: 24, marginBottom: 24 },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  logTitle: { fontSize: 18, fontWeight: '800' },
  viewAll: { fontSize: 12, fontWeight: '400' },
  logItem: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  logIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  logItemText: { flex: 1 },
  logItemTitle: { fontSize: 14, fontWeight: '600' },
  logItemTime: { fontSize: 11, fontWeight: '400', marginTop: 2 },
  logItemAmount: { fontSize: 16, fontWeight: '700' },

  // Avg
  avgSection: { paddingHorizontal: 24, marginBottom: 24 },
  avgRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avgLabel: { fontSize: 12, fontWeight: '400' },
  avgValue: { fontSize: 22, fontWeight: '700' },

  // Limit
  limitTitle: { fontSize: 16, fontWeight: '800', paddingHorizontal: 24, marginBottom: 12 },
  limitCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  limitRow: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  limitBtn: { width: 40, height: 56, borderRadius: 999, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  limitCenter: { alignItems: 'center' },
  limitValue: { fontSize: 48, fontWeight: '800', letterSpacing: -2 },
  limitUnit: { fontSize: 12, fontWeight: '700', letterSpacing: 1, marginTop: 4 },

  // History
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  historyTitle: { fontSize: 16, fontWeight: '800', textTransform: 'capitalize' },

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
});
