import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

// Stethoscope icon
function StethoscopeIcon({ color = '#34C759', size = 64 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Path d="M20 8C14 8 10 14 10 20V30C10 38 16 44 24 44H26" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M44 8C50 8 54 14 54 20V30C54 38 48 44 40 44H38" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Circle cx={32} cy={48} r={6} stroke={color} strokeWidth={2.5} />
      <Path d="M32 42V34" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
      <Circle cx={20} cy={8} r={3} fill={color} />
      <Circle cx={44} cy={8} r={3} fill={color} />
    </Svg>
  );
}

// Add person icon
function AddPersonIcon({ color = '#003910', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size * 0.73} viewBox="0 0 22 16" fill="none">
      <Path d="M15 8H19M17 6V10" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M1 14C1 11.7909 2.79086 10 5 10H11C13.2091 10 15 11.7909 15 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={8} cy={4} r={3} stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}

export default function DoctorConnectEmptyScreen({ navigation }: { navigation: any }) {
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
          title="Doctor Connect"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.illustrationCircle, { backgroundColor: isDark ? '#1F1F1F' : '#E8E8E8' }]}>
            <View style={[styles.innerCircle, { borderColor: isDark ? '#353535' : '#CCCCCC' }]}>
              <StethoscopeIcon color={c.primary} />
            </View>
          </View>
          <View style={[styles.plusFloating, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0', borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.cardBorder }]}>
            <Ionicons name="add" size={16} color={c.text} />
          </View>
        </View>

        {/* Add button */}
        <TouchableOpacity style={[styles.addBtn, { backgroundColor: '#34C759' }]} activeOpacity={0.8}>
          <AddPersonIcon color="#003910" />
          <Text style={[styles.addBtnText, { fontFamily: 'Inter-Bold' }]}>Add Your Doctor</Text>
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
          No Active{'\n'}Connections
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Medium' }]}>
          Add your primary care physician or specialist to securely share and manage your medical records.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  illustrationContainer: {
    width: 256,
    height: 224,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  illustrationCircle: {
    width: 192,
    height: 192,
    borderRadius: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusFloating: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 999,
    marginBottom: 32,
    shadowColor: 'rgba(48,209,88,0.2)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 4,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003910',
    lineHeight: 28,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.9,
    lineHeight: 45,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 29.25,
  },
});
