import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';

export default function MedicationDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const medication = route?.params?.medication ?? {
    id: '1',
    name: 'Lipitor 20mg',
    genericName: 'Atorvastatin Calcium',
    dosage: '20mg',
    frequency: 'Daily',
    status: 'Active',
    nextDose: 'Today, 20:00',
    startDate: '08 JUN 18',
    endDate: '10 SEP 18',
    prescribedFor: 'High Cholesterol',
    prescribedBy: 'Dr. Sarah Johnson',
    sideEffects: 'Muscle pain, nausea, headache',
    notes: 'Take with food. Avoid grapefruit juice while on this medication.',
  };

  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    Active: {
      bg: isDark ? 'rgba(52,199,89,0.1)' : 'rgba(57,166,87,0.1)',
      text: isDark ? '#34C759' : '#39A657',
      border: isDark ? 'rgba(52,199,89,0.2)' : 'rgba(57,166,87,0.2)',
    },
    Completed: {
      bg: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
      text: isDark ? 'rgba(255,255,255,0.4)' : '#707070',
      border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
    },
    Paused: {
      bg: 'rgba(255,146,0,0.1)',
      text: '#FF9200',
      border: 'rgba(255,146,0,0.2)',
    },
  };
  const statusCfg = statusColors[medication.status] ?? statusColors.Active;

  const infoRows = [
    { icon: 'medical-outline', label: 'Dosage', value: medication.dosage },
    { icon: 'repeat-outline', label: 'Frequency', value: medication.frequency },
    { icon: 'calendar-outline', label: 'Start Date', value: medication.startDate },
    { icon: 'calendar-clear-outline', label: 'End Date', value: medication.endDate },
    { icon: 'person-outline', label: 'Prescribed By', value: medication.prescribedBy ?? 'N/A' },
    { icon: 'fitness-outline', label: 'Prescribed For', value: medication.prescribedFor },
  ];

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
              style={[styles.editBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => navigation.navigate('MedicationEdit', { medication })}
            >
              <Ionicons name="pencil-outline" size={18} color={c.primary} />
            </TouchableOpacity>
          }
        />

        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={[styles.genericName, { color: c.primary, fontFamily: 'Inter-SemiBold' }]}>
            {medication.genericName?.toUpperCase() ?? 'MEDICATION'}
          </Text>
          <Text style={[styles.heroTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-ExtraBold' }]}>
            {medication.name}
          </Text>
          <View style={[styles.statusPill, { backgroundColor: statusCfg.bg, borderColor: statusCfg.border }]}>
            <Text style={[styles.statusText, { color: statusCfg.text }]}>
              {medication.status?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Next Dose Banner */}
        <View style={[styles.nextDoseBanner, {
          backgroundColor: isDark ? 'rgba(52,199,89,0.08)' : 'rgba(57,166,87,0.08)',
          borderColor: isDark ? 'rgba(52,199,89,0.15)' : 'rgba(57,166,87,0.15)',
        }]}>
          <View style={[styles.nextDoseIconBox, { backgroundColor: isDark ? 'rgba(52,199,89,0.15)' : 'rgba(57,166,87,0.12)' }]}>
            <Ionicons name="alarm-outline" size={20} color={c.primary} />
          </View>
          <View style={styles.nextDoseText}>
            <Text style={[styles.nextDoseLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
              NEXT DOSE
            </Text>
            <Text style={[styles.nextDoseValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
              {medication.nextDose}
            </Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
            MEDICATION DETAILS
          </Text>
          <View style={styles.detailCards}>
            {infoRows.map((item, i) => (
              <View
                key={i}
                style={[styles.detailCard, {
                  backgroundColor: isDark ? '#1F1F1F' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
                }]}
              >
                <View style={[styles.detailIconBox, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
                  <Ionicons name={item.icon as any} size={18} color={c.primary} />
                </View>
                <View style={styles.detailText}>
                  <Text style={[styles.detailLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.detailValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-SemiBold' }]}>
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Course Timeline */}
        <View style={[styles.timelineCard, {
          backgroundColor: isDark ? '#1F1F1F' : c.card,
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
        }]}>
          <Text style={[styles.timelineLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
            COURSE TIMELINE
          </Text>
          <View style={styles.timelineRow}>
            <View style={styles.timelineDateBlock}>
              <Text style={[styles.timelineDateText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
                {medication.startDate}
              </Text>
              <Text style={[styles.timelineDateSub, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                Start
              </Text>
            </View>
            <View style={styles.timelineBar}>
              <View style={[styles.timelineTrack, { backgroundColor: isDark ? '#353535' : '#E0E0E0' }]}>
                <View style={[styles.timelineFill, { backgroundColor: c.primary, width: '65%' }]} />
              </View>
            </View>
            <View style={styles.timelineDateBlock}>
              <Text style={[styles.timelineDateText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
                {medication.endDate}
              </Text>
              <Text style={[styles.timelineDateSub, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                End
              </Text>
            </View>
          </View>
        </View>

        {/* Side Effects */}
        {medication.sideEffects && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              KNOWN SIDE EFFECTS
            </Text>
            <View style={[styles.notesCard, {
              backgroundColor: isDark ? '#1F1F1F' : c.card,
              borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
            }]}>
              <Text style={[styles.notesText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                {medication.sideEffects}
              </Text>
            </View>
          </View>
        )}

        {/* Notes */}
        {medication.notes && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              CLINICAL NOTES
            </Text>
            <View style={[styles.notesCard, {
              backgroundColor: isDark ? '#1F1F1F' : c.card,
              borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
            }]}>
              <Text style={[styles.notesText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                {medication.notes}
              </Text>
            </View>
          </View>
        )}

        {/* Edit Button */}
        <TouchableOpacity
          style={[styles.editActionBtn, { backgroundColor: isDark ? '#34C759' : c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MedicationEdit', { medication })}
        >
          <Text style={[styles.editActionText, { fontFamily: 'Inter-Bold' }]}>
            Edit Medication
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 6,
  },
  genericName: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: -1.5,
  },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  nextDoseBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  nextDoseIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextDoseText: { gap: 4 },
  nextDoseLabel: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  nextDoseValue: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  detailCards: { gap: 12 },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 33,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  detailIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: { flex: 1, gap: 2 },
  detailLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  timelineCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  timelineLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timelineDateBlock: {
    alignItems: 'center',
    gap: 2,
  },
  timelineDateText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  timelineDateSub: {
    fontSize: 11,
    lineHeight: 16,
  },
  timelineBar: {
    flex: 1,
  },
  timelineTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  timelineFill: {
    height: '100%',
    borderRadius: 3,
  },
  notesCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  notesText: {
    fontSize: 16,
    lineHeight: 24,
  },
  editActionBtn: {
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  editActionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003910',
    textAlign: 'center',
  },
});
