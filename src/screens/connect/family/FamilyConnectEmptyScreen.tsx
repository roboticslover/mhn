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
import Svg, { Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

function AddPersonIcon({ color = '#003910' }: { color?: string }) {
  return (
    <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
      <Path d="M15 8H19M17 6V10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M1 14C1 11.7909 2.79086 10 5 10H11C13.2091 10 15 11.7909 15 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={8} cy={4} r={3} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

function NetworkIllustration({ primaryColor, bgColor, nodeBg }: { primaryColor: string; bgColor: string; nodeBg: string }) {
  const nodes = [
    { cx: 56, cy: 158 },
    { cx: 144, cy: 96 },
    { cx: 228, cy: 158 },
    { cx: 228, cy: 236 },
    { cx: 144, cy: 296 },
    { cx: 56, cy: 236 },
    { cx: 60, cy: 330 },
    { cx: 232, cy: 110 },
  ];
  const lines = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [1, 7], [5, 6],
  ];
  return (
    <Svg width={284} height={392} viewBox="0 0 284 392" fill="none">
      {lines.map(([a, b], i) => (
        <Path
          key={i}
          d={`M${nodes[a].cx} ${nodes[a].cy} L${nodes[b].cx} ${nodes[b].cy}`}
          stroke={primaryColor}
          strokeWidth={0.8}
          strokeOpacity={0.25}
        />
      ))}
      {nodes.map((n, i) => (
        <Circle key={i} cx={n.cx} cy={n.cy} r={22} fill={nodeBg} />
      ))}
      {/* Center person illustration */}
      <Circle cx={142} cy={196} r={40} fill={bgColor} />
      <Circle cx={142} cy={186} r={12} fill={primaryColor} />
      <Path d="M122 218C122 207 131.4 198 143 198C154.6 198 164 207 164 218" stroke={primaryColor} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export default function FamilyConnectEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const primaryGreen = isDark ? '#34C759' : c.primary;
  const gradientColors: [string, string] = isDark ? ['#55EE71', '#30D158'] : [c.primary, c.primaryDark];
  const nodeBg = isDark ? '#2A2A2A' : '#E8E8E8';
  const bgColor = isDark ? '#1F1F1F' : '#D8D8D8';
  const subText = isDark ? '#BCCBB7' : c.textSecondary;
  const headText = isDark ? '#E2E2E2' : c.text;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Header */}
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

      <View style={styles.content}>
        {/* Network Illustration */}
        <View style={styles.illustrationWrap}>
          <NetworkIllustration primaryColor={primaryGreen} bgColor={bgColor} nodeBg={nodeBg} />
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: headText, fontFamily: 'Inter-Bold' }]}>
          No Members Added
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: subText, fontFamily: 'Inter' }]}>
          Enter a phone number to send a connection request and start monitoring well-being together.
        </Text>

        {/* Add Button */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.addBtn}
        >
          <TouchableOpacity
            style={styles.addBtnInner}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('FamilyListScreen')}
          >
            <AddPersonIcon color="#003910" />
            <Text style={[styles.addBtnText, { fontFamily: 'Inter-Bold' }]}>Add Family & Friends</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: subText, fontFamily: 'Inter' }]}>
          By sending an invite, you agree to share your basic vitality metrics with this contact once they accept.
        </Text>
      </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  illustrationWrap: {
    width: 284,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.75,
    lineHeight: 38,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 29,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  addBtn: { borderRadius: 999, width: '100%', marginBottom: 16 },
  addBtnInner: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  addBtnText: { fontSize: 18, fontWeight: '700', color: '#003910', lineHeight: 28 },
  disclaimer: {
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
    marginHorizontal: 40,
  },
});
