import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, StatusBar,
  TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

interface ShareFile {
  id: string;
  name: string;
  icon: 'document-text-outline' | 'document-outline';
  iconColor: string;
}

const SHARE_FILES: ShareFile[] = [
  { id: '1', name: '818786755-CBC-REPORT.PDF', icon: 'document-text-outline', iconColor: '#DB5034' },
  { id: '2', name: 'SCAN_RESONAN01.DICOM', icon: 'document-outline', iconColor: '#6FFB85' },
];

export default function ScanShareScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  const [selectedAll, setSelectedAll] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedAll) {
      setSelected(new Set());
      setSelectedAll(false);
    } else {
      setSelected(new Set(SHARE_FILES.map(f => f.id)));
      setSelectedAll(true);
    }
  };

  const toggleFile = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
    setSelectedAll(next.size === SHARE_FILES.length);
  };

  const handleShare = () => {
    if (selected.size === 0) {
      Alert.alert('Select Files', 'Please select at least one file to share.');
      return;
    }
    Alert.alert('Sharing', `Sharing ${selected.size} file(s)...`);
    navigation.goBack();
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
          <Text style={[styles.headerTitle, { color: c.text }]}>Scans</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ScanEdit')}>
            <Ionicons name="create-outline" size={21} color="rgba(255,255,255,0.74)" />
          </TouchableOpacity>
        </View>

        {/* Tags */}
        <View style={styles.tagsRow}>
          <View style={styles.publicTag}>
            <Text style={styles.publicTagText}>PUBLIC</Text>
          </View>
          <View style={styles.scanTag}>
            <Text style={styles.scanTagText}>SCAN</Text>
          </View>
        </View>

        {/* Scan title */}
        <Text style={styles.scanTitle}>Medplus CT Scan</Text>

        {/* Meta */}
        <View style={styles.metaSection}>
          <Text style={styles.metaRefLabel}>REFERENCE ID</Text>
          <Text style={styles.metaRefValue}>#AB-2024-99812</Text>
          <Text style={styles.metaDateLabel}>DATE OF ANALYSIS</Text>
          <Text style={styles.metaDateValue}>OCT 14, 2024</Text>
        </View>

        {/* Scan image placeholder */}
        <View style={styles.scanImageContainer}>
          <Ionicons name="scan-outline" size={56} color="rgba(255,255,255,0.08)" />
        </View>

        {/* Share bottom sheet style */}
        <View style={[styles.shareSheet, { borderColor: 'rgba(255,255,255,0.08)' }]}>
          {/* Sheet title */}
          <View style={styles.sheetTitleRow}>
            <Ionicons name="share-outline" size={20} color="#6FFB85" />
            <Text style={styles.sheetTitle}>Select files to share</Text>
          </View>

          {/* Divider line */}
          <View style={styles.sheetDivider} />

          {/* Select all row */}
          <TouchableOpacity style={styles.selectAllRow} onPress={toggleSelectAll}>
            <TouchableOpacity
              style={[styles.checkbox, selectedAll && styles.checkboxChecked]}
              onPress={toggleSelectAll}
            >
              {selectedAll && <Ionicons name="checkmark" size={12} color="#000" />}
            </TouchableOpacity>
            <Text style={styles.selectAllText}>Select  All</Text>
            <Text style={styles.selectedCountText}>{selected.size} Files Selected</Text>
          </TouchableOpacity>

          {/* File rows */}
          <View style={styles.fileList}>
            {SHARE_FILES.map((file) => (
              <View key={file.id}>
                <View style={styles.sheetLineDivider} />
                <TouchableOpacity style={styles.fileRow} onPress={() => toggleFile(file.id)}>
                  <TouchableOpacity
                    style={[styles.checkbox, selected.has(file.id) && styles.checkboxChecked]}
                    onPress={() => toggleFile(file.id)}
                  >
                    {selected.has(file.id) && <Ionicons name="checkmark" size={12} color="#000" />}
                  </TouchableOpacity>
                  <View style={[styles.fileIconWrap, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                    <Ionicons name={file.icon} size={16} color={file.iconColor} />
                  </View>
                  <Text style={styles.fileName}>{file.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Share button */}
          <TouchableOpacity style={styles.shareBtn} activeOpacity={0.85} onPress={handleShare}>
            <Text style={styles.shareBtnText}>Share</Text>
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
  tagsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 24, marginBottom: 12 },
  publicTag: {
    backgroundColor: 'rgba(111,251,133,0.15)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  publicTagText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  scanTag: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  scanTagText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  scanTitle: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.68,
    paddingHorizontal: 24,
    marginBottom: 16,
    lineHeight: 40,
  },
  metaSection: { paddingHorizontal: 24, alignItems: 'flex-end', marginBottom: 20 },
  metaRefLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaRefValue: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 12,
  },
  metaDateLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaDateValue: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  scanImageContainer: {
    marginHorizontal: 24,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  shareSheet: {
    marginHorizontal: 0,
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    marginTop: 0,
    gap: 0,
  },
  sheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    lineHeight: 28,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  },
  checkboxChecked: {
    backgroundColor: '#6FFB85',
    borderColor: '#6FFB85',
  },
  selectAllText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  selectedCountText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  fileList: { marginBottom: 16 },
  sheetLineDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 4,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  fileIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  shareBtn: {
    backgroundColor: '#6FFB85',
    borderRadius: 33,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  shareBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
    lineHeight: 28,
  },
});
