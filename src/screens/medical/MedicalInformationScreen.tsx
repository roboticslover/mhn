import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

// Plus circle icon for add
function PlusCircle({ color = '#6FFB85', size = 34 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 34 34" fill="none">
      <Circle cx={17} cy={17} r={16} stroke={color} strokeWidth={1.5} />
      <Path d="M17 10V24M10 17H24" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

interface MedicalCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
}

const CATEGORIES: MedicalCategory[] = [
  {
    id: '1',
    title: 'Surgical History',
    description: 'Record past surgeries and medical procedures easily.',
    icon: 'medkit-outline',
    route: 'SurgicalHistory',
  },
  {
    id: '2',
    title: 'Medical Conditions',
    description: 'Add diseases, disorders, or chronic health issues.',
    icon: 'heart-outline',
    route: 'MedicalConditions',
  },
  {
    id: '3',
    title: 'Allergies',
    description: 'List allergies and related reactions clearly.',
    icon: 'alert-circle-outline',
    route: 'Allergies',
  },
  {
    id: '4',
    title: 'Drug Usage',
    description: 'Add medicines you take regularly or occasionally.',
    icon: 'flask-outline',
    route: 'Medications',
  },
];

export default function MedicalInformationScreen({ navigation }: { navigation: any }) {
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

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 4, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Medical Information"
          onBack={() => navigation.goBack()}
        />

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
          Centralize your essential medical records for quick access and better care.
        </Text>

        {/* Category Cards */}
        <View style={styles.cardsContainer}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate(cat.route)}
            >
              {/* Icon */}
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(14,85,31,0.3)' }]}>
                  <Ionicons name={cat.icon as any} size={18} color={c.primary} />
                </View>
                <PlusCircle color={c.primary} />
              </View>

              {/* Title */}
              <Text style={[styles.cardTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
                {cat.title}
              </Text>

              {/* Description */}
              <Text style={[styles.cardDesc, { color: c.textSecondary, fontFamily: 'Inter-Medium' }]}>
                {cat.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 28,
    marginHorizontal: 36,
    marginBottom: 24,
  },
  cardsContainer: {
    marginHorizontal: 24,
    gap: 18,
  },
  categoryCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    minHeight: 180,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 11,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 32,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
