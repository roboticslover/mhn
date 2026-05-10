import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import ScreenHeader from '../../components/ScreenHeader';
import Svg, { Path, Rect, Circle, Line, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = (SCREEN_WIDTH - 24 * 2 - 16) / 2;

/* ─── Health Score Data ─── */
const HEALTH_SCORES = [
  { label: 'ACTIVITY SCORE', status: 'Optimal', pct: 82, color: '#60FE6C', barColor: '#1FBD53' },
  { label: 'MENTAL WELLBEING', status: 'Needs Attention', pct: 50, color: '#FF9500', barColor: '#FF9500' },
  { label: 'SLEEP SCORE', status: 'Critical', pct: 30, color: '#DB5034', barColor: '#DB5034' },
  { label: 'READINESS SCORE', status: 'Optimal', pct: 82, color: '#60FE6C', barColor: '#1FBD53' },
  { label: 'WELLBEING SCORE', status: 'Optimal', pct: 82, color: '#60FE6C', barColor: '#1FBD53' },
];

/* ─── Vitals Grid Data ─── */
const VITALS_CARDS = [
  {
    label: 'Floors Climbed',
    value: '12',
    unit: '/15',
    unitColor: '#F32788',
    iconBg: 'rgba(243,39,136,0.16)',
    gradient: ['rgba(243,39,136,0.1)', 'rgba(243,39,136,0)'],
  },
  {
    label: 'Sleep',
    value: '7h 42m',
    unitLabel: 'Duration',
    unitColor: '#A5B4FC',
    iconBg: 'rgba(129,140,248,0.32)',
    gradient: ['rgba(99,102,241,0.2)', 'rgba(129,140,248,0)'],
    sleepStages: true,
  },
  {
    label: 'VO2 Max',
    value: '42',
    unit: 'mL/kg/min',
    unitColor: '#AAE112',
    iconBg: 'rgba(170,225,18,0.16)',
    gradient: ['rgba(170,225,18,0.1)', 'rgba(170,225,18,0)'],
  },
  {
    label: 'Active Energy',
    value: '1164',
    unit: 'Kcal',
    unitColor: '#FBD607',
    iconBg: 'rgba(251,214,7,0.16)',
    gradient: ['rgba(251,214,7,0.1)', 'rgba(251,214,7,0)'],
  },
  {
    label: 'Steps',
    value: '6825',
    unit: '/10000',
    unitColor: 'rgba(230,105,69,0.63)',
    iconBg: 'rgba(230,105,69,0.16)',
    gradient: ['rgba(230,105,69,0.14)', 'rgba(230,105,69,0)'],
    stepsBar: true,
  },
  {
    label: 'Heart Rate',
    value: '104',
    unit: 'bpm',
    unitColor: '#FF5900',
    iconBg: 'rgba(255,89,0,0.16)',
    gradient: ['rgba(255,89,0,0.1)', 'rgba(255,89,0,0)'],
  },
  {
    label: 'SpO2',
    value: '98',
    unit: '%',
    unitColor: '#2BFF00',
    iconBg: 'rgba(43,255,0,0.16)',
    gradient: ['rgba(43,255,0,0.1)', 'rgba(43,255,0,0)'],
    progressBar: true,
    progressColor: '#2BFF00',
  },
  {
    label: 'Blood Pressure',
    value: '118',
    value2: '80',
    unit: 'mm/hg',
    unitColor: '#CF66FF',
    iconBg: 'rgba(207,102,255,0.32)',
    gradient: ['rgba(207,102,255,0.1)', 'rgba(207,102,255,0)'],
    hasSysDia: true,
  },
];

/* ─── Sparkline Component ─── */
function Sparkline({ color, width: w, height: h }: { color: string; width: number; height: number }) {
  const points = [0, 30, 15, 45, 20, 55, 35, 60, 25, 50, 40, 65, 30];
  const step = w / (points.length - 1);
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - (p / 65) * h}`).join(' ');
  return (
    <Svg width={w} height={h}>
      <Path d={d} stroke={color} strokeWidth={2} fill="none" />
    </Svg>
  );
}

/* ─── Sleep Stages Bar ─── */
function SleepStagesBar() {
  return (
    <View style={{ flexDirection: 'row', height: 8, borderRadius: 100, overflow: 'hidden', width: '100%' }}>
      <View style={{ flex: 15, backgroundColor: '#6366F1' }} />
      <View style={{ flex: 25, backgroundColor: '#312E81' }} />
      <View style={{ flex: 40, backgroundColor: '#4649DC' }} />
      <View style={{ flex: 20, backgroundColor: '#A5B4FC' }} />
    </View>
  );
}

/* ─── Steps Bar Chart ─── */
function StepsBarChart() {
  const bars = [21, 10, 38, 25, 12, 9, 14];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 42, width: '100%' }}>
      {bars.map((h, i) => (
        <View key={i} style={{ alignItems: 'center', flex: 1 }}>
          <View style={{
            width: 12,
            height: h,
            borderRadius: 2,
            backgroundColor: i === bars.length - 1 ? '#E66945' : '#373737',
          }} />
          <Text style={{ color: '#767676', fontSize: 7, fontWeight: '600', marginTop: 2, fontFamily: 'Inter' }}>{days[i]}</Text>
        </View>
      ))}
    </View>
  );
}

export default function VitalsMainScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const cardBg = isDark ? 'rgba(38,38,38,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.05)' : c.cardBorder;
  const vitalsCardBg = isDark ? 'transparent' : c.card;
  const vitalsCardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Vitals Dashboard" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Health Scores ── */}
        <View style={{ paddingHorizontal: 24, gap: 12, marginBottom: 24 }}>
          {HEALTH_SCORES.map((score, i) => (
            <View key={i} style={[styles.scoreCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
              <View style={styles.scoreTop}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.scoreLabel, { color: '#AAAAAA', fontFamily: 'Inter' }]}>{score.label}</Text>
                  <Text style={[styles.scoreStatus, { color: score.color, fontFamily: 'Inter' }]}>{score.status}</Text>
                </View>
                <Text style={[styles.scorePct, { color: '#FFFFFF', fontFamily: 'Inter' }]}>{score.pct}%</Text>
              </View>
              <View style={[styles.scoreBarBg, { backgroundColor: isDark ? '#262626' : '#E0E0E0' }]}>
                <View style={[styles.scoreBarFill, { backgroundColor: score.barColor, width: `${score.pct}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* ── Log Data Section ── */}
        <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter' }]}>Log Data</Text>
        <View style={[styles.gridContainer, { paddingHorizontal: 24 }]}>
          {/* Coffee Card */}
          <View style={[styles.logCard, {
            backgroundColor: vitalsCardBg,
            borderColor: vitalsCardBorder,
            width: CARD_SIZE,
            height: CARD_SIZE,
          }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(255,174,0,0.1)' }]}>
              <Text style={{ fontSize: 15 }}>☕</Text>
            </View>
            <Text style={[styles.logLabel, { color: '#ABABAB', fontFamily: 'Inter' }]}>Coffee</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
              <Text style={[styles.logValue, { color: '#FFFFFF', fontFamily: 'Inter' }]}>4 </Text>
              <Text style={{ color: '#878686', fontSize: 12, fontFamily: 'Inter' }}>cups</Text>
            </View>
          </View>

          {/* Water Card */}
          <View style={[styles.logCard, {
            backgroundColor: vitalsCardBg,
            borderColor: vitalsCardBorder,
            width: CARD_SIZE,
            height: CARD_SIZE,
          }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(64,169,255,0.1)' }]}>
                <Text style={{ fontSize: 14, color: '#40A9FF' }}>💧</Text>
              </View>
              <Text style={{ color: '#AAAAAA', fontSize: 16, fontWeight: '600', fontFamily: 'Inter' }}>50%</Text>
            </View>
            <Text style={[styles.logValueLg, { color: '#FFFFFF', fontFamily: 'Inter', marginTop: 16 }]}>1250</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 8, fontFamily: 'Inter', marginTop: 2 }}>of 2500 ml goal</Text>
          </View>

          {/* Medication Card */}
          <View style={[styles.logCard, {
            backgroundColor: vitalsCardBg,
            borderColor: vitalsCardBorder,
            width: CARD_SIZE,
            height: CARD_SIZE,
          }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(12,163,120,0.1)' }]}>
              <Text style={{ fontSize: 15 }}>💊</Text>
            </View>
            <Text style={{ color: '#ABABAB', fontSize: 12, fontFamily: 'Inter', marginTop: 4 }}>Upcoming</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'Inter', marginTop: 2 }}>Vitamin D3</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700', fontFamily: 'Inter' }}>9:30</Text>
              <Text style={{ color: '#ABABAB', fontSize: 12, fontFamily: 'Inter', marginLeft: 4 }}>PM</Text>
            </View>
          </View>

          {/* Weight Card */}
          <View style={[styles.logCard, {
            backgroundColor: vitalsCardBg,
            borderColor: vitalsCardBorder,
            width: CARD_SIZE,
            height: CARD_SIZE,
          }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(85,238,113,0.19)' }]}>
              <Text style={{ fontSize: 15 }}>⚖️</Text>
            </View>
            <Text style={{ color: '#AAAAAA', fontSize: 8, fontFamily: 'Inter', position: 'absolute', top: 19, right: 19 }}>2 days ago</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6 }}>124</Text>
              <Text style={{ color: '#6FFB85', fontSize: 16, fontWeight: '500', fontFamily: 'Inter', marginLeft: 4, letterSpacing: -0.6 }}>kg</Text>
            </View>
            <View style={{ marginTop: 8, width: '100%', height: 20 }}>
              <Sparkline color="#6FFB85" width={CARD_SIZE - 40} height={20} />
            </View>
          </View>

          {/* Last Intake Cards */}
          <View style={[styles.logCard, {
            backgroundColor: vitalsCardBg,
            borderColor: vitalsCardBorder,
            width: CARD_SIZE,
            height: CARD_SIZE,
          }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(219,80,52,0.13)' }]}>
              <Text style={{ fontSize: 15 }}>🚬</Text>
            </View>
            <Text style={{ color: '#ABABAB', fontSize: 10, fontFamily: 'Inter', marginTop: 4 }}>Last intake</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700', fontFamily: 'Inter', marginTop: 2 }}>12th March</Text>
            <View style={{ marginTop: 8, width: '100%', height: 30 }}>
              <Sparkline color="#DB5034" width={CARD_SIZE - 40} height={30} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={{ color: '#DB5034', fontSize: 10, fontWeight: '600', fontFamily: 'Inter' }}>+12.5%</Text>
            </View>
          </View>

          <View style={[styles.logCard, {
            backgroundColor: vitalsCardBg,
            borderColor: vitalsCardBorder,
            width: CARD_SIZE,
            height: CARD_SIZE,
          }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(219,80,52,0.13)' }]}>
              <Text style={{ fontSize: 15 }}>🍷</Text>
            </View>
            <Text style={{ color: '#ABABAB', fontSize: 10, fontFamily: 'Inter', marginTop: 4 }}>Last intake</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700', fontFamily: 'Inter', marginTop: 2 }}>12th March</Text>
            <View style={{ marginTop: 8, width: '100%', height: 30 }}>
              <Sparkline color="#DB5034" width={CARD_SIZE - 40} height={30} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={{ color: '#DB5034', fontSize: 10, fontWeight: '600', fontFamily: 'Inter' }}>+12.5%</Text>
            </View>
          </View>
        </View>

        {/* ── Vitals Section ── */}
        <Text style={[styles.sectionTitle, { color: c.text, fontFamily: 'Inter' }]}>Vitals</Text>
        <View style={[styles.gridContainer, { paddingHorizontal: 24 }]}>
          {VITALS_CARDS.map((card, i) => (
            <View key={i} style={[styles.vitalsCard, {
              backgroundColor: vitalsCardBg,
              borderColor: vitalsCardBorder,
              width: CARD_SIZE,
              height: CARD_SIZE,
            }]}>
              <View style={[styles.vitalsIconWrap, { backgroundColor: card.iconBg }]}>
                <View style={{ width: 20, height: 20 }} />
              </View>
              <Text style={[styles.vitalsLabel, { color: '#ABABAB', fontFamily: 'Inter' }]}>{card.label}</Text>

              {card.hasSysDia ? (
                <View style={{ marginTop: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={[styles.vitalsValueLg, { color: '#FFFFFF', fontFamily: 'Inter' }]}>{card.value}</Text>
                    <Text style={{ color: card.unitColor, fontSize: 7, fontFamily: 'Inter', marginLeft: 4 }}>{card.unit}</Text>
                    <Text style={{ color: '#ABABAB', fontSize: 10, fontFamily: 'Inter', marginLeft: 8 }}>SYS</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '700', fontFamily: 'Inter' }}>{card.value2}</Text>
                    <Text style={{ color: card.unitColor, fontSize: 7, fontFamily: 'Inter', marginLeft: 4 }}>{card.unit}</Text>
                    <Text style={{ color: '#ABABAB', fontSize: 10, fontFamily: 'Inter', marginLeft: 8 }}>DIA</Text>
                  </View>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
                  <Text style={[
                    card.sleepStages ? styles.vitalsValueMd : styles.vitalsValueLg,
                    { color: '#FFFFFF', fontFamily: 'Inter' },
                  ]}>{card.value}</Text>
                  {card.unit && (
                    <Text style={{ color: card.unitColor, fontSize: 14, fontFamily: 'Inter', marginLeft: 4 }}>
                      {card.unit}
                    </Text>
                  )}
                  {card.unitLabel && (
                    <Text style={{ color: card.unitColor, fontSize: 8, fontWeight: '600', fontFamily: 'Inter', marginLeft: 4 }}>
                      {card.unitLabel}
                    </Text>
                  )}
                </View>
              )}

              {card.sleepStages && (
                <View style={{ marginTop: 8, width: '100%' }}>
                  <SleepStagesBar />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <Text style={{ color: '#AAAAAA', fontSize: 7, fontWeight: '600', fontFamily: 'Inter' }}>11:00 PM</Text>
                    <Text style={{ color: '#AAAAAA', fontSize: 7, fontWeight: '600', fontFamily: 'Inter' }}>06:42 AM</Text>
                  </View>
                </View>
              )}

              {card.stepsBar && (
                <View style={{ marginTop: 4, width: '100%', flex: 1 }}>
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, backgroundColor: '#E66945' }} />
                  <StepsBarChart />
                </View>
              )}

              {card.progressBar && (
                <View style={{ marginTop: 8, width: '100%' }}>
                  <View style={[styles.progressBg]}>
                    <View style={[styles.progressFill, {
                      backgroundColor: card.progressColor,
                      width: '95%',
                    }]} />
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'capitalize',
    paddingHorizontal: 25,
    marginTop: 24,
    marginBottom: 16,
  },

  /* Score Cards */
  scoreCard: {
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 48,
  },
  scoreTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  scoreStatus: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
  },
  scorePct: {
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 20,
  },
  scoreBarBg: {
    height: 6,
    borderRadius: 9999,
    position: 'absolute',
    bottom: 16,
    left: 28,
    right: 28,
  },
  scoreBarFill: {
    height: 6,
    borderRadius: 9999,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },

  /* Grid */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  /* Log Cards */
  logCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 19,
  },
  logIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  logValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  logValueLg: {
    fontSize: 30,
    fontWeight: '800',
  },

  /* Vitals Cards */
  vitalsCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 19,
    overflow: 'hidden',
  },
  vitalsIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vitalsLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  vitalsValueLg: {
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  vitalsValueMd: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -1.4,
  },

  /* Progress */
  progressBg: {
    height: 6,
    backgroundColor: '#2A2A2A',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 9999,
  },
});
