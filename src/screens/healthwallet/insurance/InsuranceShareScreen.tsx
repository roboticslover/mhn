import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ShareFile = { id: string; name: string; selected: boolean };

const INITIAL_FILES: ShareFile[] = [
  { id: '1', name: '818786755-cbc-report.pdf', selected: false },
  { id: '2', name: 'Summary of Benefits.pdf', selected: false },
  { id: '3', name: 'Provider Directory v2.1.pdf', selected: false },
];

export default function InsuranceShareScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [files, setFiles] = useState<ShareFile[]>(INITIAL_FILES);

  const selectedCount = files.filter(f => f.selected).length;
  const allSelected = files.every(f => f.selected);

  const toggleFile = (id: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const toggleAll = () => {
    const newState = !allSelected;
    setFiles(files.map(f => ({ ...f, selected: newState })));
  };

  const handleShare = async () => {
    const selectedFiles = files.filter(f => f.selected).map(f => f.name);
    if (selectedFiles.length === 0) return;
    try {
      await Share.share({ message: `Sharing insurance files:\n${selectedFiles.join('\n')}` });
    } catch {}
  };

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance</Text>
        <TouchableOpacity onPress={() => navigation.navigate('InsuranceAdd')}>
          <Ionicons name="create-outline" size={21} color="rgba(255,255,255,0.74)" />
        </TouchableOpacity>
      </View>

      {/* Blurred insurance card behind */}
      <View style={styles.blurredCardPlaceholder} pointerEvents="none">
        <View style={styles.blurredCard}>
          <View style={styles.blurredActiveBadge}>
            <Text style={styles.blurredBadgeText}>● ACTIVE</Text>
          </View>
          <Text style={styles.blurredPlanName}>{'ASTRA  PRIME'}</Text>
          <Text style={styles.blurredSubPlan}>NEXUS GLOBAL ACCESS</Text>
          <View style={styles.blurredMetaRow}>
            <View>
              <Text style={styles.blurredMetaLabel}>MEMBER ID</Text>
              <Text style={styles.blurredMetaValue}>MHN-882-04-14</Text>
            </View>
            <View>
              <Text style={styles.blurredMetaLabel}>GROUP</Text>
              <Text style={styles.blurredMetaValue}>ZENITH_9</Text>
            </View>
          </View>
          <Text style={styles.blurredHolder}>Alex Sterling</Text>
        </View>
        {/* Blurred coverage card */}
        <View style={styles.blurredDetailsCard}>
          <Text style={styles.blurredDetailsLabel}>DETAILS</Text>
          <Text style={styles.blurredDate}>02/10/2026</Text>
          <Text style={styles.blurredDate}>02/10/2028</Text>
          <Text style={[styles.blurredDate, { color: '#DB5034' }]}>₹2500</Text>
        </View>
      </View>

      {/* Share Sheet */}
      <View style={[styles.shareSheet, { paddingBottom: insets.bottom + 24 }]}>
        {/* Sheet header */}
        <View style={styles.sheetHeader}>
          <Ionicons name="share-outline" size={22} color="#6FFB85" />
          <Text style={styles.sheetTitle}>Select files to share</Text>
        </View>

        {/* Select all row */}
        <View style={styles.selectAllRow}>
          <TouchableOpacity style={styles.checkboxRow} onPress={toggleAll} activeOpacity={0.7}>
            <View style={[styles.checkbox, allSelected && styles.checkboxSelected]}>
              {allSelected && <Ionicons name="checkmark" size={12} color="#000" />}
            </View>
            <Text style={styles.selectAllText}>Select  All</Text>
          </TouchableOpacity>
          <Text style={styles.selectedCount}>{selectedCount} Files Selected</Text>
        </View>

        <View style={styles.rowDivider} />

        {/* File rows */}
        {files.map(file => (
          <TouchableOpacity
            key={file.id}
            style={styles.fileRow}
            onPress={() => toggleFile(file.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, file.selected && styles.checkboxSelected]}>
              {file.selected && <Ionicons name="checkmark" size={12} color="#000" />}
            </View>
            <View style={styles.fileIconWrap}>
              <Ionicons name="document-outline" size={16} color="#DB5034" />
            </View>
            <Text style={styles.fileName}>{file.name.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}

        {/* Share button */}
        <TouchableOpacity
          style={[styles.shareBtn, selectedCount === 0 && styles.shareBtnDisabled]}
          activeOpacity={0.85}
          onPress={handleShare}
          disabled={selectedCount === 0}
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
    paddingBottom: 12,
  },
  backBtn: { width: 20, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#fff',
  },

  // Blurred card (background decoration)
  blurredCardPlaceholder: {
    paddingHorizontal: 21,
    opacity: 0.3,
    marginBottom: 8,
  },
  blurredCard: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  blurredActiveBadge: {
    backgroundColor: 'rgba(52,199,89,0.09)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  blurredBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#34C759',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  blurredPlanName: {
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    letterSpacing: -1.2,
    lineHeight: 32,
  },
  blurredSubPlan: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  blurredMetaRow: { flexDirection: 'row', gap: 32, marginBottom: 12 },
  blurredMetaLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  blurredMetaValue: {
    fontSize: 16,
    fontWeight: '300',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
    letterSpacing: 1.6,
  },
  blurredHolder: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Manrope',
    color: '#E2E2E2',
  },
  blurredDetailsCard: {
    backgroundColor: 'rgba(23,23,23,0.4)',
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 32,
    paddingVertical: 20,
    gap: 8,
  },
  blurredDetailsLabel: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  blurredDate: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#E2E2E2',
    letterSpacing: -0.75,
  },

  // Share Sheet
  shareSheet: {
    backgroundColor: '#111',
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 36,
    paddingTop: 28,
    gap: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#fff',
    lineHeight: 28,
  },
  selectAllRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 0.7,
    borderColor: '#DFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#6FFB85',
    borderColor: '#6FFB85',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
    color: '#fff',
    textTransform: 'capitalize',
  },
  selectedCount: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Manrope',
    color: '#fff',
    textTransform: 'capitalize',
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 4,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  fileIconWrap: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(219,80,52,0.1)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Manrope',
    color: '#fff',
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  shareBtn: {
    marginTop: 8,
    backgroundColor: '#6FFB85',
    borderRadius: 33,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnDisabled: {
    opacity: 0.4,
  },
  shareBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
  },
});
