import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';

interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  status: 'Active' | 'Completed' | 'Paused';
  nextDose: string;
  startDate: string;
  endDate: string;
  prescribedFor: string;
}

const SAMPLE_MEDICATIONS: Medication[] = [
  {
    id: '1',
    name: 'Lipitor 20mg',
    genericName: 'Atorvastatin Calcium',
    dosage: '20mg',
    frequency: 'Daily',
    status: 'Active',
    nextDose: 'Today, 20:00',
    startDate: '08\nJUN 18',
    endDate: '10\nSEP 18',
    prescribedFor: 'Headache',
  },
  {
    id: '2',
    name: 'Metformin 500mg',
    genericName: 'Glucophage',
    dosage: '500mg',
    frequency: 'Twice Daily',
    status: 'Completed',
    nextDose: 'Course completed',
    startDate: '08\nJUN 18',
    endDate: '10\nSEP 18',
    prescribedFor: 'Diabetes',
  },
];

const TIMELINE_ITEMS = [
  { time: '20:00', label: 'In 3h 12m', drug: 'Lipitor 20mg', note: 'After Meal' },
  { time: '08:00', label: 'Tomorrow', drug: 'Metformin 500mg', note: 'Morning Dose' },
];

function StatusBadge({ status, isDark }: { status: Medication['status']; isDark: boolean }) {
  const configs = {
    Active: {
      bg: isDark ? 'rgba(52,199,89,0.1)' : 'rgba(57,166,87,0.1)',
      border: isDark ? 'rgba(52,199,89,0.2)' : 'rgba(57,166,87,0.25)',
      text: isDark ? '#34C759' : '#39A657',
    },
    Completed: {
      bg: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
      border: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
      text: isDark ? 'rgba(255,255,255,0.4)' : '#707070',
    },
    Paused: {
      bg: 'rgba(255,146,0,0.1)',
      border: 'rgba(255,146,0,0.2)',
      text: '#FF9200',
    },
  };
  const cfg = configs[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text style={[styles.badgeText, { color: cfg.text }]}>{status.toUpperCase()}</Text>
    </View>
  );
}

