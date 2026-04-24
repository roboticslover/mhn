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
import Svg, { Path, Circle, G } from 'react-native-svg';
import ScreenHeader from '../../../components/ScreenHeader';

function AllergiesIllustration({ isDark }: { isDark: boolean }) {
  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" fill="none">
      <Circle cx={110} cy={110} r={100} fill={isDark ? 'rgba(52,199,89,0.04)' : 'rgba(57,166,87,0.06)'} />
      <Circle cx={110} cy={110} r={75} fill={isDark ? 'rgba(31,31,31,0.9)' : 'rgba(240,240,240,0.9)'} />
      <Circle cx={110} cy={110} r={60} stroke={isDark ? '#2A2A2A' : '#DDDDDD'} strokeWidth={1.5} fill="none" />
      <G transform="translate(72, 65)">
        {/* Warning triangle */}
        <Path
          d="M38 4 L72 64 L4 64 Z"
          fill="none"
          stroke={isDark ? '#6FFB85' : '#39A657'}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* Exclamation */}
        <Path d="M38 28 L38 44" stroke={isDark ? '#6FFB85' : '#39A657'} strokeWidth={4} strokeLinecap="round" />
        <Circle cx={38} cy={54} r={3} fill={isDark ? '#6FFB85' : '#39A657'} />
        {/* Leaf/allergen dots */}
        <Circle cx={12} cy={20} r={4} fill={isDark ? 'rgba(111,251,133,0.3)' : 'rgba(57,166,87,0.3)'} />
        <Circle cx={64} cy={18} r={3} fill={isDark ? 'rgba(111,251,133,0.2)' : 'rgba(57,166,87,0.2)'} />
        <Circle cx={18} cy={70} r={5} fill={isDark ? 'rgba(111,251,133,0.15)' : 'rgba(57,166,87,0.15)'} />
      </G>
    </Svg>
  );
}

export default function AllergiesEmptyScreen({ navigation }: { navigation: any }) {
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
          title="Allergies & Triggers"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.illustrationWrap}>
          <AllergiesIllustration isDark={isDark} />
        </View>

        <Text style={[styles.description, { color: isDark ? 'rgba(255,255,255,0.6)' : c.textSecondary, fontFamily: 'Manrope' }]}>
          This will help in keeping track of your allergies and triggers and will be of help during emergencies
        </Text>

        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AllergiesList')}
        >
          <Ionicons name="add-circle-outline" size={18} color="#000" />
          <Text style={[styles.addBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
            ADD ALLERGY
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
