import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
export default function HealthReportUploadScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [reportName, setReportName] = useState('');
  const [shareFamily, setShareFamily] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16, paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Ionicons name="chevron-back" size={24} color={c.text} /></TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Health Reports</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.heroSection}>
          <Text style={[styles.heroTitle, { color: c.text, fontFamily: 'Inter' }]}>New Entry</Text>
          <Text style={[styles.heroSubtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>Input your medical data to update your{'\n'}vitality profile.</Text>
        </View>

        <Text style={[styles.sectionLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>NAME OF THE REPORT</Text>
        <View style={[styles.inputWrap, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
          <TextInput style={[styles.input, { color: c.text, fontFamily: 'Inter' }]} placeholder="e.g. Blood test" placeholderTextColor={c.inputPlaceholder} value={reportName} onChangeText={setReportName} />
        </View>

        <Text style={[styles.sectionLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>WHEN WAS THE REPORT MADE? (OPTIONAL)</Text>
        <TouchableOpacity style={[styles.inputWrap, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
          <View style={styles.inputWithIcon}>
            <View style={[styles.inputIconWrap, { backgroundColor: c.accentSoft }]}><Ionicons name="calendar-outline" size={12} color={c.primary} /></View>
            <Text style={[styles.inputPlaceholder, { color: c.inputPlaceholder, fontFamily: 'Inter' }]}>Select Date</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.sectionLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>CATEGORY</Text>
        <TouchableOpacity style={[styles.inputWrap, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
          <View style={styles.inputWithIcon}>
            <View style={[styles.inputIconWrap, { backgroundColor: c.accentSoft }]}><Ionicons name="folder-outline" size={12} color={c.primary} /></View>
            <Text style={[styles.inputPlaceholder, { color: c.inputPlaceholder, fontFamily: 'Inter' }]}>Laboratory Results</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.uploadArea, { borderColor: c.cardGlassBorder, backgroundColor: c.card }]} activeOpacity={0.7} onPress={() => setShowUploadModal(true)}>
          <Ionicons name="cloud-upload-outline" size={32} color={c.primary} />
          <Text style={[styles.uploadTitle, { color: c.text, fontFamily: 'Inter' }]}>Upload your files</Text>
          <Text style={[styles.uploadSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>A Max of 20 files can be uploaded.</Text>
        </TouchableOpacity>

        <View style={[styles.toggleCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <View style={styles.toggleLeft}>
            <View style={[styles.toggleIconWrap, { backgroundColor: c.accentSoft }]}><Ionicons name="people-outline" size={16} color={c.primary} /></View>
            <View>
              <Text style={[styles.toggleTitle, { color: c.text, fontFamily: 'Inter' }]}>Share with your family</Text>
              <Text style={[styles.toggleSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>Grant access to trusted{'\n'}members</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.switchTrack, { backgroundColor: shareFamily ? c.primary : c.cardElevated }]} onPress={() => setShareFamily(!shareFamily)}>
            <View style={[styles.switchThumb, shareFamily ? { right: 4 } : { left: 4 }]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.addBtn, { backgroundColor: c.accentSoft }]} onPress={() => navigation.goBack()}>
          <Ionicons name="add" size={18} color={c.primary} />
          <Text style={[styles.addBtnText, { color: c.primary, fontFamily: 'Inter' }]}>Add to Health Reports</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showUploadModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.uploadModal, { backgroundColor: c.modal, borderColor: c.cardGlassBorder }]}>
            <View style={[styles.modalHandle, { backgroundColor: c.cardGlassBorder }]} />
            <View style={[styles.modalIconWrap, { backgroundColor: c.accentSoft }]}><Ionicons name="folder-open-outline" size={30} color={c.primary} /></View>
            <Text style={[styles.modalTitle, { color: c.text, fontFamily: 'Inter' }]}>Choose how you'd like to upload your files</Text>
            <Text style={[styles.modalSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>A Max of 20 files can be uploaded.</Text>
            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadOption}><View style={[styles.uploadOptionIcon, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}><Ionicons name="images-outline" size={20} color={c.primary} /></View><Text style={[styles.uploadOptionText, { color: c.text, fontFamily: 'Inter' }]}>Photos</Text></TouchableOpacity>
              <TouchableOpacity style={styles.uploadOption}><View style={[styles.uploadOptionIcon, { backgroundColor: c.accentSoft, borderColor: c.cardGlassBorder }]}><Ionicons name="document-outline" size={20} color={c.primary} /></View><Text style={[styles.uploadOptionText, { color: c.text, fontFamily: 'Inter' }]}>Files</Text></TouchableOpacity>
              <TouchableOpacity style={styles.uploadOption}><View style={[styles.uploadOptionIcon, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}><Ionicons name="camera-outline" size={20} color={c.primary} /></View><Text style={[styles.uploadOptionText, { color: c.text, fontFamily: 'Inter' }]}>Camera</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.closeModalBtn, { borderColor: c.cardGlassBorder }]} onPress={() => setShowUploadModal(false)}><Text style={[styles.closeModalText, { color: c.text, fontFamily: 'Inter' }]}>Close</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16 },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  heroSection: { paddingHorizontal: 24, marginBottom: 24 },
  heroTitle: { fontSize: 30, fontWeight: '800', letterSpacing: -0.75, marginBottom: 8 },
  heroSubtitle: { fontSize: 16, lineHeight: 24 },
  sectionLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 1.1, textTransform: 'uppercase', paddingHorizontal: 25, marginBottom: 8 },
  inputWrap: { marginHorizontal: 26, borderRadius: 40, borderWidth: 1, paddingHorizontal: 27, paddingVertical: 17, marginBottom: 20, flexDirection: 'row', alignItems: 'center' },
  input: { fontSize: 20, fontWeight: '500', flex: 1 },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  inputIconWrap: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  inputPlaceholder: { fontSize: 20, fontWeight: '500' },
  uploadArea: { marginHorizontal: 26, height: 160, borderRadius: 33, borderWidth: 1, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 },
  uploadTitle: { fontSize: 16, fontWeight: '600' },
  uploadSub: { fontSize: 12 },
  toggleCard: { marginHorizontal: 26, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, marginBottom: 20 },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  toggleIconWrap: { width: 41, height: 41, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  toggleTitle: { fontSize: 14, fontWeight: '500' },
  toggleSub: { fontSize: 12, lineHeight: 16 },
  switchTrack: { width: 41, height: 21, borderRadius: 999, position: 'relative', justifyContent: 'center' },
  switchThumb: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#141414', position: 'absolute' },
  addBtn: { marginHorizontal: 26, height: 58, borderRadius: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  addBtnText: { fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  uploadModal: { borderTopLeftRadius: 33, borderTopRightRadius: 33, borderWidth: 1, paddingHorizontal: 40, paddingBottom: 40, paddingTop: 16, alignItems: 'center' },
  modalHandle: { width: 36, height: 4, borderRadius: 2, marginBottom: 24 },
  modalIconWrap: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  modalSub: { fontSize: 12, textAlign: 'center', marginBottom: 24 },
  uploadOptions: { flexDirection: 'row', gap: 24, marginBottom: 24 },
  uploadOption: { alignItems: 'center', gap: 8 },
  uploadOptionIcon: { width: 56, height: 56, borderRadius: 28, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  uploadOptionText: { fontSize: 12, fontWeight: '600' },
  closeModalBtn: { height: 48, borderRadius: 999, borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 25, minWidth: 150 },
  closeModalText: { fontSize: 14, fontWeight: '600' },
});
