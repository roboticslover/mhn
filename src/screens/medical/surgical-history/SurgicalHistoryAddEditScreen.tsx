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

interface FormData {
  title: string;
  date: string;
  hospital: string;
  surgeon: string;
  duration: string;
  anesthesia: string;
  complications: string;
  recoveryTime: string;
  notes: string;
}

export default function SurgicalHistoryAddEditScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const existingRecord = route?.params?.record;
  const isEdit = !!existingRecord;

  const [form, setForm] = useState<FormData>({
    title: existingRecord?.title ?? '',
    date: existingRecord?.date ?? '',
    hospital: existingRecord?.hospital ?? '',
    surgeon: existingRecord?.surgeon ?? '',
    duration: existingRecord?.duration ?? '',
    anesthesia: existingRecord?.anesthesia ?? '',
    complications: existingRecord?.complications ?? '',
    recoveryTime: existingRecord?.recoveryTime ?? '',
    notes: existingRecord?.notes ?? '',
  });

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
            title="Surgical Record"
            onBack={() => navigation.goBack()}
          />

          {/* Modal Card */}
          <View style={[styles.modalCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalSubtitle, { color: c.primary, fontFamily: 'Manrope' }]}>
                SURGICAL RECORD
              </Text>
              <Text style={[styles.modalTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Manrope' }]}>
                {isEdit ? 'Edit\nRecord' : 'New\nRecord'}
              </Text>
            </View>

            {/* Fields */}
            <View style={styles.fields}>
              <View>
                <Text style={labelStyle}>PROCEDURE NAME</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. Appendectomy"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={form.title}
                  onChangeText={(v) => setForm({ ...form, title: v })}
                />
              </View>

              <View>
                <Text style={labelStyle}>DATE OF SURGERY</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. March 14, 2021"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={form.date}
                  onChangeText={(v) => setForm({ ...form, date: v })}
                />
              </View>

              <View>
                <Text style={labelStyle}>HOSPITAL / CLINIC</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. City General Hospital"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={form.hospital}
                  onChangeText={(v) => setForm({ ...form, hospital: v })}
                />
              </View>

              <View>
                <Text style={labelStyle}>SURGEON</Text>
                <TextInput
                  style={inputStyle}
                  placeholder="e.g. Dr. Sarah Johnson"
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={form.surgeon}
                  onChangeText={(v) => setForm({ ...form, surgeon: v })}
                />
              </View>

              <View style={styles.rowFields}>
                <View style={styles.halfField}>
                  <Text style={labelStyle}>DURATION</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="e.g. 2 hrs"
                    placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                    value={form.duration}
                    onChangeText={(v) => setForm({ ...form, duration: v })}
                  />
                </View>
                <View style={styles.halfField}>
                  <Text style={labelStyle}>ANESTHESIA</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="e.g. General"
                    placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                    value={form.anesthesia}
                    onChangeText={(v) => setForm({ ...form, anesthesia: v })}
                  />
                </View>
              </View>

              <View style={styles.rowFields}>
                <View style={styles.halfField}>
                  <Text style={labelStyle}>COMPLICATIONS</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="e.g. None"
                    placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                    value={form.complications}
                    onChangeText={(v) => setForm({ ...form, complications: v })}
                  />
                </View>
                <View style={styles.halfField}>
                  <Text style={labelStyle}>RECOVERY TIME</Text>
                  <TextInput
                    style={inputStyle}
                    placeholder="e.g. 3 weeks"
                    placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                    value={form.recoveryTime}
                    onChangeText={(v) => setForm({ ...form, recoveryTime: v })}
                  />
                </View>
              </View>

              <View>
                <Text style={labelStyle}>CLINICAL NOTES (OPTIONAL)</Text>
                <TextInput
                  style={[inputStyle, styles.textArea]}
                  placeholder="Additional notes..."
                  placeholderTextColor={isDark ? '#6E7681' : c.inputPlaceholder}
                  value={form.notes}
                  onChangeText={(v) => setForm({ ...form, notes: v })}
                  multiline
                  numberOfLines={4}
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
              <Text style={[styles.saveBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
                {isEdit ? 'UPDATE RECORD' : 'SAVE'}
              </Text>
            </TouchableOpacity>

            {/* Delete Button (edit only) */}
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
    height: 100,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 20,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: { flex: 1 },
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
