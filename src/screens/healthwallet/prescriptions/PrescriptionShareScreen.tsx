import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PrescriptionShareScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const files = [
    { id: '1', name: '818786755-CBC-REPORT.PDF' },
  ];

  const toggleFile = (id: string) => {
    setSelectedFiles(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedFiles(newSelectAll ? files.map(f => f.id) : []);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 28 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('PrescriptionEdit')} style={styles.headerIconBtn}>
            <Ionicons name="create-outline" size={21} color="rgba(255,255,255,0.74)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="share-outline" size={21} color="#6FFB85" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dimmed background content (prescription detail preview) */}
      <View style={styles.dimmedContent}>
        <View style={styles.tagsRow}>
          <View style={styles.publicTag}>
            <Text style={styles.publicTagText}>PUBLIC</Text>
          </View>
          <View style={styles.typeTag}>
            <Text style={styles.typeTagText}>PRESCRIPTION</Text>
          </View>
        </View>
        <Text style={styles.prescriptionTitle}>Prescription Nam</Text>
        <View style={styles.metaRight}>
          <Text style={styles.timelineLabel}>TIME LINE</Text>
          <Text style={styles.timelineValue}>3 Months</Text>
          <Text style={styles.dateLabel}>DATE OF ANALYSIS</Text>
          <Text style={styles.dateValue}>April 02, 2026</Text>
        </View>
        {/* Image placeholder */}
        <View style={styles.imgPlaceholder} />
      </View>

      {/* Share bottom sheet */}
      <View style={[styles.shareSheet, { paddingBottom: insets.bottom + 100 }]}>
        {/* Modal header */}
        <View style={styles.sheetHeader}>
          <View style={styles.sheetIconWrap}>
            <Ionicons name="share-outline" size={20} color="#6FFB85" />
          </View>
          <Text style={styles.sheetTitle}>Select files to share</Text>
        </View>

        {/* Select All row */}
        <View style={styles.selectAllRow}>
          <TouchableOpacity
            style={[styles.checkbox, selectAll && styles.checkboxChecked]}
            onPress={toggleSelectAll}
            activeOpacity={0.7}
          >
            {selectAll && <Ionicons name="checkmark" size={11} color="#141414" />}
          </TouchableOpacity>
          <Text style={styles.selectAllText}>Select  All</Text>
          <Text style={styles.fileCountText}>{selectedFiles.length} Files Selected</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* File list */}
        {files.map(file => (
          <View key={file.id} style={styles.fileRow}>
            <TouchableOpacity
              style={[styles.checkbox, selectedFiles.includes(file.id) && styles.checkboxChecked]}
              onPress={() => toggleFile(file.id)}
              activeOpacity={0.7}
            >
              {selectedFiles.includes(file.id) && <Ionicons name="checkmark" size={11} color="#141414" />}
            </TouchableOpacity>
            <View style={styles.pdfIconWrap}>
              <Ionicons name="document-outline" size={16} color="#DB5034" />
            </View>
            <Text style={styles.fileNameText}>{file.name}</Text>
          </View>
        ))}

        {/* Share button */}
        <TouchableOpacity
          style={styles.shareBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.shareBtnText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 29,
    paddingBottom: 16,
  },
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  headerRight: { flexDirection: 'row', gap: 16 },
  headerIconBtn: { padding: 2 },
  dimmedContent: {
    flex: 1,
    opacity: 0.4,
    paddingHorizontal: 31,
  },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  publicTag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(52,199,89,0.16)',
  },
  publicTagText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#34C759',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  typeTag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#1F1F1F',
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#C5C9AC',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  prescriptionTitle: {
    fontSize: 48,
    fontWeight: '300',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    letterSpacing: -2.4,
    lineHeight: 48,
    marginBottom: 8,
  },
  metaRight: { alignItems: 'flex-end', marginBottom: 12 },
  timelineLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#C5C9AC',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  timelineValue: {
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  dateLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#34C759',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dateValue: {
    fontSize: 20,
    fontWeight: '200',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  imgPlaceholder: {
    height: 160,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: 8,
  },
  shareSheet: {
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.95)',
    paddingHorizontal: 36,
    paddingTop: 30,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  sheetIconWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 0.7,
    borderColor: '#DFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#6FFB85',
    borderColor: '#6FFB85',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    flex: 1,
  },
  fileCountText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
  },
  divider: {
    height: 0.7,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginVertical: 8,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  pdfIconWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileNameText: {
    fontSize: 14,
    fontFamily: 'Manrope',
    fontWeight: '400',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    flex: 1,
  },
  shareBtn: {
    height: 58,
    borderRadius: 33,
    backgroundColor: '#6FFB85',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 10,
  },
  shareBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
  },
});
