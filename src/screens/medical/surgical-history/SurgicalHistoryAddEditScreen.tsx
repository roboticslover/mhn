import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AVATAR_URI = 'https://i.pravatar.cc/150?img=47';

export default function SurgicalHistoryAddEditScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const existingRecord = route?.params?.record;
  const [title, setTitle] = useState(existingRecord?.title ?? 'Heart Bypass Surgery');
  const [whenDone, setWhenDone] = useState(existingRecord?.whenDone ?? '');
  const [isActiveTreatment, setIsActiveTreatment] = useState<boolean>(
    existingRecord?.status ? existingRecord.status === 'Still going' : true,
  );
  const [ongoingIssues, setOngoingIssues] = useState(existingRecord?.ongoingIssues ?? '');

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.container, { backgroundColor: c.background }]}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: 36 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="chevron-back" size={22} color={c.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: c.text }]}>Surgical History</Text>
            <Image source={{ uri: AVATAR_URI }} style={styles.avatarImage} />
          </View>

          <View style={styles.formCanvas}>
            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6A7567' }]}>NAME OF THE SURGERY OR TREATMENT</Text>
              <View
                style={[
                  styles.inputWrap,
                  {
                    backgroundColor: isDark ? '#353535' : '#EBEBEB',
                  },
                ]}
              >
                <TextInput
                  value={title}
                  onChangeText={setTitle}
                  style={[styles.inputText, { color: isDark ? '#E2E2E2' : c.text }]}
                  placeholder="Heart Bypass Surgery"
                  placeholderTextColor={isDark ? '#6E7681' : '#8E939B'}
                />
                <Ionicons name="medkit-outline" size={20} color={isDark ? '#3CC96B' : c.primary} />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6A7567' }]}>WHEN DID YOU UNDERGO THIS SURGERY?</Text>
              <View
                style={[
                  styles.inputWrap,
                  {
                    backgroundColor: isDark ? '#1F1F1F' : '#EBEBEB',
                    borderColor: isDark ? 'rgba(68,73,51,0.2)' : 'rgba(0,0,0,0.08)',
                    borderWidth: 1,
                  },
                ]}
              >
                <TextInput
                  value={whenDone}
                  onChangeText={setWhenDone}
                  style={[styles.inputText, styles.timelineInput, { color: isDark ? '#E2E2E2' : c.text }]}
                  placeholder="e.g. 3 Months ago"
                  placeholderTextColor={isDark ? '#353535' : '#8E939B'}
                />
              </View>
            </View>

            <View
              style={[
                styles.toggleCard,
                {
                  backgroundColor: isDark ? '#1F1F1F' : '#EBEBEB',
                },
              ]}
            >
              <View>
                <Text style={[styles.toggleTitle, { color: isDark ? '#FFFFFF' : c.text }]}>Active Treatment</Text>
                <Text style={[styles.toggleDesc, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>Are you still continuing the treatment?</Text>
              </View>
              <TouchableOpacity
                style={[styles.toggleTrack, { backgroundColor: isActiveTreatment ? '#55EE71' : isDark ? '#505050' : '#D1D5DB' }]}
                onPress={() => setIsActiveTreatment((v: boolean) => !v)}
                activeOpacity={0.9}
              >
                <View style={[styles.toggleThumb, { left: isActiveTreatment ? 22 : 2 }]} />
              </TouchableOpacity>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6A7567' }]}>ONGOING HEALTH ISSUES OR SIDE EFFECTS</Text>
              <View style={[styles.textAreaWrap, { backgroundColor: isDark ? '#353535' : '#EBEBEB' }]}>
                <TextInput
                  value={ongoingIssues}
                  onChangeText={setOngoingIssues}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  style={[styles.textAreaInput, { color: isDark ? '#E2E2E2' : c.text }]}
                  placeholder="Describe any persistent symptoms or recovery notes..."
                  placeholderTextColor={isDark ? '#6E7681' : '#8E939B'}
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: isDark ? '#BCCBB7' : '#6A7567' }]}>UPLOAD DOCUMENTS</Text>
              <View
                style={[
                  styles.uploadCard,
                  {
                    backgroundColor: isDark ? '#0E0E0E' : '#F5F6F4',
                    borderColor: isDark ? 'rgba(61,74,59,0.3)' : 'rgba(57,166,87,0.35)',
                  },
                ]}
              >
                <View style={[styles.uploadIconCircle, { backgroundColor: isDark ? 'rgba(85,238,113,0.1)' : c.accentSoft }]}>
                  <Ionicons name="cloud-upload-outline" size={18} color={isDark ? '#55EE71' : c.primary} />
                </View>
                <Text style={[styles.uploadTitle, { color: isDark ? '#FFFFFF' : c.text }]}>Upload Medical Reports</Text>
                <Text style={[styles.uploadHint, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>PDF, JPG or PNG up to 10MB</Text>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={[styles.selectFileText, { color: isDark ? '#55EE71' : c.primary }]}>SELECT FILE</Text>
                </TouchableOpacity>
              </View>
            </View>

            <LinearGradient
              colors={isDark ? ['#55EE71', '#30D158'] : ['#5DC97A', '#39A657']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.saveBtnGradient}
            >
              <TouchableOpacity style={styles.saveBtnTouch} activeOpacity={0.85} onPress={() => navigation.goBack()}>
                <Text style={styles.saveBtnText}>SAVE RECORD UPDATE</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              style={[
                styles.deleteBtn,
                {
                  borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(219,80,52,0.25)',
                },
              ]}
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.deleteBtnText}>DELETE RECORD ✕</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 26,
  },
  headerTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 39,
    lineHeight: 39,
    fontFamily: 'Manrope-Bold',
    fontWeight: '700',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  formCanvas: {
    paddingHorizontal: 24,
    gap: 24,
  },
  fieldGroup: {
    gap: 12,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.1,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    lineHeight: 16.5,
    textTransform: 'uppercase',
  },
  inputWrap: {
    height: 56,
    borderRadius: 33,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    lineHeight: 24,
  },
  timelineInput: {
    paddingHorizontal: 0,
    fontSize: 20,
    lineHeight: 24,
  },
  toggleCard: {
    borderRadius: 33,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    marginBottom: 2,
  },
  toggleDesc: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter',
    fontWeight: '400',
  },
  toggleTrack: {
    width: 44,
    height: 24,
    borderRadius: 999,
    position: 'relative',
  },
  toggleThumb: {
    position: 'absolute',
    top: 2,
    width: 20,
    height: 20,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  textAreaWrap: {
    borderRadius: 33,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    minHeight: 102,
  },
  textAreaInput: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter',
    fontWeight: '400',
    minHeight: 64,
  },
  uploadCard: {
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 34,
  },
  uploadIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadHint: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  selectFileText: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  saveBtnGradient: {
    height: 56,
    borderRadius: 40,
    marginTop: 12,
    shadowColor: '#30D158',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  saveBtnTouch: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#003910',
    letterSpacing: 2.4,
    fontFamily: 'Inter-ExtraBold',
    textTransform: 'uppercase',
  },
  deleteBtn: {
    marginTop: 24,
    height: 59,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF4D4D',
    letterSpacing: 1.2,
    fontFamily: 'Manrope-ExtraBold',
    textTransform: 'uppercase',
  },
});
