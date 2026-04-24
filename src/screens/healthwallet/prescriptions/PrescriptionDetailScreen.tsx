import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function PrescriptionDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isPrivate, setIsPrivate] = useState(false);
  const [isShareSheetVisible, setIsShareSheetVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>(['1']);
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
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Prescription</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => navigation.navigate('PrescriptionEdit')} style={styles.headerIconBtn}>
              <Ionicons name="create-outline" size={22} color={c.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsShareSheetVisible(true)} style={styles.headerIconBtn}>
              <Ionicons name="share-outline" size={22} color={c.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Report header */}
        <View style={styles.reportHeader}>
          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={[styles.publicTag, { backgroundColor: c.successSoft }]}>
              <Text style={[styles.publicTagText, { color: c.primary }]}>PUBLIC</Text>
            </View>
            <View style={[styles.typeTag, { backgroundColor: c.card }]}>
              <Text style={[styles.typeTagText, { color: c.textSecondary }]}>PRESCRIPTION</Text>
            </View>
          </View>

          {/* Title */}
          <Text style={[styles.prescriptionTitle, { color: c.text }]}>Prescription Name</Text>

          {/* Meta - right aligned */}
          <View style={styles.metaBlock}>
            <Text style={[styles.metaSmallLabel, { color: c.textSecondary }]}>Time Line</Text>
            <Text style={[styles.metaValue, { color: c.text }]}>3 Months</Text>
            <Text style={[styles.dateOfAnalysisLabel, { color: c.primary }]}>DATE OF ANALYSIS</Text>
            <Text style={[styles.metaValue, { color: c.text }]}>April 02, 2026</Text>
          </View>
        </View>

        {/* Prescription image placeholder */}
        <View style={styles.reportImageContainer}>
          <View style={[styles.reportImagePlaceholder, { backgroundColor: isDark ? '#1A1A1A' : '#F0F0F0' }]}>
            <Ionicons name="document-text-outline" size={60} color={c.textMuted} />
            <Text style={[styles.reportImageText, { color: c.textSecondary }]}>Prescription Document</Text>
            <Text style={[styles.reportImageSub, { color: c.textTertiary }]}>Tap to view full document</Text>
          </View>
        </View>

        {/* Privacy toggle */}
        <View style={[styles.privacyCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.privacyLeft}>
            <Ionicons name="git-network-outline" size={18} color={c.textSecondary} />
            <Text style={[styles.privacyText, { color: c.text }]}>keep this report private</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleTrack, { backgroundColor: c.error }]}
            onPress={() => setIsPrivate(!isPrivate)}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, isPrivate ? { left: 4 } : { right: 4 }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Download Button */}
      <View style={[styles.bottomBar, { bottom: insets.bottom + 85 }]}>
        <TouchableOpacity style={[styles.downloadButton, { backgroundColor: c.primary }]} activeOpacity={0.8}>
          <Text style={[styles.downloadButtonText, { color: c.textOnPrimary }]}>Download</Text>
        </TouchableOpacity>
      </View>

      {/* Share Bottom Sheet */}
      <Modal
        visible={isShareSheetVisible}
        onRequestClose={() => setIsShareSheetVisible(false)}
        animationType="slide"
        transparent={true}
        statusBarTranslucent
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setIsShareSheetVisible(false)}
        />
        <View style={[styles.shareSheet, { paddingBottom: insets.bottom + 100, backgroundColor: isDark ? '#171717' : '#FFFFFF' }]}>
          <View style={styles.sheetHandle} />
          
          <View style={styles.sheetHeader}>
            <View style={[styles.sheetIconWrap, { backgroundColor: c.successSoft }]}>
              <Ionicons name="share-outline" size={20} color={c.primary} />
            </View>
            <Text style={[styles.sheetTitle, { color: c.text }]}>Select files to share</Text>
          </View>

          <View style={styles.selectAllRow}>
            <TouchableOpacity
              style={[styles.checkbox, selectAll && { backgroundColor: c.primary, borderColor: c.primary }]}
              onPress={toggleSelectAll}
              activeOpacity={0.7}
            >
              {selectAll && <Ionicons name="checkmark" size={12} color={c.textInverse} />}
            </TouchableOpacity>
            <Text style={[styles.selectAllText, { color: c.text }]}>Select All</Text>
            <Text style={[styles.fileCountText, { color: c.textSecondary }]}>{selectedFiles.length} Files Selected</Text>
          </View>

          <View style={[styles.divider, { backgroundColor: c.divider }]} />

          {files.map(file => (
            <View key={file.id} style={styles.fileRow}>
              <TouchableOpacity
                style={[styles.checkbox, selectedFiles.includes(file.id) && { backgroundColor: c.primary, borderColor: c.primary }]}
                onPress={() => toggleFile(file.id)}
                activeOpacity={0.7}
              >
                {selectedFiles.includes(file.id) && <Ionicons name="checkmark" size={12} color={c.textInverse} />}
              </TouchableOpacity>
              <View style={[styles.pdfIconWrap, { backgroundColor: isDark ? 'rgba(219,80,52,0.1)' : '#FFF0EE' }]}>
                <Ionicons name="document-text" size={18} color="#DB5034" />
              </View>
              <Text style={[styles.fileNameText, { color: c.text }]}>{file.name}</Text>
            </View>
          ))}

          <TouchableOpacity
            style={[styles.shareBtn, { backgroundColor: c.primary }]}
            activeOpacity={0.8}
            onPress={() => setIsShareSheetVisible(false)}
          >
            <Text style={[styles.shareBtnText, { color: c.textOnPrimary }]}>Share</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter' },
  headerRight: { flexDirection: 'row', gap: 16 },
  headerIconBtn: { padding: 2 },
  reportHeader: { paddingHorizontal: 31, marginBottom: 16 },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  publicTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  publicTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  typeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  typeTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  prescriptionTitle: { fontSize: 34, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.68, marginBottom: 12 },
  metaBlock: { alignItems: 'flex-end', gap: 2 },
  metaSmallLabel: { fontSize: 12, fontFamily: 'Inter', textAlign: 'right' },
  metaValue: { fontSize: 18, fontFamily: 'Inter', fontWeight: '400', textAlign: 'right', lineHeight: 28 },
  dateOfAnalysisLabel: { fontSize: 12, fontFamily: 'Inter', textAlign: 'right', marginTop: 8, textTransform: 'uppercase' },
  reportImageContainer: { marginHorizontal: 36, height: 286, borderRadius: 24, overflow: 'hidden', marginBottom: 20 },
  reportImagePlaceholder: { flex: 1, borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 8 },
  reportImageText: { fontSize: 14, fontFamily: 'Inter', fontWeight: '500' },
  reportImageSub: { fontSize: 12, fontFamily: 'Inter' },
  privacyCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 18,
  },
  privacyLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  privacyText: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
  toggleTrack: { width: 48, height: 24, borderRadius: 12, justifyContent: 'center', position: 'relative' },
  toggleThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#FFFFFF', position: 'absolute' },
  bottomBar: { position: 'absolute', left: 0, right: 0, paddingHorizontal: 25 },
  downloadButton: {
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(111, 251, 133, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  downloadButtonText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  shareSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    paddingHorizontal: 36,
    paddingTop: 12,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  sheetIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectAllText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    flex: 1,
  },
  fileCountText: {
    fontSize: 14,
    fontFamily: 'Inter',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  pdfIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileNameText: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: '500',
    flex: 1,
  },
  shareBtn: {
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: 'rgba(111, 251, 133, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  shareBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
