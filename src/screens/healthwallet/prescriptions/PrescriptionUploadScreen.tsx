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
import BottomNavBar from '../../../components/BottomNavBar';

export default function PrescriptionUploadScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [reportName, setReportName] = useState('');
  const [shareFamily, setShareFamily] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prescription</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Hero Info */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>New Entry</Text>
          <Text style={styles.heroSubtitle}>
            Input your medical data to update your{'\n'}vitality profile.
          </Text>
        </View>

        {/* Name of Report */}
        <Text style={styles.sectionLabel}>NAME OF THE REPORT</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="e.g. Blood test"
            placeholderTextColor="#353535"
            value={reportName}
            onChangeText={setReportName}
          />
        </View>

        {/* Date */}
        <Text style={styles.sectionLabel}>WHEN WAS THE REPORT MADE? (OPTIONAL)</Text>
        <TouchableOpacity style={styles.inputWrap} activeOpacity={0.7}>
          <View style={styles.inputWithIcon}>
            <View style={styles.inputIconWrap}>
              <Ionicons name="calendar-outline" size={12} color="#6FFB85" />
            </View>
            <Text style={styles.inputPlaceholder}>Select Date</Text>
          </View>
          <Ionicons name="chevron-down" size={12} color="#888" />
        </TouchableOpacity>

        {/* Category */}
        <Text style={styles.sectionLabel}>CATEGORY</Text>
        <TouchableOpacity style={styles.inputWrap} activeOpacity={0.7}>
          <View style={styles.inputWithIcon}>
            <View style={styles.inputIconWrap}>
              <Ionicons name="folder-outline" size={12} color="#6FFB85" />
            </View>
            <Text style={styles.inputPlaceholder}>Laboratory Results</Text>
          </View>
          <Ionicons name="chevron-forward" size={12} color="#888" />
        </TouchableOpacity>

        {/* Upload tap area */}
        <TouchableOpacity
          style={styles.uploadTapArea}
          activeOpacity={0.8}
          onPress={() => setShowUploadModal(true)}
        >
          <Ionicons name="cloud-upload-outline" size={28} color="#6FFB85" />
          <Text style={styles.uploadTapText}>Tap to upload files</Text>
        </TouchableOpacity>

        {/* Share with family toggle */}
        <View style={styles.toggleCard}>
          <View style={styles.toggleLeft}>
            <View style={styles.toggleIconWrap}>
              <Ionicons name="people-outline" size={16} color="#6FFB85" />
            </View>
            <View>
              <Text style={styles.toggleTitle}>Share with your family</Text>
              <Text style={styles.toggleSub}>Grant access to trusted{'\n'}members</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.switchTrack, { backgroundColor: shareFamily ? '#6FFB85' : '#333' }]}
            onPress={() => setShareFamily(!shareFamily)}
            activeOpacity={0.8}
          >
            <View style={[styles.switchThumb, shareFamily ? { right: 3.5 } : { left: 3.5 }]} />
          </TouchableOpacity>
        </View>

        {/* Add to Health Reports */}
        <TouchableOpacity
          style={styles.addToReportsBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AllPrescriptions')}
        >
          <Ionicons name="add" size={18} color="#141414" />
          <Text style={styles.addToReportsText}>Add to Health Reports</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Upload Modal */}
      <Modal visible={showUploadModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.uploadModal}>
            {/* Handle bar */}
            <View style={styles.modalHandle} />

            {/* Icon with glow */}
            <View style={styles.modalIconWrap}>
              <View style={styles.modalIconGlow} />
              <Ionicons name="folder-open-outline" size={38} color="#6FFB85" />
            </View>

            <Text style={styles.modalTitle}>Choose how you'd like to{'\n'}upload your files</Text>
            <Text style={styles.modalSub}>A Max of 20 files can be uploaded.</Text>

            <View style={styles.uploadOptions}>
              <TouchableOpacity style={styles.uploadOption} activeOpacity={0.7}>
                <View style={[styles.uploadOptionIcon, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.05)' }]}>
                  <Ionicons name="images-outline" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.uploadOptionText}>Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadOption} activeOpacity={0.7}>
                <View style={[styles.uploadOptionIcon, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.05)' }]}>
                  <Ionicons name="attach-outline" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.uploadOptionText}>Files</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadOption} activeOpacity={0.7}>
                <View style={[styles.uploadOptionIcon, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.05)' }]}>
                  <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.uploadOptionText}>Camera</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeModalBtn}
              onPress={() => setShowUploadModal(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <BottomNavBar activeTab="card" navigation={navigation} />
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
    color: '#FFFFFF',
  },
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 28,
    opacity: 0.2,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.75,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter',
    color: '#ABABAB',
    lineHeight: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#BCCBB7',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    paddingHorizontal: 25,
    marginBottom: 8,
    opacity: 0.2,
  },
  inputWrap: {
    marginHorizontal: 26,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    paddingHorizontal: 27,
    paddingVertical: 17,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.2,
  },
  input: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    flex: 1,
  },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  inputIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(85,248,115,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputPlaceholder: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#353535',
  },
  uploadTapArea: {
    marginHorizontal: 26,
    height: 80,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(111,251,133,0.3)',
    backgroundColor: 'rgba(111,251,133,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  uploadTapText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#6FFB85',
  },
  toggleCard: {
    marginHorizontal: 26,
    borderRadius: 33,
    borderWidth: 0.85,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    marginBottom: 20,
    opacity: 0.2,
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  toggleIconWrap: {
    width: 41,
    height: 41,
    borderRadius: 999,
    backgroundColor: 'rgba(85,248,115,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTitle: {
    fontSize: 13.66,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  toggleSub: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#ABABAB',
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
  addToReportsBtn: {
    marginHorizontal: 26,
    height: 58,
    borderRadius: 33,
    backgroundColor: '#6FFB85',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 50,
    elevation: 8,
  },
  addToReportsText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#141414',
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
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.95)',
    paddingHorizontal: 40,
    paddingBottom: 40,
    paddingTop: 16,
    alignItems: 'center',
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
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
  modalIconGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(48,219,91,0.10)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 26,
  },
  modalSub: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: '#AAAAAA',
    textAlign: 'center',
    marginBottom: 28,
  },
  uploadOptions: { flexDirection: 'row', gap: 0, marginBottom: 28, justifyContent: 'space-between', width: '100%' },
  uploadOption: { alignItems: 'center', gap: 8, flex: 1 },
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
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  closeModalBtn: {
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    minWidth: 200,
  },
  closeModalText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
});
