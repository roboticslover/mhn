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
import { Ionicons } from '@expo/vector-icons';

export default function MedicalConditionsAddEditScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const existing = route?.params?.condition;
  const isEdit = !!existing;

  const [name, setName] = useState(existing?.name ?? '');
  const [years, setYears] = useState('0');
  const [months, setMonths] = useState('6');
  const [status, setStatus] = useState<'Active' | 'Resolved'>(existing?.status ?? 'Active');
  const [approximateOnset, setApproximateOnset] = useState(existing?.approximateOnset ?? 'Within the last month');
  const [treatments, setTreatments] = useState(existing?.treatments ?? '');
  const [impact, setImpact] = useState(existing?.impact ?? '');

  const onsetOptions = [
    'Within the last month',
    '1-6 months ago',
    '6 months - 1 year ago',
    'More than 1 year ago',
  ];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: c.background }]}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ScreenHeader
            title="Conditions"
            onBack={() => navigation.goBack()}
          />

          <View style={styles.headerSection}>
            <Text style={[styles.heading1, { color: c.text }]}>Medical Conditions</Text>
            <Text style={[styles.subtitle, { color: c.textSecondary }]}>
              Please document your current health status to help personalize your care journey.
            </Text>
          </View>

          {/* Condition Input */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: c.textSecondary }]}>CONDITION OR CONCERN</Text>
            <View style={[styles.inputContainer, { 
              backgroundColor: c.inputBackground,
              borderColor: c.inputBorder,
              borderWidth: 1,
            }]}>
              <TextInput
                style={[styles.textInput, { color: c.text }]}
                placeholder="e.g., High Blood Pressure"
                placeholderTextColor={c.textTertiary}
                value={name}
                onChangeText={setName}
              />
              <Ionicons name="medical-outline" size={20} color={c.textTertiary} />
            </View>
          </View>

          {/* Bento Grid */}
          <View style={styles.bentoGrid}>
            {/* Time Since Diagnosis */}
            <View style={[styles.bentoCard, { backgroundColor: c.card, borderColor: c.cardBorder, borderWidth: 1 }]}>
              <Text style={[styles.label, { color: c.textSecondary }]}>TIME SINCE DIAGNOSIS</Text>
              <View style={styles.pickersRow}>
                <View style={[styles.pickerBox, { backgroundColor: c.inputBackground, borderColor: c.inputBorder, borderWidth: 1 }]}>
                  <TextInput 
                    style={[styles.pickerText, { color: c.text }]}
                    value={years}
                    onChangeText={setYears}
                    keyboardType="numeric"
                  />
                  <Text style={[styles.pickerLabel, { color: c.text }]}>Years</Text>
                  <Ionicons name="chevron-down" size={16} color={c.textSecondary} />
                </View>
                <View style={[styles.pickerBox, { backgroundColor: c.inputBackground, borderColor: c.inputBorder, borderWidth: 1 }]}>
                  <TextInput 
                    style={[styles.pickerText, { color: c.text }]}
                    value={months}
                    onChangeText={setMonths}
                    keyboardType="numeric"
                  />
                  <Text style={[styles.pickerLabel, { color: c.text }]}>Months</Text>
                  <Ionicons name="chevron-down" size={16} color={c.textSecondary} />
                </View>
              </View>
            </View>

            {/* Current Status */}
            <View style={[styles.bentoCard, { backgroundColor: c.card, borderColor: c.cardBorder, borderWidth: 1 }]}>
              <Text style={[styles.label, { color: c.textSecondary, marginBottom: 16 }]}>CURRENT STATUS</Text>
              <View style={[styles.statusToggleContainer, { backgroundColor: c.inputBackground }]}>
                {(['Active', 'Resolved'] as const).map((s) => {
                  const isActive = status === s;
                  return (
                    <TouchableOpacity
                      key={s}
                      style={[
                        styles.statusBtn,
                        isActive && { backgroundColor: c.primary }
                      ]}
                      onPress={() => setStatus(s)}
                      activeOpacity={0.8}
                    >
                      <Text style={[
                        styles.statusBtnText,
                        { color: isActive ? (isDark ? '#003910' : '#FFFFFF') : c.textSecondary }
                      ]}>
                        {s}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Approximate Onset */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: c.textSecondary, marginBottom: 12 }]}>APPROXIMATE ONSET</Text>
            <View style={{ gap: 12 }}>
              {onsetOptions.map(option => {
                const isSelected = approximateOnset === option;
                return (
                  <TouchableOpacity 
                    key={option} 
                    style={[
                      styles.radioCard, 
                      { 
                        backgroundColor: c.card,
                        borderColor: isSelected ? c.primary : c.cardBorder,
                        borderWidth: 1,
                      }
                    ]}
                    onPress={() => setApproximateOnset(option)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.radioText, { color: c.text }]}>{option}</Text>
                    <View style={[
                      styles.radioOuter, 
                      { borderColor: isSelected ? c.primary : c.textTertiary }
                    ]}>
                      {isSelected && <View style={[styles.radioInner, { backgroundColor: c.primary }]} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Current Treatments */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: c.textSecondary, marginBottom: 12 }]}>CURRENT TREATMENTS</Text>
            <View style={[styles.textAreaContainer, { backgroundColor: c.inputBackground, borderColor: c.inputBorder, borderWidth: 1 }]}>
              <TextInput
                style={[styles.textArea, { color: c.text }]}
                placeholder="List medications, therapies, or lifestyle adjustments..."
                placeholderTextColor={c.textTertiary}
                value={treatments}
                onChangeText={setTreatments}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Daily Life Impact */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: c.textSecondary, marginBottom: 12 }]}>DAILY LIFE IMPACT (OPTIONAL)</Text>
            <View style={[styles.textAreaContainer, { backgroundColor: c.inputBackground, borderColor: c.inputBorder, borderWidth: 1 }]}>
              <TextInput
                style={[styles.textArea, { color: c.text }]}
                placeholder="e.g., Difficulty climbing stairs, affects sleep..."
                placeholderTextColor={c.textTertiary}
                value={impact}
                onChangeText={setImpact}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.saveBtnContainer}>
            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: c.primary }]}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.saveBtnText, { color: isDark ? '#003910' : '#FFFFFF' }]}>Save Medical Profile</Text>
            </TouchableOpacity>

            {isEdit && (
              <TouchableOpacity
                style={[styles.deleteBtn, { borderColor: c.errorSoft }]}
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
              >
                <Text style={[styles.deleteBtnText, { color: c.error }]}>DELETE PROFILE</Text>
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
  headerSection: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 32,
    gap: 8,
  },
  heading1: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  fieldSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  bentoGrid: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 16,
  },
  bentoCard: {
    borderRadius: 24,
    padding: 24,
  },
  pickersRow: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    minWidth: 24,
    padding: 0,
  },
  pickerLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  statusToggleContainer: {
    flexDirection: 'row',
    borderRadius: 9999,
    padding: 6,
  },
  statusBtn: {
    flex: 1,
    borderRadius: 9999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBtnText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 24,
  },
  radioText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  textAreaContainer: {
    borderRadius: 24,
    padding: 20,
    minHeight: 140,
  },
  textArea: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
  },
  saveBtnContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 32,
  },
  saveBtn: {
    height: 60,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  deleteBtn: {
    height: 60,
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  deleteBtnText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1,
  },
});

