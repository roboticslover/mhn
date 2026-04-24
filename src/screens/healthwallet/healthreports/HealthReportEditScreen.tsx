import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function HealthReportEditScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [reportName, setReportName] = useState('Bejx');
  const [reportDate, setReportDate] = useState('04 Apr 2026');
  const [shareFamily, setShareFamily] = useState(true);
  const [files, setFiles] = useState(['Metformin_Scan.pdf']);

  const handleDelete = () => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this health report? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => navigation.navigate('AllHealthReports'),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 180 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Edit Records</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Report Details Section */}
        <Text style={[styles.sectionLabel, { color: c.textSecondary }]}>Report Details</Text>

        <View style={[styles.detailsCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          {/* Name field */}
          <View style={styles.fieldBlock}>
            <Text style={[styles.fieldMeta, { color: c.textSecondary }]}>Name of the Report</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.fieldInput, { color: c.text }]}
                value={reportName}
                onChangeText={setReportName}
                placeholderTextColor={c.inputPlaceholder}
              />
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : c.divider }]} />

          {/* Date field */}
          <View style={styles.fieldBlock}>
            <Text style={[styles.fieldMeta, { color: c.textSecondary }]}>
              When was the report made? (optional)
            </Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.fieldInput, { color: c.text }]}
                value={reportDate}
                onChangeText={setReportDate}
                placeholderTextColor={c.inputPlaceholder}
              />
            </View>
          </View>
        </View>

        {/* Prescription Files Section */}
        <View style={styles.filesHeader}>
          <Text style={[styles.filesLabel, { color: isDark ? '#E5E5E5' : c.textSubheading }]}>
            PRESCRIPTION FILES
          </Text>
          <TouchableOpacity style={styles.addFileBtn} activeOpacity={0.7}>
            <Ionicons name="add" size={10} color={c.primary} />
            <Text style={[styles.addFileBtnText, { color: c.primary }]}>ADD NEW FILE</Text>
          </TouchableOpacity>
        </View>

        {files.map((file, idx) => (
          <View
            key={idx}
            style={[styles.fileRow, { backgroundColor: isDark ? 'rgba(31,31,31,0.5)' : c.card, borderColor: isDark ? 'rgba(68,73,51,0.1)' : c.cardBorder }]}
          >
            <View style={styles.fileRowLeft}>
              <Ionicons name="document-outline" size={18} color={c.textSecondary} />
              <Text style={[styles.fileName, { color: c.text }]}>{file}</Text>
            </View>
            <TouchableOpacity
              onPress={() => setFiles(prev => prev.filter((_, i) => i !== idx))}
              style={{ opacity: 0.4 }}
            >
              <Ionicons name="trash-outline" size={16} color={c.error} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Share with family toggle */}
        <View style={[styles.toggleCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.toggleLeft}>
            <View style={[styles.toggleIconWrap, { backgroundColor: c.accentSoft }]}>
              <Ionicons name="people-outline" size={16} color={c.primary} />
            </View>
            <View>
              <Text style={[styles.toggleTitle, { color: c.text }]}>Share with your family</Text>
              <Text style={[styles.toggleSub, { color: c.textSecondary }]}>
                Grant access to trusted{'\n'}members
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.switchTrack, { backgroundColor: shareFamily ? c.primary : (isDark ? '#333' : c.divider) }]}
            onPress={() => setShareFamily(!shareFamily)}
            activeOpacity={0.8}
          >
            <View style={[styles.switchThumb, shareFamily ? { right: 3.5 } : { left: 3.5 }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom action buttons – pinned */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16, backgroundColor: c.background }]}>
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.saveBtnText, { color: c.textOnPrimary }]}>Save Change</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deleteBtn, { borderColor: c.error }]}
          activeOpacity={0.8}
          onPress={handleDelete}
        >
          <Text style={[styles.deleteBtnText, { color: c.error }]}>Delete Record</Text>
          <Ionicons name="trash-outline" size={14} color={c.error} />
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
  sectionLabel: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'capitalize',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  detailsCard: {
    marginHorizontal: 16,
    borderRadius: 33,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 24,
  },
  fieldBlock: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  fieldMeta: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 16,
    marginBottom: 4,
  },
  inputRow: {
    paddingTop: 4,
  },
  fieldInput: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  filesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  filesLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 24,
    textTransform: 'uppercase',
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
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  fileRow: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingVertical: 17,
    marginBottom: 10,
  },
  fileRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'Manrope',
    letterSpacing: 0.35,
    lineHeight: 20,
  },
  toggleCard: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 0.85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    marginTop: 4,
    marginBottom: 16,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  toggleIconWrap: {
    width: 41,
    height: 41,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: {
    fontSize: 13.66,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 20.5,
  },
  toggleSub: {
    fontSize: 12,
    fontFamily: 'Inter',
    lineHeight: 16,
  },
  switchTrack: {
    width: 40.85,
    height: 20.49,
    borderRadius: 999,
    position: 'relative',
    justifyContent: 'center',
  },
  switchThumb: {
    width: 13.66,
    height: 13.66,
    borderRadius: 999,
    backgroundColor: '#141414',
    position: 'absolute',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    gap: 10,
  },
  saveBtn: {
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
  saveBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  deleteBtn: {
    height: 61,
    borderRadius: 40,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  deleteBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    textTransform: 'capitalize',
    lineHeight: 28,
  },
});
