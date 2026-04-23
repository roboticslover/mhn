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

// Plus circle add icon
function PlusAddIcon({ color = '#000', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Circle cx={9} cy={9} r={8} stroke={color} strokeWidth={1.5} />
      <Path d="M9 5V13M5 9H13" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

interface MedicalEmptyScreenProps {
  navigation: any;
  title: string;
  icon: string;
  buttonLabel: string;
  description: string;
}

export default function MedicalEmptyScreen({ navigation, title, icon, buttonLabel, description }: MedicalEmptyScreenProps) {
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
          title={title}
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.outerCircle, { backgroundColor: isDark ? '#1F1F1F' : '#E8E8E8' }]}>
            <View style={[styles.innerCircle, { borderColor: isDark ? '#353535' : '#CCCCCC' }]}>
              <Ionicons name={icon as any} size={48} color={c.primary} />
            </View>
          </View>
          {/* Plus floating element */}
          <View style={[styles.plusFloat, { backgroundColor: isDark ? '#2A2A2A' : '#E0E0E0', borderColor: isDark ? 'rgba(255,255,255,0.05)' : c.cardBorder }]}>
            <Ionicons name="add" size={16} color={c.text} />
          </View>
        </View>

        {/* Add button */}
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.8}
        >
          <PlusAddIcon color="#000" />
          <Text style={[styles.addBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
            {buttonLabel}
          </Text>
        </TouchableOpacity>

        {/* Description */}
        <Text style={[styles.description, { color: isDark ? '#C2C2C2' : c.textSecondary, fontFamily: 'Manrope' }]}>
          {description}
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
    height: 256,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  outerCircle: {
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
  plusFloat: {
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
    justifyContent: 'center',
    gap: 12,
    height: 64,
    borderRadius: 40,
    backgroundColor: '#34C759',
    paddingHorizontal: 32,
    alignSelf: 'stretch',
    marginHorizontal: 0,
    marginBottom: 26,
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 18,
    fontWeight: '200',
    textAlign: 'center',
    lineHeight: 25,
  },
});
