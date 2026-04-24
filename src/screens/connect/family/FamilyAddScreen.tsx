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
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

function NetworkIllustration({ primaryColor, nodeBg, bgColor }: { primaryColor: string; nodeBg: string; bgColor: string }) {
  const nodes = [
    { cx: 80, cy: 165 }, { cx: 160, cy: 110 }, { cx: 240, cy: 165 },
    { cx: 240, cy: 235 }, { cx: 160, cy: 290 }, { cx: 80, cy: 235 },
    { cx: 60, cy: 320 }, { cx: 250, cy: 125 },
  ];
  const lines = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,7],[5,6]];
  return (
    <Svg width={310} height={260} viewBox="0 0 310 260" fill="none">
      {lines.map(([a, b], i) => (
        <Path key={i} d={`M${nodes[a].cx} ${nodes[a].cy} L${nodes[b].cx} ${nodes[b].cy}`}
          stroke={primaryColor} strokeWidth={0.8} strokeOpacity={0.2} />
      ))}
      {nodes.map((n, i) => (
        <Circle key={i} cx={n.cx} cy={n.cy} r={18} fill={nodeBg} />
      ))}
      <Circle cx={160} cy={199} r={38} fill={bgColor} />
      <Circle cx={160} cy={189} r={11} fill={primaryColor} />
      <Path d="M143 216C143 206 150.6 198 160 198C169.4 198 177 206 177 216"
        stroke={primaryColor} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function AddPersonIcon({ color = '#003910' }: { color?: string }) {
  return (
    <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
      <Path d="M15 8H19M17 6V10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M1 14C1 11.7909 2.79086 10 5 10H11C13.2091 10 15 11.7909 15 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={8} cy={4} r={3} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function ChevronDownIcon({ color }: { color: string }) {
  return (
    <Svg width={7} height={5} viewBox="0 0 7 5" fill="none">
      <Path d="M1 1L3.5 4L6 1" stroke={color} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const COUNTRY_CODE = '+91';
const QUICK_CONTACTS = ['Mom', 'Dad'];

export default function FamilyAddScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [phone, setPhone] = useState('');

  const primaryGreen = isDark ? '#55EE71' : c.primary;
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : [c.primary, c.primaryDark];
  const inputBg = isDark ? 'rgba(14,14,14,0.8)' : c.inputBackground;
  const inputBorder = isDark ? 'rgba(68,73,51,0.2)' : c.inputBorder;
  const subText = isDark ? '#BCCBB7' : c.textSecondary;
  const headText = isDark ? '#E2E2E2' : c.text;
  const chipBg = isDark ? '#353535' : c.chipBackground;
  const nodeBg = isDark ? '#2A2A2A' : '#E8E8E8';
  const bgColor = isDark ? '#1F1F1F' : '#D0D0D0';

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
            Family Connect
          </Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={styles.illustrationWrap}>
          <NetworkIllustration primaryColor={primaryGreen} nodeBg={nodeBg} bgColor={bgColor} />
        </View>

        {/* Heading */}
        <View style={styles.headingBlock}>
          <Text style={[styles.title, { color: headText, fontFamily: 'Inter-Bold' }]}>
            Grow Your{'\n'}Health Circle
          </Text>
          <Text style={[styles.subtitle, { color: subText, fontFamily: 'Inter' }]}>
            Add Friends and Family and share medical records and analytics
          </Text>
        </View>

        {/* Phone input */}
        <View style={styles.formBlock}>
          <Text style={[styles.label, { color: subText }]}>MOBILE NUMBER</Text>
          <View style={[styles.phoneInput, { backgroundColor: inputBg, borderColor: inputBorder }]}>
            {/* Country code selector */}
            <TouchableOpacity style={[styles.countryCode, { borderRightColor: isDark ? 'rgba(68,73,51,0.3)' : c.divider }]}>
              <Text style={[styles.countryCodeText, { color: headText, fontFamily: 'Inter-Bold' }]}>{COUNTRY_CODE}</Text>
              <ChevronDownIcon color={subText} />
            </TouchableOpacity>
            {/* Phone number */}
            <TextInput
              style={[styles.phoneTextInput, { color: c.text, fontFamily: 'Inter' }]}
              placeholder="000 000 0000"
              placeholderTextColor={isDark ? 'rgba(188,203,183,0.4)' : c.inputPlaceholder}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
          {/* Quick select */}
          <View style={styles.quickSelect}>
            {QUICK_CONTACTS.map(contact => (
              <TouchableOpacity
                key={contact}
                style={[styles.quickChip, { backgroundColor: chipBg }]}
              >
                <Text style={[styles.quickChipText, { color: headText, fontFamily: 'Inter' }]}>{contact}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Send Invite Button */}
        <View style={styles.actionBlock}>
          <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.sendBtn}>
            <TouchableOpacity
              style={styles.sendBtnInner}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('FamilyListScreen')}
            >
              <AddPersonIcon color="#003910" />
              <Text style={[styles.sendBtnText, { fontFamily: 'Inter-Bold' }]}>Send Invite</Text>
            </TouchableOpacity>
          </LinearGradient>
          <Text style={[styles.disclaimer, { color: subText, fontFamily: 'Inter' }]}>
            By sending an invite, you agree to share your basic vitality metrics with this contact once they accept.
          </Text>
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
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 220,
    marginBottom: 8,
    overflow: 'hidden',
  },
  headingBlock: { alignItems: 'center', marginBottom: 32 },
  title: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1,
    lineHeight: 44,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: { fontSize: 16, lineHeight: 24, textAlign: 'center' },
  formBlock: { marginBottom: 28, gap: 12 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginLeft: 4,
    fontFamily: 'Inter',
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 33,
    height: 58,
    overflow: 'hidden',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 21,
    height: '100%',
    borderRightWidth: 1,
  },
  countryCodeText: { fontSize: 16, fontWeight: '700', lineHeight: 28 },
  phoneTextInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 24,
  },
  quickSelect: { flexDirection: 'row', gap: 12 },
  quickChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  quickChipText: { fontSize: 14, fontWeight: '500', lineHeight: 16 },
  actionBlock: { gap: 16, alignItems: 'center' },
  sendBtn: { borderRadius: 999, width: '100%' },
  sendBtnInner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  sendBtnText: { fontSize: 18, fontWeight: '700', color: '#003910', lineHeight: 28 },
  disclaimer: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
    marginHorizontal: 32,
  },
});
