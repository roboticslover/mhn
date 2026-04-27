import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Treatment {
  id: string;
  name: string;
  dosage: string;
  type: 'medication' | 'lifestyle' | 'other';
}

interface Condition {
  id: string;
  name: string;
  status: string;
  category?: string;
  diagnosed?: string;
  treatments?: Treatment[];
}

const TREATMENT_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  medication: 'medkit-outline',
  lifestyle:  'barbell-outline',
  other:      'pulse-outline',
};

export default function MedicalConditionsDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const condition: Condition = route?.params?.condition ?? {
    id: '1',
    name: 'High Blood Pressure',
    status: 'Active',
    category: 'Chronic Condition',
    diagnosed: '3 years and 1 month ago',
    treatments: [
      { id: '1', name: 'Vitamin Supplements',   dosage: 'Daily Dosage • morning',  type: 'medication' },
      { id: '2', name: 'Lifestyle Modification', dosage: 'Cardio & Reduced Sodium', type: 'lifestyle'  },
    ],
  };

  const isActive   = condition.status === 'Active';
  const isResolved = condition.status === 'Resolved' || condition.status === 'Recovered';

  const statusBg    = isActive   ? c.successSoft
                    : isResolved ? (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)')
                    :               c.warningSoft;
  const statusColor = isActive   ? c.success
                    : isResolved ? (isDark ? '#BCCBB7' : c.textSecondary)
                    :               c.warning;

  const bg           = c.background;
  const cardBg       = c.card;
  const treatBg      = c.card;
  const diagLabelClr = c.textSecondary;
  const diagValueClr = c.text;
  const sectionClr   = c.textTertiary;
  const treatTitleClr= c.text;
  const treatSubClr  = c.textSecondary;
  const bottomBarBg  = c.surface;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* ── Header ── */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity 
          style={[styles.backBtn, { backgroundColor: c.cardGlassBorder }]} 
          onPress={() => navigation.goBack()} 
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>
          Medical Conditi...
        </Text>
        <View style={styles.avatarWrap}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/96?img=47' }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 110 + insets.bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <View style={styles.heroSection}>
          <Text style={[styles.heroCategory, { color: c.primary }]}>
            {(condition.category ?? 'Chronic Condition').toUpperCase()}
          </Text>
          <Text style={[styles.heroTitle, { color: c.text }]}>
            {condition.name}
          </Text>
          <View style={[styles.statusPill, { backgroundColor: statusBg }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {condition.status?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* ── Diagnosed Card ── */}
        <View style={styles.diagnosedSection}>
          <View style={[styles.diagnosedCard, { backgroundColor: cardBg, borderColor: c.cardBorder, borderWidth: 1 }]}>
            <View style={[styles.iconSquare, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}>
              <Ionicons name="calendar-outline" size={22} color={c.primary} />
            </View>
            <View style={styles.diagnosedTextWrap}>
              <Text style={[styles.diagnosedLabel, { color: diagLabelClr }]}>DIAGNOSED</Text>
              <Text style={[styles.diagnosedValue, { color: diagValueClr }]}>
                {condition.diagnosed ?? '—'}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Treatment Timeline ── */}
        <View style={styles.timelineSection}>
          <Text style={[styles.sectionLabel, { color: sectionClr }]}>TREATMENT TIMELINE</Text>
          <View style={styles.timelineCards}>
            {(condition.treatments ?? []).map((t) => {
              const iconName = TREATMENT_ICONS[t.type] ?? TREATMENT_ICONS.other;
              return (
                <View key={t.id} style={[styles.treatmentCard, { backgroundColor: treatBg, borderColor: c.cardBorder, borderWidth: 1 }]}>
                  <View style={[styles.treatmentIconCircle, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                    <Ionicons name={iconName} size={20} color={c.success} />
                  </View>
                  <View style={styles.treatmentTextWrap}>
                    <Text style={[styles.treatmentTitle, { color: treatTitleClr }]} numberOfLines={2}>{t.name}</Text>
                    <Text style={[styles.treatmentSub,   { color: treatSubClr   }]}>{t.dosage}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* ── Update Metrics Button ── */}
      <View style={[styles.bottomBar, { backgroundColor: bottomBarBg, paddingBottom: Math.max(insets.bottom, 28) }]}>
        <TouchableOpacity
          style={[styles.updateBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MedicalConditionsAdd', { condition })}
        >
          <Text style={[styles.updateBtnText, { color: isDark ? '#003910' : '#fff' }]}>
            Update Metrics
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: -0.5,
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },

  /* ── Scroll ── */
  scrollContent: {
    paddingTop: 16,
  },

  /* ── Hero ── */
  heroSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  heroCategory: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: -1,
    lineHeight: 44,
  },
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  /* ── Diagnosed ── */
  diagnosedSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  diagnosedCard: {
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconSquare: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  diagnosedTextWrap: {
    flex: 1,
    gap: 4,
  },
  diagnosedLabel: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'Inter',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  diagnosedValue: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 28,
    letterSpacing: -0.3,
  },

  /* ── Treatment Timeline ── */
  timelineSection: {
    paddingHorizontal: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginLeft: 4,
    marginBottom: 16,
  },
  timelineCards: {
    gap: 12,
  },
  treatmentCard: {
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  treatmentIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  treatmentTextWrap: { flex: 1 },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter',
    lineHeight: 22,
    marginBottom: 4,
  },
  treatmentSub: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 20,
  },

  /* ── Bottom CTA ── */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  updateBtn: {
    height: 60,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtnText: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily: 'Inter',
    letterSpacing: -0.2,
  },
});

