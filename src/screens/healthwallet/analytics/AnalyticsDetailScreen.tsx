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
import Svg, { Line, Circle, Path } from 'react-native-svg';
import BottomNavBar from '../../../components/BottomNavBar';

function ChartCard({ title, value, colors }: { title: string; value: string; colors: any }) {
  return (
    <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.cardGlassBorder }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartLabel, { color: colors.textSecondary, fontFamily: 'Inter' }]}>{title}</Text>
        <Text style={[styles.chartValue, { color: colors.text, fontFamily: 'Inter' }]}>{value}</Text>
      </View>
      <View style={styles.chartArea}>
        <Svg width="100%" height={80}>
          <Line x1="0" y1="20" x2="100%" y2="20" stroke={colors.cardGlassBorder} strokeWidth={1} strokeDasharray="4,4" />
          <Line x1="0" y1="60" x2="100%" y2="60" stroke={colors.cardGlassBorder} strokeWidth={1} strokeDasharray="4,4" />
          <Path d="M 10 60 Q 60 55, 100 40 T 200 25 T 280 35" fill="none" stroke={colors.primary} strokeWidth={2} />
          <Circle cx={10} cy={60} r={4} fill={colors.warning} stroke={colors.text} strokeWidth={2} />
          <Circle cx={100} cy={40} r={4} fill={colors.warning} stroke={colors.text} strokeWidth={2} />
          <Circle cx={200} cy={25} r={4} fill={colors.warning} stroke={colors.text} strokeWidth={2} />
          <Circle cx={280} cy={35} r={4} fill={colors.warning} stroke={colors.text} strokeWidth={2} />
        </Svg>
        <View style={styles.chartLabelsRow}>
          <Text style={[styles.chartDateLabel, { color: colors.textMuted, fontFamily: 'Inter' }]}>DEC 2022</Text>
          <Text style={[styles.chartDateLabel, { color: colors.textMuted, fontFamily: 'Inter' }]}>MAR 2024</Text>
          <Text style={[styles.chartDateLabel, { color: colors.textMuted, fontFamily: 'Inter' }]}>APR 2024</Text>
          <Text style={[styles.chartDateLabel, { color: colors.textMuted, fontFamily: 'Inter' }]}>JUNE 2023</Text>
        </View>
      </View>
      <View style={styles.chartLevelsRight}>
        <Text style={[styles.chartLevelText, { color: colors.textMuted, fontFamily: 'Inter' }]}>99 MG/DL</Text>
        <Text style={[styles.chartLevelText, { color: colors.textMuted, fontFamily: 'Inter' }]}>75 MG/DL</Text>
      </View>
    </View>
  );
}

export default function AnalyticsDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Blood Glucose</Text>
          <View style={{ width: 24 }} />
        </View>

        <ChartCard title="Blood Glucose level" value="129 mg/dL" colors={c} />
        <ChartCard title="Blood Glucose level" value="129 mg/dL" colors={c} />
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: c.primary }]} />
          <Text style={[styles.legendText, { color: c.textSecondary, fontFamily: 'Inter' }]}>Normal / Ideal health:  70 – 99 mg/dL</Text>
        </View>
        <View style={[styles.insightsCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <Text style={[styles.insightsTitle, { color: c.text, fontFamily: 'Inter' }]}>Insights</Text>
          <Text style={[styles.insightsText, { color: c.textSecondary, fontFamily: 'Inter' }]}>
            Your sugar is slightly higher than ideal fasting range
          </Text>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="card" navigation={navigation} />
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
    paddingBottom: 16,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  chartCard: { marginHorizontal: 20, borderRadius: 48, borderWidth: 1, padding: 36, marginBottom: 16, position: 'relative' },
  chartHeader: { gap: 4, marginBottom: 24 },
  chartLabel: { fontSize: 12, lineHeight: 16 },
  chartValue: { fontSize: 30, fontWeight: '700', letterSpacing: -0.75 },
  chartArea: { height: 120 },
  chartLabelsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  chartDateLabel: { fontSize: 8, fontWeight: '800', letterSpacing: 0.4, textTransform: 'uppercase' },
  chartLevelsRight: { position: 'absolute', right: 20, top: 100, gap: 40 },
  chartLevelText: { fontSize: 8, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 21, marginBottom: 20 },
  legendDot: { width: 12, height: 12, borderRadius: 8 },
  legendText: { fontSize: 12, lineHeight: 16 },
  insightsCard: { marginHorizontal: 20, borderRadius: 48, borderWidth: 1, padding: 44, height: 310, justifyContent: 'flex-end' },
  insightsTitle: { fontSize: 34, fontWeight: '700', letterSpacing: -0.68, marginBottom: 16 },
  insightsText: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
});
