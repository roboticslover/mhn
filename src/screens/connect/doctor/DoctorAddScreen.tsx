import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

function PersonIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={5} r={3} stroke={color} strokeWidth={1.5} />
      <Path d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function SpecialtyIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Rect x={3} y={3} width={14} height={14} rx={3} stroke={color} strokeWidth={1.5} />
      <Path d="M7 10H13M10 7V13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function PhoneIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path d="M3 3C3 2.44772 3.44772 2 4 2H6.27924C6.76024 2 7.17955 2.33547 7.27924 2.80687L8.05124 6.52274C8.14261 6.95633 7.94363 7.39898 7.55547 7.61963L6.38197 8.27639C7.20938 10.1479 8.85213 11.7906 10.7236 12.618L11.3804 11.4445C11.601 11.0564 12.0437 10.8574 12.4773 10.9488L16.1931 11.7208C16.6645 11.8205 17 12.2398 17 12.7208V15C17 15.5523 16.5523 16 16 16C9.37258 16 4 10.6274 4 4C4 3.44772 3 3.55228 3 3Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    </Svg>
  );
}

function HospitalIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={18} viewBox="0 0 20 18" fill="none">
      <Rect x={1} y={5} width={18} height={12} rx={2} stroke={color} strokeWidth={1.5} />
      <Path d="M7 17V11H13V17" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 1V5M8 3H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function AddContactIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={8} cy={7} r={4} stroke={color} strokeWidth={1.5} />
      <Path d="M2 18C2 15.2386 4.68629 13 8 13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15 13V19M12 16H18" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export default function DoctorAddScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [fullName, setFullName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [hospital, setHospital] = useState('');

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : [c.primary, c.primaryDark];
  const inputBg = isDark ? '#353535' : c.inputBackground;
  const subText = isDark ? '#BCCBB7' : c.textSecondary;
  const headText = isDark ? '#E2E2E2' : c.text;
  const iconColor = isDark ? 'rgba(188,203,183,0.4)' : c.inputPlaceholder;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <View style={{ paddingTop: insets.top + 4 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backBtn, { backgroundColor: c.cardGlassBorder }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Manrope-Bold' }]}>
            My Doctor
          </Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero illustration area */}
        <View style={[styles.heroCard, { backgroundColor: isDark ? '#111' : c.surface, borderRadius: 24, overflow: 'hidden' }]}>
          <View style={styles.heroContent}>
            <Ionicons name="medical" size={64} color={isDark ? '#353535' : '#CCCCCC'} />
          </View>
        </View>

        {/* Heading */}
        <View style={styles.headingBlock}>
          <Text style={[styles.title, { color: headText, fontFamily: 'Inter-Bold' }]}>
            Add Personal{'\n'}Doctor
          </Text>
          <Text style={[styles.subtitle, { color: subText, fontFamily: 'Inter' }]}>
            Build your dedicated care team by adding your trusted medical practitioners.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: subText }]}>FULL IDENTITY</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}>
                <PersonIcon color={iconColor} />
              </View>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: c.text, fontFamily: 'Inter' }]}
                placeholder="Doctor's Full Name"
                placeholderTextColor={iconColor}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

          {/* Specialty */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: subText }]}>EXPERTISE</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}>
                <SpecialtyIcon color={iconColor} />
              </View>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: c.text, fontFamily: 'Inter' }]}
                placeholder="Specialization"
                placeholderTextColor={iconColor}
                value={specialty}
                onChangeText={setSpecialty}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: subText }]}>CONTACT</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}>
                <PhoneIcon color={iconColor} />
              </View>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: c.text, fontFamily: 'Inter' }]}
                placeholder="Mobile Number"
                placeholderTextColor={iconColor}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Hospital */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: subText }]}>AFFILIATION</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}>
                <HospitalIcon color={iconColor} />
              </View>
              <TextInput
                style={[styles.input, { backgroundColor: inputBg, color: c.text, fontFamily: 'Inter' }]}
                placeholder="Hospital or Clinic Name"
                placeholderTextColor={iconColor}
                value={hospital}
                onChangeText={setHospital}
              />
            </View>
          </View>

          {/* Submit */}
          <View style={styles.actionBlock}>
            <LinearGradient
              colors={gradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitBtn}
            >
              <TouchableOpacity
                style={styles.submitBtnInner}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('DoctorListScreen')}
              >
                <AddContactIcon color="#003910" />
                <Text style={[styles.submitBtnText, { fontFamily: 'Inter-Bold' }]}>Add Contact</Text>
              </TouchableOpacity>
            </LinearGradient>
            <Text style={[styles.disclaimer, { color: subText, fontFamily: 'Inter' }]}>
              SECURE ENCRYPTED DATA STORAGE
            </Text>
          </View>
        </View>

        <View style={{ height: insets.bottom + 24 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '700', lineHeight: 36 },
  headerRight: { width: 40 },
  scroll: { paddingHorizontal: 24 },
  heroCard: {
    height: 192,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroContent: { alignItems: 'center', justifyContent: 'center' },
  headingBlock: { alignItems: 'center', marginBottom: 32 },
  title: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: -0.9,
    lineHeight: 44,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: { gap: 16 },
  fieldGroup: { gap: 8 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  inputWrapper: { position: 'relative', justifyContent: 'center' },
  inputIcon: { position: 'absolute', left: 18, zIndex: 1 },
  input: {
    borderRadius: 33,
    paddingLeft: 48,
    paddingRight: 24,
    paddingVertical: 18,
    fontSize: 16,
    lineHeight: 22,
  },
  actionBlock: { marginTop: 16, alignItems: 'center', gap: 16 },
  submitBtn: { borderRadius: 999, width: '100%' },
  submitBtnInner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  submitBtnText: { fontSize: 18, fontWeight: '700', color: '#003910', lineHeight: 28 },
  disclaimer: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.275,
    textTransform: 'uppercase',
    opacity: 0.5,
  },
});
