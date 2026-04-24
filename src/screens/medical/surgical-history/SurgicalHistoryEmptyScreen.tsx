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
import Svg, { Path, Rect, Circle, G } from 'react-native-svg';
import ScreenHeader from '../../../components/ScreenHeader';

function SurgicalIllustration({ isDark }: { isDark: boolean }) {
  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" fill="none">
      {/* Outer glow circle */}
      <Circle cx={110} cy={110} r={100} fill={isDark ? 'rgba(52,199,89,0.04)' : 'rgba(57,166,87,0.06)'} />
      {/* Mid circle */}
      <Circle cx={110} cy={110} r={75} fill={isDark ? 'rgba(31,31,31,0.9)' : 'rgba(240,240,240,0.9)'} />
      {/* Inner ring */}
      <Circle cx={110} cy={110} r={60} stroke={isDark ? '#2A2A2A' : '#DDDDDD'} strokeWidth={1.5} fill="none" />
      {/* Scalpel icon */}
      <G transform="translate(75, 70)">
        {/* Handle */}
        <Rect x={28} y={0} width={14} height={36} rx={7} fill={isDark ? '#353535' : '#D0D0D0'} />
        {/* Blade */}
        <Path d="M31 36 L28 68 L35 80 L42 68 L39 36 Z" fill={isDark ? '#6FFB85' : '#39A657'} opacity={0.8} />
        {/* Blade tip */}
        <Path d="M28 68 L35 80 L42 68 L35 62 Z" fill={isDark ? '#6FFB85' : '#39A657'} />
        {/* Guard */}
        <Rect x={22} y={33} width={26} height={6} rx={3} fill={isDark ? '#555555' : '#BBBBBB'} />
      </G>
    </Svg>
  );
}

export default function SurgicalHistoryEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader
          title="Surgical Record"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationWrap}>
          <SurgicalIllustration isDark={isDark} />
        </View>

        {/* Description */}
        <Text style={[styles.description, { color: isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary, fontFamily: 'Manrope' }]}>
          This will help in keeping track of your surgical records and will be of help during emergencies
        </Text>

        {/* Add button */}
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SurgicalHistoryList')}
        >
          <Ionicons name="add-circle-outline" size={18} color="#000" />
          <Text style={[styles.addBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
            ADD SURGICAL RECORD
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
    maxWidth: 320,
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
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
});
