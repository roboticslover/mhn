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
      <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#F8F9FA' }]}>
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
            <Text style={[styles.heading1, { color: isDark ? '#E2E2E2' : '#141414' }]}>Medical Conditions</Text>
            <Text style={[styles.subtitle, { color: isDark ? '#BCCBB7' : '#6C757D' }]}>
              Please document your current health status to help personalize your care journey.
            </Text>
          </View>

          {/* Condition Input */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6C757D' }]}>CONDITION OR CONCERN</Text>
            <View style={[styles.inputContainer, { 
              backgroundColor: isDark ? 'rgba(28,28,30,0.7)' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.08)'
            }]}>
              <TextInput
                style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#141414' }]}
                placeholder="e.g., High Blood Pressure"
                placeholderTextColor={isDark ? 'rgba(170,170,170,0.4)' : '#999'}
                value={name}
                onChangeText={setName}
              />
              <Ionicons name="medical-outline" size={16} color={isDark ? '#AAA' : '#999'} />
            </View>
          </View>

          {/* Bento Grid */}
          <View style={styles.bentoGrid}>
            {/* Time Since Diagnosis */}
            <View style={[styles.bentoCard, { backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF' }]}>
              <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6C757D' }]}>TIME SINCE DIAGNOSIS</Text>
              <View style={styles.pickersRow}>
                <View style={[styles.pickerBox, { backgroundColor: isDark ? '#353535' : '#F0F0F0' }]}>
                  <TextInput 
                    style={[styles.pickerText, { color: isDark ? '#E2E2E2' : '#141414' }]}
                    value={years}
                    onChangeText={setYears}
                    keyboardType="numeric"
                  />
                  <Text style={[styles.pickerLabel, { color: isDark ? '#E2E2E2' : '#141414' }]}>Years</Text>
                  <Ionicons name="chevron-down" size={14} color={isDark ? '#BCCBB7' : '#666'} />
                </View>
                <View style={[styles.pickerBox, { backgroundColor: isDark ? '#353535' : '#F0F0F0' }]}>
                  <TextInput 
                    style={[styles.pickerText, { color: isDark ? '#E2E2E2' : '#141414' }]}
                    value={months}
                    onChangeText={setMonths}
                    keyboardType="numeric"
                  />
                  <Text style={[styles.pickerLabel, { color: isDark ? '#E2E2E2' : '#141414' }]}>Months</Text>
                  <Ionicons name="chevron-down" size={14} color={isDark ? '#BCCBB7' : '#666'} />
                </View>
              </View>
            </View>

            {/* Current Status */}
            <View style={[styles.bentoCard, { backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF' }]}>
              <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6C757D', marginBottom: 16 }]}>CURRENT STATUS</Text>
              <View style={[styles.statusToggleContainer, { backgroundColor: isDark ? '#0E0E0E' : '#F0F0F0' }]}>
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
                        { color: isActive ? '#131313' : (isDark ? '#BCCBB7' : '#6C757D') }
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
            <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6C757D', marginBottom: 12 }]}>APPROXIMATE ONSET</Text>
            <View style={{ gap: 12 }}>
              {onsetOptions.map(option => {
                const isSelected = approximateOnset === option;
                return (
                  <TouchableOpacity 
                    key={option} 
                    style={[
                      styles.radioCard, 
                      { 
                        backgroundColor: isDark ? 'rgba(31,31,31,0.5)' : '#FFFFFF',
                        borderColor: isSelected 
                          ? (isDark ? '#30D158' : c.primary) 
                          : (isDark ? 'transparent' : 'rgba(0,0,0,0.05)')
                      },
                      isSelected && { borderWidth: 1 }
                    ]}
                    onPress={() => setApproximateOnset(option)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.radioText, { color: isDark ? '#BCCBB7' : '#141414' }]}>{option}</Text>
                    <View style={[
                      styles.radioOuter, 
                      { borderColor: isSelected ? (isDark ? '#30D158' : c.primary) : (isDark ? '#3D4A3B' : '#CCC') }
                    ]}>
                      {isSelected && <View style={[styles.radioInner, { backgroundColor: isDark ? '#55EE71' : c.primary }]} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Current Treatments */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6C757D', marginBottom: 12 }]}>CURRENT TREATMENTS</Text>
            <View style={[styles.textAreaContainer, { backgroundColor: isDark ? '#353535' : '#FFFFFF' }]}>
              <TextInput
                style={[styles.textArea, { color: isDark ? '#E2E2E2' : '#141414' }]}
                placeholder="List medications, therapies, or lifestyle adjustments..."
                placeholderTextColor={isDark ? 'rgba(188,203,183,0.4)' : '#999'}
                value={treatments}
                onChangeText={setTreatments}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Daily Life Impact */}
          <View style={styles.fieldSection}>
            <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6C757D', marginBottom: 12 }]}>DAILY LIFE IMPACT (OPTIONAL)</Text>
            <View style={[styles.textAreaContainer, { backgroundColor: isDark ? '#1B1B1B' : '#FFFFFF' }]}>
              <TextInput
                style={[styles.textArea, { color: isDark ? '#E2E2E2' : '#141414' }]}
                placeholder="e.g., Difficulty climbing stairs, affects sleep..."
                placeholderTextColor={isDark ? 'rgba(188,203,183,0.4)' : '#999'}
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
              <Text style={[styles.saveBtnText, { color: '#003910' }]}>Save Medical Profile</Text>
            </TouchableOpacity>

            {isEdit && (
              <TouchableOpacity
                style={[styles.deleteBtn, { borderColor: 'rgba(255, 75, 75, 0.3)' }]}
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.deleteBtnText}>DELETE</Text>
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
    paddingHorizontal: 29,
    marginTop: 10,
    marginBottom: 32,
    gap: 8,
  },
  heading1: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 26,
    opacity: 0.8,
  },
  fieldSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  inputContainer: {
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
    fontFamily: 'Inter-Medium',
  },
  bentoGrid: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 24,
  },
  bentoCard: {
    borderRadius: 33,
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
    borderRadius: 12,
    padding: 12,
  },
  pickerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    minWidth: 20,
    padding: 0,
  },
  pickerLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 4,
  },
  statusToggleContainer: {
    flexDirection: 'row',
    borderRadius: 9999,
    padding: 6,
  },
  statusBtn: {
    flex: 1,
    borderRadius: 9999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBtnText: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 21,
    borderRadius: 33,
    borderWidth: 1,
  },
  radioText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
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
    borderRadius: 33,
    padding: 20,
    minHeight: 120,
  },
  textArea: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  saveBtnContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 30,
  },
  saveBtn: {
    height: 56,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(48,209,88,0.25)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  saveBtnText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  deleteBtn: {
    height: 56,
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
    color: '#FF4B4B',
  },
});

