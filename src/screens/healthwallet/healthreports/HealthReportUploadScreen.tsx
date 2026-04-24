import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function HealthReportUploadScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [reportName, setReportName] = useState('');
  const [shareFamily, setShareFamily] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 140 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Add Records</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Hero Info */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: c.text }]}>New Entry</Text>
          <Text style={[styles.heroSubtitle, { color: c.textSecondary }]}>
            Input your medical data to update your{'\n'}vitality profile.
          </Text>
        </View>

        {/* Name of Report */}
        <Text style={[styles.fieldLabel, { color: isDark ? '#E5E5E5' : c.textSubheading }]}>Name of the Report</Text>
        <View style={[styles.inputWrap, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <TextInput
            style={[styles.input, { color: isDark ? '#353535' : c.inputPlaceholder }]}
            placeholder="e.g. Blood test"
            placeholderTextColor={isDark ? '#353535' : c.inputPlaceholder}
            value={reportName}
            onChangeText={setReportName}
          />
        </View>

        {/* Date */}
        <Text style={[styles.fieldLabel, { color: isDark ? '#E5E5E5' : c.textSubheading }]}>
          When was the report made? (Optional)
        </Text>
        <TouchableOpacity
          style={[styles.inputWrap, styles.inputWrapRow, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}
          activeOpacity={0.7}
        >
          <View style={styles.inputWithIcon}>
            <View style={[styles.inputIconCircle, { backgroundColor: c.accentSoft }]}>
              <Ionicons name="calendar-outline" size={12} color={c.primary} />
            </View>
            <Text style={[styles.inputPlaceholderText, { color: isDark ? '#353535' : c.inputPlaceholder }]}>
              Select Date
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={14} color={c.textSecondary} />
        </TouchableOpacity>

        {/* File Management */}
        <View style={styles.fileMgmtHeader}>
          <Text style={[styles.fileMgmtLabel, { color: isDark ? 'rgba(255,255,255,0.4)' : c.textSecondary }]}>
            File Management
          </Text>
          <TouchableOpacity style={styles.addNewFileBtn} activeOpacity={0.7}>
            <Ionicons name="add" size={10} color={c.primary} />
            <Text style={[styles.addNewFileBtnText, { color: c.primary }]}>ADD NEW FILE</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Zone */}
        <TouchableOpacity
          style={[styles.uploadZone, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}
          activeOpacity={0.8}
          onPress={() => setShowUploadModal(true)}
        >
          <View style={[styles.uploadIconCircle, { backgroundColor: c.accentSoft }]}>
            <Ionicons name="cloud-upload-outline" size={28} color={c.primary} />
          </View>
          <View style={styles.uploadTextWrap}>
            <Text style={[styles.uploadTitle, { color: c.text }]}>Upload Documents</Text>
            <Text style={[styles.uploadSub, { color: c.textSecondary }]}>
              Upload up to 20 files (max 10MB each).{'\n'}Supported formats: JPG, JPEG, PNG, and PDF.
            </Text>
          </View>
        </TouchableOpacity>

        {/* Uploaded files list */}
        {uploadedFiles.map((file, idx) => (
          <View key={idx} style={[styles.fileRow, { backgroundColor: isDark ? 'rgba(31,31,31,0.5)' : c.card, borderColor: isDark ? 'rgba(68,73,51,0.1)' : c.cardBorder }]}>
            <View style={styles.fileRowLeft}>
              <Ionicons name="document-outline" size={18} color={c.textSecondary} />
              <Text style={[styles.fileName, { color: c.text }]}>{file}</Text>
            </View>
            <TouchableOpacity onPress={() => setUploadedFiles(prev => prev.filter((_, i) => i !== idx))}>
              <Ionicons name="trash-outline" size={16} color={c.textMuted} />
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

      {/* Upload CTA – pinned bottom */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16, backgroundColor: c.background }]}>
        <TouchableOpacity
          style={[styles.uploadBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AllHealthReports')}
        >
          <Ionicons name="add-circle-outline" size={20} color={c.textOnPrimary} />
          <Text style={[styles.uploadBtnText, { color: c.textOnPrimary }]}>Upload</Text>
        </TouchableOpacity>
      </View>

      {/* Upload Source Modal */}
      <Modal visible={showUploadModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.uploadModal, { backgroundColor: isDark ? 'rgba(23,23,23,0.97)' : c.modal, borderColor: c.cardGlassBorder }]}>
            <View style={[styles.modalHandle, { backgroundColor: c.cardGlassBorder }]} />

            <View style={[styles.modalIconWrap, { backgroundColor: c.accentSoft }]}>
              <Ionicons name="cloud-upload-outline" size={32} color={c.primary} />
            </View>

            <Text style={[styles.modalTitle, { color: c.text }]}>
              Choose how you'd like to{'\n'}upload your files
            </Text>
            <Text style={[styles.modalSub, { color: c.textSecondary }]}>
              A Max of 20 files can be uploaded.
            </Text>

            <View style={styles.uploadOptions}>
              {[
                { icon: 'images-outline', label: 'Photos' },
                { icon: 'document-attach-outline', label: 'Files' },
                { icon: 'camera-outline', label: 'Camera' },
              ].map(opt => (
                <TouchableOpacity
                  key={opt.label}
                  style={styles.uploadOption}
                  activeOpacity={0.7}
                  onPress={() => {
                    setUploadedFiles(prev => [...prev, `${opt.label}_file.pdf`]);
                    setShowUploadModal(false);
                  }}
                >
                  <View style={[styles.uploadOptionIcon, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : c.surface, borderColor: c.cardGlassBorder }]}>
                    <Ionicons name={opt.icon as any} size={22} color={c.text} />
                  </View>
                  <Text style={[styles.uploadOptionText, { color: c.text }]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.closeModalBtn, { borderColor: isDark ? 'rgba(255,255,255,0.15)' : c.cardBorder }]}
              onPress={() => setShowUploadModal(false)}
              activeOpacity={0.7}
            >
              <Text style={[styles.closeModalText, { color: c.text }]}>Close</Text>
            </TouchableOpacity>
          </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.75,
    lineHeight: 36,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'capitalize',
    lineHeight: 20,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  inputWrap: {
    marginHorizontal: 25,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 27,
    paddingVertical: 17,
    marginBottom: 24,
  },
  inputWrapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  input: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  inputIconCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPlaceholderText: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  fileMgmtHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 12,
  },
  fileMgmtLabel: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Manrope',
    textTransform: 'capitalize',
  },
  addNewFileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addNewFileBtnText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  uploadZone: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 2,
    borderStyle: 'dashed',
    paddingVertical: 34,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTextWrap: {
    alignItems: 'center',
    gap: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 28,
  },
  uploadSub: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 16,
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
    paddingHorizontal: 25,
    paddingTop: 12,
  },
  uploadBtn: {
    height: 58,
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  uploadBtnText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  uploadModal: {
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingBottom: 40,
    paddingTop: 16,
    alignItems: 'center',
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    marginBottom: 28,
  },
  modalIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 12,
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 28,
  },
  uploadOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 28,
  },
  uploadOption: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  uploadOptionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadOptionText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  closeModalBtn: {
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    minWidth: 200,
  },
  closeModalText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});
