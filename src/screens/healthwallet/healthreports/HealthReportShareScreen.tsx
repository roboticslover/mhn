import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

const REPORT_IMAGE = 'https://www.figma.com/api/mcp/asset/a51a2fa7-01e9-47f2-b944-b6e4900a241a';

interface ShareFile {
  id: string;
  name: string;
  selected: boolean;
}

export default function HealthReportShareScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [files, setFiles] = useState<ShareFile[]>([
    { id: '1', name: '818786755-CBC-REPORT.PDF', selected: false },
    { id: '2', name: 'BLOOD_ANALYSIS_2024.PDF', selected: false },
  ]);

  const selectedCount = files.filter(f => f.selected).length;
  const allSelected = files.every(f => f.selected);

  const toggleFile = (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const toggleAll = () => {
    const newVal = !allSelected;
    setFiles(prev => prev.map(f => ({ ...f, selected: newVal })));
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 160 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Report Analytics</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="create-outline" size={20} color={c.textMuted} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons name="share-outline" size={20} color={c.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Report header – dimmed (background context) */}
        <View style={[styles.reportHeaderSection, { opacity: 0.2 }]}>
          <View style={styles.tagsRow}>
            <View style={[styles.tag, { backgroundColor: isDark ? 'rgba(52,199,89,0.16)' : c.successSoft }]}>
              <Text style={[styles.tagText, { color: c.primary }]}>PUBLIC</Text>
            </View>
            <View style={[styles.tag, { backgroundColor: isDark ? '#1F1F1F' : c.divider }]}>
              <Text style={[styles.tagText, { color: c.textSecondary }]}>BLOOD REPORT</Text>
            </View>
          </View>
          <View style={styles.reportTitleRow}>
            <Text style={[styles.reportTitle, { color: c.text }]}>Apollo Blood Test</Text>
            <View style={styles.reportMeta}>
              <Text style={[styles.metaLabel, { color: c.textSecondary }]}>REFERENCE ID</Text>
              <Text style={[styles.metaValue, { color: c.text }]}>#AB-2024-99812</Text>
              <Text style={[styles.metaLabel, { color: c.primary, marginTop: 8 }]}>DATE OF ANALYSIS</Text>
              <Text style={[styles.metaDate, { color: c.text }]}>OCT 14, 2024</Text>
            </View>
          </View>
        </View>

        {/* Report document image – dimmed */}
        <View style={[styles.reportDocWrap, { borderColor: c.cardGlassBorder, opacity: 0.4 }]}>
          <Image
            source={{ uri: REPORT_IMAGE }}
            style={styles.reportDocImage}
            resizeMode="cover"
          />
        </View>

        {/* Share sheet panel */}
        <View style={[styles.sharePanel, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card, borderColor: c.cardGlassBorder }]}>
          {/* Panel title */}
          <View style={styles.panelTitleRow}>
            <View style={[styles.panelIconWrap, { backgroundColor: c.accentSoft }]}>
              <Ionicons name="share-outline" size={20} color={c.primary} />
            </View>
            <Text style={[styles.panelTitle, { color: c.text }]}>Select files to share</Text>
          </View>

          <View style={[styles.panelDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.divider }]} />

          {/* Select All row */}
          <View style={styles.selectAllRow}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                {
                  borderColor: isDark ? '#DFDFDF' : c.cardBorder,
                  backgroundColor: allSelected ? c.primary : 'transparent',
                },
              ]}
              onPress={toggleAll}
              activeOpacity={0.7}
            >
              {allSelected && <Ionicons name="checkmark" size={12} color={isDark ? '#141414' : '#FFFFFF'} />}
            </TouchableOpacity>
            <Text style={[styles.selectAllText, { color: c.text }]}>Select All</Text>
            <Text style={[styles.selectedCountText, { color: c.text }]}>
              {selectedCount} {selectedCount === 1 ? 'File' : 'Files'} Selected
            </Text>
          </View>

          <View style={[styles.panelDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.divider }]} />

          {/* File list */}
          {files.map(file => (
            <TouchableOpacity
              key={file.id}
              style={styles.fileRow}
              onPress={() => toggleFile(file.id)}
              activeOpacity={0.7}
            >
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  {
                    borderColor: isDark ? '#DFDFDF' : c.cardBorder,
                    backgroundColor: file.selected ? c.primary : 'transparent',
                  },
                ]}
                onPress={() => toggleFile(file.id)}
                activeOpacity={0.7}
              >
                {file.selected && <Ionicons name="checkmark" size={12} color={isDark ? '#141414' : '#FFFFFF'} />}
              </TouchableOpacity>
              <View style={[styles.pdfIconWrap]}>
                <Ionicons name="document-text" size={20} color="#DB5034" />
              </View>
              <Text style={[styles.fileName, { color: c.text }]} numberOfLines={1}>
                {file.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Share Button – pinned */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16, backgroundColor: c.background }]}>
        <TouchableOpacity
          style={[
            styles.shareBtn,
            {
              backgroundColor: selectedCount > 0 ? c.primary : (isDark ? 'rgba(111,251,133,0.3)' : c.accentSoft),
            },
          ]}
          activeOpacity={0.85}
          disabled={selectedCount === 0}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={[
              styles.shareBtnText,
              { color: selectedCount > 0 ? c.textOnPrimary : c.primary },
            ]}
          >
            Share
          </Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconBtn: {
    width: 22,
    alignItems: 'center',
  },
  reportHeaderSection: {
    paddingHorizontal: 31,
    marginBottom: 16,
    gap: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  reportTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  reportTitle: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.75,
    lineHeight: 36,
    flex: 1,
  },
  reportMeta: {
    alignItems: 'flex-end',
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  metaValue: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  metaDate: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  reportDocWrap: {
    marginHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    height: 160,
    overflow: 'hidden',
    marginBottom: 0,
  },
  reportDocImage: {
    width: '100%',
    height: '100%',
  },
  sharePanel: {
    marginHorizontal: 0,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: 0,
  },
  panelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  panelIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  panelDivider: {
    height: 1,
    marginBottom: 16,
  },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectAllText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
    textTransform: 'capitalize',
    flex: 1,
  },
  selectedCountText: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Manrope',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  pdfIconWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Manrope',
    textTransform: 'uppercase',
    flex: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  shareBtn: {
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  shareBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
