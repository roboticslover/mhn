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
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../../components/ScreenHeader';

interface Treatment {
  id: string;
  name: string;
  dosage: string;
  type: 'medication' | 'lifestyle' | 'other';
}

interface Condition {
  id: string;
  name: string;
  status: 'Active' | 'Resolved' | 'Monitoring';
  diagnosedDate?: string;
  diagnosed?: string;
  category?: string;
  treatments?: Treatment[];
}

const SAMPLE_CONDITIONS: Condition[] = [
  { 
    id: '1', 
    name: 'High Blood Pressure', 
    status: 'Active', 
    diagnosedDate: '2021',
    diagnosed: '3 years and 1 month ago',
    category: 'Chronic Condition',
    treatments: [
      { id: '1', name: 'Vitamin Supplements', dosage: 'Daily Dosage • morning', type: 'medication' },
      { id: '2', name: 'Lifestyle Modification', dosage: 'Cardio & Reduced Sodium', type: 'lifestyle' },
    ]
  },
  { 
    id: '2', 
    name: 'Diabetes Type II', 
    status: 'Active', 
    diagnosedDate: '2019',
    diagnosed: '5 years ago',
    category: 'Metabolic Disorder',
    treatments: [
      { id: '1', name: 'Metformin', dosage: '500mg • twice daily', type: 'medication' },
      { id: '2', name: 'Dietary Changes', dosage: 'Low carb, high protein', type: 'lifestyle' },
    ]
  },
  { 
    id: '3', 
    name: 'Hypertension', 
    status: 'Resolved', 
    diagnosedDate: '2017',
    diagnosed: '7 years ago',
    category: 'Cardiovascular',
    treatments: []
  },
  { 
    id: '4', 
    name: 'Seasonal Allergies', 
    status: 'Monitoring', 
    diagnosedDate: '2015',
    diagnosed: '9 years ago',
    category: 'Allergy',
    treatments: [
      { id: '1', name: 'Antihistamines', dosage: '10mg • as needed', type: 'medication' }
    ]
  },
];

function StatusBadge({ status, theme }: { status: Condition['status']; theme: any }) {
  const c = theme.colors;
  const isDark = theme.dark;
  
  const configs = {
    Active: {
      bg: c.successSoft,
      border: isDark ? 'rgba(85,238,113,0.2)' : 'rgba(57,166,87,0.25)',
      text: c.success,
    },
    Resolved: {
      bg: isDark ? 'rgba(53,53,53,0.2)' : 'rgba(0,0,0,0.05)',
      border: c.cardBorder,
      text: isDark ? '#BCCBB7' : c.textSecondary,
    },
    Monitoring: {
      bg: c.warningSoft,
      border: isDark ? 'rgba(255,146,0,0.2)' : 'rgba(255,146,0,0.2)',
      text: c.warning,
    },
  };
  const cfg = configs[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text style={[styles.badgeText, { color: cfg.text }]}>{status.toUpperCase()}</Text>
    </View>
  );
}

export default function MedicalConditionsListScreen({ navigation }: { navigation: any }) {
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
          title="Conditions"
          onBack={() => navigation.goBack()}
          rightElement={
            <TouchableOpacity
              style={[styles.addIconBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => navigation.navigate('MedicalConditionsAdd')}
            >
              <Ionicons name="add" size={20} color={c.primary} />
            </TouchableOpacity>
          }
        />

        {/* Editorial Header */}
        <View style={styles.editorialHeader}>
          <View style={[styles.liveTag, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
            <Text style={[styles.liveTagText, { color: c.primary }]}>LIVE STATUS</Text>
          </View>
          <View style={styles.heroTitleRow}>
            <Text style={[styles.heroTitle, { color: c.text }]}>
              Medical Conditions
            </Text>
            <TouchableOpacity 
              style={styles.editIconBtn} 
              onPress={() => navigation.navigate('MedicalConditionsAdd')}
              activeOpacity={0.7}
            >
              <Ionicons name="pencil-outline" size={22} color={c.primary} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.heroSubtitle, { color: c.textSecondary }]}>
            An overview of your diagnosed pathologies and their current clinical management status.
          </Text>
        </View>

        {/* Section label */}
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionLabel, { color: c.textTertiary }]}>
            CURRENT PROFILES
          </Text>
        </View>

        {/* Condition Cards */}
        <View style={styles.cardsContainer}>
          {SAMPLE_CONDITIONS.map((condition) => (
            <TouchableOpacity
              key={condition.id}
              style={[
                styles.card,
                {
                  backgroundColor: c.card,
                  borderColor: c.cardBorder,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('MedicalConditionsDetail', { condition })}
            >
              <View style={styles.cardRow}>
                <Text style={[styles.cardTitle, { color: c.text }]}>
                  {condition.name}
                </Text>
                <StatusBadge status={condition.status} theme={theme} />
              </View>
              {condition.diagnosedDate && (
                <View style={styles.metaRow}>
                  <Ionicons name="calendar-outline" size={14} color={c.textSecondary} />
                  <Text style={[styles.metaText, { color: c.textSecondary }]}>
                    Since {condition.diagnosedDate}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MedicalConditionsAdd')}
        >
          <Ionicons name="add" size={22} color={isDark ? '#003910' : '#FFFFFF'} />
          <Text style={[styles.addBtnText, { color: isDark ? '#003910' : '#FFFFFF' }]}>
            ADD CONDITION
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  addIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorialHeader: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  liveTag: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  liveTagText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  heroTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  editIconBtn: {
    padding: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
    maxWidth: 300,
  },
  sectionRow: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Black',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    gap: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
    lineHeight: 28,
    flex: 1,
  },
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 2,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 60,
    borderRadius: 999,
    marginHorizontal: 24,
    marginTop: 32,
  },
  addBtnText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
