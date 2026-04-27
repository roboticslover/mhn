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

const CATEGORIES = [
  {
    key: 'caffeine',
    label: 'Caffeine',
    icon: 'cafe' as const,
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.12)',
    subtitle: 'Track your coffee, tea & herbal intake',
    inputRoute: 'CaffeineInput',
    summaryRoute: 'CaffeineSummary',
  },
  {
    key: 'alcohol',
    label: 'Alcohol',
    icon: 'wine' as const,
    color: '#A855F7',
    bgColor: 'rgba(168,85,247,0.12)',
    subtitle: 'Monitor your alcohol consumption',
    inputRoute: 'AlcoholInput',
    summaryRoute: 'AlcoholSummary',
  },
  {
    key: 'water',
    label: 'Water',
    icon: 'water' as const,
    color: '#3B82F6',
    bgColor: 'rgba(59,130,246,0.12)',
    subtitle: 'Stay hydrated, track daily water intake',
    inputRoute: 'WaterTracking',
    summaryRoute: 'WaterTracking',
  },
  {
    key: 'smoking',
    label: 'Smoking',
    icon: 'flame' as const,
    color: '#DB5034',
    bgColor: 'rgba(219,80,52,0.12)',
    subtitle: 'Track cigarettes & reduce over time',
    inputRoute: 'SmokingInput',
    summaryRoute: 'SmokingSummary',
  },
];

export default function LifestyleScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>  
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Lifestyle Tracking" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>
          Monitor your daily habits and lifestyle choices
        </Text>

        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.card, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(cat.inputRoute)}
          >
            <View style={styles.cardRow}>
              <View style={[styles.iconWrap, { backgroundColor: cat.bgColor }]}>  
                <Ionicons name={cat.icon} size={24} color={cat.color} />
              </View>
              <View style={styles.cardText}>
                <Text style={[styles.cardTitle, { color: c.text, fontFamily: 'Inter' }]}>{cat.label}</Text>
                <Text style={[styles.cardSub, { color: c.textSecondary, fontFamily: 'Inter' }]}>{cat.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={c.textSecondary} />
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: cat.bgColor }]}
                onPress={() => navigation.navigate(cat.inputRoute)}
              >
                <Ionicons name="add" size={14} color={cat.color} />
                <Text style={[styles.actionText, { color: cat.color, fontFamily: 'Inter' }]}>Log</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, { backgroundColor: c.accentSoft }]}
                onPress={() => navigation.navigate(cat.summaryRoute)}
              >
                <Ionicons name="stats-chart" size={14} color={c.primary} />
                <Text style={[styles.actionText, { color: c.primary, fontFamily: 'Inter' }]}>Summary</Text>
              </TouchableOpacity>
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
  cardActions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  actionText: { fontSize: 12, fontWeight: '700' },
});
