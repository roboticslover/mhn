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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

// Male icon
function MaleIcon({ color = '#FFF', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Circle cx={8} cy={12} r={5} stroke={color} strokeWidth={1.5} />
      <Path d="M12 8L18 2M18 2H14M18 2V6" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Female icon
function FemaleIcon({ color = '#6FFB85', size = 14 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 1.55} viewBox="0 0 14 22" fill="none">
      <Circle cx={7} cy={7} r={5.5} stroke={color} strokeWidth={1.5} />
      <Path d="M7 12.5V20M4 17H10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// Other gender icon
function OtherIcon({ color = '#FFF', size = 26 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Circle cx={10} cy={10} r={5} stroke={color} strokeWidth={1.5} />
      <Circle cx={16} cy={16} r={5} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

interface OptionChip {
  label: string;
  icon?: string;
}

const BODY_TYPES: OptionChip[] = [
  { label: 'Lean' },
  { label: 'Moderate' },
  { label: 'Muscular' },
  { label: 'Chubby' },
];

const BLOOD_TYPES = ['A', 'B', 'O', 'AB'];
const BLOOD_RH = ['Positive', 'Negative'];

const OCCUPATIONS: OptionChip[] = [
  { label: 'Student', icon: 'school-outline' },
  { label: 'Working Professional', icon: 'briefcase-outline' },
  { label: 'Homemaker', icon: 'home-outline' },
  { label: 'Retired', icon: 'leaf-outline' },
];

const PERSONAL_STYLES = [
  'Afternoon Napper', 'Early Riser', 'Clean Freak', 'Master of Meals',
];

export default function AboutYouScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedSex, setSelectedSex] = useState('Female');
  const [height, setHeight] = useState('164');
  const [weight, setWeight] = useState('108.5');
  const [dob, setDob] = useState('');
  const [selectedBody, setSelectedBody] = useState('Moderate');
  const [selectedBlood, setSelectedBlood] = useState('O');
  const [selectedRh, setSelectedRh] = useState('Positive');
  const [willingDonate, setWillingDonate] = useState(true);
  const [selectedOccupation, setSelectedOccupation] = useState('Homemaker');
  const [selectedStyles, setSelectedStyles] = useState(['Afternoon Napper', 'Early Riser', 'Clean Freak', 'Master of Meals']);

  const cardBg = isDark ? 'rgba(23,23,23,0.4)' : c.card;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScrollView contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="About you" onBack={() => navigation.goBack()} />

        <Text style={[styles.subtitle, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>
          Provide your basic biological information to calculate your metabolic baseline.
        </Text>

        {/* Sex Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>Sex assigned at birth</Text>
          <View style={styles.sexRow}>
            {[{ label: 'Male', Icon: MaleIcon }, { label: 'Female', Icon: FemaleIcon }, { label: 'Other', Icon: OtherIcon }].map((item) => {
              const isSelected = selectedSex === item.label;
              return (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.sexBtn, { backgroundColor: isSelected ? 'rgba(111,251,133,0.1)' : cardBg, borderColor: isSelected ? 'rgba(111,251,133,0.3)' : cardBorder }]}
                  onPress={() => setSelectedSex(item.label)}
                >
                  <item.Icon color={isSelected ? c.primary : c.text} />
                  <Text style={[styles.sexLabel, { color: isSelected ? c.primary : c.text, fontFamily: 'Manrope-SemiBold' }]}>{item.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Height */}
        <View style={[styles.sliderCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <View style={styles.sliderHeader}>
            <Text style={[styles.sliderLabel, { color: c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>Height</Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={[styles.bigValue, { color: c.text, fontFamily: 'Inter-Bold' }]}>{height}</Text>
            <Text style={[styles.unitText, { color: c.primary, fontFamily: 'Manrope-ExtraBold' }]}>cm</Text>
          </View>
          <View style={[styles.sliderTrack, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
            <View style={[styles.sliderFill, { backgroundColor: c.primary, width: '60%' }]} />
          </View>
        </View>

        {/* Weight */}
        <View style={[styles.sliderCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          <View style={styles.sliderHeader}>
            <Text style={[styles.sliderLabel, { color: c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>Weight</Text>
          </View>
          <View style={styles.valueRow}>
            <Text style={[styles.bigValue, { color: c.text, fontFamily: 'Inter-Bold' }]}>{weight}</Text>
            <Text style={[styles.unitText, { color: c.primary, fontFamily: 'Manrope-ExtraBold' }]}>kg</Text>
          </View>
          <View style={[styles.sliderTrack, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0' }]}>
            <View style={[styles.sliderFill, { backgroundColor: c.primary, width: '45%' }]} />
          </View>
        </View>

        {/* Date of Birth */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: c.textSecondary, fontFamily: 'Manrope-ExtraBold' }]}>Date Of Birth</Text>
          <View style={[styles.inputField, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <TextInput
              style={[styles.inputText, { color: c.text, fontFamily: 'Inter' }]}
              placeholder="DD/MM/YYYY"
              placeholderTextColor={c.inputPlaceholder}
              value={dob}
              onChangeText={setDob}
            />
          </View>
        </View>

        {/* BMI Calculator */}
        <TouchableOpacity style={[styles.bmiBtn, { backgroundColor: c.primary }]}>
          <Ionicons name="calculator-outline" size={18} color={c.textOnPrimary} />
          <Text style={[styles.bmiBtnText, { color: c.textOnPrimary, fontFamily: 'Manrope-ExtraBold' }]}>Calculate my BMI</Text>
        </TouchableOpacity>

        <Text style={[styles.bmiNote, { color: c.textSecondary, fontFamily: 'Inter' }]}>
          We use these metrics to provide personalized nutritional and physical exercise recommendations.
        </Text>

        {/* BMI Result */}
        <View style={styles.bmiResult}>
          <Text style={[styles.bmiLabel, { color: c.textSecondary, fontFamily: 'Inter' }]}>Calculated Result</Text>
          <View style={styles.bmiValueRow}>
            <Text style={[styles.bmiValue, { color: c.text, fontFamily: 'Inter-Bold' }]}>22.5</Text>
            <Text style={[styles.bmiUnit, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>BMI</Text>
          </View>
          <Text style={[styles.bmiRange, { color: c.primary, fontFamily: 'Inter' }]}>Optimal range for your height</Text>
        </View>

        {/* Body Type */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>Select Your Body Type</Text>
          <Text style={[styles.sectionSubtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>This helps us calibrate your visual progress tracking.</Text>
          <View style={styles.chipGrid}>
            {BODY_TYPES.map((bt) => {
              const isSelected = selectedBody === bt.label;
              return (
                <TouchableOpacity
                  key={bt.label}
                  style={[styles.chip, { backgroundColor: isSelected ? 'rgba(34,197,94,0.1)' : cardBg, borderColor: isSelected ? 'rgba(111,251,133,0.5)' : cardBorder, borderWidth: isSelected ? 2 : 1 }]}
                  onPress={() => setSelectedBody(bt.label)}
                >
                  <Text style={[styles.chipText, { color: isSelected ? c.primary : c.textSecondary, fontFamily: isSelected ? 'Inter-Bold' : 'Inter-Medium' }]}>{bt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Blood Type */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>Select Your Blood Type</Text>
          <Text style={[styles.sectionSubtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>Essential for personalized metabolic reporting.</Text>
          <View style={styles.bloodRow}>
            {BLOOD_TYPES.map((bt) => {
              const isSelected = selectedBlood === bt;
              return (
                <TouchableOpacity
                  key={bt}
                  style={[styles.bloodBtn, { backgroundColor: isSelected ? c.primary : cardBg, borderColor: isSelected ? c.primary : cardBorder }]}
                  onPress={() => setSelectedBlood(bt)}
                >
                  <Text style={[styles.bloodText, { color: isSelected ? c.textOnPrimary : c.text, fontFamily: 'Inter-Bold' }]}>{bt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.rhRow}>
            {BLOOD_RH.map((rh) => {
              const isSelected = selectedRh === rh;
              return (
                <TouchableOpacity
                  key={rh}
                  style={[styles.rhBtn, { backgroundColor: isSelected ? 'rgba(34,197,94,0.1)' : cardBg, borderColor: isSelected ? 'rgba(111,251,133,0.5)' : cardBorder, borderWidth: isSelected ? 2 : 1 }]}
                  onPress={() => setSelectedRh(rh)}
                >
                  <Text style={[styles.rhText, { color: isSelected ? c.primary : c.textSecondary, fontFamily: isSelected ? 'Inter-Bold' : 'Inter-Medium' }]}>{rh}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Occupation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>Current Occupation</Text>
          <View style={styles.chipGrid}>
            {OCCUPATIONS.map((occ) => {
              const isSelected = selectedOccupation === occ.label;
              return (
                <TouchableOpacity
                  key={occ.label}
                  style={[styles.occChip, { backgroundColor: isSelected ? 'rgba(34,197,94,0.1)' : cardBg, borderColor: isSelected ? 'rgba(111,251,133,0.5)' : cardBorder, borderWidth: isSelected ? 2 : 1 }]}
                  onPress={() => setSelectedOccupation(occ.label)}
                >
                  {occ.icon && <Ionicons name={occ.icon as any} size={22} color={isSelected ? c.primary : c.textSecondary} />}
                  <Text style={[styles.occText, { color: isSelected ? c.primary : c.textSecondary, fontFamily: isSelected ? 'Inter-Bold' : 'Inter-Medium' }]}>{occ.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Personal Style */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E5E5E5' : c.text, fontFamily: 'Manrope-ExtraBold' }]}>Personal Style</Text>
          <View style={styles.tagsWrap}>
            {PERSONAL_STYLES.map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(34,197,94,0.4)' }]}>
                <Text style={[styles.tagText, { color: c.primary, fontFamily: 'Inter-Medium' }]}>{tag}</Text>
              </View>
            ))}
            <TouchableOpacity style={[styles.tag, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : c.cardBorder }]}>
              <Ionicons name="add" size={12} color={c.textSecondary} />
              <Text style={[styles.tagText, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>Add Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: c.primary }]} onPress={() => navigation.goBack()}>
          <Text style={[styles.saveBtnText, { color: c.textOnPrimary, fontFamily: 'Inter-Bold' }]}>Save Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  subtitle: { fontSize: 16, lineHeight: 24, marginHorizontal: 26, marginBottom: 24 },
  section: { marginHorizontal: 24, marginBottom: 24 },
  sectionLabel: { fontSize: 16, fontWeight: '800', lineHeight: 24, marginBottom: 12, textTransform: 'capitalize' },
  sectionTitle: { fontSize: 16, fontWeight: '800', lineHeight: 24, marginBottom: 4, textTransform: 'capitalize', paddingHorizontal: 8 },
  sectionSubtitle: { fontSize: 12, lineHeight: 16, marginBottom: 16, paddingHorizontal: 8 },
  sexRow: { flexDirection: 'row', gap: 16 },
  sexBtn: { flex: 1, height: 79, borderRadius: 33, borderWidth: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  sexLabel: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  sliderCard: { marginHorizontal: 24, borderRadius: 33, borderWidth: 1, padding: 25, marginBottom: 16, gap: 16 },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  sliderLabel: { fontSize: 16, fontWeight: '800', textTransform: 'capitalize' },
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  bigValue: { fontSize: 48, fontWeight: '700', letterSpacing: -1.2 },
  unitText: { fontSize: 24, fontWeight: '800', letterSpacing: -0.6 },
  sliderTrack: { height: 6, borderRadius: 3, overflow: 'hidden' },
  sliderFill: { height: '100%', borderRadius: 3 },
  inputField: { height: 56, borderRadius: 33, borderWidth: 1, paddingHorizontal: 24, justifyContent: 'center' },
  inputText: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6 },
  bmiBtn: { marginHorizontal: 24, height: 56, borderRadius: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 },
  bmiBtnText: { fontSize: 14, fontWeight: '800', letterSpacing: 0.7 },
  bmiNote: { fontSize: 14, lineHeight: 20, textAlign: 'center', marginHorizontal: 40, marginBottom: 24 },
  bmiResult: { alignItems: 'center', marginBottom: 32 },
  bmiLabel: { fontSize: 12, lineHeight: 16, marginBottom: 4 },
  bmiValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  bmiValue: { fontSize: 48, fontWeight: '700', letterSpacing: -1.2 },
  bmiUnit: { fontSize: 24, fontWeight: '500' },
  bmiRange: { fontSize: 12, lineHeight: 16, marginTop: 4 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  chip: { borderRadius: 33, paddingHorizontal: 24, paddingVertical: 25, alignItems: 'center', justifyContent: 'center', minWidth: '40%', flex: 1 },
  chipText: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  bloodRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  bloodBtn: { width: 48, height: 48, borderRadius: 24, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  bloodText: { fontSize: 16, fontWeight: '700' },
  rhRow: { flexDirection: 'row', gap: 16 },
  rhBtn: { borderRadius: 33, paddingHorizontal: 24, paddingVertical: 12, alignItems: 'center' },
  rhText: { fontSize: 14, fontWeight: '500' },
  occChip: { borderRadius: 33, paddingHorizontal: 24, paddingVertical: 25, alignItems: 'center', justifyContent: 'center', gap: 12, minWidth: '40%', flex: 1 },
  occText: { fontSize: 14, lineHeight: 20, textAlign: 'center' },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tag: { borderRadius: 999, borderWidth: 1, paddingHorizontal: 21, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 4 },
  tagText: { fontSize: 14, lineHeight: 20 },
  saveBtn: { marginHorizontal: 24, height: 60, borderRadius: 33, alignItems: 'center', justifyContent: 'center', marginTop: 16, marginBottom: 24 },
  saveBtnText: { fontSize: 18, fontWeight: '700', lineHeight: 28 },
});
