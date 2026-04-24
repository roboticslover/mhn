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

interface Condition {
  id: string;
  name: string;
  status: 'Active' | 'Resolved' | 'Monitoring';
  diagnosedDate?: string;
}

const SAMPLE_CONDITIONS: Condition[] = [
  { id: '1', name: 'Diabetes Type II', status: 'Active', diagnosedDate: '2019' },
  { id: '2', name: 'Hypertension', status: 'Resolved', diagnosedDate: '2017' },
  { id: '3', name: 'Seasonal Allergies', status: 'Monitoring', diagnosedDate: '2015' },
  { id: '4', name: 'Asthma', status: 'Active', diagnosedDate: '2010' },
];

function StatusBadge({ status, isDark }: { status: Condition['status']; isDark: boolean }) {
  const configs = {
    Active: {
      bg: isDark ? 'rgba(85,238,113,0.1)' : 'rgba(57,166,87,0.1)',
      border: isDark ? 'rgba(85,238,113,0.2)' : 'rgba(57,166,87,0.25)',
      text: isDark ? '#55EE71' : '#39A657',
    },
    Resolved: {
      bg: isDark ? 'rgba(53,53,53,0.2)' : 'rgba(0,0,0,0.05)',
      border: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
      text: isDark ? '#BCCBB7' : '#707070',
    },
    Monitoring: {
      bg: isDark ? 'rgba(255,146,0,0.1)' : 'rgba(255,146,0,0.1)',
      border: isDark ? 'rgba(255,146,0,0.2)' : 'rgba(255,146,0,0.2)',
      text: '#FF9200',
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
          <Text style={[styles.heroTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
            Medical Conditions
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
            An overview of your diagnosed pathologies and their current clinical management status.
          </Text>
        </View>

        {/* Section label */}
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionLabel, { color: isDark ? 'rgba(188,203,183,0.5)' : c.textTertiary, fontFamily: 'Inter-Black' }]}>
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
                  backgroundColor: isDark ? '#1F1F1F' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('MedicalConditionsDetail', { condition })}
            >
              <View style={styles.cardRow}>
                <Text style={[styles.cardTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
                  {condition.name}
                </Text>
                <StatusBadge status={condition.status} isDark={isDark} />
              </View>
              {condition.diagnosedDate && (
                <View style={styles.metaRow}>
                  <Ionicons name="calendar-outline" size={12} color={isDark ? '#BCCBB7' : c.textSecondary} />
                  <Text style={[styles.metaText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
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
          <Ionicons name="add" size={20} color="#000" />
          <Text style={[styles.addBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
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
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorialHeader: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 8,
  },
  liveTag: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 4,
  },
  liveTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 45,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    maxWidth: 280,
  },
  sectionRow: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  card: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 24,
    gap: 10,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 28,
    flex: 1,
    marginRight: 12,
  },
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    lineHeight: 16,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 56,
    borderRadius: 999,
    marginHorizontal: 24,
    marginTop: 24,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
});
