import React, { useState, useMemo } from 'react';
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CALENDAR_PADDING = 24;
const DAY_WIDTH = (SCREEN_WIDTH - (CALENDAR_PADDING * 2)) / 7;
const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function PeriodTrackerScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();

  // Current view month (Initializes to current date)
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  // Mock data for period and fertile days
  const periodDays = [1, 2, 3, 4, 5];
  const fertileDays = [15, 16, 17, 18, 19, 20, 21];

  /**
   * CALENDAR LOGIC EXPLANATION (FOR THE USER):
   * 1. Aaj ki date Saturday, April 25, 2026 hai.
   * 2. Hum native JS Date object use kar rahe hain jo ki globally standard hai.
   * 3. 'firstDay' nikalte hain (0=Sunday, 1=Monday... 6=Saturday).
   * 4. 'totalDays' nikalte hain (last day of the month).
   * 5. 'startOffset' calculate karte hain Monday-start ke liye:
   *    - Agar 1st date Sunday (0) hai, toh Monday tak 6 slots empty honge.
   *    - Warna (firstDay - 1) slots empty honge.
   * 6. Array ko 7-7 ke chunks (weeks) mein divide karte hain taaki Sunday hamesha last column mein rahe.
   */
  const weeks = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Day of the week for the 1st (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    // Total days in this month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // startOffset: how many empty cells before the 1st of the month
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    const flatDays: (number | null)[] = [];
    for (let i = 0; i < startOffset; i++) flatDays.push(null);
    for (let i = 1; i <= totalDays; i++) flatDays.push(i);

    // Group into chunks of exactly 7 items
    const chunks = [];
    for (let i = 0; i < flatDays.length; i += 7) {
      chunks.push(flatDays.slice(i, i + 7));
    }
    return chunks;
  }, [currentMonth]);

  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear();
  };

  const renderHeader = () => (
    <View style={[styles.header, { marginTop: insets.top + 10 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
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
      <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : '#666' }]}>STATUS OVERVIEW</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 16 }}>
        <Text style={[styles.statusDay, { color: isDark ? '#FFF' : '#000' }]}>Day 18</Text>
        <Text style={[styles.statusTotal, { color: isDark ? 'rgba(188, 203, 183, 0.4)' : '#666' }]}> of 30</Text>
      </View>

      <View style={[styles.ovulationCard, { backgroundColor: isDark ? '#1F1F1F' : '#F5F5F5', borderColor: isDark ? 'rgba(61, 74, 59, 0.1)' : 'rgba(0,0,0,0.05)' }]}>
        <View style={styles.ovulationHeader}>
          <Text style={styles.ovulationLabel}>OVULATION</Text>
        </View>
        <View style={styles.sliderContainer}>
          <View style={[styles.sliderTrack, { backgroundColor: isDark ? '#353535' : '#E0E0E0' }]} />
          <View style={styles.fertileFill} />
          <View style={[styles.sliderThumb, { borderColor: isDark ? '#131313' : '#FFF' }]} />
        </View>
        <View style={styles.sliderLabelRow}>
          <Text style={styles.dateLabel}>NOV 10</Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.fertileDateRange}>NOV 15-21</Text>
            <Text style={[styles.fertileWindowLabel, { color: isDark ? '#E2E2E2' : '#666' }]}>Fertile Window</Text>
          </View>
          <Text style={styles.dateLabel}>DEC 5</Text>
        </View>
      </View>
    </View>
  );

  const renderSummaryCard = (label: string, value: string, badge: string, badgeColor: string) => (
    <View style={[styles.summaryCard, { backgroundColor: isDark ? '#1F1F1F' : '#F5F5F5' }]}>
      <View>
        <Text style={[styles.summaryLabel, { color: isDark ? '#E2E2E2' : '#333' }]}>{label}</Text>
        <Text style={[styles.summaryValue, { color: isDark ? '#BCCBB7' : '#666' }]}>{value}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: badgeColor + '20' }]}>
        <Text style={[styles.statusBadgeText, { color: badgeColor }]}>{badge}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000' : '#FFF' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderStatusOverview()}

        <View style={styles.section}>
          <View style={styles.summaryHeader}>
            <Ionicons name="stats-chart" size={18} color="#55EE71" />
            <Text style={[styles.summaryTitle, { color: isDark ? '#E2E2E2' : '#000' }]}>Cycle summary</Text>
          </View>
          <View style={{ gap: 12 }}>
            {renderSummaryCard('Previous cycle length', '42 DAYS', 'ABNORMAL', '#FB923C')}
            {renderSummaryCard('Previous period length', '5 DAYS', 'NORMAL', '#55EE71')}
            {renderSummaryCard('Cycle length variation', '+/- 9 DAYS', 'IRREGULAR', '#FB923C')}
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.section}>
          <View style={styles.calendarSectionHeader}>
            <Text style={[styles.calendarLabel, { color: isDark ? '#BCCBB7' : '#666' }]}>CALENDAR</Text>
            <View style={styles.legendOverlay}>
              <View style={styles.legendItemSmall}>
                <View style={[styles.legendDotSmall, { backgroundColor: '#FF6B6B' }]} />
                <Text style={styles.legendTextSmall}>PERIOD</Text>
              </View>
              <View style={styles.legendItemSmall}>
                <View style={[styles.legendDotSmall, { backgroundColor: '#6FFB85' }]} />
                <Text style={styles.legendTextSmall}>FERTILE</Text>
              </View>
            </View>
          </View>

          <View style={styles.calendarHeaderRow}>
            <Text style={[styles.calendarMonth, { color: isDark ? '#E2E2E2' : '#000' }]}>
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </Text>
            <View style={styles.navButtons}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <Ionicons name="chevron-back" size={20} color={isDark ? '#AAA' : '#666'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeMonth(1)}>
                <Ionicons name="chevron-forward" size={20} color={isDark ? '#AAA' : '#666'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.calendarGrid}>
            {/* Header Row (M, T, W...) */}
            <View style={styles.weekRow}>
              {DAYS_OF_WEEK.map((day, i) => (
                <Text key={i} style={[styles.weekdayLabel, { color: isDark ? 'rgba(188, 203, 183, 0.5)' : '#999' }]}>{day}</Text>
              ))}
            </View>

            {/* Week-by-Week Rows */}
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={styles.weekRow}>
                {week.map((day, dayIndex) => {
                  const isPeriod = !!(day && periodDays.includes(day));
                  const isFertile = !!(day && fertileDays.includes(day));
                  const isSelected = day === selectedDay;
                  const isTodayDay = day !== null && isToday(day);

                  return (
                    <TouchableOpacity
                      key={dayIndex}
                      style={styles.dayContainer}
                      onPress={() => day && setSelectedDay(day)}
                      disabled={!day}
                    >
                      {day && (
                        <View style={[
                          styles.dayCapsule,
                          isPeriod && styles.periodCapsule,
                          isFertile && styles.fertileCapsule,
                          isSelected && styles.selectedCapsule,
                          isTodayDay && !isSelected && styles.todayCapsule
                        ]}>
                          <Text style={[
                            styles.dayText,
                            { color: isDark ? '#E2E2E2' : '#333' },
                            (isPeriod || isFertile) && { color: '#FFF' },
                            isSelected && { color: isDark ? '#000' : '#FFF' }
                          ]}>
                            {day}
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerTitle: { fontFamily: 'Manrope-Bold', fontSize: 24 },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6FFB85',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { paddingHorizontal: 24, marginBottom: 32 },
  sectionLabel: { fontFamily: 'Inter-Bold', fontSize: 10, letterSpacing: 1.5, marginBottom: 12 },
  statusDay: { fontFamily: 'Inter-Bold', fontSize: 28 },
  statusTotal: { fontFamily: 'Inter-Medium', fontSize: 20 },
  ovulationCard: { borderRadius: 33, padding: 25, borderWidth: 1 },
  ovulationHeader: { marginBottom: 12, alignItems: 'center' },
  ovulationLabel: { fontFamily: 'Inter-Bold', fontSize: 10, color: '#6FFB85', letterSpacing: 1 },
  sliderContainer: { height: 6, borderRadius: 3, position: 'relative', justifyContent: 'center', marginBottom: 16 },
  sliderTrack: { position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 3 },
  fertileFill: {
    position: 'absolute',
    left: '35%',
    width: '40%',
    height: 6,
    backgroundColor: '#6FFB85',
    borderRadius: 3,
    shadowColor: '#6FFB85',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  sliderThumb: {
    position: 'absolute',
    left: '52%',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6FFB85',
    borderWidth: 2,
    zIndex: 10,
  },
  sliderLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateLabel: { fontFamily: 'Inter-Bold', fontSize: 9, color: '#AAA', letterSpacing: 0.45 },
  fertileDateRange: { fontFamily: 'Inter-Bold', fontSize: 9, color: '#6FFB85', letterSpacing: 0.45 },
  fertileWindowLabel: { fontFamily: 'Inter-Medium', fontSize: 12, marginTop: 2 },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  summaryTitle: { fontFamily: 'Inter-Bold', fontSize: 18 },
  summaryCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderRadius: 33 },
  summaryLabel: { fontFamily: 'Inter-Regular', fontSize: 14 },
  summaryValue: { fontFamily: 'Inter-Bold', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999 },
  statusBadgeText: { fontFamily: 'Inter-Bold', fontSize: 10, textTransform: 'uppercase' },
  calendarSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calendarLabel: { fontFamily: 'Inter-Medium', fontSize: 14, letterSpacing: 1.4, textTransform: 'uppercase' },
  legendOverlay: { flexDirection: 'row', gap: 8 },
  legendItemSmall: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  legendDotSmall: { width: 6, height: 6, borderRadius: 3 },
  legendTextSmall: { fontFamily: 'Inter-ExtraBold', fontSize: 8, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' },
  calendarHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingHorizontal: 0 },
  calendarMonth: { fontFamily: 'Inter-Bold', fontSize: 20 },
  navButtons: { flexDirection: 'row', gap: 16 },
  calendarGrid: { width: '100%' },
  weekRow: { flexDirection: 'row', width: '100%', marginBottom: 4 },
  weekdayLabel: { width: DAY_WIDTH, textAlign: 'center', fontFamily: 'Inter-Bold', fontSize: 10, marginBottom: 12 },
  dayContainer: { width: DAY_WIDTH, height: 44, alignItems: 'center', justifyContent: 'center' },
  dayCapsule: { width: DAY_WIDTH * 0.85, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  dayText: { fontFamily: 'Inter-Bold', fontSize: 14 },
  periodCapsule: { borderWidth: 1, borderColor: '#B50085', backgroundColor: 'rgba(181, 0, 133, 0.1)' },
  fertileCapsule: { borderWidth: 1, borderColor: '#55EE71', backgroundColor: 'rgba(85, 238, 113, 0.1)' },
  selectedCapsule: { backgroundColor: '#6FFB85', shadowColor: '#6FFB85', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  todayCapsule: { borderWidth: 1, borderColor: '#373737' },
});
