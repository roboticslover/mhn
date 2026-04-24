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
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';

const ALLERGY_TYPES = ['Food', 'Drug', 'Environmental', 'Contact', 'Other'];
const SEVERITY_LEVELS = ['Mild', 'Moderate', 'Severe'];

export default function AllergiesAddEditScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const existingAllergy = route?.params?.allergy;
  const isEdit = !!existingAllergy;

  const [name, setName] = useState(existingAllergy?.name ?? '');
  const [selectedType, setSelectedType] = useState(existingAllergy?.type ?? '');
  const [selectedSeverity, setSelectedSeverity] = useState(existingAllergy?.severity ?? '');
  const [reaction, setReaction] = useState(existingAllergy?.reaction ?? '');
  const [triggersInput, setTriggersInput] = useState((existingAllergy?.triggers ?? []).join(', '));
  const [diagnosedDate, setDiagnosedDate] = useState(existingAllergy?.diagnosedDate ?? '');
  const [treatment, setTreatment] = useState(existingAllergy?.treatment ?? '');
  const [notes, setNotes] = useState(existingAllergy?.notes ?? '');

  const inputStyle = [
    styles.input,
    {
      backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : c.inputBackground,
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : c.inputBorder,
      color: isDark ? '#E2E2E2' : c.inputText,
    },
  ];

  const labelStyle = [styles.label, { color: isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary, fontFamily: 'Manrope-ExtraBold' }];

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
          <ScreenHeader
            title="Allergies & Triggers"
            onBack={() => navigation.goBack()}
          />

          <View style={[styles.modalCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalSubtitle, { color: c.primary, fontFamily: 'Manrope' }]}>
                ALLERGY PROFILE
              </Text>
              <Text style={[styles.modalTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope' }]}>
                {isEdit ? 'Edit\nAllergy' : 'New\nAllergy'}
              </Text>
            </View>

            <View style={styles.fields}>
              {/* Allergy Name */}
              <View>
                <Text style={labelStyle}>ALLERGY NAME</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. Peanut Allergy"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Type Chips */}
              <View>
                <Text style={labelStyle}>TYPE</Text>
                <View style={styles.chipsRow}>
                  {ALLERGY_TYPES.map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: selectedType === t
                            ? (isDark ? '#6FFB85' : c.primary)
                            : (isDark ? 'rgba(23,23,23,0.6)' : c.chipBackground),
                          borderColor: selectedType === t ? 'transparent' : (isDark ? 'rgba(255,255,255,0.08)' : c.chipBorder),
                        },
                      ]}
                      onPress={() => setSelectedType(t)}
                    >
                      <Text style={[styles.chipText, { color: selectedType === t ? '#000' : (isDark ? '#AAAAAA' : c.chipText), fontFamily: 'Inter-SemiBold' }]}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Severity Chips */}
              <View>
                <Text style={labelStyle}>SEVERITY</Text>
                <View style={styles.chipsRow}>
                  {SEVERITY_LEVELS.map((s) => {
                    const severityColors: Record<string, string> = { Mild: '#60A5FA', Moderate: '#FF9200', Severe: '#DB5034' };
                    const isSelected = selectedSeverity === s;
                    return (
                      <TouchableOpacity
                        key={s}
                        style={[
                          styles.chip,
                          {
                            backgroundColor: isSelected ? `${severityColors[s]}22` : (isDark ? 'rgba(23,23,23,0.6)' : c.chipBackground),
                            borderColor: isSelected ? severityColors[s] : (isDark ? 'rgba(255,255,255,0.08)' : c.chipBorder),
                          },
                        ]}
                        onPress={() => setSelectedSeverity(s)}
                      >
                        <Text style={[styles.chipText, { color: isSelected ? severityColors[s] : (isDark ? '#AAAAAA' : c.chipText), fontFamily: 'Inter-SemiBold' }]}>
                          {s}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Reaction */}
              <View>
                <Text style={labelStyle}>SYMPTOMS / REACTIONS</Text>
                <TextInput
                  style={[inputStyle, styles.textArea]}
                  placeholder="Describe symptoms..."
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={reaction}
                  onChangeText={setReaction}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              {/* Triggers */}
              <View>
                <Text style={labelStyle}>KNOWN TRIGGERS (comma-separated)</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. Peanuts, Tree nuts"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={triggersInput}
                  onChangeText={setTriggersInput}
                />
              </View>

              {/* Diagnosed Date */}
              <View>
                <Text style={labelStyle}>DIAGNOSED DATE</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. 2018"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={diagnosedDate}
                  onChangeText={setDiagnosedDate}
                />
              </View>

              {/* Treatment */}
              <View>
                <Text style={labelStyle}>TREATMENT / MEDICATION</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. EpiPen, Antihistamines"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={treatment}
                  onChangeText={setTreatment}
                />
              </View>

              {/* Notes (Optional) */}
              <View>
                <Text style={labelStyle}>NOTES (OPTIONAL)</Text>
                <TextInput
                  style={[inputStyle, styles.textArea]}
                  placeholder="Additional notes..."
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Save */}
            <TouchableOpacity
              style={styles.saveBtn}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.saveBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
                {isEdit ? 'UPDATE ALLERGY' : 'SAVE'}
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
    padding: 32,
    gap: 24,
  },
  modalHeader: { gap: 8 },
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
    letterSpacing: -0.9,
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
    height: 90,
    paddingTop: 16,
    borderRadius: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    height: 64,
    borderRadius: 40,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
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
