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
import BottomNavBar from '../../../components/BottomNavBar';

type AttachedFile = { name: string; id: string };

export default function InsuranceAddWithFilesScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [insuranceName, setInsuranceName] = useState('Rama');
  const [startDate, setStartDate] = useState('01 Apr 2026');
  const [endDate, setEndDate] = useState('04 Apr 2028');
  const [files, setFiles] = useState<AttachedFile[]>([
    { name: 'Metformin_Scan.pdf', id: '1' },
  ]);

  const removeFile = (id: string) => setFiles(files.filter(f => f.id !== id));

  const handleSave = () => {
    navigation.navigate('InsuranceList');
  };

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: 160 }]}
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
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
            </View>
          </View>

          {/* Start Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>When does this apply from?</Text>
            <View style={styles.dateInputWrap}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={startDate}
                onChangeText={setStartDate}
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
              <Ionicons name="calendar-outline" size={20} color="#6FFB85" />
            </View>
          </View>

          {/* End Date */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>When does this end?</Text>
            <View style={[styles.dateInputWrap, styles.dateInputAlt]}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={endDate}
                onChangeText={setEndDate}
                placeholderTextColor="rgba(255,255,255,0.2)"
              />
              <Ionicons name="calendar-clear-outline" size={20} color="#6FFB85" />
            </View>
          </View>
        </View>

        {/* Files Section */}
        <View style={styles.fileSection}>
          <View style={styles.fileSectionHeader}>
            <Text style={styles.fileSectionTitle}>PRESCRIPTION FILES</Text>
            <TouchableOpacity style={styles.addFileBtn} activeOpacity={0.7}>
              <Ionicons name="add" size={9} color="#6FFB85" />
              <Text style={styles.addFileBtnText}>ADD NEW FILE</Text>
            </TouchableOpacity>
          </View>

          {files.map((file) => (
            <View key={file.id} style={styles.fileRow}>
              <View style={styles.fileRowLeft}>
                <Ionicons name="document-outline" size={18} color="rgba(255,255,255,0.6)" />
                <Text style={styles.fileName}>{file.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeFile(file.id)}
                style={styles.deleteBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={16} color="#DB5034" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom bar — no BottomNavBar on this screen per Figma (add form) */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar activeTab="card" navigation={navigation} />
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
  fieldsSection: {
    paddingHorizontal: 24,
    gap: 24,
    marginBottom: 32,
  },
  fieldGroup: { gap: 8 },
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
  dateInputAlt: {
    backgroundColor: 'rgba(19,19,19,0.6)',
    borderColor: 'rgba(117,117,117,0.15)',
  },
  fileSection: {
    paddingHorizontal: 28,
    gap: 12,
  },
  fileSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  fileSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#E5E5E5',
    lineHeight: 24,
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
  deleteBtn: { opacity: 0.4 },
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
