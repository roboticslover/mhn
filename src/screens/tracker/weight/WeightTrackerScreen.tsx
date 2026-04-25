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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WeightTrackerScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const renderHeader = () => (
    <View style={[styles.header, { marginTop: insets.top + 20 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={isDark ? '#FFF' : '#000'} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#000' }]}>Weight Journey</Text>
      <TouchableOpacity 
        style={styles.addWeightBtn}
        onPress={() => navigation.navigate('AddWeight')}
      >
        <Ionicons name="add-circle-outline" size={20} color="#000" />
        <Text style={styles.addWeightText}>Add Weight</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHero = () => (
    <View style={styles.heroSection}>
      <Text style={styles.heroLabel}>WEIGHT JOURNEY</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 4 }}>
        <Text style={[styles.heroValue, { color: isDark ? '#FFF' : '#000' }]}>75</Text>
        <Text style={styles.heroUnit}> kg</Text>
      </View>
      <Text style={styles.lastUpdate}>Latest update: March 14, 2024</Text>
    </View>
  );

  const renderChart = () => (
    <View style={[styles.chartCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
      <View style={styles.chartHeader}>
        <View>
          <Text style={[styles.chartTitle, { color: isDark ? '#FFF' : '#000' }]}>Yearly Overview</Text>
          <View style={styles.progressLabel}>
            <View style={styles.progressDot} />
            <Text style={styles.progressText}>PROGRESS</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.dropdownBtn}>
          <Text style={styles.dropdownText}>Monthly</Text>
          <Ionicons name="chevron-down" size={14} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.chartArea}>
        <Svg width={SCREEN_WIDTH - 88} height={100}>
          <Path
            d="M0,80 Q40,60 80,70 T160,50 T240,80 T320,100"
            fill="none"
            stroke="#55EE71"
            strokeWidth="3"
          />
          <Circle cx="160" cy="50" r="5" fill="#FF977C" />
        </Svg>
        <View style={styles.chartLabels}>
          <Text style={styles.chartAxisLabel}>DEC 2022</Text>
          <Text style={styles.chartAxisLabel}>JUN 2023</Text>
          <Text style={styles.chartAxisLabel}>MAR 2024</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>BASELINE</Text>
          <Text style={[styles.statValue, { color: isDark ? '#E2E2E2' : '#333' }]}>65kg</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>PEAK</Text>
          <Text style={[styles.statValue, { color: isDark ? '#E2E2E2' : '#333' }]}>75kg</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>CURRENT</Text>
          <Text style={[styles.statValue, { color: '#55EE71' }]}>55kg</Text>
        </View>
      </View>
    </View>
  );

  const renderSmallCards = () => (
    <View style={styles.smallCardsRow}>
      <View style={[styles.smallCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
        <View style={styles.smallCardHeader}>
          <Ionicons name="speedometer-outline" size={16} color="#55EE71" />
          <Text style={styles.smallCardLabel}>BMI SCORE</Text>
        </View>
        <Text style={[styles.smallCardValue, { color: isDark ? '#E2E2E2' : '#333' }]}>22.4</Text>
        <Text style={[styles.smallCardSub, { color: '#55EE71' }]}>Healthy Range</Text>
      </View>
      <View style={[styles.smallCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
        <View style={styles.smallCardHeader}>
          <Ionicons name="contract-outline" size={16} color="#55EE71" />
          <Text style={styles.smallCardLabel}>IDEAL TARGET</Text>
        </View>
        <Text style={[styles.smallCardValue, { color: isDark ? '#E2E2E2' : '#333' }]}>52 - 70</Text>
        <Text style={styles.smallCardSub}>Kilograms</Text>
      </View>
    </View>
  );

  const renderBMIStatus = () => (
    <View style={[styles.bmiStatusCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
      <View style={styles.bmiHeader}>
        <Text style={styles.bmiLabel}>BMI</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={[styles.bmiStatus, { color: isDark ? '#E2E2E2' : '#333' }]}>Normal Weight</Text>
          <Ionicons name="checkmark-circle" size={16} color="#55EE71" />
        </View>
      </View>
      <View style={styles.bmiBarContainer}>
        <View style={[styles.bmiBar, { backgroundColor: '#1A334D' }]} />
        <View style={[styles.bmiBar, { backgroundColor: '#55EE71', flex: 1.5 }]} />
        <View style={[styles.bmiBar, { backgroundColor: '#4D261A' }]} />
        <View style={styles.bmiIndicator} />
      </View>
      <View style={styles.bmiBarLabels}>
        <Text style={styles.bmiBarLabelText}>UNDERWEIGHT</Text>
        <Text style={styles.bmiBarLabelText}>NORMAL</Text>
        <Text style={styles.bmiBarLabelText}>OVERWEIGHT</Text>
      </View>
    </View>
  );

  const renderInsight = () => (
    <View style={[styles.insightCard, { backgroundColor: isDark ? '#141414' : '#F9F9F9' }]}>
      <View style={styles.insightBorder} />
      <View style={{ padding: 20 }}>
        <Text style={styles.insightTitle}>AI Health Insight</Text>
        <Text style={styles.insightBody}>
          Your weight has decreased by <Text style={{ color: '#55EE71' }}>12%</Text> over the last quarter. This trend aligns with your metabolic goals. Ensure adequate protein intake to maintain lean muscle mass during this transition.
        </Text>
      </View>
    </View>
  );

  const renderHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>PREVIOUS ENTRY</Text>
      {[
        { weight: '55 kg', date: 'March 14, 2024' },
        { weight: '73 kg', date: 'Jan 2, 2024' },
        { weight: '68 kg', date: 'Nov 18, 2024' },
      ].map((entry, index) => (
        <View key={index} style={[styles.historyCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
          <View>
            <Text style={[styles.historyValue, { color: isDark ? '#E2E2E2' : '#333' }]}>{entry.weight}</Text>
            <Text style={styles.historyDate}>{entry.date}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {renderHeader()}
        {renderHero()}
        {renderChart()}
        {renderSmallCards()}
        {renderBMIStatus()}
        {renderInsight()}
        {renderHistory()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
  },
  addWeightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#55EE71',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addWeightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#000',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  heroLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#666',
    letterSpacing: 1,
  },
  heroValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 48,
  },
  heroUnit: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#55EE71',
  },
  lastUpdate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  chartCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 24,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  chartTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  progressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#55EE71',
  },
  progressText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
    letterSpacing: 1,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    gap: 4,
  },
  dropdownText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#E2E2E2',
  },
  chartArea: {
    height: 120,
    marginBottom: 20,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  chartAxisLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
  },
  smallCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
  },
  smallCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  smallCardLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
  },
  smallCardValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  smallCardSub: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#666',
  },
  bmiStatusCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 24,
    marginBottom: 20,
  },
  bmiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bmiLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#666',
  },
  bmiStatus: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
  },
  bmiBarContainer: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    gap: 4,
    marginBottom: 12,
    position: 'relative',
  },
  bmiBar: {
    flex: 1,
  },
  bmiIndicator: {
    position: 'absolute',
    left: '45%',
    top: -2,
    width: 2,
    height: 10,
    backgroundColor: '#FFF',
    zIndex: 10,
  },
  bmiBarLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bmiBarLabelText: {
    fontFamily: 'Inter-Bold',
    fontSize: 8,
    color: '#666',
  },
  insightCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 32,
  },
  insightBorder: {
    width: 4,
    backgroundColor: '#55EE71',
  },
  insightTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#E2E2E2',
    marginBottom: 8,
  },
  insightBody: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 24,
    marginBottom: 12,
  },
  historyValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  historyDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  editBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#55EE71',
  }
});
