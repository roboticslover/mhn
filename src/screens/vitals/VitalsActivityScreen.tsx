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

/* ─── Activity Rings ─── */
function ActivityRings({ size }: { size: number }) {
  const center = size / 2;
  const rings = [
    { r: size / 2 - 8, color: '#FF2D55', bgColor: 'rgba(255,45,85,0.2)', pct: 0.7 },   // Move
    { r: size / 2 - 28, color: '#30D158', bgColor: 'rgba(48,209,88,0.2)', pct: 0.85 },  // Exercise
    { r: size / 2 - 48, color: '#00E5FF', bgColor: 'rgba(0,229,255,0.2)', pct: 0.95 },  // Stand
  ];
  const strokeW = 16;

  return (
    <Svg width={size} height={size}>
      {rings.map((ring, i) => {
        const circ = 2 * Math.PI * ring.r;
        return (
          <G key={i}>
            <SvgCircle cx={center} cy={center} r={ring.r} stroke={ring.bgColor} strokeWidth={strokeW} fill="none" />
            <SvgCircle
              cx={center} cy={center} r={ring.r}
              stroke={ring.color} strokeWidth={strokeW} fill="none"
              strokeDasharray={`${circ}`}
              strokeDashoffset={circ * (1 - ring.pct)}
              strokeLinecap="round"
              rotation={-90}
              origin={`${center},${center}`}
            />
          </G>
        );
      })}
    </Svg>
  );
}

/* ─── Mini Sparkline ─── */
function MiniSparkline({ color, w, h }: { color: string; w: number; h: number }) {
  const pts = [30, 45, 35, 60, 50, 70, 55, 40, 50, 65, 45, 55];
  const step = w / (pts.length - 1);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - (p / 80) * h}`).join(' ');
  return (
    <Svg width={w} height={h}>
      <Path d={d} stroke={color} strokeWidth={1.5} fill="none" />
    </Svg>
  );
}

/* ─── Bar Sparkline ─── */
function BarSparkline({ color, w, h }: { color: string; w: number; h: number }) {
  const bars = [50, 75, 60, 90, 45, 80, 55];
  const barW = (w - (bars.length - 1) * 3) / bars.length;
  return (
    <Svg width={w} height={h}>
      {bars.map((val, i) => {
        const barH = (val / 100) * h;
        return (
          <Path
            key={i}
            d={`M${i * (barW + 3)},${h} L${i * (barW + 3)},${h - barH} L${i * (barW + 3) + barW},${h - barH} L${i * (barW + 3) + barW},${h} Z`}
            fill={color}
            opacity={0.7 + (i / bars.length) * 0.3}
          />
        );
      })}
    </Svg>
  );
}

/* ─── Activity Metrics ─── */
const METRICS = [
  { label: 'STEPS', value: '8,432', unit: 'today', icon: 'footsteps-outline', spark: true },
  { label: 'DURATION', value: '32', unit: 'min', icon: 'time-outline', spark: true },
  { label: 'ACTIVE ENERGY', value: '482', unit: 'KCAL', icon: 'flame-outline', spark: true },
  { label: 'RESTING ENERGY', value: '1,094', unit: 'KCAL', icon: 'flash-outline', spark: true },
  { label: 'FLOORS CLIMBED', value: '13', unit: 'floors', icon: 'arrow-up-outline', spark: true },
];

const INTENSITY = [
  { label: 'LOW', value: '2.4', unit: 'hrs', spark: 'wave' as const },
  { label: 'MEDIUM', value: '58', unit: 'min', spark: 'wave' as const },
  { label: 'HIGH INTENSITY', value: '14', unit: 'min', spark: 'bars' as const },
];

export default function VitalsActivityScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#050505' : c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Activity" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Activity Rings ── */}
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View style={{ position: 'relative' }}>
            <ActivityRings size={180} />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#FFFFFF', fontSize: 40, fontWeight: '800', fontFamily: 'Inter' }}>76</Text>
              <Text style={{ color: '#AAAAAA', fontSize: 14, fontWeight: '500', fontFamily: 'Inter' }}>Score</Text>
            </View>
          </View>
        </View>

        {/* ── Metric Cards ── */}
        {METRICS.map((metric, i) => (
          <TouchableOpacity key={i} style={[styles.metricCard, { backgroundColor: cardBg, borderColor: cardBorder }]} activeOpacity={0.7}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Ionicons name={metric.icon as any} size={14} color="#6FFB85" />
                <Text style={styles.metricLabel}>{metric.label}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricUnit}>{metric.unit}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MiniSparkline color="#6FFB85" w={80} h={28} />
              <Ionicons name="chevron-forward" size={16} color="#AAAAAA" />
            </View>
          </TouchableOpacity>
        ))}

        {/* ── Activity Intensity ── */}
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : c.text }]}>Activity Intensity</Text>

        <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
          {INTENSITY.slice(0, 2).map((item, i) => (
            <View key={i} style={[styles.intensityCard, { backgroundColor: cardBg, borderColor: cardBorder, flex: 1 }]}>
              <Text style={styles.intensityLabel}>{item.label}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                <Text style={styles.intensityValue}>{item.value}</Text>
                <Text style={styles.intensityUnit}>{item.unit}</Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <MiniSparkline color="#6FFB85" w={100} h={20} />
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.intensityCard, { backgroundColor: cardBg, borderColor: cardBorder, marginBottom: 16 }]}>
          <Text style={styles.intensityLabel}>{INTENSITY[2].label}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <Text style={styles.intensityValue}>{INTENSITY[2].value}</Text>
              <Text style={styles.intensityUnit}>{INTENSITY[2].unit}</Text>
            </View>
            <BarSparkline color="#6FFB85" w={100} h={32} />
          </View>
        </View>

        {/* ── Active Hours ── */}
        <TouchableOpacity style={[styles.metricCard, { backgroundColor: cardBg, borderColor: cardBorder }]} activeOpacity={0.7}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Text style={styles.metricLabel}>ACTIVE HOURS</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text style={styles.metricValue}>3.8</Text>
              <Text style={styles.metricUnit}>hrs</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MiniSparkline color="#6FFB85" w={80} h={28} />
            <Ionicons name="chevron-forward" size={16} color="#AAAAAA" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 16,
    marginTop: 8,
  },

  metricCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricLabel: {
    color: '#AAAAAA',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  metricUnit: {
    color: '#BCCBB7',
    fontSize: 12,
    fontFamily: 'Inter',
  },

  intensityCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 20,
  },
  intensityLabel: {
    color: '#AAAAAA',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  intensityValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  intensityUnit: {
    color: '#BCCBB7',
    fontSize: 12,
    fontFamily: 'Inter',
  },
});
