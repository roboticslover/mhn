import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Switch,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SvgIcon from '../../components/SvgIcon';
import RNSlider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import ScreenHeader from '../../components/ScreenHeader';

export default function AboutYouScreen({ navigation }: { navigation: any }) {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const colors = theme.colors;
  const BG = colors.background;
  const CARD_BG = colors.card;
  const INPUT_BG = colors.inputBackground;
  const GREEN = colors.primary;
  const WHITE = colors.text;
  const MUTED = colors.textSecondary;
  const PLACEHOLDER = colors.inputPlaceholder;
  const BORDER = colors.inputBorder;

  const [gender, setGender] = useState('Female');
  const [height, setHeight] = useState(164);
  const [weight, setWeight] = useState(108.5);
  const [dobText, setDobText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [otherStyleText, setOtherStyleText] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('A');
  const [rhFactor, setRhFactor] = useState('Positive');
  const [bodyType, setBodyType] = useState('MODERATE');
  const [occupation, setOccupation] = useState('Student');
  const [willingToDonate, setWillingToDonate] = useState(true);
  const [personalStyles, setPersonalStyles] = useState<string[]>(['Afternoon Napper', 'Early Riser', 'Clean Freak', 'Master of Meals']);
  const [customStyles, setCustomStyles] = useState<string[]>([]);
  const [editingCustomStyle, setEditingCustomStyle] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const otherInputRef = useRef<View>(null);

  React.useEffect(() => {
    if (showOtherInput) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [showOtherInput]);

  const genderOptions = [
    { label: 'Male', icon: 'male' },
    { label: 'Female', icon: 'female' },
    { label: 'Other', icon: 'transgender' },
  ];
  const bloodGroupOptions = ['A', 'B', 'O', 'AB'];
  const bodyTypes = ['LEAN', 'MODERATE', 'MUSCULAR', 'CHUBBY'];
  const occupations = ['Student', 'Working Professional', 'Homemaker', 'Retired'];
  const styleOptions = ['Afternoon Napper', 'Early Riser', 'Clean Freak', 'Master of Meals'];

  const togglePersonalStyle = (style: string) => {
    setPersonalStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const bmi = weight > 0 && height > 0 ? (weight / ((height / 100) ** 2)).toFixed(1) : '0';

  const GenderIcon = ({ type }: { type: string }) => {
    if (type === 'male') return <SvgIcon name="people" size={18} color={gender === 'Male' ? GREEN : MUTED} />;
    if (type === 'female') return <SvgIcon name="people" size={18} color={gender === 'Female' ? GREEN : MUTED} />;
    return <MaterialCommunityIcons name="gender-transgender" size={18} color={gender === 'Other' ? GREEN : MUTED} />;
  };

  const bodyIconName = (bt: string): any =>
    bt === 'LEAN' ? 'human-handsup' :
    bt === 'MODERATE' ? 'human' :
    bt === 'MUSCULAR' ? 'arm-flex' : 'food-apple';

  const occupationIconName = (occ: string): any =>
    occ === 'Student' ? 'school-outline' :
    occ === 'Working Professional' ? 'briefcase-outline' :
    occ === 'Homemaker' ? 'home-outline' : 'coffee';

  return (
    <View style={[styles.container, { backgroundColor: BG, paddingTop: insets.top }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <ScreenHeader title="About you" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.bioNote, { color: MUTED }]}>
            Provide your basic biological information to calculate your metabolic baseline.
          </Text>

          <Text style={[styles.sectionSubTitle, { color: WHITE }]}>Sex Assigned At Birth</Text>
          <View style={styles.genderRow}>
            {genderOptions.map((option) => {
              const isSelected = gender === option.label;
              return (
                <TouchableOpacity key={option.label} onPress={() => setGender(option.label)}
                  style={[styles.genderBtn, { backgroundColor: CARD_BG, borderColor: 'transparent' }, isSelected && { backgroundColor: colors.accentSoft, borderColor: GREEN }]} activeOpacity={0.8}>
                  <GenderIcon type={option.icon} />
                  <Text style={[styles.genderLabel, { color: MUTED }, isSelected && { color: WHITE, fontWeight: '600' }]}>{option.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ==================== 2. HEIGHT ==================== */}
          <View
            style={[
              styles.metricCard,
              {
                backgroundColor: isDark ? 'rgba(38,38,38,0.4)' : 'rgba(0,0,0,0.03)',
                borderColor: 'rgba(72,72,72,0.15)',
              },
            ]}
          >
            <Text style={[styles.metricLabel, { color: MUTED }]}>HEIGHT</Text>
            <View style={styles.metricValueRow}>
              <View style={styles.heightValueRow}>
                <Text style={[styles.heightValue, { color: WHITE }]}>{Math.round(height)}</Text>
                <Text style={[styles.heightUnit, { color: GREEN }]}> cm</Text>
              </View>
              <View style={[styles.iconChip, { backgroundColor: 'rgba(111,251,133,0.3)' }]}>
                <MaterialCommunityIcons name="ruler" size={20} color={GREEN} />
              </View>
            </View>
            <RNSlider style={styles.slider} minimumValue={50} maximumValue={220} step={1} value={height} onValueChange={setHeight} minimumTrackTintColor={GREEN} maximumTrackTintColor={isDark ? '#333' : '#ddd'} thumbTintColor={GREEN} />
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderLabel, { color: MUTED }]}>50CM</Text>
              <Text style={[styles.sliderLabel, { color: MUTED }]}>135CM</Text>
              <Text style={[styles.sliderLabel, { color: MUTED }]}>220CM</Text>
            </View>
          </View>

          {/* ==================== 3. WEIGHT ==================== */}
          <View
            style={[
              styles.metricCard,
              {
                backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(0,0,0,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
              },
            ]}
          >
            <Text style={[styles.metricLabel, { color: MUTED }]}>WEIGHT</Text>
            <View style={styles.metricValueRow}>
              <View style={styles.heightValueRow}>
                <Text style={[styles.heightValue, { color: WHITE }]}>{weight.toFixed(1)}</Text>
                <Text style={[styles.heightUnit, { color: GREEN }]}> kg</Text>
              </View>
              <View style={[styles.iconChip, { backgroundColor: 'rgba(111,251,133,0.3)' }]}>
                <SvgIcon name="weight_icon" size={20} color={GREEN} />
              </View>
            </View>
            <RNSlider style={styles.slider} minimumValue={0} maximumValue={300} step={0.5} value={weight} onValueChange={setWeight} minimumTrackTintColor={GREEN} maximumTrackTintColor={isDark ? '#333' : '#ddd'} thumbTintColor={GREEN} />
            <View style={styles.sliderLabels}>
              <Text style={[styles.sliderLabel, { color: MUTED }]}>0KG</Text>
              <Text style={[styles.sliderLabel, { color: MUTED }]}>150KG</Text>
              <Text style={[styles.sliderLabel, { color: MUTED }]}>300KG</Text>
            </View>
          </View>

          <Text style={[styles.sectionSubTitle, { color: WHITE }]}>Date Of Birth</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[styles.dobContainer, { backgroundColor: CARD_BG }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.dobText, { color: dobText ? WHITE : PLACEHOLDER }]}>{dobText || 'DD/MM/YYYY'}</Text>
            <SvgIcon name="date_icon" size={20} color={MUTED} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateValue || new Date(2000, 0, 1)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate && event.type !== 'dismissed') {
                  setDateValue(selectedDate);
                  const d = selectedDate;
                  setDobText(`${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`);
                }
              }}
            />
          )}

          <TouchableOpacity style={[styles.bmiBtnFilled, { backgroundColor: GREEN }]} activeOpacity={0.85}>
            <MaterialCommunityIcons name="calculator-variant-outline" size={18} color="#000" />
            <Text style={styles.bmiBtnFilledText}>Calculate my BMI</Text>
          </TouchableOpacity>

          <Text style={[styles.bmiHelperText, { color: MUTED }]}>
            We use these metrics to provide personalized nutritional and physical exercise recommendations.
          </Text>

          <View style={[styles.bmiResultCard, { backgroundColor: CARD_BG }]}>
            <Text style={[styles.resultLabel, { color: MUTED }]}>Calculated Result</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 2 }}>
              <Text style={[styles.bmiValue, { color: WHITE }]}>{bmi}</Text>
              <Text style={[styles.bmiUnit, { color: GREEN }]}> BMI</Text>
            </View>
            <Text style={[styles.optimalText, { color: GREEN }]}>Optimal range for your height</Text>
          </View>

          {/* ==================== 3. BODY TYPE ==================== */}
          <Text style={[styles.sectionHeading, { color: WHITE, marginTop: 32, marginBottom: 6 }]}>Select Your Body Type</Text>
          <Text style={[styles.sectionCaption, { color: MUTED }]}>This helps us calibrate your visual progress tracking.</Text>

          <View style={styles.pillGrid}>
            {bodyTypes.map((bt) => {
              const isSelected = bodyType === bt;
              return (
                <TouchableOpacity key={bt} onPress={() => setBodyType(bt)}
                  style={[styles.bodyPill, { backgroundColor: CARD_BG, borderColor: 'transparent' }, isSelected && { borderColor: GREEN, backgroundColor: colors.accentSoft }]} activeOpacity={0.85}>
                  <MaterialCommunityIcons name={bodyIconName(bt)} size={26} color={isSelected ? GREEN : MUTED} />
                  <Text style={[styles.bodyPillLabel, { color: isSelected ? GREEN : MUTED }]}>{bt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ==================== 4. BLOOD TYPE ==================== */}
          <Text style={[styles.sectionHeading, { color: WHITE, marginTop: 28, marginBottom: 6 }]}>Select Your Blood Type</Text>
          <Text style={[styles.sectionCaption, { color: MUTED }]}>Essential for personalized metabolic reporting.</Text>

          <View style={[styles.bloodCapsule, { backgroundColor: colors.inputBackground }]}>
            {bloodGroupOptions.map((group) => {
              const isSelected = bloodGroup === group;
              return (
                <TouchableOpacity
                  key={group}
                  onPress={() => setBloodGroup(group)}
                  activeOpacity={0.8}
                  style={[
                    styles.bloodCapsuleBtn,
                    isSelected && { backgroundColor: GREEN },
                  ]}
                >
                  <Text
                    style={[
                      styles.bloodCapsuleBtnLabel,
                      { color: isSelected ? colors.textOnPrimary : colors.textSecondary, fontFamily: 'Inter' },
                      isSelected && { fontWeight: '700' },
                    ]}
                  >
                    {group}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.rhRow}>
            <TouchableOpacity onPress={() => setRhFactor('Positive')}
              style={[styles.rhPill, { backgroundColor: CARD_BG, borderColor: 'transparent' }, rhFactor === 'Positive' && { borderColor: GREEN }]} activeOpacity={0.85}>
              <SvgIcon name="add" size={20} color={rhFactor === 'Positive' ? GREEN : MUTED} />
              <Text style={[styles.rhLabel, { color: WHITE }]}>POSITIVE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRhFactor('Negative')}
              style={[styles.rhPill, { backgroundColor: CARD_BG, borderColor: 'transparent' }, rhFactor === 'Negative' && { borderColor: GREEN }]} activeOpacity={0.85}>
              <SvgIcon name="close" size={20} color={rhFactor === 'Negative' ? GREEN : MUTED} />
              <Text style={[styles.rhLabel, { color: WHITE }]}>NEGATIVE</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.donateCard, { backgroundColor: CARD_BG }]}>
            <View style={[styles.heartCircle, { backgroundColor: colors.accentSoft }]}>
              <SvgIcon name="heart_emoji" size={20} color={GREEN} />
            </View>
            <View style={styles.donateTextWrap}>
              <Text style={[styles.donateTitle, { color: WHITE }]}>Willing to Donate Blood</Text>
              <Text style={[styles.donateSub, { color: MUTED }]}>Help save lives in your local community</Text>
            </View>
            <Switch
              value={willingToDonate}
              onValueChange={setWillingToDonate}
              trackColor={{ false: isDark ? '#333' : '#ccc', true: GREEN }}
              thumbColor={'#fff'}
            />
          </View>

          {/* ==================== 5. OCCUPATION ==================== */}
          <Text style={[styles.sectionHeading, { color: WHITE, marginTop: 32 }]}>Current Occupation</Text>
          <View style={styles.pillGrid}>
            {occupations.map((occ) => {
              const isSelected = occupation === occ;
              return (
                <TouchableOpacity key={occ} onPress={() => setOccupation(occ)}
                  style={[styles.occupationCard, { backgroundColor: CARD_BG, borderColor: 'transparent' }, isSelected && { borderColor: GREEN, backgroundColor: colors.accentSoft }]} activeOpacity={0.85}>
                  <MaterialCommunityIcons name={occupationIconName(occ)} size={26} color={isSelected ? GREEN : WHITE} />
                  <Text style={[styles.occupationLabel, { color: isSelected ? GREEN : WHITE }]}>{occ}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ==================== 6. PERSONAL STYLE ==================== */}
          <Text style={[styles.sectionSubTitle, { color: WHITE, marginTop: 24 }]}>Personal Style</Text>
          <View style={styles.styleChipsRow}>
            {styleOptions.map((style) => {
              const isSelected = personalStyles.includes(style);
              return (
                <TouchableOpacity key={style} onPress={() => togglePersonalStyle(style)}
                  style={[styles.styleChip, { backgroundColor: CARD_BG, borderColor: 'transparent' }, isSelected && { borderColor: GREEN, backgroundColor: colors.accentSoft }]} activeOpacity={0.85}>
                  <Text style={[styles.styleChipLabel, { color: isSelected ? GREEN : MUTED, fontWeight: isSelected ? '600' : '500' }]}>{style}</Text>
                </TouchableOpacity>
              );
            })}
            {customStyles.map((style) => {
              const isSelected = personalStyles.includes(style);
              return (
                <TouchableOpacity key={style} onPress={() => togglePersonalStyle(style)}
                  style={[styles.styleChip, styles.customStyleChip, isSelected && styles.customStyleChipActive]} activeOpacity={0.85}>
                  <Text style={[styles.styleChipLabel, { color: isSelected ? '#C084FC' : '#A855F7', fontWeight: isSelected ? '600' : '500' }]}>{style}</Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              onPress={() => {
                if (!showOtherInput && customStyles.length > 0) {
                  const last = customStyles[customStyles.length - 1];
                  setOtherStyleText(last);
                  setEditingCustomStyle(last);
                } else if (!showOtherInput) {
                  setOtherStyleText('');
                  setEditingCustomStyle(null);
                }
                setShowOtherInput(!showOtherInput);
              }}
              style={[
                styles.styleChip,
                { backgroundColor: 'transparent', borderColor: BORDER, borderStyle: 'dashed' },
                showOtherInput && { borderColor: GREEN, backgroundColor: colors.accentSoft, borderStyle: 'solid' },
              ]}
              activeOpacity={0.85}
            >
              <Text style={[styles.styleChipLabel, { color: showOtherInput ? GREEN : MUTED }]}>{showOtherInput ? 'Other' : '+ Add Other'}</Text>
            </TouchableOpacity>
          </View>
          {showOtherInput && (
            <View ref={otherInputRef} style={[styles.otherInputWrap, { marginTop: 10 }]}>
              <View style={[styles.inputRow, { backgroundColor: INPUT_BG, borderColor: BORDER }]}>
                <TextInput
                  style={[styles.textInput, { color: WHITE }]}
                  placeholder="Type your style..."
                  placeholderTextColor={PLACEHOLDER}
                  value={otherStyleText}
                  onChangeText={setOtherStyleText}
                  blurOnSubmit={false}
                  returnKeyType="done"
                  autoFocus
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  const trimmed = otherStyleText.trim();
                  if (!trimmed) return;
                  if (editingCustomStyle) {
                    setCustomStyles((prev) => prev.map((s) => (s === editingCustomStyle ? trimmed : s)));
                    setPersonalStyles((prev) => {
                      const filtered = prev.filter((s) => s !== editingCustomStyle);
                      return filtered.includes(trimmed) ? filtered : [...filtered, trimmed];
                    });
                    setEditingCustomStyle(null);
                  } else {
                    setCustomStyles((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                    setPersonalStyles((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
                  }
                  setOtherStyleText('');
                  setShowOtherInput(false);
                  Keyboard.dismiss();
                }}
                style={[styles.addStyleBtn, { backgroundColor: GREEN }]}
                activeOpacity={0.85}
              >
                <Text style={[styles.addStyleBtnText, { color: colors.textOnPrimary }]}>Add Style</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Save Settings */}
          <TouchableOpacity
            style={[styles.continueBtnBig, { backgroundColor: GREEN }]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={[styles.continueBtnBigText, { color: colors.textOnPrimary, fontFamily: 'Inter' }]}>Save Settings</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },
  sectionHeading: { fontSize: 22, fontWeight: '800', marginBottom: 18, marginTop: 4 },
  sectionSubTitle: { fontSize: 16, fontWeight: '700', marginTop: 22, marginBottom: 12 },
  sectionCaption: { fontSize: 13, lineHeight: 18, marginBottom: 14, marginTop: -4 },
  bioNote: { fontSize: 13, lineHeight: 19, marginTop: 8 },
  genderRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  genderBtn: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 20, paddingVertical: 18, borderWidth: 1.5, gap: 6 },
  genderLabel: { fontSize: 12, fontWeight: '500' },
  metricCard: { borderRadius: 33, borderWidth: 1, padding: 24, marginTop: 14, gap: 18, minHeight: 220 },
  metricLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  metricValueRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconChip: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  heightValueRow: { flexDirection: 'row', alignItems: 'flex-end' },
  heightValue: { fontSize: 54, fontWeight: '800', lineHeight: 60 },
  heightUnit: { fontSize: 22, fontWeight: '600', marginBottom: 8, marginLeft: 2 },
  slider: { width: '100%', height: 40, marginTop: 6 },
  sliderLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -6 },
  sliderLabel: { fontSize: 10, fontWeight: '500' },
  dobContainer: { borderRadius: 999, paddingHorizontal: 20, paddingVertical: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dobText: { fontSize: 22, fontWeight: '700', letterSpacing: 2, flex: 1 },
  bmiBtnFilled: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderRadius: 999, paddingVertical: 18, marginTop: 14 },
  bmiBtnFilledText: { fontSize: 15, fontWeight: '800', color: '#000' },
  bmiHelperText: { fontSize: 12, lineHeight: 17, textAlign: 'center', marginTop: 10, paddingHorizontal: 10 },
  bmiResultCard: { borderRadius: 20, padding: 22, alignItems: 'center', marginTop: 14 },
  resultLabel: { fontSize: 12, fontWeight: '500' },
  bmiValue: { fontSize: 56, fontWeight: '800', lineHeight: 62 },
  bmiUnit: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  optimalText: { fontSize: 12, fontWeight: '500', marginTop: 6 },
  pillGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  bodyPill: { width: '47%', borderRadius: 999, borderWidth: 1.5, paddingVertical: 22, alignItems: 'center', gap: 8 },
  bodyPillLabel: { fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  bloodCapsule: { flexDirection: 'row', borderRadius: 999, padding: 6, marginBottom: 14, alignItems: 'center', gap: 4 },
  bloodCapsuleBtn: { flex: 1, borderRadius: 999, paddingVertical: 10, alignItems: 'center', justifyContent: 'center' },
  bloodCapsuleBtnLabel: { fontSize: 15 },
  rhRow: { flexDirection: 'row', gap: 14 },
  rhPill: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 999, borderWidth: 1.5 },
  rhLabel: { fontSize: 13, fontWeight: '600', letterSpacing: 0.5 },
  donateCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, padding: 16, marginTop: 18 },
  donateTextWrap: { flex: 1, paddingHorizontal: 12 },
  donateTitle: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  donateSub: { fontSize: 12, lineHeight: 16 },
  heartCircle: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  occupationCard: { width: '47%', borderRadius: 20, borderWidth: 1.5, paddingVertical: 26, alignItems: 'center', gap: 10 },
  occupationLabel: { fontSize: 13, fontWeight: '600', textAlign: 'center' },
  styleChipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  styleChip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 999, borderWidth: 1.5 },
  styleChipLabel: { fontSize: 13, fontWeight: '500' },
  otherInputWrap: { gap: 10 },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 999, paddingHorizontal: 20, paddingVertical: 16, borderWidth: 1 },
  textInput: { flex: 1, fontSize: 15, padding: 0 },
  addStyleBtn: { borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingVertical: 14 },
  addStyleBtnText: { fontSize: 15, fontWeight: '700' },
  customStyleChip: { borderWidth: 1.5, borderColor: '#A855F7', backgroundColor: 'rgba(168,85,247,0.08)', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, shadowRadius: 6, elevation: 3 },
  customStyleChipActive: { backgroundColor: 'rgba(168,85,247,0.18)', shadowOpacity: 0.55, shadowRadius: 10, elevation: 5 },
  continueBtnBig: { borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingVertical: 22, marginTop: 36 },
  continueBtnBigText: { fontSize: 17, fontWeight: '700', letterSpacing: 0.3 },
});
