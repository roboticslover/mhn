import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

const FILES = [
  { id: '1', name: '818786755-cbc-report.pdf', type: 'pdf' },
  { id: '2', name: 'vaccine-certificate-2024.pdf', type: 'pdf' },
];

export default function VaccineShareScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const toggleFile = (id: string) => {
    const next = new Set(selectedFiles);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedFiles(next);
    setSelectAll(next.size === FILES.length);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles(new Set());
      setSelectAll(false);
    } else {
      setSelectedFiles(new Set(FILES.map((f) => f.id)));
      setSelectAll(true);
    }
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
          <Text style={[styles.headerTitle, { color: c.text }]}>Vaccine Name</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="create-outline" size={21} color={c.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="share-outline" size={21} color={c.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Blurred document preview behind the share sheet */}
        <View style={styles.previewArea}>
          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={[styles.publicTag, { backgroundColor: c.successSoft }]}>
              <Text style={[styles.publicTagText, { color: c.primary }]}>PUBLIC</Text>
            </View>
            <View style={[styles.typeTag, { backgroundColor: c.cardElevated }]}>
              <Text style={[styles.typeTagText, { color: c.textSecondary }]}>VACCINES</Text>
            </View>
          </View>
          <Text style={[styles.previewVaccineName, { color: 'rgba(255,255,255,0.3)' }]}>Vaccine Name</Text>
          <View style={styles.previewMetaRow}>
            <Text style={[styles.previewMetaLabel, { color: 'rgba(52,199,89,0.3)' }]}>PROTECTED TILL</Text>
            <Text style={[styles.previewMetaValue, { color: 'rgba(255,255,255,0.3)' }]}>April 02, 2027</Text>
          </View>
          <View style={styles.previewMetaRow}>
            <Text style={[styles.previewMetaLabel, { color: 'rgba(52,199,89,0.3)' }]}>DATE OF VACCINE</Text>
            <Text style={[styles.previewMetaValue, { color: 'rgba(255,255,255,0.3)' }]}>April 03, 2026</Text>
          </View>
          {/* Blurred doc placeholder */}
          <View style={[styles.docPreviewBox, { backgroundColor: isDark ? 'rgba(50,40,30,0.3)' : 'rgba(200,180,160,0.3)', opacity: 0.3 }]}>
            <Ionicons name="document-text-outline" size={32} color={c.textMuted} />
          </View>
        </View>

        {/* Share Bottom Sheet */}
        <View style={[styles.shareSheet, { backgroundColor: 'rgba(23,23,23,0.4)', borderColor: c.cardGlassBorder }]}>
          {/* Sheet Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.sheetTitleRow}>
              <Ionicons name="share-outline" size={20} color={c.primary} />
              <Text style={[styles.sheetTitle, { color: c.text }]}>Select files to share</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: 'rgba(223,223,223,0.12)' }]} />

          {/* Select All Row */}
          <View style={styles.selectAllRow}>
            <TouchableOpacity style={styles.checkRow} onPress={toggleSelectAll}>
              <View style={[styles.checkbox, { borderColor: '#DFDFDF' }, selectAll && { backgroundColor: c.primary, borderColor: c.primary }]}>
                {selectAll && <Ionicons name="checkmark" size={12} color="#141414" />}
              </View>
              <Text style={[styles.selectAllText, { color: c.text }]}>Select  All</Text>
            </TouchableOpacity>
            <Text style={[styles.filesSelectedCount, { color: c.text }]}>
              {selectedFiles.size} {selectedFiles.size === 1 ? 'File' : 'Files'} Selected
            </Text>
          </View>

          {/* Divider */}
          <View style={[styles.divider, { backgroundColor: 'rgba(223,223,223,0.12)' }]} />

          {/* File List */}
          {FILES.map((file) => (
            <TouchableOpacity
              key={file.id}
              style={styles.fileRow}
              onPress={() => toggleFile(file.id)}
              activeOpacity={0.8}
            >
              <View style={styles.fileRowLeft}>
                <View style={[styles.checkbox, { borderColor: '#DFDFDF' }, selectedFiles.has(file.id) && { backgroundColor: c.primary, borderColor: c.primary }]}>
                  {selectedFiles.has(file.id) && <Ionicons name="checkmark" size={12} color="#141414" />}
                </View>
                <View style={[styles.fileIconWrap, { backgroundColor: 'rgba(219,80,52,0.15)' }]}>
                  <Ionicons name="document-text" size={14} color={c.error} />
                </View>
                <Text style={[styles.fileName, { color: c.text }]} numberOfLines={1}>
                  {file.name.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Share Button */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[
            styles.shareBtn,
            { backgroundColor: c.primary },
            selectedFiles.size === 0 && { opacity: 0.6 },
          ]}
          activeOpacity={0.85}
          disabled={selectedFiles.size === 0}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.shareBtnText, { color: c.textOnPrimary }]}>Share</Text>
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
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter' },
  headerRight: { flexDirection: 'row', gap: 16 },
  headerIconBtn: { padding: 2 },
  previewArea: { paddingHorizontal: 31, marginBottom: 16 },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  publicTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  publicTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  typeTag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  typeTagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  previewVaccineName: { fontSize: 48, fontWeight: '300', fontFamily: 'Manrope', letterSpacing: -2.4, lineHeight: 52, marginBottom: 8 },
  previewMetaRow: { alignItems: 'flex-end', marginBottom: 2 },
  previewMetaLabel: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase', textAlign: 'right' },
  previewMetaValue: { fontSize: 20, fontWeight: '300', fontFamily: 'Manrope', textAlign: 'right', lineHeight: 28 },
  docPreviewBox: { height: 160, borderRadius: 24, marginTop: 12, alignItems: 'center', justifyContent: 'center' },
  shareSheet: {
    marginHorizontal: 0,
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
  },
  sheetHeader: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 20 },
  sheetTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sheetTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 28 },
  divider: { height: 1, marginHorizontal: 0 },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectAllText: { fontSize: 14, fontWeight: '700', fontFamily: 'Manrope' },
  filesSelectedCount: { fontSize: 14, fontWeight: '700', fontFamily: 'Manrope' },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  fileRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  fileIconWrap: { width: 28, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  fileName: { fontSize: 14, fontFamily: 'Manrope', flex: 1 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  shareBtn: {
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 28 },
});
