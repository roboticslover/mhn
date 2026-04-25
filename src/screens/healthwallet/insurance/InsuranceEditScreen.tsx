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
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

type AttachedFile = { name: string; id: string };

export default function InsuranceEditScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const [insuranceName, setInsuranceName] = useState('Rama');
  const [startDate, setStartDate] = useState('01 Apr 2026');
  const [endDate, setEndDate] = useState('04 Apr 2028');
  const [files, setFiles] = useState<AttachedFile[]>([
    { name: 'Metformin_Scan.pdf', id: '1' },
  ]);

  const removeFile = (id: string) => setFiles(files.filter(f => f.id !== id));

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 160 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Insurance</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Input Fields */}
        <View style={styles.fieldsSection}>
          {/* Name of Insurance */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Name of the Insurance</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textInput}
                value={insuranceName}
                onChangeText={setInsuranceName}
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
            </View>
          </View>

          {/* Start Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>When does this apply from?</Text>
            <TouchableOpacity style={styles.dateInputWrap} activeOpacity={0.8}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={startDate}
                editable={false}
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
              <Ionicons name="calendar-outline" size={20} color="#6FFB85" />
            </TouchableOpacity>
          </View>

          {/* End Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>When does this end?</Text>
            <TouchableOpacity style={[styles.dateInputWrap, { backgroundColor: 'rgba(19,19,19,0.6)' }]} activeOpacity={0.8}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={endDate}
                editable={false}
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
              <Ionicons name="calendar-outline" size={20} color="#6FFB85" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Files Section */}
        <View style={styles.fileSection}>
          <View style={styles.fileSectionHeader}>
            <Text style={styles.fileSectionTitle}>PRESCRIPTION FILES</Text>
            <TouchableOpacity style={styles.addFileBtn} activeOpacity={0.7}>
              <Ionicons name="add" size={14} color="#6FFB85" />
              <Text style={styles.addFileBtnText}>ADD NEW FILE</Text>
            </TouchableOpacity>
          </View>

          {files.map((file) => (
            <View key={file.id} style={styles.fileRow}>
              <View style={styles.fileRowLeft}>
                <Ionicons name="document-text-outline" size={20} color="rgba(255,255,255,0.6)" />
                <Text style={styles.fileName}>{file.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeFile(file.id)}
                style={styles.deleteBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="close-circle" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 32 }]}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  scrollContent: { paddingHorizontal: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 29,
    paddingBottom: 40,
  },
  backBtn: { width: 20, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFF',
    textAlign: 'center',
  },

  // Fields
  fieldsSection: {
    paddingHorizontal: 24,
    gap: 24,
    marginBottom: 40,
  },
  fieldGroup: { gap: 8 },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    marginLeft: 4,
  },
  inputWrap: {
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    paddingHorizontal: 23,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#FFF',
  },
  dateInputWrap: {
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    paddingHorizontal: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Files Section
  fileSection: {
    paddingHorizontal: 24,
    gap: 16,
  },
  fileSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fileSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#E5E5E5',
    textTransform: 'uppercase',
  },
  addFileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addFileBtnText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
  },
  fileRow: {
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(68,73,51,0.1)',
    backgroundColor: 'rgba(31,31,31,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
  },
  fileRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fileName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Manrope',
    color: '#FFF',
    letterSpacing: 0.35,
  },
  deleteBtn: { opacity: 0.4 },

  // Bottom
  bottomBar: {
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  saveBtn: {
    backgroundColor: '#6FFB85',
    borderRadius: 33,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
  },
});
