import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';

const FREQUENCY_OPTIONS = ['Daily', 'Twice Daily', 'Weekly', 'Monthly', 'As Needed'];

interface ReminderTime {
  time: string;
  label: string;
  enabled: boolean;
}

export default function MedicationAddEditScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const existing = route?.params?.medication;
  const isEdit = !!existing;

  const [name, setName] = useState(existing?.name ?? '');
  const [prescribedFor, setPrescribedFor] = useState(existing?.prescribedFor ?? '');
  const [dosage, setDosage] = useState(existing?.dosage ?? '');
  const [selectedFrequency, setSelectedFrequency] = useState(existing?.frequency ?? '');
  const [startDate, setStartDate] = useState('10/24/2024');
  const [endDate, setEndDate] = useState('10/24/2024');
  const [timeline, setTimeline] = useState('');
  const [sideEffects, setSideEffects] = useState('');
  const [reminders, setReminders] = useState<ReminderTime[]>([
    { time: '04:00', label: 'Metformin, Daily Morning', enabled: true },
    { time: '21:30', label: 'Metformin, Mon, Wed Night', enabled: false },
  ]);

  const inputStyle = [
    styles.input,
    {
      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : c.inputBackground,
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : c.inputBorder,
      color: isDark ? '#E2E2E2' : c.inputText,
    },
  ];

  const labelStyle = [
    styles.label,
    { color: isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary, fontFamily: 'Manrope-ExtraBold' },
  ];

  const toggleReminder = (index: number) => {
    const updated = [...reminders];
    updated[index] = { ...updated[index], enabled: !updated[index].enabled };
    setReminders(updated);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: isDark ? '#050505' : c.background }]}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ScreenHeader title="Medication" onBack={() => navigation.goBack()} />

          {/* Modal Card */}
          <View style={[styles.modalCard, {
            backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
          }]}>
            {/* Close button (top right) */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={16} color={isDark ? 'rgba(255,255,255,0.5)' : c.textSecondary} />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.modalHeader}>
              {isEdit && (
                <Text style={[styles.modalSubtitle, { color: c.primary, fontFamily: 'Manrope' }]}>
                  SYSTEM PROTOCOL
                </Text>
              )}
              <Text style={[styles.modalTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope' }]}>
                {isEdit ? 'Edit\nMedication' : 'New\nMedication'}
              </Text>
            </View>

            {/* Pill Icon Visual Anchor */}
            <View style={styles.visualAnchor}>
              <View style={[styles.pillGlow, { backgroundColor: isDark ? 'rgba(201,243,0,0.2)' : 'rgba(52,199,89,0.15)' }]} />
              <View style={[styles.pillIconBox, {
                backgroundColor: isDark ? 'rgba(52,199,89,0.15)' : 'rgba(52,199,89,0.1)',
                borderColor: isDark ? 'rgba(52,199,89,0.3)' : 'rgba(52,199,89,0.2)',
              }]}>
                <Ionicons name="medical" size={40} color={isDark ? '#34C759' : c.primary} />
              </View>
            </View>

            <View style={styles.fields}>
              {/* Medication Name */}
              <View>
                <Text style={labelStyle}>MEDICATION NAME</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="eg. Atorvastatin"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Prescribed For */}
              <View>
                <Text style={labelStyle}>PRESCRIBED FOR</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. Asthma"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={prescribedFor}
                  onChangeText={setPrescribedFor}
                />
              </View>

              {/* Dosage + Frequency Row */}
              <View style={styles.rowFields}>
                <View style={styles.halfField}>
                  <Text style={labelStyle}>DOSAGE (MG/UNITS)</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="20"
                    placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                    value={dosage}
                    onChangeText={setDosage}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.halfField}>
                  <Text style={labelStyle}>FREQUENCY</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="Daily"
                    placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                    value={selectedFrequency}
                    onChangeText={setSelectedFrequency}
                  />
                </View>
              </View>

              {/* Frequency Chips */}
              <View style={styles.chipsRow}>
                {FREQUENCY_OPTIONS.map((f) => (
                  <TouchableOpacity
                    key={f}
                    style={[styles.chip, {
                      backgroundColor: selectedFrequency === f
                        ? (isDark ? '#6FFB85' : c.primary)
                        : (isDark ? 'rgba(23,23,23,0.6)' : c.chipBackground),
                      borderColor: selectedFrequency === f ? 'transparent' : (isDark ? 'rgba(255,255,255,0.08)' : c.chipBorder),
                    }]}
                    onPress={() => setSelectedFrequency(f)}
                  >
                    <Text style={[styles.chipText, {
                      color: selectedFrequency === f ? '#000' : (isDark ? '#AAAAAA' : c.chipText),
                      fontFamily: 'Inter-SemiBold',
                    }]}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Start Date */}
              <View>
                <Text style={labelStyle}>START DATE</Text>
                <View style={[styles.dateInput, {
                  backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : c.inputBackground,
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : c.inputBorder,
                }]}>
                  <Text style={[styles.dateInputText, { color: isDark ? '#E2E2E2' : c.inputText, fontFamily: 'Inter' }]}>
                    {startDate}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color={isDark ? '#6E7681' : c.textSecondary} />
                </View>
              </View>

              {/* End Date */}
              <View>
                <Text style={labelStyle}>END DATE</Text>
                <View style={[styles.dateInput, {
                  backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : c.inputBackground,
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : c.inputBorder,
                }]}>
                  <Text style={[styles.dateInputText, { color: isDark ? '#E2E2E2' : c.inputText, fontFamily: 'Inter' }]}>
                    {endDate}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color={isDark ? '#6E7681' : c.textSecondary} />
                </View>
              </View>

              {isEdit && (
                <View>
                  <Text style={labelStyle}>TIMELINE</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="e.g. 3 months"
                    placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                    value={timeline}
                    onChangeText={setTimeline}
                  />
                </View>
              )}

              {/* Set Reminders */}
              <View style={[styles.remindersSection, {
                backgroundColor: isDark ? '#131313' : c.surface,
                borderColor: isDark ? 'rgba(143,147,120,0.2)' : c.cardBorder,
              }]}>
                <View style={styles.remindersHeader}>
                  <Ionicons name="alarm-outline" size={12} color={isDark ? '#C5C9AC' : c.textSecondary} />
                  <Text style={[styles.remindersTitle, { color: isDark ? '#C5C9AC' : c.textSecondary, fontFamily: 'Inter-SemiBold' }]}>
                    SET REMINDERS
                  </Text>
                  <TouchableOpacity style={[styles.addReminderBtn, {
                    backgroundColor: isDark ? 'rgba(52,199,89,0.1)' : 'rgba(57,166,87,0.1)',
                    borderColor: isDark ? 'rgba(52,199,89,0.3)' : 'rgba(57,166,87,0.2)',
                  }]}>
                    <Ionicons name="add" size={18} color={c.primary} />
                  </TouchableOpacity>
                </View>

                {reminders.map((reminder, i) => (
                  <View key={i} style={[styles.reminderRow, {
                    backgroundColor: isDark ? '#131313' : c.surface,
                  }]}>
                    <View style={styles.reminderTimeBlock}>
                      <Text style={[styles.reminderTime, { color: c.text, fontFamily: 'Inter-SemiBold' }]}>
                        {reminder.time}
                      </Text>
                      <Text style={[styles.reminderLabel, { color: isDark ? '#ABABAB' : c.textSecondary, fontFamily: 'Inter' }]}>
                        {reminder.label}
                      </Text>
                    </View>
                    <View style={styles.reminderRight}>
                      <Switch
                        value={reminder.enabled}
                        onValueChange={() => toggleReminder(i)}
                        trackColor={{ false: isDark ? '#353535' : '#D1D5DB', true: '#34C759' }}
                        thumbColor="#FFFFFF"
                        style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                      />
                      <TouchableOpacity>
                        <Ionicons name="close" size={12} color={isDark ? 'rgba(255,255,255,0.3)' : c.textTertiary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              {/* Medication Photo (edit only) */}
              {isEdit && (
                <View>
                  <View style={styles.photoHeader}>
                    <Text style={labelStyle}>MEDICATION PHOTO</Text>
                    <TouchableOpacity>
                      <Text style={[styles.addFileText, { color: c.primary, fontFamily: 'Manrope-ExtraBold' }]}>+ ADD NEW FILE</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.fileRow, {
                    backgroundColor: isDark ? 'rgba(31,31,31,0.5)' : c.inputBackground,
                    borderColor: isDark ? 'rgba(68,73,51,0.1)' : c.inputBorder,
                  }]}>
                    <View style={styles.fileInfo}>
                      <Ionicons name="document-text-outline" size={14} color={isDark ? '#E2E2E2' : c.text} />
                      <Text style={[styles.fileName, { color: c.text, fontFamily: 'Manrope-ExtraLight' }]}>
                        Medication_Scan.pdf
                      </Text>
                    </View>
                    <TouchableOpacity style={{ opacity: 0.4 }}>
                      <Ionicons name="trash-outline" size={16} color={isDark ? '#E2E2E2' : c.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Side Effects */}
              <View>
                <Text style={labelStyle}>SIDE EFFECTS (OPTIONAL)</Text>
                <TextInput
                  style={[inputStyle, styles.textArea]}
                  placeholder="Side effects"
                  placeholderTextColor={isDark ? 'rgba(255,255,255,0.6)' : c.inputPlaceholder}
                  value={sideEffects}
                  onChangeText={setSideEffects}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[styles.saveBtn, { shadowColor: isDark ? 'rgba(209,252,0,0.2)' : 'transparent' }]}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.saveBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
                {isEdit ? 'UPDATE DRUG USAGE' : 'SAVE'}
              </Text>
            </TouchableOpacity>

            {/* Delete (edit only) */}
            {isEdit && (
              <TouchableOpacity
                style={[styles.deleteBtn, { borderColor: 'rgba(247,4,4,0.62)', backgroundColor: '#2C1A1A' }]}
                activeOpacity={0.85}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.deleteBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>DELETE</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalCard: {
    marginHorizontal: 18,
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 33,
    gap: 18,
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    width: 28,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: { gap: 8, paddingTop: 8 },
  modalSubtitle: {
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  modalTitle: {
    fontSize: 36,
    fontWeight: '400',
    lineHeight: 40,
    letterSpacing: 3,
    textTransform: 'capitalize',
  },
  visualAnchor: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  pillGlow: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 12,
    opacity: 0.5,
  },
  pillIconBox: {
    width: 96,
    height: 96,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fields: { gap: 20 },
  label: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    height: 56,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Inter',
  },
  textArea: {
    height: 82,
    paddingTop: 16,
    borderRadius: 33,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: { flex: 1 },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateInput: {
    height: 56,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInputText: {
    fontSize: 16,
  },
  remindersSection: {
    borderRadius: 32,
    borderWidth: 1,
    overflow: 'hidden',
    gap: 0,
  },
  remindersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 26,
    paddingVertical: 16,
  },
  remindersTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    flex: 1,
  },
  addReminderBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 50,
  },
  reminderTimeBlock: { flex: 1, gap: 2 },
  reminderTime: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 50,
  },
  reminderLabel: {
    fontSize: 12,
    lineHeight: 20,
  },
  reminderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addFileText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17,
    borderRadius: 4,
    borderWidth: 1,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileName: {
    fontSize: 14,
    letterSpacing: 0.35,
  },
  saveBtn: {
    height: 64,
    borderRadius: 40,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    shadowOpacity: 1,
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  deleteBtn: {
    height: 56,
    borderRadius: 34,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EC6644',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
