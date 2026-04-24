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

export default function AllergiesDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const allergy = route?.params?.allergy ?? {
    id: '1',
    name: 'Peanut Allergy',
    type: 'Food',
    severity: 'Severe',
    reaction: 'Anaphylaxis, hives, throat swelling, drop in blood pressure',
    triggers: ['Peanuts', 'Tree nuts', 'Peanut oil', 'Mixed nuts'],
    diagnosedDate: '2018',
    treatment: 'Epinephrine auto-injector (EpiPen)',
    notes: 'Patient must carry EpiPen at all times. Avoid all peanut-containing products.',
  };

  const severityColors = {
    Mild: { bg: isDark ? 'rgba(96,165,250,0.1)' : 'rgba(59,130,246,0.1)', text: isDark ? '#60A5FA' : '#3B82F6' },
    Moderate: { bg: 'rgba(255,146,0,0.1)', text: '#FF9200' },
    Severe: { bg: isDark ? 'rgba(219,80,52,0.15)' : 'rgba(219,80,52,0.1)', text: '#DB5034' },
  };
  const sevCfg = severityColors[allergy.severity as keyof typeof severityColors] ?? severityColors.Moderate;

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
              style={[styles.editBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => navigation.navigate('AllergiesAdd', { allergy })}
            >
              <Ionicons name="pencil-outline" size={18} color={c.primary} />
            </TouchableOpacity>
          }
        />

        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={[styles.allergyType, { color: c.primary, fontFamily: 'Inter-SemiBold' }]}>
            {allergy.type?.toUpperCase()} ALLERGY
          </Text>
          <Text style={[styles.heroTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-ExtraBold' }]}>
            {allergy.name}
          </Text>
          <View style={[styles.severityPill, { backgroundColor: sevCfg.bg }]}>
            <Text style={[styles.severityText, { color: sevCfg.text }]}>
              {allergy.severity?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Diagnosed Card */}
        <View style={[styles.infoCard, { backgroundColor: isDark ? '#2A2A2A' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
          <View style={[styles.infoIconBox, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
            <Ionicons name="calendar-outline" size={20} color={c.primary} />
          </View>
          <View style={styles.infoTextBox}>
            <Text style={[styles.infoLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
              DIAGNOSED
            </Text>
            <Text style={[styles.infoValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
              {allergy.diagnosedDate ?? 'Unknown'}
            </Text>
          </View>
        </View>

        {/* Reactions Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
            SYMPTOMS & REACTIONS
          </Text>
          <View style={[styles.reactionCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
            <Text style={[styles.reactionText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
              {allergy.reaction}
            </Text>
          </View>
        </View>

        {/* Triggers Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
            KNOWN TRIGGERS
          </Text>
          <View style={styles.triggersGrid}>
            {(allergy.triggers ?? []).map((trigger: string, i: number) => (
              <View
                key={i}
                style={[styles.triggerCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}
              >
                <Ionicons name="alert-circle-outline" size={14} color={c.primary} />
                <Text style={[styles.triggerText, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-SemiBold' }]}>
                  {trigger}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Treatment */}
        {allergy.treatment && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              TREATMENT / MEDICATION
            </Text>
            <View style={[styles.detailCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
              <View style={[styles.detailIconBox, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
                <Ionicons name="medkit-outline" size={18} color={c.primary} />
              </View>
              <Text style={[styles.detailValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-SemiBold' }]}>
                {allergy.treatment}
              </Text>
            </View>
          </View>
        )}

        {/* Notes */}
        {allergy.notes && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              CLINICAL NOTES
            </Text>
            <View style={[styles.notesCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
              <Text style={[styles.notesText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                {allergy.notes}
              </Text>
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.updateBtn, { backgroundColor: isDark ? '#34C759' : c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AllergiesAdd', { allergy })}
        >
          <Text style={[styles.updateBtnText, { fontFamily: 'Inter-Bold' }]}>
            Update Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 6,
  },
  allergyType: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 45,
    letterSpacing: -1.8,
  },
  severityPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 2,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 16,
    gap: 18,
  },
  infoIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextBox: { gap: 4 },
  infoLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  reactionCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  reactionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  triggersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  triggerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 33,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 33,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  detailIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    lineHeight: 24,
  },
  notesCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
  },
  notesText: {
    fontSize: 16,
    lineHeight: 24,
  },
  updateBtn: {
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  updateBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#003910',
    textAlign: 'center',
  },
});
