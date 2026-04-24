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

export default function SurgicalHistoryDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const record = route?.params?.record ?? {
    id: '1',
    title: 'Appendectomy',
    date: 'March 14, 2021',
    hospital: 'City General Hospital',
    surgeon: 'Dr. Sarah Johnson',
    status: 'Recovered',
    duration: '2 hours 15 minutes',
    anesthesia: 'General Anesthesia',
    complications: 'None',
    notes: 'Laparoscopic appendectomy performed successfully. Patient recovered well post-surgery with no complications.',
    recoveryTime: '3 weeks',
  };

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
          title="Surgical Record"
          onBack={() => navigation.goBack()}
          rightElement={
            <TouchableOpacity
              style={[styles.editBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => navigation.navigate('SurgicalHistoryEdit', { record })}
            >
              <Ionicons name="pencil-outline" size={18} color={c.primary} />
            </TouchableOpacity>
          }
        />

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.conditionType, { color: c.primary, fontFamily: 'Inter-SemiBold' }]}>
            SURGICAL PROCEDURE
          </Text>
          <Text style={[styles.heroTitle, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-ExtraBold' }]}>
            {record.title}
          </Text>
          <View style={[styles.statusPill, { backgroundColor: isDark ? 'rgba(48,209,88,0.1)' : 'rgba(57,166,87,0.1)' }]}>
            <Text style={[styles.statusText, { color: isDark ? '#30D158' : c.primary }]}>
              {record.status?.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Info Card */}
        <View style={[styles.infoCard, { backgroundColor: isDark ? '#2A2A2A' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
          <View style={[styles.infoIconBox, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
            <Ionicons name="calendar-outline" size={20} color={c.primary} />
          </View>
          <View style={styles.infoTextBox}>
            <Text style={[styles.infoLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
              DATE OF SURGERY
            </Text>
            <Text style={[styles.infoValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
              {record.date}
            </Text>
          </View>
        </View>

        {/* Section - Treatment Details */}
        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
            PROCEDURE DETAILS
          </Text>
          <View style={styles.detailCards}>
            {[
              { icon: 'business-outline', label: 'Hospital', value: record.hospital },
              { icon: 'person-outline', label: 'Surgeon', value: record.surgeon },
              { icon: 'time-outline', label: 'Duration', value: record.duration ?? '2 hrs 15 min' },
              { icon: 'medical-outline', label: 'Anesthesia', value: record.anesthesia ?? 'General' },
              { icon: 'refresh-outline', label: 'Recovery Time', value: record.recoveryTime ?? '3 weeks' },
              { icon: 'checkmark-circle-outline', label: 'Complications', value: record.complications ?? 'None' },
            ].map((item, i) => (
              <View
                key={i}
                style={[styles.detailCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}
              >
                <View style={[styles.detailIconBox, { backgroundColor: isDark ? '#353535' : '#E8E8E8' }]}>
                  <Ionicons name={item.icon as any} size={18} color={c.primary} />
                </View>
                <View style={styles.detailText}>
                  <Text style={[styles.detailLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.detailValue, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-SemiBold' }]}>
                    {item.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Notes Section */}
        {record.notes && (
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Bold' }]}>
              CLINICAL NOTES
            </Text>
            <View style={[styles.notesCard, { backgroundColor: isDark ? '#1F1F1F' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder }]}>
              <Text style={[styles.notesText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                {record.notes}
              </Text>
            </View>
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.updateBtn, { backgroundColor: isDark ? '#34C759' : c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SurgicalHistoryEdit', { record })}
        >
          <Text style={[styles.updateBtnText, { fontFamily: 'Inter-Bold' }]}>
            Edit Record
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
    gap: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  detailCards: { gap: 12 },
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
  detailText: { flex: 1, gap: 2 },
  detailLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
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
