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
import { useTheme } from '../../../theme/ThemeProvider';

const PROTECTION_UNITS = ['Days', 'Weeks', 'Months', 'Years'];

export default function VaccineAddScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [vaccineName, setVaccineName] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [protectionUnit, setProtectionUnit] = useState('Days');
  const [protectionDays, setProtectionDays] = useState('');
  const [showUnitPicker, setShowUnitPicker] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>('Metformin_Scan.pdf');
  const [remindMe, setRemindMe] = useState(false);
  const [shareFamily, setShareFamily] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 28, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Add Vaccinations</Text>
          <View style={{ width: 22 }} />
        </View>

        <View style={styles.formSection}>
          {/* Vaccine Name */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>Name of The Vaccination</Text>
            <View style={[styles.inputWrap, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
              <TextInput
                style={[styles.inputText, { color: c.text }]}
                placeholder="e.g. mmr"
                placeholderTextColor={'rgba(170,170,170,0.5)'}
                value={vaccineName}
                onChangeText={setVaccineName}
              />
            </View>
          </View>

          {/* When vaccinated */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>when were you vaccinated? (optional)</Text>
            <TouchableOpacity style={[styles.inputWrap, styles.inputWithIcon, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
              <Ionicons name="calendar-outline" size={16} color={c.textSecondary} style={styles.inputIcon} />
              <Text style={[styles.inputPlaceholderText, { color: 'rgba(170,170,170,0.5)' }]}>mm/dd/yyyy</Text>
            </TouchableOpacity>
          </View>

          {/* Protection duration */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: c.textSecondary }]}>Till when are you protected? (optional)</Text>
            <View style={styles.durationRow}>
              {/* Unit picker */}
              <TouchableOpacity
                style={[styles.unitPicker, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}
                onPress={() => setShowUnitPicker(!showUnitPicker)}
              >
                <Text style={[styles.unitText, { color: c.text }]}>{protectionUnit}</Text>
                <Ionicons name="chevron-down" size={14} color={c.textSecondary} />
                {showUnitPicker && (
                  <View style={[styles.unitDropdown, { backgroundColor: c.cardElevated, borderColor: c.cardGlassBorder }]}>
                    {PROTECTION_UNITS.map((u) => (
                      <TouchableOpacity
                        key={u}
                        style={styles.unitOption}
                        onPress={() => { setProtectionUnit(u); setShowUnitPicker(false); }}
                      >
                        <Text style={[styles.unitOptionText, { color: u === protectionUnit ? c.primary : c.text }]}>{u}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </TouchableOpacity>
              {/* Number input */}
              <View style={[styles.numberInput, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
                <TextInput
                  style={[styles.inputText, { color: c.text }]}
                  placeholder="No. of Days"
                  placeholderTextColor={'rgba(170,170,170,0.5)'}
                  keyboardType="numeric"
                  value={protectionDays}
                  onChangeText={setProtectionDays}
                />
              </View>
            </View>
          </View>

          {/* Files Section */}
          <View style={styles.filesSection}>
            <View style={styles.filesSectionHeader}>
              <Text style={[styles.filesSectionTitle, { color: c.text }]}>PRESCRIPTION FILES</Text>
              <TouchableOpacity style={styles.addFileBtn}>
                <Ionicons name="add" size={10} color={c.primary} />
                <Text style={[styles.addFileBtnText, { color: c.primary }]}>ADD NEW FILE</Text>
              </TouchableOpacity>
            </View>

            {attachedFile ? (
              <View style={[styles.attachedFile, { backgroundColor: 'rgba(31,31,31,0.5)', borderColor: 'rgba(68,73,51,0.1)' }]}>
                <View style={styles.attachedFileLeft}>
                  <Ionicons name="document-outline" size={16} color={c.textSecondary} />
                  <Text style={[styles.attachedFileName, { color: c.text }]}>{attachedFile}</Text>
                </View>
                <TouchableOpacity onPress={() => setAttachedFile(null)} style={{ opacity: 0.4 }}>
                  <Ionicons name="trash-outline" size={16} color={c.error} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.uploadArea, { borderColor: c.cardGlassBorder, backgroundColor: c.card }]}
                activeOpacity={0.7}
              >
                <View style={[styles.uploadIconWrap, { backgroundColor: c.accentSoft }]}>
                  <Ionicons name="cloud-upload-outline" size={22} color={c.primary} />
                </View>
                <Text style={[styles.uploadTitle, { color: c.text }]}>Upload Medical Reports</Text>
                <Text style={[styles.uploadSub, { color: c.textSecondary }]}>PDF, JPG or PNG up to 10MB</Text>
                <Text style={[styles.selectFileText, { color: c.primary }]}>SELECT FILE</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Remind Me Toggle */}
          <View style={[styles.toggleCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIconWrap, { backgroundColor: c.accentSoft }]}>
                <Ionicons name="notifications-outline" size={20} color={c.primary} />
              </View>
              <View style={styles.toggleText}>
                <Text style={[styles.toggleTitle, { color: c.text }]}>Remind me</Text>
                <Text style={[styles.toggleSub, { color: c.textSecondary }]}>Get notified before your vaccine expires</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.switchTrack, { backgroundColor: remindMe ? c.primary : '#7b7f7c' }]}
              onPress={() => setRemindMe(!remindMe)}
              activeOpacity={0.8}
            >
              <View style={[styles.switchThumb, remindMe ? { right: 4 } : { left: 4 }]} />
            </TouchableOpacity>
          </View>

          {/* Share with family Toggle */}
          <View style={[styles.toggleCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIconWrap, { backgroundColor: c.accentSoft }]}>
                <Ionicons name="people-outline" size={20} color={c.primary} />
              </View>
              <View style={styles.toggleText}>
                <Text style={[styles.toggleTitle, { color: c.text }]}>Share with your family</Text>
                <Text style={[styles.toggleSub, { color: c.textSecondary }]}>Grant access to trusted{'\n'}members</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.switchTrack, { backgroundColor: shareFamily ? c.primary : '#7b7f7c' }]}
              onPress={() => setShareFamily(!shareFamily)}
              activeOpacity={0.8}
            >
              <View style={[styles.switchThumb, shareFamily ? { right: 4 } : { left: 4 }]} />
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: c.primary }]}
              onPress={() => navigation.navigate('AllVaccines')}
              activeOpacity={0.85}
            >
              <Text style={[styles.submitBtnText, { color: c.textOnPrimary }]}>Add to vaccinations</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  formSection: { paddingHorizontal: 25, gap: 18 },
  fieldGroup: { gap: 13 },
  fieldLabel: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter', lineHeight: 24 },
  inputWrap: {
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center' },
  inputIcon: { marginRight: 14 },
  inputText: { fontSize: 20, fontWeight: '300', fontFamily: 'Manrope', letterSpacing: -0.5 },
  inputPlaceholderText: { fontSize: 20, fontWeight: '300', fontFamily: 'Manrope', letterSpacing: -0.5 },
  durationRow: { flexDirection: 'row', gap: 12 },
  unitPicker: {
    flex: 1,
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 10,
  },
  unitText: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter' },
  unitDropdown: {
    position: 'absolute',
    top: 62,
    left: 0,
    right: 0,
    borderRadius: 16,
    borderWidth: 1,
    zIndex: 100,
    overflow: 'hidden',
  },
  unitOption: { paddingHorizontal: 20, paddingVertical: 12 },
  unitOptionText: { fontSize: 16, fontFamily: 'Inter' },
  numberInput: {
    flex: 1,
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  filesSection: { gap: 12 },
  filesSectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  filesSectionTitle: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  addFileBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addFileBtnText: { fontSize: 10, fontWeight: '800', fontFamily: 'Manrope', letterSpacing: 1, textTransform: 'uppercase' },
  attachedFile: {
    height: 58,
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
  },
  attachedFileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  attachedFileName: { fontSize: 14, fontWeight: '300', fontFamily: 'Manrope', letterSpacing: 0.35 },
  uploadArea: {
    borderRadius: 33,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 28,
    gap: 8,
  },
  uploadIconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  uploadTitle: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter' },
  uploadSub: { fontSize: 12, fontFamily: 'Inter' },
  selectFileText: { fontSize: 12, fontWeight: '700', fontFamily: 'Inter', letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 4 },
  toggleCard: {
    borderRadius: 33,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 21,
  },
  toggleLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  toggleIconWrap: { width: 48, height: 48, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  toggleText: { flex: 1 },
  toggleTitle: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter', lineHeight: 24, marginBottom: 2 },
  toggleSub: { fontSize: 12, fontFamily: 'Inter', lineHeight: 16 },
  switchTrack: { width: 48, height: 24, borderRadius: 999, justifyContent: 'center', position: 'relative' },
  switchThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#141414', position: 'absolute' },
  actionSection: { paddingTop: 32, paddingBottom: 8 },
  submitBtn: {
    height: 58,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter', lineHeight: 28 },
});
