import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import ScreenHeader from '../../components/ScreenHeader';
import Svg, { Path, Circle as SvgCircle, Line } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/* ─── Heart Rate Chart ─── */
function HeartRateChart() {
  const w = SCREEN_WIDTH - 48 - 60;
  const h = 140;
  const points = [80, 90, 110, 130, 157, 140, 120, 100, 90, 85, 80, 75, 80];
  const maxVal = 160;
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - (p / maxVal) * h}`).join(' ');
  const dotX = 4 * step;
  const dotY = h - (points[4] / maxVal) * h;

  return (
    <Svg width={w} height={h}>
      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Line key={i} x1={0} y1={(i / 6) * h} x2={w} y2={(i / 6) * h} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
      ))}
      {/* Heart rate curve */}
      <Path d={d} stroke="#FF2D55" strokeWidth={2.5} fill="none" />
      {/* Dot */}
      <SvgCircle cx={dotX} cy={dotY} r={4} fill="#6FFB85" />
    </Svg>
  );
}

/* ─── Sparkline wave ─── */
function WaveSparkline({ color, w, h }: { color: string; w: number; h: number }) {
  const pts = [50, 60, 40, 70, 30, 80, 45, 65, 55, 50, 60, 40, 50];
  const step = w / (pts.length - 1);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - (p / 100) * h}`).join(' ');
  return (
    <Svg width={w} height={h}>
      <Path d={d} stroke={color} strokeWidth={1.5} fill="none" />
    </Svg>
  );
}

/* ─── Data cards ─── */
const VITAL_CARDS = [
  { label: 'HEART RATE', value: '157', unit: 'BPM', chart: true },
  { label: 'RESTING HR', value: '62', unit: 'BPM', icon: 'heart', barPct: 65, barNote: 'Average: 58-64' },
  { label: 'SLEEP HR', value: '48', unit: 'BPM', icon: 'moon', wave: true, note: 'Very calm activity' },
  { label: 'HRV (SDNN)', value: '74', unit: 'MS', icon: 'pulse', bars: true, note: 'RMSSD: 42ms' },
  { label: 'VO2 MAX', value: '42', unitFull: 'mL/kg/min', icon: 'fitness', wave: true, note: 'Superior', noteColor: '#6FFB85' },
  { label: 'BLOOD OXYGEN', value: '99', unit: '%', icon: 'water', bar100: true, note: 'Sleep Average: 98%' },
  { label: 'BLOOD GLUCOSE', value: '94', unit: 'MG/DL', icon: 'analytics', wave: true, note: 'Stable - 2h post meal' },
  { label: 'BLOOD PRESSURE', value: '118 / 76', unit: 'MMHG', icon: 'heart-circle', sysDia: true },
  { label: 'RESPIRATORY RATE', value: '14', unit: 'Brpm', icon: 'medkit', subData: [{ label: 'Regular', val: '14 brpm' }, { label: 'Sleep', val: '12 brpm' }] },
  { label: 'BODY TEMPERATURE', value: '36.6', unitFull: '°C', icon: 'thermometer', note: 'Basal Average', simple: true },
  { label: 'SKIN TEMPERATURE', value: '94', unitFull: 'F', icon: 'thermometer', note: 'Sleep change', simple: true },
];

