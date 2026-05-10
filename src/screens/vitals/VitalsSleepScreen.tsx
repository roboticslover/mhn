import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import ScreenHeader from '../../components/ScreenHeader';
import Svg, { Path, Circle as SvgCircle, G } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* ─── Sleep Efficiency Ring ─── */
function EfficiencyRing({ pct, size }: { pct: number; size: number }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <Svg width={size} height={size}>
      <SvgCircle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} fill="none" />
      <SvgCircle
        cx={cx} cy={cy} r={r}
        stroke="#FF9500"
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${circ}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation={-90}
        origin={`${cx},${cy}`}
      />
    </Svg>
  );
}

/* ─── Bar Chart ─── */
function SleepBarChart() {
  const months = ['FEB', 'MAR', 'APR', 'MAY', 'JUN'];
  const heights = [68, 104, 104, 104, 120];
  const active = 2; // APR
  const maxH = 140;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', height: maxH, width: '100%', paddingHorizontal: 10, marginTop: 16 }}>
      {months.map((m, i) => (
        <View key={m} style={{ alignItems: 'center' }}>
          {i === active ? (
            <View style={{ alignItems: 'center' }}>
              {/* Stacked colored bar */}
              <View style={{ borderRadius: 10, overflow: 'hidden', width: 28 }}>
                <View style={{ height: 27, backgroundColor: '#A5B4FC' }} />
                <View style={{ height: 69, backgroundColor: '#312E81' }} />
                <View style={{ height: 31, backgroundColor: '#4649DC' }} />
                <View style={{ height: 20, backgroundColor: '#6366F1', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} />
              </View>
            </View>
          ) : (
            <View style={{
              width: 28,
              height: heights[i],
              backgroundColor: 'rgba(217,217,217,0.47)',
              borderRadius: 10,
            }} />
          )}
          <Text style={{
            color: i === active ? '#FFFFFF' : 'rgba(170,170,170,0.99)',
            fontSize: 11,
            fontWeight: '700',
            letterSpacing: 1.06,
            textTransform: 'uppercase',
            marginTop: 8,
            opacity: i === active ? 1 : 0.5,
            fontFamily: 'Inter',
          }}>{m}</Text>
        </View>
      ))}
    </View>
  );
}

/* ─── Heatmap ─── */
function SleepHeatmap() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const opacities = [
    [1, 0.4, 0.2, 0.8, 0.84, 0.6, 0.4],
    [0.2, 1, 0.87, 0.3, 0.78, 0.2, 1],
    [1, 0.7, 0.8, 1, 0.6, 0.4, 1],
    [0.91, 0.48, 0.3, 1, 1, 0.58, 1],
  ];
  const cellSize = (SCREEN_WIDTH - 48 - 50 - 48) / 7;

  return (
    <View>
      {/* Day headers */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 }}>
        {days.map((d, i) => (
          <Text key={i} style={{ color: '#8E8E93', fontSize: 10, fontWeight: '700', fontFamily: 'Inter', width: cellSize, textAlign: 'center' }}>{d}</Text>
        ))}
      </View>
      {/* Grid */}
      {opacities.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 }}>
          {row.map((op, ci) => (
            <View key={ci} style={{
              width: cellSize,
              height: 32,
              borderRadius: 4,
              backgroundColor: `rgba(48,209,88,${op})`,
            }} />
          ))}
        </View>
      ))}
      {/* Legend */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 8, gap: 8 }}>
        <Text style={{ color: '#E5E5E5', fontSize: 12, fontFamily: 'Inter' }}>Less</Text>
        {[0.1, 0.35, 0.55, 0.75, 1].map((op, i) => (
          <View key={i} style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: `rgba(48,209,88,${op})` }} />
        ))}
        <Text style={{ color: '#E5E5E5', fontSize: 12, fontFamily: 'Inter' }}>More</Text>
      </View>
    </View>
  );
}

