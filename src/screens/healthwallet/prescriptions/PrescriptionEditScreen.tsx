import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import BottomNavBar from '../../../components/BottomNavBar';

export default function PrescriptionEditScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [timeline, setTimeline] = useState('');
  const [shareFamily, setShareFamily] = useState(true);
  const [hasFile] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Prescription</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Modal Card */}
        <View style={[styles.modalCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={16} color={c.textMuted} />
          </TouchableOpacity>
          <Text style={[styles.protocolLabel, { color: c.primary, fontFamily: 'Inter' }]}>SYSTEM PROTOCOL</Text>
          <Text style={[styles.modalTitle, { color: c.text, fontFamily: 'Inter' }]}>Edit{'\n'}Prescription</Text>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Prescription Name</Text>
              <View style={[styles.inputWrap, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
                <TextInput style={[styles.input, { color: c.text, fontFamily: 'Inter' }]} value={name} onChangeText={setName} placeholderTextColor={c.inputPlaceholder} placeholder="Enter name" />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Date</Text>
              <View style={[styles.inputWrap, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
                <TextInput style={[styles.input, { color: c.text, fontFamily: 'Inter' }]} value={date} onChangeText={setDate} placeholderTextColor={c.inputPlaceholder} placeholder="Select date" />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Timeline</Text>
              <View style={[styles.inputWrap, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
                <TextInput style={[styles.input, { color: c.text, fontFamily: 'Inter' }]} value={timeline} onChangeText={setTimeline} placeholderTextColor={c.inputPlaceholder} placeholder="Enter timeline" />
              </View>
            </View>

            <View style={styles.filesSection}>
              <View style={styles.filesHeader}>
                <Text style={[styles.filesLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>PRESCRIPTION FILES</Text>
                <TouchableOpacity style={styles.addFileBtn}>
                  <Ionicons name="add" size={10} color={c.primary} />
                  <Text style={[styles.addFileText, { color: c.primary, fontFamily: 'Inter' }]}>ADD NEW FILE</Text>
                </TouchableOpacity>
              </View>
              {hasFile && (
                <View style={[styles.fileRow, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}>
                  <View style={styles.fileLeft}>
                    <Ionicons name="document-outline" size={18} color={c.textSecondary} />
                    <Text style={[styles.fileName, { color: c.text, fontFamily: 'Inter' }]}>Metformin_Scan.pdf</Text>
                  </View>
                  <TouchableOpacity style={{ opacity: 0.4 }}>
                    <Ionicons name="trash-outline" size={16} color={c.text} />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={[styles.toggleCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
              <View style={styles.toggleLeft}>
                <View style={[styles.toggleIconWrap, { backgroundColor: c.accentSoft }]}>
                  <Ionicons name="people-outline" size={16} color={c.primary} />
                </View>
                <View>
                  <Text style={[styles.toggleTitle, { color: c.text, fontFamily: 'Inter' }]}>Share with your family</Text>
                  <Text style={[styles.toggleSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>Grant access to trusted{'\n'}members</Text>
                </View>
              </View>
              <Switch value={shareFamily} onValueChange={setShareFamily} trackColor={{ false: c.cardElevated, true: c.primary }} thumbColor={shareFamily ? c.textOnPrimary : c.text} />
            </View>

            <View style={styles.actionFooter}>
              <TouchableOpacity style={[styles.deleteBtn, { backgroundColor: c.error + '0D', borderColor: c.error }]}>
                <Text style={[styles.deleteBtnText, { color: c.error, fontFamily: 'Inter' }]}>DELETE Prescription</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.saveBtn, { backgroundColor: c.primary }]} onPress={() => navigation.goBack()}>
                <Text style={[styles.saveBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>SAVE CHANGES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar activeTab="card" navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  modalCard: { marginHorizontal: 22, borderRadius: 33, borderWidth: 1, padding: 33, position: 'relative' },
  closeBtn: { position: 'absolute', top: 24, right: 24, zIndex: 10 },
  protocolLabel: { fontSize: 12, fontWeight: '400', marginBottom: 18 },
  modalTitle: { fontSize: 34, fontWeight: '700', letterSpacing: -0.68, marginBottom: 26 },
  form: { gap: 24 },
  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 16, fontWeight: '500', paddingHorizontal: 4 },
  inputWrap: { borderRadius: 33, borderWidth: 1, padding: 17 },
  input: { fontSize: 16, fontWeight: '500', height: 24 },
  filesSection: { gap: 16 },
  filesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  filesLabel: { fontSize: 16, fontWeight: '500' },
  addFileBtn: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addFileText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  fileRow: { borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 21, paddingVertical: 17 },
  fileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  fileName: { fontSize: 14, fontWeight: '200', letterSpacing: 0.35 },
  toggleCard: { borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18 },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  toggleIconWrap: { width: 41, height: 41, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  toggleTitle: { fontSize: 14, fontWeight: '500' },
  toggleSub: { fontSize: 12, lineHeight: 16 },
  actionFooter: { gap: 16, marginTop: 8 },
  deleteBtn: { height: 48, borderRadius: 40, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  deleteBtnText: { fontSize: 14, fontWeight: '800', textTransform: 'capitalize' },
  saveBtn: { height: 48, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { fontSize: 14, fontWeight: '800', textTransform: 'uppercase' },
});
