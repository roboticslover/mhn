import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, G, Rect } from 'react-native-svg';
import ScreenHeader from '../../../components/ScreenHeader';

function MedicationIllustration({ isDark }: { isDark: boolean }) {
  const green = isDark ? '#34C759' : '#39A657';
  const cardBg = isDark ? 'rgba(31,31,31,0.4)' : 'rgba(220,220,220,0.6)';
  const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  return (
    <Svg width={234} height={234} viewBox="0 0 234 234" fill="none">
      {/* Subtle glow */}
      <Circle cx={117} cy={117} r={110} fill={isDark ? 'rgba(52,199,89,0.03)' : 'rgba(57,166,87,0.04)'} />

      {/* Central card - pill icon */}
      <G transform="translate(65, 50)">
        {/* Central glassy card */}
        <Rect x={14} y={14} width={76} height={76} rx={16} fill={cardBg} stroke={border} strokeWidth={1} />
        {/* Center green fill */}
        <Rect x={18} y={18} width={68} height={68} rx={14} fill={isDark ? 'rgba(52,199,89,0.26)' : 'rgba(57,166,87,0.18)'} />
        {/* Pill icon in center */}
        <G transform="translate(35, 35)">
          <Path
            d="M17 2 C22.5 2 27 6.5 27 12 L27 22 C27 27.5 22.5 32 17 32 C11.5 32 7 27.5 7 22 L7 12 C7 6.5 11.5 2 17 2 Z"
            fill="none"
            stroke={green}
            strokeWidth={2.5}
          />
          <Path d="M7 17 L27 17" stroke={green} strokeWidth={2} />
          <Rect x={13} y={8} width={8} height={9} rx={4} fill={isDark ? 'rgba(52,199,89,0.5)' : 'rgba(57,166,87,0.4)'} />
        </G>

        {/* Top-right floating card */}
        <Rect x={72} y={-16} width={52} height={66} rx={6} fill={cardBg} stroke={border} strokeWidth={1} />
        <Path d="M82 6 L112 6 M82 16 L106 16 M82 26 L110 26" stroke={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'} strokeWidth={1.5} strokeLinecap="round" />
        {/* file icon in card */}
        <G transform="translate(86, 32)">
          <Path d="M0 0 L16 0 L22 6 L22 26 L0 26 Z" fill="none" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} strokeWidth={1} />
          <Path d="M16 0 L16 6 L22 6" fill="none" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} strokeWidth={1} />
        </G>

        {/* Bottom-left floating card */}
        <Rect x={-22} y={70} width={66} height={44} rx={6} fill={cardBg} stroke={border} strokeWidth={1} />
        {/* Search-like icon */}
        <G transform="translate(-8, 80)">
          <Circle cx={14} cy={14} r={8} fill="none" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} strokeWidth={1.5} />
          <Path d="M20 20 L28 28" stroke={isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'} strokeWidth={1.5} strokeLinecap="round" />
        </G>
      </G>

      {/* Atmospheric glow left */}
      <Circle cx={30} cy={140} r={60} fill={isDark ? 'rgba(52,199,89,0.05)' : 'rgba(57,166,87,0.06)'} />
    </Svg>
  );
}

export default function MedicationEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#050505' : c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader
          title="Medication"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationWrap}>
          <MedicationIllustration isDark={isDark} />
        </View>

        {/* Description */}
        <Text style={[styles.description, { color: isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary, fontFamily: 'Manrope' }]}>
          This will help in keeping track of your drugs and will be of help during emergencies
        </Text>

        {/* Add button */}
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MedicationList')}
        >
          <Ionicons name="add-circle-outline" size={18} color="#000" />
          <Text style={[styles.addBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
            ADD DRUG
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 32,
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center',
    lineHeight: 29,
    maxWidth: 321,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 64,
    borderRadius: 40,
    backgroundColor: '#34C759',
    paddingHorizontal: 32,
    alignSelf: 'stretch',
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
