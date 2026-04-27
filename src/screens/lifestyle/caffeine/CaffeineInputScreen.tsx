import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import ScreenHeader from '../../../components/ScreenHeader';

const { width: SCREEN_W } = Dimensions.get('window');

const DAYS = [
  { day: 'Sat', date: 29 },
  { day: 'Sun', date: 30 },
  { day: 'Mon', date: 1 },
  { day: 'Tue', date: 2 },
  { day: 'Wed', date: 3 },
];

const DRINK_TYPES = [
  { key: 'coffee', label: 'Coffee', icon: 'cafe' },
  { key: 'tea', label: 'Tea', icon: 'cafe-outline' },
  { key: 'herbal', label: 'Herbal', icon: 'leaf' },
];

export default function CaffeineInputScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedDrink, setSelectedDrink] = useState('herbal');
  const [cups, setCups] = useState(3);
  const [goalCups, setGoalCups] = useState(5);

  const glassCardBg = isDark ? 'rgba(23,23,23,0.4)' : 'rgba(240,240,240,0.8)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const mutedText = isDark ? '#71717a' : '#a1a1aa';
  const primaryGreen = c.primary;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Caffeine" onBack={() => navigation.goBack()} />
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

        {/* What Did You Drink */}
        <Text style={[styles.sectionLabel, { color: c.text, fontFamily: 'Manrope' }]}>
          What Did You Drink?
        </Text>

        <View style={styles.drinkTypesRow}>
          {DRINK_TYPES.map((dt) => {
            const isSelected = selectedDrink === dt.key;
            return (
              <TouchableOpacity
                key={dt.key}
                onPress={() => setSelectedDrink(dt.key)}
                style={[
                  styles.drinkTypeCard,
                  {
                    backgroundColor: glassCardBg,
                    borderColor: isSelected ? primaryGreen : glassBorder,
                    borderWidth: 1,
                  },
                ]}
              >
                <Ionicons
                  name={dt.icon as any}
                  size={22}
                  color={isSelected ? primaryGreen : mutedText}
                />
                <Text
                  style={[
                    styles.drinkTypeLabel,
                    { color: isSelected ? c.text : mutedText, fontFamily: 'Inter' },
                  ]}
                >
                  {dt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Drink Illustration Area */}
        <View style={styles.illustrationArea}>
          <Ionicons name="cafe" size={80} color={primaryGreen} style={{ opacity: 0.3 }} />
        </View>

        {/* Counter */}
        <View style={[styles.counterBar, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <TouchableOpacity
            style={[styles.counterBtn, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : 'rgba(220,220,220,0.6)', borderColor: glassBorder }]}
            onPress={() => setCups((prev) => Math.max(0, prev - 1))}
          >
            <Ionicons name="remove" size={18} color={c.textSecondary} />
          </TouchableOpacity>
          <View style={styles.counterCenter}>
            <Text style={[styles.counterValue, { color: c.text, fontFamily: 'Inter' }]}>{cups}</Text>
            <Text style={[styles.counterUnit, { color: isDark ? '#bccbb7' : '#888', fontFamily: 'Inter' }]}>CUPS</Text>
          </View>
          <TouchableOpacity
            style={[styles.counterBtn, { borderColor: primaryGreen, borderWidth: 1, backgroundColor: 'transparent' }]}
            onPress={() => setCups((prev) => prev + 1)}
          >
            <Ionicons name="add" size={18} color={primaryGreen} />
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: primaryGreen }]}
          onPress={() => navigation.navigate('CaffeineSummary')}
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
              onPress={() => setGoalCups((prev) => Math.max(0, prev - 1))}
            >
              <Ionicons name="remove" size={18} color="#aaa" />
            </TouchableOpacity>
            <View style={styles.goalCenter}>
              <Text style={[styles.goalValue, { color: c.text, fontFamily: 'Inter' }]}>{goalCups}</Text>
            </View>
            <TouchableOpacity
              style={[styles.goalBtn, { borderColor: '#aaa' }]}
              onPress={() => setGoalCups((prev) => prev + 1)}
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

  // Date selector
  dateRow: { paddingHorizontal: 16, gap: 16, marginBottom: 24, marginTop: 8 },
  dateChip: {
    minWidth: 56,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  dateChipDay: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  dateChipDate: { fontSize: 18, fontWeight: '700', marginTop: 2 },

  // Section label
  sectionLabel: { fontSize: 16, fontWeight: '800', paddingHorizontal: 24, marginBottom: 16 },

  // Drink types
  drinkTypesRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 24 },
  drinkTypeCard: {
    flex: 1,
    paddingVertical: 17,
    borderRadius: 33,
    alignItems: 'center',
    gap: 8,
  },
  drinkTypeLabel: { fontSize: 12, fontWeight: '500' },

  // Illustration
  illustrationArea: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  // Counter
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
  counterUnit: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },

  // Continue
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

  // Goal Card
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
