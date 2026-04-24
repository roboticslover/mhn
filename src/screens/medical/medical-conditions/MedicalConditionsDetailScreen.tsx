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

export default function MedicalConditionsDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const condition = route?.params?.condition ?? {
    id: '1',
    name: 'High Blood Pressure',
    type: 'Chronic Condition',
    status: 'Active',
    diagnosedDate: '3 years and 1 month ago',
    treatments: [
      { title: 'Vitamin Supplements', subtitle: 'Daily Dosage • morning', icon: 'medical-outline' },
      { title: 'Lifestyle Modification', subtitle: 'Cardio & Reduced Sodium', icon: 'fitness-outline' },
    ],
    notes: 'Patient has been managing blood pressure through lifestyle changes and medication.',
  };

  const statusColors = {
    Active: { bg: isDark ? 'rgba(48,209,88,0.1)' : 'rgba(57,166,87,0.1)', text: isDark ? '#30D158' : c.primary },
    Resolved: { bg: isDark ? 'rgba(53,53,53,0.2)' : 'rgba(0,0,0,0.05)', text: isDark ? '#BCCBB7' : '#707070' },
    Monitoring: { bg: 'rgba(255,146,0,0.1)', text: '#FF9200' },
  };
  const statusCfg = statusColors[condition.status as keyof typeof statusColors] ?? statusColors.Active;

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
              style={[styles.editBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => navigation.navigate('MedicalConditionsAdd', { condition })}
            >
              <Ionicons name="pencil-outline" size={18} color={c.primary} />
            </TouchableOpacity>
          }
        />

        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={[styles.conditionType, { color: c.primary, fontFamily: 'Inter-SemiBold' }]}>
            {(condition.type ?? 'Medical Condition').toUpperCase()}
          </Text>
          <Text style={[styles.heroTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-ExtraBold' }]}>
            {condition.name}
          </Text>
          <View style={[styles.statusPill, { backgroundColor: statusCfg.bg }]}>
            <Text style={[styles.statusText, { color: statusCfg.text }]}>
              {condition.status?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Diagnosed Info Card */}
        <View style={[styles.infoCard, { backgroundColor: isDark ? '#2A2A2A' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
          <View style={[styles.infoIconBox, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
            <Ionicons name="calendar-outline" size={20} color={c.primary} />
          </View>
          <View style={styles.infoTextBox}>
            <Text style={[styles.infoLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
              DIAGNOSED
            </Text>
            <Text style={[styles.infoValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
              {condition.diagnosedDate ?? 'Unknown'}
            </Text>
          </View>
        </View>

        {/* Treatment Timeline */}
        {condition.treatments && condition.treatments.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              TREATMENT TIMELINE
            </Text>
            <View style={styles.treatmentCards}>
              {condition.treatments.map((treatment: any, i: number) => (
                <View
                  key={i}
                  style={[styles.treatmentCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}
                >
                  <View style={[styles.treatmentIconBox, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
                    <Ionicons name={(treatment.icon ?? 'medical-outline') as any} size={18} color={c.primary} />
                  </View>
                  <View style={styles.treatmentText}>
                    <Text style={[styles.treatmentTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-SemiBold' }]}>
                      {treatment.title}
                    </Text>
                    <Text style={[styles.treatmentSubtitle, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                      {treatment.subtitle}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Notes */}
        {condition.notes && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              CLINICAL NOTES
            </Text>
            <View style={[styles.notesCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
              <Text style={[styles.notesText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                {condition.notes}
              </Text>
            </View>
          </View>
        )}

        {/* Update Metrics Button */}
        <TouchableOpacity
          style={[styles.updateBtn, { backgroundColor: isDark ? '#34C759' : c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('MedicalConditionsAdd', { condition })}
        >
          <Text style={[styles.updateBtnText, { fontFamily: 'Inter-Bold' }]}>
            Update Metrics
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
  conditionType: {
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
  statusPill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 2,
  },
  statusText: {
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
  treatmentCards: { gap: 12 },
  treatmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 33,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  treatmentIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  treatmentText: { flex: 1, gap: 2 },
  treatmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  treatmentSubtitle: {
    fontSize: 12,
    lineHeight: 16,
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
