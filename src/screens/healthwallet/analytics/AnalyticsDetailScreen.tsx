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
import Svg, { Line, Circle, Path, G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

interface DataPoint {
  x: number;
  y: number;
  value: string;
  isHigh?: boolean;
}

function HealthGraph({ points, color, rangeLines }: { points: DataPoint[]; color: string; rangeLines: { y: number; label: string }[] }) {
  const chartHeight = 120;
  const chartWidth = 280;

  // Generate spline path
  const generatePath = () => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      d += ` Q ${cp1x} ${p0.y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  return (
    <View style={styles.graphContainer}>
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id="glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Range Lines */}
        {rangeLines.map((line, idx) => (
          <G key={idx}>
            <Line
              x1="0"
              y1={line.y}
              x2={chartWidth}
              y2={line.y}
              stroke="rgba(111, 251, 133, 0.2)"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
            <Text
              style={[
                styles.rangeLabel,
                { top: line.y - 12, left: chartWidth - 55, color: 'rgba(255,255,255,0.4)' }
              ]}
            >
              {line.label}
            </Text>
          </G>
        ))}

        {/* Spline Path */}
        <Path
          d={generatePath()}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Data Points and Bubbles */}
        {points.map((p, idx) => (
          <G key={idx}>
            {/* Glow for high points */}
            {p.isHigh && (
              <Circle cx={p.x} cy={p.y} r={8} fill={color} opacity={0.3} />
            )}
            
            {/* Point */}
            <Circle cx={p.x} cy={p.y} r={4} fill={color} />

            {/* Bubble/Pill for value */}
            {p.value ? (
              <G transform={`translate(${p.x - 15}, ${p.y - 35})`}>
                <Rect
                  width={30}
                  height={18}
                  rx={9}
                  fill={p.isHigh ? '#FF9200' : '#6FFB85'}
                />
                <Path 
                  d="M 12 18 L 15 22 L 18 18" 
                  fill={p.isHigh ? '#FF9200' : '#6FFB85'} 
                />
                <Text 
                  style={{ 
                    position: 'absolute', 
                    width: 30, 
                    textAlign: 'center', 
                    fontSize: 9, 
                    fontWeight: '900', 
                    color: '#141414',
                    top: 3.5
                  }}
                >
                  {p.value}
                </Text>
              </G>
            ) : null}
          </G>
        ))}
      </Svg>
    </View>
  );
}

function ChartCard({ title, value, colors, points, lineColor, isDark }: { 
  title: string; 
  value: string; 
  colors: any; 
  points: DataPoint[]; 
  lineColor: string;
  isDark: boolean;
}) {
  const rangeLines = [
    { y: 40, label: '99 MG/DL' },
    { y: 90, label: '75 MG/DL' }
  ];

  return (
    <View style={[styles.chartCard, { backgroundColor: isDark ? 'rgba(23, 23, 23, 0.4)' : '#F7F7F7', borderColor: colors.cardGlassBorder }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartLabel, { color: colors.textSecondary }]}>{title}</Text>
        <Text style={[styles.chartValue, { color: colors.text }]}>{value}</Text>
      </View>
      
      <HealthGraph points={points} color={lineColor} rangeLines={rangeLines} />

      <View style={styles.chartLabelsRow}>
        <Text style={[styles.chartDateLabel, { color: colors.textMuted }]}>DEC 2022</Text>
        <Text style={[styles.chartDateLabel, { color: colors.textMuted }]}>MAR 2024</Text>
        <Text style={[styles.chartDateLabel, { color: colors.textMuted }]}>APR 2024</Text>
        <Text style={[styles.chartDateLabel, { color: colors.textMuted }]}>JUNE 2023</Text>
      </View>
    </View>
  );
}

export default function AnalyticsDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const points1: DataPoint[] = [
    { x: 30, y: 80, value: '80' },
    { x: 100, y: 75, value: '82' },
    { x: 180, y: 45, value: '100', isHigh: true },
    { x: 250, y: 35, value: '100', isHigh: true },
  ];

  const points2: DataPoint[] = [
    { x: 20, y: 85, value: '' },
    { x: 80, y: 95, value: '' },
    { x: 140, y: 80, value: '' },
    { x: 200, y: 65, value: '' },
    { x: 260, y: 85, value: '' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 140 }]} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Blood Glucose</Text>
          <View style={{ width: 24 }} />
        </View>

        <ChartCard 
          title="Blood Glucose level" 
          value="129 mg/dL" 
          colors={c} 
          points={points1} 
          lineColor="#FF9200"
          isDark={isDark}
        />
        
        <ChartCard 
          title="Blood Glucose level" 
          value="129 mg/dL" 
          colors={c} 
          points={points2} 
          lineColor="#6FFB85"
          isDark={isDark}
        />

        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#6FFB85' }]} />
          <Text style={[styles.legendText, { color: c.textSecondary }]}>Normal / Ideal health:  70 – 99 mg/dL</Text>
        </View>

        <View style={[styles.insightsCard, { backgroundColor: isDark ? 'rgba(23, 23, 23, 0.4)' : '#F7F7F7', borderColor: c.cardGlassBorder }]}>
          <Text style={[styles.insightsTitle, { color: c.text }]}>Insights</Text>
          <Text style={[styles.insightsText, { color: c.textSecondary }]}>
            Your sugar is slightly higher than ideal fasting range
          </Text>
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
    paddingBottom: 24,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '700', fontFamily: 'Inter' },
  chartCard: { 
    marginHorizontal: 20, 
    borderRadius: 54, 
    borderWidth: 1, 
    padding: 32, 
    marginBottom: 16,
  },
  chartHeader: { gap: 4, marginBottom: 20 },
  chartLabel: { fontSize: 13, fontFamily: 'Inter', fontWeight: '500' },
  chartValue: { fontSize: 34, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -1 },
  graphContainer: { height: 130, alignItems: 'center', justifyContent: 'center' },
  rangeLabel: { position: 'absolute', fontSize: 8, fontWeight: '800', letterSpacing: 0.8 },
  chartLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingHorizontal: 4 },
  chartDateLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 0.4, textTransform: 'uppercase', fontFamily: 'Inter' },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 28, marginBottom: 24, marginTop: 8 },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 13, fontWeight: '500', fontFamily: 'Inter' },
  insightsCard: { 
    marginHorizontal: 20, 
    borderRadius: 54, 
    borderWidth: 1, 
    padding: 48, 
    height: 340, 
    justifyContent: 'center' 
  },
  insightsTitle: { fontSize: 38, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -1, marginBottom: 20 },
  insightsText: { fontSize: 18, fontWeight: '500', lineHeight: 28, fontFamily: 'Inter' },
});
