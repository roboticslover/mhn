import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
  TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

interface FileItem {
  id: string;
  name: string;
  size: string;
  status: string;
  icon: 'document-outline' | 'document-text-outline';
}

const MOCK_FILES: FileItem[] = [
  { id: '1', name: 'SCAN_RESONAN01.DICOM', size: '42.8 MB', status: 'READY', icon: 'document-outline' },
  { id: '2', name: 'NEXUS_REPORT_FINAL.PDF', size: '1.2 MB', status: 'SIGNED', icon: 'document-text-outline' },
];

export default function ScanEditScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  const [scanType, setScanType] = useState('MRI BRAIN (3T)');
  const [captureDate, setCaptureDate] = useState('');
  const [facility, setFacility] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [dateError, setDateError] = useState(true);

  const handleUpdate = () => {
    if (!captureDate) {
      setDateError(true);
      return;
    }
    Alert.alert('Updated', 'Scan record has been updated.');
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this scan?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Edit Scans</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* 01 / CATEGORY */}
        <View style={[styles.inputCard, { borderColor: 'rgba(255,255,255,0.08)' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>01 / CATEGORY</Text>
            <Ionicons name="chevron-expand-outline" size={17} color="rgba(255,255,255,0.4)" />
          </View>
          <Text style={styles.cardFieldLabel}>SCAN TYPE</Text>
          <Text style={styles.cardBigValue}>{scanType}</Text>
          <View style={styles.divider} />
        </View>

        {/* 02 / TIMELINE */}
        <View style={[
          styles.inputCard,
          dateError
            ? { borderColor: '#DB5034', shadowColor: 'rgba(255,0,0,0.25)', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 1, shadowRadius: 10, elevation: 4 }
            : { borderColor: 'rgba(255,255,255,0.08)' }
        ]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>02 / TIMELINE</Text>
            <Ionicons name="calendar-outline" size={17} color="rgba(255,255,255,0.4)" />
          </View>
          <Text style={styles.cardFieldLabel}>CAPTURE DATE</Text>
          <TextInput
            style={styles.cardInput}
            placeholder=""
            placeholderTextColor="rgba(255,255,255,0.1)"
            value={captureDate}
            onChangeText={(v) => { setCaptureDate(v); setDateError(false); }}
          />
          <View style={styles.divider} />
          {dateError && (
            <Text style={styles.errorText}>PLEASE ENTER THE DATE</Text>
          )}
        </View>

        {/* 03 / ORIGIN */}
        <View style={[styles.inputCard, { borderColor: 'rgba(255,255,255,0.08)' }]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>
              03 / ORIGIN <Text style={{ color: '#686868' }}>(OPTIONAL)</Text>
            </Text>
            <Ionicons name="add-circle-outline" size={17} color="rgba(255,255,255,0.4)" />
          </View>
          <Text style={styles.cardFieldLabel}>CLINICAL FACILITY</Text>
          <TextInput
            style={styles.cardBigPlaceholder}
            placeholder="ENTER FACILITY NAME"
            placeholderTextColor="rgba(255,255,255,0.1)"
            value={facility}
            onChangeText={setFacility}
          />
          <View style={styles.divider} />
        </View>

        {/* 04 / PART OF THE BODY */}
        <View style={[styles.inputCard, { borderColor: 'rgba(255,255,255,0.08)' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardLabel, { color: '#34C759' }]}>04 / PART OF THE BODY</Text>
            <Ionicons name="add-circle-outline" size={17} color="rgba(255,255,255,0.4)" />
          </View>
          <Text style={[styles.cardFieldLabel, { letterSpacing: -0.5 }]}>ENTER TEXT</Text>
          <TextInput
            style={styles.cardBigPlaceholder}
            placeholder="ENTER FACILITY NAME"
            placeholderTextColor="rgba(255,255,255,0.1)"
            value={bodyPart}
            onChangeText={setBodyPart}
          />
          <View style={styles.divider} />
        </View>

        {/* File Management */}
        <View style={styles.fileManagementSection}>
          <View style={styles.fileManagementHeader}>
            <Text style={styles.fileManagementTitle}>File Management</Text>
            <TouchableOpacity
              style={styles.addFileBtn}
              onPress={() => Alert.alert('Add File', 'Choose a file to upload')}
            >
              <Ionicons name="add" size={9} color="#6FFB85" />
              <Text style={styles.addFileBtnText}>ADD NEW FILE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fileList}>
            {MOCK_FILES.map(file => (
              <View
                key={file.id}
                style={[styles.fileItem, { borderColor: 'rgba(255,255,255,0.08)' }]}
              >
                <View style={styles.fileLeft}>
                  <View style={styles.fileIconWrap}>
                    <Ionicons name={file.icon} size={14} color="rgba(255,255,255,0.7)" />
                  </View>
                  <View>
                    <Text style={styles.fileName}>{file.name}</Text>
                    <Text style={styles.fileMeta}>{file.size} • {file.status}</Text>
                  </View>
                </View>
                <View style={styles.fileActions}>
                  <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons name="download-outline" size={14} color="rgba(255,255,255,0.5)" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    onPress={() => Alert.alert('Remove File', `Remove ${file.name}?`)}
                  >
                    <Ionicons name="trash-outline" size={14} color="#DB5034" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.modalActions}>
          <TouchableOpacity style={styles.updateBtn} activeOpacity={0.85} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>UPDATE SCAN RECORD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>DELETE RECORD</Text>
            <Ionicons name="trash-outline" size={10} color="#FF4D4D" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter', lineHeight: 22 },
  inputCard: {
    marginHorizontal: 25,
    marginBottom: 18,
    borderRadius: 33,
    borderWidth: 1,
    backgroundColor: 'rgba(23,23,23,0.4)',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 0,
    minHeight: 194,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 36,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardFieldLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 8,
  },
  cardBigValue: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 16,
  },
  cardInput: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    lineHeight: 28,
    paddingVertical: 0,
    marginBottom: 16,
    height: 32,
  },
  cardBigPlaceholder: {
    fontSize: 24,
    fontWeight: '200',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
    height: 40,
    paddingVertical: 0,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#DB5034',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  fileManagementSection: { paddingHorizontal: 25, marginBottom: 24 },
  fileManagementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  fileManagementTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.4)',
  },
  addFileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
  },
  addFileBtnText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fileList: { gap: 14 },
  fileItem: {
    borderRadius: 47,
    borderWidth: 1,
    backgroundColor: 'rgba(23,23,23,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  fileLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  fileIconWrap: {
    width: 47,
    height: 47,
    borderRadius: 33,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    lineHeight: 24,
  },
  fileMeta: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
    lineHeight: 17,
  },
  fileActions: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  modalActions: { paddingHorizontal: 49, gap: 12, paddingTop: 32 },
  updateBtn: {
    backgroundColor: '#6FFB85',
    borderRadius: 40,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(209,252,0,0.15)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
  },
  updateBtnText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#141414',
    textTransform: 'uppercase',
  },
  deleteBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 40,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#FF4D4D',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
});
