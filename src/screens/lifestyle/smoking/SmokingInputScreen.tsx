import React, { useState } from 'react';
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
import { useTheme } from '../../../theme/ThemeProvider';
import ScreenHeader from '../../../components/ScreenHeader';

const DAYS = [
  { day: 'Sat', date: 29 },
  { day: 'Sun', date: 30 },
  { day: 'Mon', date: 1 },
  { day: 'Tue', date: 2 },
  { day: 'Wed', date: 3 },
];

export default function SmokingInputScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedDay, setSelectedDay] = useState(2);
  const [cigarettes, setCigarettes] = useState(3);
  const [goalCigarettes, setGoalCigarettes] = useState(5);

  const glassCardBg = isDark ? 'rgba(23,23,23,0.4)' : 'rgba(240,240,240,0.8)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const mutedText = isDark ? '#71717a' : '#a1a1aa';
  const primaryGreen = c.primary;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Smoking" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Date Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateRow}
        >
          {DAYS.map((d, i) => {
            const isActive = i === selectedDay;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedDay(i)}
                style={[
                  styles.dateChip,
                  {
                    backgroundColor: isActive ? primaryGreen : glassCardBg,
                    borderColor: isActive ? primaryGreen : glassBorder,
                    borderWidth: isActive ? 0 : 1,
                  },
                ]}
              >
                <Text style={[styles.dateChipDay, { color: isActive ? '#141414' : mutedText, fontFamily: 'Inter' }]}>
                  {d.day.toUpperCase()}
                </Text>
                <Text style={[styles.dateChipDate, { color: isActive ? '#141414' : mutedText, fontFamily: 'Inter' }]}>
                  {d.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Question */}
        <Text style={[styles.sectionLabel, { color: '#aaa', fontFamily: 'Manrope' }]}>
          How many cigarettes did you smoke?
        </Text>

        {/* Cigarette Illustration */}
        <View style={styles.illustrationArea}>
          <View style={styles.cigaretteIcon}>
            <Ionicons name="flame" size={40} color="#F59E0B" style={{ opacity: 0.6 }} />
            <View style={[styles.cigaretteBody, { backgroundColor: isDark ? '#ddd' : '#ccc' }]}>
              <View style={[styles.cigaretteFilter, { backgroundColor: '#F59E0B' }]} />
            </View>
          </View>
        </View>

        {/* Counter */}
        <View style={[styles.counterBar, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <TouchableOpacity
            style={[styles.counterBtn, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(220,220,220,0.6)', borderColor: glassBorder }]}
            onPress={() => setCigarettes((prev) => Math.max(0, prev - 1))}
          >
            <Ionicons name="remove" size={18} color={c.textSecondary} />
          </TouchableOpacity>
          <View style={styles.counterCenter}>
            <Text style={[styles.counterValue, { color: c.text, fontFamily: 'Inter' }]}>{cigarettes}</Text>
          </View>
          <TouchableOpacity
            style={[styles.counterBtn, { borderColor: primaryGreen, borderWidth: 1, backgroundColor: 'transparent' }]}
            onPress={() => setCigarettes((prev) => prev + 1)}
          >
            <Ionicons name="add" size={18} color={primaryGreen} />
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: primaryGreen }]}
          onPress={() => navigation.navigate('SmokingSummary')}
        >
          <Text style={[styles.continueBtnText, { fontFamily: 'Inter' }]}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#141414" />
        </TouchableOpacity>

        {/* Goal Card */}
        <View style={[styles.goalCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <Ionicons name="chevron-down" size={20} color={c.textSecondary} style={{ alignSelf: 'flex-end' }} />
          <View style={styles.goalRow}>
            <TouchableOpacity
              style={[styles.goalBtn, { borderColor: '#aaa' }]}
              onPress={() => setGoalCigarettes((prev) => Math.max(0, prev - 1))}
            >
              <Ionicons name="remove" size={18} color="#aaa" />
            </TouchableOpacity>
            <View style={styles.goalCenter}>
              <Text style={[styles.goalValue, { color: c.text, fontFamily: 'Inter' }]}>{goalCigarettes}</Text>
            </View>
            <TouchableOpacity
              style={[styles.goalBtn, { borderColor: '#aaa' }]}
              onPress={() => setGoalCigarettes((prev) => prev + 1)}
            >
              <Ionicons name="add" size={18} color="#aaa" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.goalLabel, { color: '#ababab', fontFamily: 'Manrope' }]}>Cups</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  dateRow: { paddingHorizontal: 16, gap: 16, marginBottom: 24, marginTop: 8 },
  dateChip: {
    minWidth: 56,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  dateChipDay: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  dateChipDate: { fontSize: 18, fontWeight: '700', marginTop: 2 },

  sectionLabel: { fontSize: 16, fontWeight: '800', paddingHorizontal: 28, marginBottom: 16, textTransform: 'capitalize' },

  illustrationArea: {
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cigaretteIcon: { alignItems: 'center' },
  cigaretteBody: {
    width: 120,
    height: 12,
    borderRadius: 6,
    marginTop: -8,
    transform: [{ rotate: '-30deg' }],
  },
  cigaretteFilter: {
    width: 25,
    height: '100%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },

  counterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
    paddingVertical: 17,
    paddingHorizontal: 25,
    borderRadius: 999,
    borderWidth: 1,
    gap: 32,
    marginBottom: 24,
  },
  counterBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterCenter: { minWidth: 80, alignItems: 'center' },
  counterValue: { fontSize: 36, fontWeight: '700' },

  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 33,
    gap: 12,
    marginBottom: 24,
  },
  continueBtnText: { fontSize: 18, fontWeight: '700', color: '#141414' },

  goalCard: {
    marginHorizontal: 26,
    borderRadius: 33,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 33,
    alignItems: 'center',
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    marginTop: 8,
  },
  goalBtn: {
    width: 40,
    height: 56,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalCenter: { alignItems: 'center' },
  goalValue: { fontSize: 56, fontWeight: '800', letterSpacing: -3.6 },
  goalLabel: { fontSize: 14, fontWeight: '700', letterSpacing: 2.8, marginTop: 4 },
});