export default function VitalsSleepScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#050505' : c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Sleep" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Sleep Header Card ── */}
        <View style={[styles.sleepHeaderCard, { backgroundColor: isDark ? '#171717' : c.card, borderColor: cardBorder }]}>
          {/* Top info */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Ionicons name="moon" size={15} color="#A5B4FC" />
            <Text style={{ color: '#AAAAAA', fontSize: 11, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase', fontFamily: 'Inter' }}>SLEEP</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700', fontFamily: 'Inter' }}>7H 20Min</Text>
            <Text style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter' }}>AVG Sleep</Text>
          </View>

          {/* Monthly selector */}
          <View style={[styles.periodSelector, { borderColor: '#A5B4FC' }]}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', fontFamily: 'Inter' }}>Monthly</Text>
            <Ionicons name="chevron-down" size={10} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </View>

          {/* Bar Chart */}
          <SleepBarChart />

          {/* Sleep breakdown */}
          <View style={[styles.breakdownRow]}>
            {[
              { label: 'DEEP SLEEP', value: '4.7', color: '#312E81' },
              { label: 'CORE SLEEP', value: '1.4', color: '#4649DC' },
              { label: 'REM SLEEP', value: '1.1', color: '#6366F1' },
            ].map((item) => (
              <View key={item.label} style={{ alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                  <View style={{ width: 14, height: 14, borderRadius: 3, backgroundColor: item.color }} />
                  <Text style={{ color: '#AAAAAA', fontSize: 8, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase', fontFamily: 'Inter' }}>{item.label}</Text>
                </View>
                <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '800', letterSpacing: 1.1, fontFamily: 'Inter' }}>{item.value}</Text>
                <Text style={{ color: '#AAAAAA', fontSize: 7, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase', fontFamily: 'Inter' }}>Hours</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Efficiency Ring ── */}
        <View style={[styles.efficiencyCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <EfficiencyRing pct={50} size={192} />
            <View style={{ position: 'absolute', alignItems: 'center' }}>
              <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '800', fontFamily: 'Inter', letterSpacing: -0.9 }}>50%</Text>
              <Text style={{ color: '#ABABAB', fontSize: 14, fontWeight: '500', fontFamily: 'Inter' }}>Efficiency</Text>
            </View>
          </View>
        </View>

        {/* ── Time Cards ── */}
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 16 }}>
          <View style={[styles.timeCard, { backgroundColor: cardBg, borderColor: cardBorder, flex: 1 }]}>
            <View style={[styles.timeIconWrap, { backgroundColor: 'rgba(165,180,252,0.15)' }]}>
              <Ionicons name="time-outline" size={20} color="#A5B4FC" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: '#BCCBB7', fontSize: 11, fontWeight: '700', letterSpacing: 0.55, textTransform: 'uppercase', fontFamily: 'Inter' }}>Start time</Text>
              <Text style={{ color: '#E2E2E2', fontSize: 18, fontWeight: '700', fontFamily: 'Inter' }}>11:14</Text>
            </View>
          </View>
          <View style={[styles.timeCard, { backgroundColor: cardBg, borderColor: cardBorder, flex: 1 }]}>
            <View style={[styles.timeIconWrap, { backgroundColor: 'rgba(251,214,7,0.15)' }]}>
              <Ionicons name="sunny-outline" size={20} color="#FBD607" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: '#BCCBB7', fontSize: 11, fontWeight: '700', letterSpacing: 0.55, textTransform: 'uppercase', fontFamily: 'Inter' }}>End time</Text>
              <Text style={{ color: '#E2E2E2', fontSize: 18, fontWeight: '700', fontFamily: 'Inter' }}>6:45 AM</Text>
            </View>
          </View>
        </View>

        {/* ── Data Cards ── */}
        {[
          { icon: 'time-outline', iconColor: '#A5B4FC', iconBg: 'rgba(165,180,252,0.15)', label: 'AWAKE DURATION', value: '50', unit: 'Min' },
          { icon: 'alert-circle-outline', iconColor: '#DB5034', iconBg: 'rgba(219,80,52,0.15)', label: 'SLEEP INTERRUPTIONS', value: '3 times', badge: 'Disturbed', badgeColor: '#DB5034' },
          { icon: 'moon-outline', iconColor: '#A5B4FC', iconBg: 'rgba(165,180,252,0.15)', label: 'SLEEP DEBT', value: '+18', unit: 'Min', valueColor: '#DB5034' },
        ].map((item, i) => (
          <View key={i} style={[styles.dataCard, { backgroundColor: cardBg, borderColor: cardBorder, marginTop: 16 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View style={[styles.dataIconWrap, { backgroundColor: item.iconBg }]}>
                <Ionicons name={item.icon as any} size={22} color={item.iconColor} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#BCCBB7', fontSize: 11, fontWeight: '700', letterSpacing: 0.55, textTransform: 'uppercase', fontFamily: 'Inter' }}>{item.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                  <Text style={{ color: item.valueColor || '#E2E2E2', fontSize: 18, fontWeight: '700', fontFamily: 'Inter' }}>{item.value}</Text>
                  {item.unit && <Text style={{ color: '#AAAAAA', fontSize: 10, fontFamily: 'Inter' }}>{item.unit}</Text>}
                </View>
              </View>
              {item.badge && (
                <View>
                  <Text style={{ color: '#BCCBB7', fontSize: 10, fontWeight: '700', fontFamily: 'Inter' }}>{item.badge}</Text>
                  <View style={{ height: 6, width: 48, backgroundColor: '#1F1F1F', borderRadius: 9999, marginTop: 4, overflow: 'hidden' }}>
                    <View style={{ height: 6, width: 38, backgroundColor: item.badgeColor, borderRadius: 9999 }} />
                  </View>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* ── Sleep Consistency ── */}
        <View style={{ marginTop: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, marginBottom: 8 }}>
            <Text style={{ color: isDark ? '#FFFFFF' : c.text, fontSize: 24, fontWeight: '700', letterSpacing: -0.6, fontFamily: 'Inter' }}>Sleep Consistency</Text>
            <Text style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter' }}>last month</Text>
          </View>
          <Text style={{ color: '#6FFB85', fontSize: 40, fontWeight: '700', fontFamily: 'Inter', paddingHorizontal: 8 }}>82%</Text>
          <Text style={{ color: '#AAAAAA', fontSize: 16, fontWeight: '500', fontFamily: 'Inter', paddingHorizontal: 8, marginTop: 4, marginBottom: 20 }}>
            Your sleep schedule is fairly consistent.
          </Text>

          <View style={[styles.heatmapCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <SleepHeatmap />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  sleepHeaderCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 30,
    marginBottom: 16,
  },
  periodSelector: {
    position: 'absolute',
    top: 30,
    right: 30,
    borderWidth: 0.4,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },

  efficiencyCard: {
    borderRadius: 32,
    borderWidth: 1,
    padding: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },

  timeCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIconWrap: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dataCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
  },
  dataIconWrap: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heatmapCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 25,
  },
});
