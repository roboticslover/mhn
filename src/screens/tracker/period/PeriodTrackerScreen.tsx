import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function PeriodTrackerScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // Dec 2025 as per Figma

  // Mock data for period and fertile days
  const periodDays = [1, 2, 3, 4, 5];
  const fertileDays = [16, 17, 18, 19, 20, 21];

  const renderHeader = () => (
    <View style={[styles.header, { marginTop: insets.top + 20 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={isDark ? '#FFF' : '#000'} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#000' }]}>Period tracking</Text>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddPeriod')}
      >
        <Ionicons name="add" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderStatusOverview = () => (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>STATUS OVERVIEW</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 20 }}>
        <Text style={[styles.statusDay, { color: isDark ? '#FFF' : '#000' }]}>Day 18</Text>
        <Text style={[styles.statusTotal, { color: '#666' }]}> of 30</Text>
      </View>
      
      <View style={[styles.ovulationCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
        <Text style={styles.ovulationLabel}>OVULATION</Text>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTrack} />
          <View style={styles.fertileFill} />
          <View style={styles.sliderThumb} />
        </View>
        <View style={styles.sliderLabelRow}>
          <Text style={styles.dateLabel}>NOV 10</Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.fertileDateRange}>NOV 15-21</Text>
            <Text style={styles.fertileWindowLabel}>Fertile Window</Text>
          </View>
          <Text style={styles.dateLabel}>DEC 5</Text>
        </View>
      </View>
    </View>
  );

  const renderSummaryCard = (label: string, value: string, badge: string, badgeColor: string) => (
    <View style={[styles.summaryCard, { backgroundColor: isDark ? '#1A1A1A' : '#F5F5F5' }]}>
      <View>
        <Text style={[styles.summaryLabel, { color: '#666' }]}>{label}</Text>
        <Text style={[styles.summaryValue, { color: isDark ? '#E2E2E2' : '#333' }]}>{value}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: badgeColor + '20' }]}>
        <Text style={[styles.statusBadgeText, { color: badgeColor }]}>{badge}</Text>
      </View>
    </View>
  );

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust firstDay for Monday start (0=Sun, 1=Mon... -> 0=Mon, 6=Sun)
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    for (let i = 0; i < startOffset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return (
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>CALENDAR</Text>
        <View style={styles.calendarHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Text style={[styles.calendarMonth, { color: isDark ? '#FFF' : '#000' }]}>
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity onPress={() => {
                const prev = new Date(currentDate);
                prev.setMonth(prev.getMonth() - 1);
                setCurrentDate(prev);
              }}>
                <Ionicons name="chevron-back" size={20} color="#666" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                const next = new Date(currentDate);
                next.setMonth(next.getMonth() + 1);
                setCurrentDate(next);
              }}>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF4D4D' }]} />
              <Text style={styles.legendText}>PERIOD</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#55EE71' }]} />
              <Text style={styles.legendText}>FERTILE</Text>
            </View>
          </View>
        </View>

        <View style={styles.calendarGrid}>
          {DAYS_OF_WEEK.map((day, i) => (
            <Text key={i} style={styles.weekdayLabel}>{day}</Text>
          ))}
          {days.map((day, i) => {
            const isPeriod = !!(day && periodDays.includes(day));
            const isFertile = !!(day && fertileDays.includes(day));
            const isToday = day === 18;

            return (
              <View key={i} style={styles.dayContainer}>
                {day && (
                  <View style={[
                    styles.dayCircle,
                    isPeriod && styles.periodCircle,
                    isFertile && styles.fertileCircle,
                    isToday && styles.todayCircle
                  ]}>
                    <Text style={[
                      styles.dayText,
                      { color: isDark ? '#FFF' : '#333' },
                      (isPeriod || isFertile || isToday) && { color: '#FFF' }
                    ]}>
                      {day}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {renderHeader()}
        {renderStatusOverview()}
        
        <View style={styles.section}>
          <View style={styles.summaryHeader}>
            <Ionicons name="stats-chart" size={18} color="#55EE71" />
            <Text style={[styles.summaryTitle, { color: isDark ? '#FFF' : '#000' }]}>Cycle summary</Text>
          </View>
          <View style={{ gap: 12 }}>
            {renderSummaryCard('Previous cycle length', '42 DAYS', 'ABNORMAL', '#FF977C')}
            {renderSummaryCard('Previous period length', '5 DAYS', 'NORMAL', '#55EE71')}
            {renderSummaryCard('Cycle length variation', '+/- 9 DAYS', 'IRREGULAR', '#FF977C')}
          </View>
        </View>

        {renderCalendar()}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#55EE71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#666',
    letterSpacing: 1,
    marginBottom: 12,
  },
  statusDay: {
    fontFamily: 'Manrope-Bold',
    fontSize: 28,
  },
  statusTotal: {
    fontFamily: 'Manrope-Medium',
    fontSize: 20,
  },
  ovulationCard: {
    borderRadius: 24,
    padding: 20,
  },
  ovulationLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#55EE71',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 12,
  },
  sliderContainer: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sliderTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  fertileFill: {
    position: 'absolute',
    left: '40%',
    width: '35%',
    height: 6,
    backgroundColor: '#55EE71',
    borderRadius: 3,
    shadowColor: '#55EE71',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  sliderThumb: {
    position: 'absolute',
    left: '52%',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#55EE71',
    borderWidth: 2,
    borderColor: '#000',
    zIndex: 10,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
  },
  fertileDateRange: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#55EE71',
  },
  fertileWindowLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 9,
    color: '#E2E2E2',
    marginTop: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 24,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 9,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarMonth: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontFamily: 'Inter-Bold',
    fontSize: 8,
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekdayLabel: {
    width: (SCREEN_WIDTH - 48) / 7,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#666',
    marginBottom: 16,
  },
  dayContainer: {
    width: (SCREEN_WIDTH - 48) / 7,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  periodCircle: {
    backgroundColor: '#FF4D4D',
    borderWidth: 1,
    borderColor: 'rgba(255,77,77,0.3)',
  },
  fertileCircle: {
    backgroundColor: '#55EE71',
    borderWidth: 1,
    borderColor: 'rgba(85,238,113,0.3)',
  },
  todayCircle: {
    borderWidth: 1,
    borderColor: '#666',
  }
});
