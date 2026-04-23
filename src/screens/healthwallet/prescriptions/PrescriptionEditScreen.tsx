import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function PrescriptionEditScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [timeline, setTimeline] = useState('');
  const [shareFamily, setShareFamily] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: '#050505' }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 28 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prescription</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Glass modal card */}
        <View style={styles.modalCard}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={15.77} color="rgba(255,255,255,0.6)" />
          </TouchableOpacity>

          {/* Header */}
          <Text style={styles.protocolLabel}>SYSTEM PROTOCOL</Text>
          <Text style={styles.modalTitle}>Edit{'\n'}Prescription</Text>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Prescription Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Prescription Name</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="rgba(255,255,255,0.15)"
                  placeholder=""
                />
              </View>
            </View>

            {/* Date */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Date</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  value={date}
                  onChangeText={setDate}
                  placeholderTextColor="rgba(255,255,255,0.15)"
                  placeholder=""
                />
              </View>
            </View>

            {/* Timeline */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Timeline</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  style={styles.input}
                  value={timeline}
                  onChangeText={setTimeline}
                  placeholderTextColor="rgba(255,255,255,0.15)"
                  placeholder=""
                />
              </View>
            </View>

            {/* Prescription Files */}
            <View style={styles.filesSection}>
              <View style={styles.filesHeader}>
                <Text style={styles.filesLabel}>PRESCRIPTION FILES</Text>
                <TouchableOpacity style={styles.addFileBtn}>
                  <Ionicons name="add" size={9} color="#6FFB85" />
                  <Text style={styles.addFileText}>ADD NEW FILE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.fileRow}>
                <View style={styles.fileLeft}>
                  <Ionicons name="document-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.fileName}>Metformin_Scan.pdf</Text>
                </View>
                <TouchableOpacity style={{ opacity: 0.4 }}>
                  <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Share with family toggle */}
            <View style={styles.toggleCard}>
              <View style={styles.toggleLeft}>
                <View style={styles.toggleIconWrap}>
                  <Ionicons name="people-outline" size={14.6} color="#6FFB85" />
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
                <View style={[styles.switchThumb, shareFamily ? { right: 3.42 } : { left: 3.42 }]} />
              </TouchableOpacity>
            </View>

            {/* Action Footer */}
            <View style={styles.actionFooter}>
              <TouchableOpacity style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>DELETE Prescription</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                activeOpacity={0.8}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.saveBtnText}>SAVE CHANGES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 16,
  },
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  scrollContent: { paddingHorizontal: 0 },
  modalCard: {
    marginHorizontal: 22,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    paddingTop: 33,
    paddingBottom: 49,
    paddingHorizontal: 33,
    position: 'relative',
    overflow: 'hidden',
  },
  closeBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
    zIndex: 10,
    padding: 4,
  },
  protocolLabel: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    color: '#6FFB85',
    marginBottom: 18,
  },
  modalTitle: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#FFFFFF',
    letterSpacing: -0.68,
    lineHeight: 40,
    marginBottom: 26,
  },
  form: { gap: 24 },
  fieldGroup: { gap: 14 },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#AAAAAA',
    paddingHorizontal: 4,
  },
  inputWrap: {
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    padding: 17,
    height: 58,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#FFFFFF',
  },
  filesSection: { gap: 16 },
  filesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filesLabel: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#AAAAAA',
  },
  addFileBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addFileText: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#6FFB85',
    letterSpacing: 1,
  },
  fileRow: {
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(68,73,51,0.1)',
    backgroundColor: 'rgba(31,31,31,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingVertical: 17,
  },
  fileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fileName: {
    fontSize: 14,
    fontWeight: '200',
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    letterSpacing: 0.35,
  },
  toggleCard: {
    borderRadius: 33,
    borderWidth: 0.85,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(23,23,23,0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 17.93,
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 13.66 },
  toggleIconWrap: {
    width: 40.82,
    height: 40.98,
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
    justifyContent: 'center',
    position: 'relative',
  },
  switchThumb: {
    width: 13.66,
    height: 13.66,
    borderRadius: 999,
    backgroundColor: '#141414',
    position: 'absolute',
  },
  actionFooter: {
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(68,73,51,0.1)',
    paddingTop: 1,
  },
  deleteBtn: {
    height: 48,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#DB5034',
    backgroundColor: 'rgba(219,80,52,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#DB5034',
    textTransform: 'capitalize',
  },
  saveBtn: {
    height: 48,
    borderRadius: 33,
    backgroundColor: '#6FFB85',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Manrope',
    color: '#141414',
    textTransform: 'uppercase',
  },
});