export default function MedicationListScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#050505' : c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Medication"
          onBack={() => navigation.goBack()}
          rightElement={
            <TouchableOpacity
              style={[styles.editIconBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => {}}
            >
              <Ionicons name="create-outline" size={18} color={c.primary} />
            </TouchableOpacity>
          }
        />

        {/* Search + Filters */}
        <View style={styles.searchSection}>
          <View style={[styles.searchBar, {
            backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.searchBackground,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.searchBorder,
          }]}>
            <Ionicons name="search-outline" size={20} color={isDark ? 'rgba(255,255,255,0.2)' : c.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: isDark ? '#FFFFFF' : c.searchText, fontFamily: 'Manrope-ExtraBold' }]}
              placeholder="SEARCH MEDICATIONS..."
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.2)' : c.searchPlaceholder}
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterBtn, {
              backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : '#EBEBEB',
              borderColor: isDark ? 'rgba(143,147,120,0.15)' : 'rgba(0,0,0,0.08)',
            }]}>
              <Ionicons name="options-outline" size={14} color={isDark ? '#E2E2E2' : c.text} />
              <Text style={[styles.filterBtnText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>
                FILTERS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addPillBtn, { backgroundColor: '#34C759' }]}
              onPress={() => navigation.navigate('MedicationAdd')}
            >
              <Text style={[styles.addPillText, { fontFamily: 'Manrope-ExtraBold' }]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraBold' }]}>
            TIMELINE • NEXT 24 HOURS
          </Text>
          <View style={styles.timelineList}>
            {TIMELINE_ITEMS.map((item, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot}>
                  <View style={[styles.dotInner, { backgroundColor: '#34C759', shadowColor: '#34C759', shadowOpacity: 0.5, shadowRadius: 4, elevation: 2 }]} />
                  {i < TIMELINE_ITEMS.length - 1 && (
                    <View style={[styles.dotLine, { backgroundColor: isDark ? 'rgba(52,199,89,0.3)' : 'rgba(57,166,87,0.3)' }]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <View style={styles.timelineTopRow}>
                    <Text style={[styles.timelineTime, { color: isDark ? 'rgba(255,255,255,0.8)' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>
                      {item.time}
                    </Text>
                    <Text style={[styles.timelineLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraLight' }]}>
                      {item.label}
                    </Text>
                  </View>
                  <Text style={[styles.timelineDrug, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>
                    {item.drug}
                  </Text>
                  <Text style={[styles.timelineNote, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraLight' }]}>
                    {item.note}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Medication Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraBold' }]}>
            MEDICATION OVERVIEW
          </Text>
          <View style={styles.medCards}>
            {SAMPLE_MEDICATIONS.map((med) => (
              <TouchableOpacity
                key={med.id}
                style={[styles.medCard, {
                  backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                }]}
                activeOpacity={0.75}
                onPress={() => navigation.navigate('MedicationDetail', { medication: med })}
              >
                {/* Card header */}
                <View style={styles.medCardHeader}>
                  <View style={[styles.medIconBox, {
                    backgroundColor: isDark ? 'rgba(23,23,23,0.8)' : '#F0F0F0',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                    borderWidth: 1,
                  }]}>
                    <Ionicons name="medical-outline" size={20} color={c.primary} />
                  </View>
                  <StatusBadge status={med.status} isDark={isDark} />
                </View>

                {/* Name */}
                <View style={styles.medNameBlock}>
                  <Text style={[styles.medName, { color: c.text, fontFamily: 'Manrope-Medium' }]}>
                    {med.name}
                  </Text>
                  <Text style={[styles.medSubname, { color: isDark ? '#C5C9AC' : c.textSecondary, fontFamily: 'Manrope-ExtraLight' }]}>
                    {med.genericName} • {med.frequency}
                  </Text>
                  {med.prescribedFor && (
                    <Text style={[styles.medPrescribed, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraLight' }]}>
                      Prescribed for: {med.prescribedFor}
                    </Text>
                  )}
                </View>

                {/* Divider */}
                <View style={[styles.cardDivider, { borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.divider }]} />

                {/* Dates */}
                <View style={styles.datesRow}>
                  <View style={styles.dateBlock}>
                    <Text style={[styles.dateLabelText, { color: isDark ? '#34C759' : c.primary, fontFamily: 'Manrope-ExtraBold' }]}>
                      START DATE
                    </Text>
                    <View style={[styles.dateCard, {
                      backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.surface,
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                    }]}>
                      <View style={[styles.dateAccentBar, { backgroundColor: isDark ? '#34C759' : c.primary }]} />
                      <View style={styles.dateCardContent}>
                        <Text style={[styles.dateDayNum, { color: c.text, fontFamily: 'Inter-Bold' }]}>
                          {med.startDate.split('\n')[0]}
                        </Text>
                        <Text style={[styles.dateMonth, { color: isDark ? '#9CA3AF' : c.textSecondary, fontFamily: 'Inter-SemiBold' }]}>
                          {med.startDate.split('\n')[1]}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.dateBlock}>
                    <Text style={[styles.dateLabelText, { color: '#F56565', fontFamily: 'Manrope-ExtraBold' }]}>
                      END DATE
                    </Text>
                    <View style={[styles.dateCard, {
                      backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.surface,
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                    }]}>
                      <View style={[styles.dateAccentBar, { backgroundColor: '#F56565' }]} />
                      <View style={styles.dateCardContent}>
                        <Text style={[styles.dateDayNum, { color: c.text, fontFamily: 'Inter-Bold' }]}>
                          {med.endDate.split('\n')[0]}
                        </Text>
                        <Text style={[styles.dateMonth, { color: isDark ? '#9CA3AF' : c.textSecondary, fontFamily: 'Inter-SemiBold' }]}>
                          {med.endDate.split('\n')[1]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Next dose */}
                <View style={[styles.cardDivider, { borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.divider }]} />
                <View style={styles.nextDoseRow}>
                  <View style={styles.nextDoseInfo}>
                    <Text style={[styles.nextDoseLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraBold' }]}>
                      NEXT DOSE
                    </Text>
                    <View style={styles.nextDoseValueRow}>
                      <Ionicons name="time-outline" size={13} color={c.primary} />
                      <Text style={[styles.nextDoseValue, { color: isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary, fontFamily: 'Manrope-ExtraLight' }]}>
                        {med.nextDose}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={12} color={isDark ? 'rgba(255,255,255,0.3)' : c.textTertiary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Saved Prescriptions Section */}
        <View style={styles.section}>
          <View style={styles.savedPresHeader}>
            <Text style={[styles.sectionLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraBold' }]}>
              Saved Prescriptions
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: c.primary, fontFamily: 'Inter-Bold' }]}>See All →</Text>
            </TouchableOpacity>
          </View>
          {[
            { date: '31 OCT', name: 'Dolo 650', badge: 'NEW', badgeColor: '#34C759' },
            { date: '21 OCT', name: 'Lipitor 20mg', badge: 'ONGOING', badgeColor: '#FF9200' },
            { date: '14 OCT', name: 'Metamarfin 500mg', badge: 'FINISHED', badgeColor: isDark ? 'rgba(255,255,255,0.4)' : '#707070' },
          ].map((item, i) => (
            <View key={i} style={[styles.prescriptionRow, {
              backgroundColor: isDark ? 'rgba(23,23,23,0.3)' : c.surface,
              borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.divider,
            }]}>
              <Text style={[styles.prescriptionDate, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary, fontFamily: 'Manrope-ExtraLight' }]}>
                {item.date}
              </Text>
              <Ionicons name="document-text-outline" size={16} color={isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary} />
              <Text style={[styles.prescriptionName, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope-ExtraLight' }]}>
                {item.name}
              </Text>
              <View style={[styles.prescriptionBadge, { borderColor: item.badgeColor }]}>
                <View style={[styles.badgeDot, { backgroundColor: item.badgeColor }]} />
                <Text style={[styles.prescriptionBadgeText, { color: item.badgeColor, fontFamily: 'Manrope-ExtraBold' }]}>
                  {item.badge}
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="download-outline" size={16} color={isDark ? 'rgba(255,255,255,0.4)' : c.textTertiary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  editIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 48,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    letterSpacing: 1.4,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 70,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  filterBtnText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  addPillBtn: {
    borderRadius: 108,
    paddingHorizontal: 28,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPillText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    paddingHorizontal: 25,
    marginBottom: 32,
    gap: 16,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  timelineList: { gap: 0 },
  timelineItem: {
    flexDirection: 'row',
    gap: 24,
  },
  timelineDot: {
    alignItems: 'center',
    width: 12,
  },
  dotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  dotLine: {
    width: 1,
    flex: 1,
    minHeight: 50,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
    gap: 2,
  },
  timelineTopRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  timelineTime: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  timelineLabel: {
    fontSize: 12,
  },
  timelineDrug: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  timelineNote: {
    fontSize: 12,
  },
  medCards: { gap: 16 },
  medCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 33,
    gap: 24,
  },
  medCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medIconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  medNameBlock: { gap: 4 },
  medName: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 36,
    letterSpacing: -0.75,
  },
  medSubname: {
    fontSize: 16,
    lineHeight: 24,
  },
  medPrescribed: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardDivider: {
    borderTopWidth: 1,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 16,
  },
  dateBlock: {
    flex: 1,
    gap: 8,
  },
  dateLabelText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dateCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    height: 120,
  },
  dateAccentBar: {
    height: 6,
    width: '100%',
  },
  dateCardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  dateDayNum: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 40,
  },
  dateMonth: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  nextDoseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nextDoseInfo: { gap: 4 },
  nextDoseLabel: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  nextDoseValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextDoseValue: {
    fontSize: 16,
    lineHeight: 24,
  },
  savedPresHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  prescriptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  prescriptionDate: {
    fontSize: 12,
    width: 40,
  },
  prescriptionName: {
    flex: 1,
    fontSize: 14,
  },
  prescriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  prescriptionBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