export default function VitalsHeartRateScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#050505' : c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Heart Rate" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 40, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Main Heart Rate Chart Card ── */}
        <View style={[styles.chartCard, { backgroundColor: isDark ? '#171717' : c.card, borderColor: cardBorder }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Ionicons name="heart" size={13} color="#FF2D55" />
            <Text style={styles.chartLabel}>HEART RATE</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
            <Text style={styles.chartValue}>157</Text>
            <Text style={{ color: '#AAAAAA', fontSize: 12, fontFamily: 'Inter' }}>BPM</Text>
          </View>

          {/* Period Selector */}
          <View style={[styles.periodSelector, { borderColor: '#FF2D55' }]}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', fontFamily: 'Inter' }}>Daily</Text>
            <Ionicons name="chevron-down" size={10} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </View>

          <HeartRateChart />

          {/* HR stats */}
          <View style={[styles.hrStatsRow]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.hrStatLabel}>TODAY'S{'\n'}RANGE</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#AAAAAA', fontSize: 8, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase', fontFamily: 'Inter' }}>Avg BPM</Text>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '800', fontFamily: 'Inter' }}>81</Text>
              <Text style={{ color: '#AAAAAA', fontSize: 7, fontWeight: '700', fontFamily: 'Inter' }}>bpm</Text>
            </View>
            <View style={{ width: 24 }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#AAAAAA', fontSize: 8, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase', fontFamily: 'Inter' }}>Max Heart Rate</Text>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '800', fontFamily: 'Inter' }}>157</Text>
              <Text style={{ color: '#AAAAAA', fontSize: 7, fontWeight: '700', fontFamily: 'Inter' }}>bpm</Text>
            </View>
          </View>
        </View>

        {/* ── Metric Cards ── */}
        {VITAL_CARDS.slice(1).map((card, i) => (
          <View key={i} style={[styles.metricCard, { backgroundColor: cardBg, borderColor: cardBorder, height: card.subData ? 161 : card.simple ? 132 : 192 }]}>
            <View style={styles.metricTop}>
              <View style={{ flex: 1 }}>
                <Text style={styles.metricLabel}>{card.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                  <Text style={styles.metricValue}>{card.value}</Text>
                  {card.unit && <Text style={styles.metricUnit}>{card.unit}</Text>}
                  {card.unitFull && <Text style={[styles.metricUnit, { color: card.noteColor || '#ABABAB', fontSize: 14 }]}>{card.unitFull}</Text>}
                </View>
              </View>
              <View style={{ width: 20, height: 18 }}>
                <Ionicons name={(card.icon || 'pulse') as any} size={18} color={isDark ? '#6FFB85' : c.primary} />
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              {/* Bar */}
              {card.barPct !== undefined && (
                <View>
                  <View style={[styles.barBg, { backgroundColor: 'rgba(85,238,113,0.2)' }]}>
                    <View style={[styles.barFill, { width: `${card.barPct}%`, backgroundColor: '#6FFB85' }]} />
                  </View>
                  <Text style={styles.noteText}>{card.barNote}</Text>
                </View>
              )}

              {/* Wave */}
              {card.wave && (
                <View>
                  <WaveSparkline color={card.noteColor || (isDark ? '#6FFB85' : c.primary)} w={SCREEN_WIDTH - 96} h={32} />
                  <Text style={[styles.noteText, { textAlign: card.noteColor ? 'right' : 'left', color: card.noteColor || '#AAAAAA' }]}>{card.note}</Text>
                </View>
              )}

              {/* Bar 100% */}
              {card.bar100 && (
                <View>
                  <Text style={[styles.noteText, { marginBottom: 4 }]}>{card.note}</Text>
                  <View style={[styles.barBg, { backgroundColor: '#2A2A2A' }]}>
                    <View style={[styles.barFill, { width: '99%', backgroundColor: '#6FFB85' }]} />
                  </View>
                </View>
              )}

              {/* Sys/Dia bars */}
              {card.sysDia && (
                <View style={{ gap: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Text style={{ color: '#AAAAAA', fontSize: 10, fontFamily: 'Inter', width: 32 }}>SYS</Text>
                    <View style={[styles.barBg, { flex: 1, backgroundColor: '#2A2A2A' }]}>
                      <View style={[styles.barFill, { width: '60%', backgroundColor: '#6FFB85' }]} />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <Text style={{ color: '#AAAAAA', fontSize: 10, fontFamily: 'Inter', width: 32 }}>DIA</Text>
                    <View style={[styles.barBg, { flex: 1, backgroundColor: '#2A2A2A' }]}>
                      <View style={[styles.barFill, { width: '50%', backgroundColor: '#6FFB85' }]} />
                    </View>
                  </View>
                </View>
              )}

              {/* HRV bars */}
              {card.bars && (
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
                  {[16, 24, 12, 32, 20].map((h, j) => (
                    <View key={j} style={{
                      width: 8,
                      height: h,
                      borderRadius: 9999,
                      backgroundColor: j === 3 ? '#6FFB85' : '#55EE71',
                      opacity: j === 3 ? 1 : (1 - j * 0.15),
                    }} />
                  ))}
                  <View style={{ flex: 1 }} />
                  <Text style={styles.noteText}>{card.note}</Text>
                </View>
              )}

              {/* Sub data row */}
              {card.subData && (
                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 13, gap: 16 }}>
                  {card.subData.map((sub, j) => (
                    <View key={j} style={{ flex: j === 0 ? 0 : 1, paddingLeft: j > 0 ? 17 : 0, borderLeftWidth: j > 0 ? 1 : 0, borderLeftColor: 'rgba(255,255,255,0.05)' }}>
                      <Text style={{ color: '#ABABAB', fontSize: 10, fontWeight: '500', textTransform: 'uppercase', fontFamily: 'Inter' }}>{sub.label}</Text>
                      <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600', fontFamily: 'Inter' }}>{sub.val}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Simple note */}
              {card.simple && (
                <Text style={[styles.noteText, { marginTop: 8, textTransform: 'uppercase', letterSpacing: 0.5 }]}>{card.note}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  chartCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 30,
  },
  chartLabel: {
    color: '#AAAAAA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  chartValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
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
  hrStatsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  hrStatLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
    lineHeight: 17,
  },

  metricCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
  },
  metricTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  metricLabel: {
    color: '#AAAAAA',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  metricUnit: {
    color: '#BCCBB7',
    fontSize: 12,
    fontFamily: 'Inter',
    marginLeft: 4,
  },

  barBg: {
    height: 16,
    borderRadius: 9999,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 9999,
  },

  noteText: {
    color: '#AAAAAA',
    fontSize: 10,
    fontFamily: 'Inter',
    marginTop: 4,
  },
});
