import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function InsuranceAddScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [insuranceName, setInsuranceName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSave = () => {
    navigation.navigate('InsuranceList');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Insurance</Text>
          <View style={{ width: 20 }} />
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
                placeholder="e.g. Astra Prime Health"
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
            </View>
          </View>

          {/* Start Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>When does this apply from?</Text>
            <TouchableOpacity style={styles.dateInputWrap} activeOpacity={0.8}>
              <View style={styles.dateInputInner}>
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={startDate}
                  onChangeText={setStartDate}
                  placeholder="DD MMM YYYY"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                />
              </View>
              <Ionicons name="calendar-outline" size={20} color="#6FFB85" />
            </TouchableOpacity>
          </View>

          {/* End Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>When does this end?</Text>
            <TouchableOpacity style={[styles.dateInputWrap, styles.dateInputWrapAlt]} activeOpacity={0.8}>
              <View style={styles.dateInputInner}>
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="DD MMM YYYY"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                />
              </View>
              <Ionicons name="calendar-clear-outline" size={20} color="#6FFB85" />
            </TouchableOpacity>
          </View>
        </View>

        {/* File Management section */}
        <View style={styles.fileSection}>
          <View style={styles.fileSectionHeader}>
            <Text style={styles.fileSectionTitle}>File Management</Text>
            <TouchableOpacity style={styles.addFileBtn} activeOpacity={0.7}>
              <Ionicons name="add" size={9} color="#6FFB85" />
              <Text style={styles.addFileBtnText}>ADD NEW FILE</Text>
            </TouchableOpacity>
          </View>

          {/* Upload Drop Zone */}
          <TouchableOpacity style={styles.uploadZone} activeOpacity={0.8}>
            <View style={styles.uploadIconCircle}>
              <Ionicons name="cloud-upload-outline" size={28} color="#6FFB85" />
            </View>
            <View style={styles.uploadTextBlock}>
              <Text style={styles.uploadTitle}>Upload Documents</Text>
              <Text style={styles.uploadSubtitle}>
                {'Upload up to 20 files (max 10MB each). \nSupported formats: JPG, JPEG, PNG, and PDF.'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Uploaded files list */}
          {uploadedFiles.map((file, i) => (
            <View key={i} style={styles.fileRow}>
              <View style={styles.fileRowLeft}>
                <Ionicons name="document-outline" size={18} color="rgba(255,255,255,0.6)" />
                <Text style={styles.fileName}>{file}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== i))}
                style={{ opacity: 0.4 }}
              >
                <Ionicons name="trash-outline" size={16} color="#DB5034" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 29,
    paddingBottom: 16,
  },
  backBtn: { width: 20, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
  },

  // Fields
  fieldsSection: {
    paddingHorizontal: 24,
    gap: 24,
    marginBottom: 32,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    lineHeight: 16,
    marginLeft: 4,
  },
  inputWrap: {
    height: 58,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 23,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#fff',
  },
  dateInputWrap: {
    height: 58,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInputWrapAlt: {
    backgroundColor: 'rgba(19,19,19,0.6)',
    borderColor: 'rgba(117,117,117,0.15)',
  },
  dateInputInner: { flex: 1 },

  // File Section
  fileSection: {
    paddingHorizontal: 24,
    gap: 12,
  },
  fileSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'capitalize',
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
    textTransform: 'uppercase',
  },
  uploadZone: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
    borderStyle: 'dashed',
    alignItems: 'center',
    paddingVertical: 34,
    paddingHorizontal: 34,
    gap: 16,
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(85,248,115,0.1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTextBlock: { alignItems: 'center', gap: 12 },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
  },
  uploadSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 16,
  },
  fileRow: {
    height: 58,
    backgroundColor: 'rgba(31,31,31,0.5)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(68,73,51,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
  },
  fileRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fileName: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'Manrope',
    color: '#fff',
    letterSpacing: 0.35,
  },

  // Bottom
  bottomBar: {
    position: 'absolute',
    bottom: 90,
    left: 24,
    right: 27,
  },
  saveBtn: {
    backgroundColor: '#6FFB85',
    borderRadius: 33,
    height: 58,
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
