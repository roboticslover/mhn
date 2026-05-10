import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import ScreenHeader from '../../components/ScreenHeader';

const VITALS_SCREENS = [
  {
    key: 'vitalsMain',
    label: 'Vitals Dashboard',
    icon: 'pulse' as const,
    color: '#6FFB85',
    bgColor: 'rgba(111,251,133,0.12)',
    subtitle: 'Overview of all health scores, log data & vitals',
    route: 'VitalsMain',
  },
  {
    key: 'vitalsNoWearable',
    label: 'Without Wearable',
    icon: 'watch-outline' as const,
    color: '#60A5FA',
    bgColor: 'rgba(96,165,250,0.12)',
    subtitle: 'Vitals screen without connected wearable',
    route: 'VitalsNoWearable',
  },
  {
    key: 'vitalsSleep',
    label: 'Sleep',
    icon: 'moon' as const,
    color: '#A5B4FC',
    bgColor: 'rgba(165,180,252,0.12)',
    subtitle: 'Sleep stages, efficiency & consistency',
    route: 'VitalsSleep',
  },
  {
    key: 'vitalsHeartRate',
    label: 'Heart Rate',
    icon: 'heart' as const,
    color: '#FF2D55',
    bgColor: 'rgba(255,45,85,0.12)',
    subtitle: 'HR, HRV, SpO2, blood pressure & more',
    route: 'VitalsHeartRate',
  },
  {
    key: 'vitalsActivity',
    label: 'Activity',
    icon: 'fitness' as const,
    color: '#30D158',
    bgColor: 'rgba(48,209,88,0.12)',
    subtitle: 'Steps, energy, duration & intensity',
    route: 'VitalsActivity',
  },
];

export default function VitalsHubScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Vitals" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>
          Monitor your body's vital signs and health metrics
        </Text>

        {VITALS_SCREENS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.card, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.cardRow}>
              <View style={[styles.iconWrap, { backgroundColor: item.bgColor }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.cardText}>
                <Text style={[styles.cardTitle, { color: c.text, fontFamily: 'Inter' }]}>{item.label}</Text>
                <Text style={[styles.cardSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={c.textSecondary} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  subtitle: { fontSize: 14, fontWeight: '400', marginBottom: 20, lineHeight: 20 },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  cardText: { flex: 1, marginLeft: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  cardSub: { fontSize: 12, fontWeight: '400', marginTop: 2 },
});
