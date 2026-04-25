import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { BlurView } from 'expo-blur';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const FILES = [
  { id: '1', name: '818786755-cbc-report.pdf' },
];

export default function VaccineDetailScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isPrivate, setIsPrivate] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
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
    <View style={[styles.container, { backgroundColor: isDark ? '#050505' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 130 }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isShareOpen}
      >
        <View style={{ opacity: isShareOpen ? 0.3 : 1 }}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color={isDark ? '#FFFFFF' : '#141414'} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#141414' }]}>Vaccinations</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => navigation.navigate('VaccineEdit')} style={styles.headerIconBtn}>
                <Ionicons name="create-outline" size={21} color={isDark ? 'rgba(255,255,255,0.74)' : 'rgba(0,0,0,0.6)'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsShareOpen(true)} style={styles.headerIconBtn}>
                <Ionicons name="share-outline" size={21} color="#6FFB85" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Report Header Section */}
          <View style={styles.reportHeader}>
            <View style={styles.tagsRow}>
              <View style={[styles.tag, { backgroundColor: isDark ? 'rgba(52,199,89,0.16)' : 'rgba(52,199,89,0.1)' }]}>
                <Text style={[styles.tagText, { color: '#6FFB85' }]}>PUBLIC</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: isDark ? '#1F1F1F' : '#E9ECEF' }]}>
                <Text style={[styles.tagText, { color: isDark ? '#AAAAAA' : '#6C757D' }]}>VACCINES</Text>
              </View>
            </View>

            <View style={styles.titleAndMeta}>
              <Text style={[styles.vaccineTitle, { color: isDark ? '#FFFFFF' : '#141414' }]}>Vaccine Name</Text>
              
              <View style={styles.metaColumn}>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: isDark ? '#AAAAAA' : '#6C757D' }]}>REFERENCE ID</Text>
                  <Text style={[styles.metaValue, { color: isDark ? '#FFFFFF' : '#141414' }]}>#AB-2024-99812</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={[styles.metaLabel, { color: '#6FFB85' }]}>DATE OF VACCINE</Text>
                  <Text style={[styles.metaValue, { color: isDark ? '#FFFFFF' : '#141414' }]}>OCT 14, 2024</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Report Image */}
          <View style={[styles.reportContainer, { shadowColor: isDark ? '#000' : '#EBF3F5' }]}>
            <View style={styles.reportPlaceholder}>
              <Ionicons name="document-text-outline" size={60} color={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
              <Text style={{ color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', marginTop: 10, fontFamily: 'Manrope' }}>Report Preview</Text>
            </View>
          </View>

          {/* Smart Controls */}
          <View style={[styles.controlsCard, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(255,255,255,0.8)', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }]}>
            <View style={styles.controlLeft}>
              <Ionicons name="shield-checkmark-outline" size={18.15} color={isDark ? '#E5E5E5' : '#141414'} />
              <Text style={[styles.controlText, { color: isDark ? '#E5E5E5' : '#141414' }]}>keep this report private</Text>
            </View>
            <TouchableOpacity
              style={[styles.switchTrack, { backgroundColor: isPrivate ? '#DB5034' : (isDark ? '#1F1F1F' : '#E9ECEF') }]}
              onPress={() => setIsPrivate(!isPrivate)}
              activeOpacity={0.8}
            >
              <View style={[styles.switchThumb, isPrivate ? { right: 4 } : { left: 4 }]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Persistent Bottom Button */}
      {!isShareOpen && (
        <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: '#6FFB85' }]}
            activeOpacity={0.8}
            onPress={() => setIsShareOpen(true)}
          >
            <Text style={styles.primaryBtnText}>Download</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Share Overlay */}
      {isShareOpen && (
        <View style={styles.overlayWrapper}>
          <TouchableOpacity 
            style={styles.overlayBackdrop} 
            activeOpacity={1} 
            onPress={() => setIsShareOpen(false)} 
          />
          <BlurView
            intensity={60}
            tint="dark"
            style={[styles.shareSheet, { 
              backgroundColor: 'rgba(23, 23, 23, 0.75)',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }]}
          >
            <View style={styles.sheetHeader}>
              <Ionicons name="share-outline" size={24} color="#6FFB85" />
              <Text style={[styles.sheetTitle, { color: '#FFFFFF' }]}>Select files to share</Text>
            </View>

            <View style={styles.shareActions}>
              <TouchableOpacity style={styles.selectAllBtn} onPress={toggleSelectAll}>
                <View style={[styles.checkbox, { borderColor: '#DFDFDF' }, selectAll && { backgroundColor: '#6FFB85', borderColor: '#6FFB85' }]}>
                  {selectAll && <Ionicons name="checkmark" size={12} color="#141414" />}
                </View>
                <Text style={[styles.selectAllText, { color: '#FFFFFF' }]}>Select  All</Text>
              </TouchableOpacity>
              <Text style={[styles.selectedCount, { color: '#FFFFFF' }]}>{selectedFiles.size} Files Selected</Text>
            </View>

            <View style={[styles.divider, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]} />

            <View style={styles.fileList}>
              {FILES.map((file) => (
                <TouchableOpacity
                  key={file.id}
                  style={styles.fileItem}
                  onPress={() => toggleFile(file.id)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, { borderColor: '#DFDFDF' }, selectedFiles.has(file.id) && { backgroundColor: '#6FFB85', borderColor: '#6FFB85' }]}>
                    {selectedFiles.has(file.id) && <Ionicons name="checkmark" size={12} color="#141414" />}
                  </View>
                  <View style={styles.pdfIconWrap}>
                    <Ionicons name="document-text" size={16} color="#FF4B4B" />
                  </View>
                  <Text style={[styles.fileName, { color: '#FFFFFF' }]}>{file.name.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.shareBtn, { backgroundColor: '#6FFB85' }]}
              activeOpacity={0.8}
              onPress={() => setIsShareOpen(false)}
            >
              <Text style={styles.shareBtnText}>Share</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 29,
    paddingBottom: 16,
  },
  backBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter', textAlign: 'center', flex: 1 },
  headerRight: { flexDirection: 'row', gap: 12, width: 64, justifyContent: 'flex-end' },
  headerIconBtn: { width: 32, height: 44, justifyContent: 'center', alignItems: 'center' },
  reportHeader: { paddingHorizontal: 31, marginTop: 10 },
  tagsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tag: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  tagText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  titleAndMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  vaccineTitle: { fontSize: 30, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.75, flex: 1, lineHeight: 36 },
  metaColumn: { alignItems: 'flex-end', gap: 12 },
  metaItem: { alignItems: 'flex-end' },
  metaLabel: { fontSize: 12, fontFamily: 'Inter', textTransform: 'uppercase', marginBottom: 2 },
  metaValue: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 28 },
  reportContainer: {
    marginHorizontal: 36,
    height: 304,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.02)',
    marginTop: 30,
    marginBottom: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  reportPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  controlsCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 33,
    paddingVertical: 33,
    marginTop: 20,
  },
  controlLeft: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  controlText: { fontSize: 12, fontWeight: '400', fontFamily: 'Inter' },
  switchTrack: { width: 48, height: 24, borderRadius: 12, justifyContent: 'center', position: 'relative' },
  switchThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#141414', position: 'absolute' },
  bottomContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 25 },
  primaryBtn: {
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 10,
  },
  primaryBtnText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', color: '#141414' },
  overlayWrapper: { position: 'absolute', inset: 0, zIndex: 100 },
  overlayBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  shareSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderWidth: 1,
    paddingBottom: 40,
    paddingTop: 30,
    minHeight: 400,
  },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 },
  sheetTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter' },
  divider: { height: 1, width: '100%' },
  shareActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    paddingVertical: 18,
  },
  selectAllBtn: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 18, height: 18, borderRadius: 4, borderWidth: 0.7, alignItems: 'center', justifyContent: 'center' },
  selectAllText: { fontSize: 14, fontWeight: '700', fontFamily: 'Manrope', marginLeft: 12 },
  selectedCount: { fontSize: 14, fontWeight: '700', fontFamily: 'Manrope' },
  fileList: { paddingBottom: 10 },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 14,
  },
  pdfIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  fileName: { fontSize: 14, fontFamily: 'Manrope', marginLeft: 12, flex: 1 },
  shareBtn: {
    marginHorizontal: 24,
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareBtnText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', color: '#141414' },
});

