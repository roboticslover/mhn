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

interface SurgicalRecord {
  id: string;
  title: string;
  date: string;
  hospital: string;
  surgeon: string;
  status: 'Recovered' | 'Ongoing' | 'Scheduled';
}

const SAMPLE_RECORDS: SurgicalRecord[] = [
  {
    id: '1',
    title: 'Appendectomy',
    date: 'March 14, 2021',
    hospital: 'City General Hospital',
    surgeon: 'Dr. Sarah Johnson',
    status: 'Recovered',
  },
  {
    id: '2',
    title: 'Knee Arthroscopy',
    date: 'July 22, 2022',
    hospital: 'St. Mary\'s Medical Center',
    surgeon: 'Dr. Michael Chen',
    status: 'Recovered',
  },
  {
    id: '3',
    title: 'Gallbladder Removal',
    date: 'November 5, 2023',
    hospital: 'Metro Health Clinic',
    surgeon: 'Dr. Priya Sharma',
    status: 'Ongoing',
  },
];

function StatusBadge({ status, isDark }: { status: SurgicalRecord['status']; isDark: boolean }) {
  const configs = {
    Recovered: {
      bg: isDark ? 'rgba(85,238,113,0.1)' : 'rgba(57,166,87,0.1)',
      border: isDark ? 'rgba(85,238,113,0.2)' : 'rgba(57,166,87,0.25)',
      text: isDark ? '#55EE71' : '#39A657',
    },
    Ongoing: {
      bg: isDark ? 'rgba(255,146,0,0.1)' : 'rgba(255,146,0,0.1)',
      border: isDark ? 'rgba(255,146,0,0.2)' : 'rgba(255,146,0,0.2)',
      text: '#FF9200',
    },
    Scheduled: {
      bg: isDark ? 'rgba(96,165,250,0.1)' : 'rgba(59,130,246,0.1)',
      border: isDark ? 'rgba(96,165,250,0.2)' : 'rgba(59,130,246,0.2)',
      text: isDark ? '#60A5FA' : '#3B82F6',
    },
  };
  const cfg = configs[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg, borderColor: cfg.border }]}>
      <Text style={[styles.badgeText, { color: cfg.text }]}>{status.toUpperCase()}</Text>
    </View>
  );
}

export default function SurgicalHistoryListScreen({ navigation }: { navigation: any }) {
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
          title="Surgical Record"
          onBack={() => navigation.goBack()}
          rightElement={
            <TouchableOpacity
              style={[styles.addIconBtn, { backgroundColor: isDark ? 'rgba(111,251,133,0.1)' : 'rgba(57,166,87,0.1)' }]}
              onPress={() => navigation.navigate('SurgicalHistoryAdd')}
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
            Surgical History
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
            A complete log of your past surgical procedures and recovery milestones.
          </Text>
        </View>

        {/* Section label */}
        <View style={styles.sectionRow}>
          <Text style={[styles.sectionLabel, { color: isDark ? 'rgba(188,203,183,0.5)' : c.textTertiary, fontFamily: 'Inter-Black' }]}>
            PROCEDURE RECORDS
          </Text>
        </View>

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {SAMPLE_RECORDS.map((record) => (
            <TouchableOpacity
              key={record.id}
              style={[
                styles.card,
                {
                  backgroundColor: isDark ? '#1F1F1F' : c.card,
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : c.cardBorder,
                },
              ]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate('SurgicalHistoryDetail', { record })}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: c.text, fontFamily: 'Inter-Bold' }]}>
                  {record.title}
                </Text>
                <StatusBadge status={record.status} isDark={isDark} />
              </View>

              <View style={styles.cardMeta}>
                <View style={styles.metaRow}>
                  <Ionicons name="calendar-outline" size={12} color={isDark ? '#BCCBB7' : c.textSecondary} />
                  <Text style={[styles.metaText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                    {record.date}
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="business-outline" size={12} color={isDark ? '#BCCBB7' : c.textSecondary} />
                  <Text style={[styles.metaText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                    {record.hospital}
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="person-outline" size={12} color={isDark ? '#BCCBB7' : c.textSecondary} />
                  <Text style={[styles.metaText, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter' }]}>
                    {record.surgeon}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add new record button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SurgicalHistoryAdd')}
        >
          <Ionicons name="add" size={20} color="#000" />
          <Text style={[styles.addBtnText, { fontFamily: 'Manrope-ExtraBold' }]}>
            ADD RECORD
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
    padding: 24,
    gap: 12,
  },
  cardHeader: {
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
  cardMeta: {
    gap: 6,
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
