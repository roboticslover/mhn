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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import ScreenHeader from '../../../components/ScreenHeader';

const YEAR_OPTIONS = ['0 Years', '1 Year', '2 Years', '3 Years', '5 Years', '10+ Years'];
const MONTH_OPTIONS = ['0 Months', '1 Month', '2 Months', '3 Months', '6 Months', '9 Months'];
const ONSET_OPTIONS = [
  'Within the last 6 months',
  '6 months - 1 year ago',
  'More than 1 year ago',
];

export default function MedicalConditionsAddEditScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const existing = route?.params?.condition;
  const isEdit = !!existing;

  const [name, setName] = useState(existing?.name ?? '');
  const [selectedStatus, setSelectedStatus] = useState<'Active' | 'Resolved'>(
    existing?.status === 'Resolved' ? 'Resolved' : 'Active'
  );
  const [selectedYear, setSelectedYear] = useState('0 Years');
  const [selectedMonth, setSelectedMonth] = useState('6 Months');
  const [selectedOnset, setSelectedOnset] = useState(ONSET_OPTIONS[0]);
  const [treatment, setTreatment] = useState(
    (existing?.treatments ?? []).map((t: any) => t.title ?? t).join(', ')
  );
  const [impact, setImpact] = useState(existing?.impact ?? '');

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: c.background }]}>
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
          <ScreenHeader title="Conditions" onBack={() => navigation.goBack()} />

          {/* Page Header */}
          <View style={styles.pageHeader}>
            <Text style={[styles.pageTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
              Medical Conditions
            </Text>
            <Text style={[styles.pageSubtitle, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
              Please document your current health status{'\n'}to help personalize your care journey.
            </Text>
          </View>

          {/* Condition Name */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              CONDITION OR CONCERN
            </Text>
            <View style={[styles.inputRow, {
              backgroundColor: isDark ? 'rgba(28,28,30,0.7)' : c.inputBackground,
              borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.inputBorder,
            }]}>
              <TextInput
                style={[styles.textInput, { color: isDark ? '#E2E2E2' : c.inputText, fontFamily: 'Inter-Medium' }]}
                placeholder="e.g., High Blood Pressure"
                placeholderTextColor={isDark ? 'rgba(170,170,170,0.4)' : c.inputPlaceholder}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Time Since Diagnosis */}
          <View style={[styles.bentoCard, { backgroundColor: isDark ? '#1F1F1F' : c.card }]}>
            <Text style={[styles.bentoLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              TIME SINCE DIAGNOSIS
            </Text>
            <View style={styles.pickerRow}>
              <View style={[styles.pickerBox, { backgroundColor: isDark ? '#353535' : '#EBEBEB' }]}>
                {YEAR_OPTIONS.map((y) => (
                  <TouchableOpacity
                    key={y}
                    style={[styles.pickerItem, { justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }]}
                    onPress={() => setSelectedYear(y)}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      {
                        color: selectedYear === y
                          ? (isDark ? '#E2E2E2' : c.text)
                          : (isDark ? 'rgba(226,226,226,0.45)' : c.textSecondary),
                        fontFamily: 'Inter-Medium',
                      },
                    ]}>
                      {y}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[styles.pickerBox, { backgroundColor: isDark ? '#353535' : '#EBEBEB' }]}>
                {MONTH_OPTIONS.map((m) => (
                  <TouchableOpacity
                    key={m}
                    style={styles.pickerItem}
                    onPress={() => setSelectedMonth(m)}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      {
                        color: selectedMonth === m
                          ? (isDark ? '#E2E2E2' : c.text)
                          : (isDark ? 'rgba(226,226,226,0.45)' : c.textSecondary),
                        fontFamily: 'Inter-Medium',
                      },
                    ]}>
                      {m}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Current Status Toggle */}
          <View style={[styles.bentoCard, { backgroundColor: isDark ? '#1F1F1F' : c.card }]}>
            <Text style={[styles.bentoLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              CURRENT STATUS
            </Text>
            <View style={[styles.statusTrack, { backgroundColor: isDark ? '#0E0E0E' : '#EBEBEB' }]}>
              {(['Active', 'Resolved'] as const).map((s) => {
                const isSelected = selectedStatus === s;
                return (
                  <TouchableOpacity
                    key={s}
                    style={[
                      styles.statusBtn,
                      isSelected && { backgroundColor: isDark ? '#55EE71' : c.primary },
                    ]}
                    onPress={() => setSelectedStatus(s)}
                    activeOpacity={0.85}
                  >
                    <Text style={[
                      styles.statusBtnText,
                      {
                        color: isSelected ? '#131313' : (isDark ? '#BCCBB7' : c.textSecondary),
                        fontFamily: 'Inter-Bold',
                      },
                    ]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Approximate Onset */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              APPROXIMATE ONSET
            </Text>
            <View style={styles.onsetList}>
              {ONSET_OPTIONS.map((option) => {
                const isSelected = selectedOnset === option;
                return (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.onsetRow,
                      {
                        backgroundColor: isDark ? '#1F1F1F' : c.card,
                        borderColor: isSelected
                          ? (isDark ? '#55EE71' : c.primary)
                          : (isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder),
                      },
                    ]}
                    onPress={() => setSelectedOnset(option)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.onsetText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Medium' }]}>
                      {option}
                    </Text>
                    <View style={[
                      styles.radioOuter,
                      {
                        borderColor: isSelected
                          ? (isDark ? '#55EE71' : c.primary)
                          : (isDark ? 'rgba(255,255,255,0.2)' : '#CCCCCC'),
                      },
                    ]}>
                      {isSelected && (
                        <View style={[styles.radioInner, { backgroundColor: isDark ? '#55EE71' : c.primary }]} />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Current Treatments */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              CURRENT TREATMENTS
            </Text>
            <View style={[styles.textAreaWrap, { backgroundColor: isDark ? '#1B1B1B' : c.inputBackground }]}>
              <TextInput
                style={[styles.textArea, { color: isDark ? '#E2E2E2' : c.inputText, fontFamily: 'Inter' }]}
                placeholder="List medications, therapies, or lifestyle adjustments..."
                placeholderTextColor={isDark ? 'rgba(188,203,183,0.4)' : c.inputPlaceholder}
                value={treatment}
                onChangeText={setTreatment}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Daily Life Impact (Optional) */}
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              DAILY LIFE IMPACT (OPTIONAL)
            </Text>
            <View style={[styles.textAreaWrap, { backgroundColor: isDark ? '#1B1B1B' : c.inputBackground }]}>
              <TextInput
                style={[styles.textArea, { color: isDark ? '#E2E2E2' : c.inputText, fontFamily: 'Inter' }]}
                placeholder={`e.g., Difficulty climbing stairs, affects sleep...`}
                placeholderTextColor={isDark ? 'rgba(188,203,183,0.4)' : c.inputPlaceholder}
                value={impact}
                onChangeText={setImpact}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveBtn}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.saveBtnText, { fontFamily: 'Inter-Bold' }]}>
              {isEdit ? 'Update Medical Profile' : 'Save Medical Profile'}
            </Text>
          </TouchableOpacity>

          {isEdit && (
            <TouchableOpacity
              style={[styles.deleteBtn, { borderColor: 'rgba(247,4,4,0.62)', backgroundColor: '#2C1A1A' }]}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.deleteBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>DELETE</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: {
    paddingHorizontal: 27,
    paddingBottom: 24,
    gap: 8,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 40,
  },
  pageSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    opacity: 0.8,
  },
  fieldSection: {
    paddingHorizontal: 25,
    marginBottom: 16,
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginLeft: 2,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 21,
    paddingVertical: 17,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  bentoCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    padding: 24,
    gap: 16,
    marginBottom: 16,
  },
  bentoLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerBox: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    paddingVertical: 4,
  },
  pickerItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pickerItemText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  statusTrack: {
    flexDirection: 'row',
    borderRadius: 999,
    padding: 6,
  },
  statusBtn: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBtnText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    paddingLeft: 4,
  },
  onsetList: { gap: 12 },
  onsetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 33,
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 12,
  },
  onsetText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    flex: 1,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  textAreaWrap: {
    borderRadius: 33,
    padding: 4,
  },
  textArea: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    minHeight: 80,
  },
  saveBtn: {
    height: 56,
    borderRadius: 999,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 12,
    shadowColor: 'rgba(48,209,88,0.25)',
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    shadowOpacity: 1,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#003910',
    textAlign: 'center',
  },
  deleteBtn: {
    height: 56,
    borderRadius: 34,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: 8,
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#EC6644',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
