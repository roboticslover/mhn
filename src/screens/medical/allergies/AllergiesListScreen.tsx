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

interface Allergy {
  id: string;
  name: string;
  type: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  reaction: string;
  triggers: string[];
}

const SAMPLE_ALLERGIES: Allergy[] = [
  {
    id: '1',
    name: 'Peanut Allergy',
    type: 'Food',
    severity: 'Severe',
    reaction: 'Anaphylaxis, hives, swelling',
    triggers: ['Peanuts', 'Tree nuts', 'Peanut oil'],
  },
  {
    id: '2',
    name: 'Penicillin',
    type: 'Drug',
    severity: 'Moderate',
    reaction: 'Rash, itching, shortness of breath',
    triggers: ['Penicillin', 'Amoxicillin'],
  },
  {
    id: '3',
    name: 'Dust Mites',
    type: 'Environmental',
    severity: 'Mild',
    reaction: 'Sneezing, runny nose, itchy eyes',
    triggers: ['Dust mites', 'Pet dander', 'Pollen'],
  },
  {
    id: '4',
    name: 'Latex',
    type: 'Contact',
    severity: 'Moderate',
    reaction: 'Contact dermatitis, hives',
    triggers: ['Latex gloves', 'Rubber products'],
  },
];

function SeverityBadge({ severity, isDark }: { severity: Allergy['severity']; isDark: boolean }) {
  const configs = {
    Mild: {
      bg: isDark ? 'rgba(96,165,250,0.1)' : 'rgba(59,130,246,0.1)',
      border: isDark ? 'rgba(96,165,250,0.2)' : 'rgba(59,130,246,0.2)',
      text: isDark ? '#60A5FA' : '#3B82F6',
    },
    Moderate: {
      bg: isDark ? 'rgba(255,146,0,0.1)' : 'rgba(255,146,0,0.1)',
      border: isDark ? 'rgba(255,146,0,0.25)' : 'rgba(255,146,0,0.25)',
      text: '#FF9200',
    },
    Severe: {
      bg: isDark ? 'rgba(219,80,52,0.1)' : 'rgba(219,80,52,0.1)',
      border: isDark ? 'rgba(219,80,52,0.25)' : 'rgba(219,80,52,0.25)',
      text: '#DB5034',
    },
  };
  const cfg = configs[severity];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text style={[styles.badgeText, { color: cfg.text }]}>{severity.toUpperCase()}</Text>
    </View>
  );
}

const TYPE_ICONS: Record<string, string> = {
  Food: 'fast-food-outline',
  Drug: 'medical-outline',
  Environmental: 'leaf-outline',
  Contact: 'hand-left-outline',
};

export default function AllergiesListScreen({ navigation }: { navigation: any }) {
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
          title="Allergies & Triggers"
          onBack={() => navigation.goBack()}
          rightElement={
            <TouchableOpacity
              style={[styles.addIconBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => navigation.navigate('AllergiesAdd')}
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
            Allergies & Triggers
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
            A complete profile of your allergic reactions and environmental triggers.
          </Text>
        </View>

        {/* Section label */}
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionLabel, { color: isDark ? 'rgba(188,203,183,0.5)' : c.textTertiary, fontFamily: 'Inter-Black' }]}>
            ACTIVE PROFILES
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {SAMPLE_ALLERGIES.map((allergy) => (
            <TouchableOpacity
              key={allergy.id}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1F1F1F' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('AllergiesDetail', { allergy })}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleRow}>
                  <View style={[styles.typeIconBox, { backgroundColor: isDark ? '#2A2A2A' : '#F0F0F0' }]}>
                    <Ionicons name={(TYPE_ICONS[allergy.type] ?? 'alert-circle-outline') as any} size={16} color={c.primary} />
                  </View>
                  <View style={styles.titleCol}>
                    <Text style={[styles.allergyType, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                      {allergy.type}
                    </Text>
                    <Text style={[styles.cardTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
                      {allergy.name}
                    </Text>
                  </View>
                </View>
                <SeverityBadge severity={allergy.severity} isDark={isDark} />
              </View>

              <View style={[styles.divider, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : c.divider }]} />

              <Text style={[styles.reactionText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                {allergy.reaction}
              </Text>

              <View style={styles.triggersRow}>
                {allergy.triggers.slice(0, 3).map((trigger, i) => (
                  <View key={i} style={[styles.triggerChip, { backgroundColor: isDark ? '#2A2A2A' : '#F0F0F0', borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
                    <Text style={[styles.triggerText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                      {trigger}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AllergiesAdd')}
        >
          <Ionicons name="add" size={20} color="#000" />
          <Text style={[styles.addBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
            ADD ALLERGY
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
    lineHeight: 36,
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
    padding: 20,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 10,
  },
  typeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCol: { flex: 1, gap: 2 },
  allergyType: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.3,
  },
  badge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
  },
  reactionText: {
    fontSize: 13,
    lineHeight: 18,
  },
  triggersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  triggerChip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  triggerText: {
    fontSize: 11,
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
