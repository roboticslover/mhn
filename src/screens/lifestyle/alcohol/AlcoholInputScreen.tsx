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

export default function AlcoholInputScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const [selectedDay, setSelectedDay] = useState(2);
  const [didDrink, setDidDrink] = useState(true);
  const [drinks, setDrinks] = useState(1);

  const glassCardBg = isDark ? 'rgba(23,23,23,0.4)' : 'rgba(240,240,240,0.8)';
  const glassBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const mutedText = isDark ? '#71717a' : '#a1a1aa';
  const primaryGreen = c.primary;
  const activeGreen = isDark ? '#38a62f' : '#39A657';

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Alcohol" onBack={() => navigation.goBack()} />
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

        {/* Did You Consume Alcohol? */}
        <Text style={[styles.sectionLabel, { color: c.text, fontFamily: 'Manrope' }]}>
          Did You Consume Alcohol?
        </Text>

        <View style={styles.yesNoRow}>
          <TouchableOpacity
            onPress={() => setDidDrink(true)}
            style={[
              styles.yesNoCard,
              {
                backgroundColor: didDrink ? (isDark ? 'rgba(56,166,47,0.2)' : 'rgba(57,166,87,0.15)') : glassCardBg,
                borderColor: didDrink ? activeGreen : glassBorder,
                borderWidth: 1,
              },
            ]}
          >
            <Ionicons name="beer" size={24} color={didDrink ? primaryGreen : mutedText} />
            <Text style={[styles.yesNoText, { color: didDrink ? c.text : mutedText, fontFamily: 'Inter' }]}>
              Yes, I did
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDidDrink(false)}
            style={[
              styles.yesNoCard,
              {
                backgroundColor: !didDrink ? (isDark ? 'rgba(56,166,47,0.2)' : 'rgba(57,166,87,0.15)') : glassCardBg,
                borderColor: !didDrink ? activeGreen : glassBorder,
                borderWidth: 1,
              },
            ]}
          >
            <Ionicons name="beer-outline" size={24} color={!didDrink ? primaryGreen : mutedText} />
            <Text style={[styles.yesNoText, { color: !didDrink ? c.text : mutedText, fontFamily: 'Inter' }]}>
              No, I did not drink
            </Text>
          </TouchableOpacity>
        </View>

        {didDrink && (
          <>
            {/* How Much Did You Drink */}
            <Text style={[styles.sectionLabel, { color: c.text, fontFamily: 'Manrope' }]}>
              How Much Did You Drink?
            </Text>

            {/* Central Glass Card */}
            <View style={[styles.centralCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
              <Text style={[styles.centralTitle, { color: c.text, fontFamily: 'Manrope' }]}>
                Alcohol Consumption
              </Text>

              {/* Date Row */}
              <View style={[styles.inputRow, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
                <Text style={[styles.inputLabel, { color: '#ababab', fontFamily: 'Inter' }]}>Date</Text>
                <View style={styles.inputRight}>
                  <Text style={[styles.inputValue, { color: c.text, fontFamily: 'Inter' }]}>Apr 15, 2026</Text>
                  <Ionicons name="chevron-forward" size={12} color={c.textSecondary} />
                </View>
              </View>

              {/* Time Row */}
              <View style={[styles.inputRow, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
                <Text style={[styles.inputLabel, { color: '#ababab', fontFamily: 'Inter' }]}>Time</Text>
                <View style={styles.inputRight}>
                  <Text style={[styles.inputValue, { color: c.text, fontFamily: 'Inter' }]}>11:47</Text>
                  <Ionicons name="chevron-forward" size={12} color={c.textSecondary} />
                </View>
              </View>

              {/* Drinks Row */}
              <View style={[styles.inputRow, {
                backgroundColor: isDark ? 'rgba(38,38,38,0.6)' : 'rgba(230,230,230,0.8)',
                borderColor: activeGreen,
                borderWidth: 1,
                height: 58,
              }]}>
                <Text style={[styles.inputLabel, { color: isDark ? '#e5e5e5' : '#333', fontFamily: 'Inter', fontWeight: '600' }]}>Drinks</Text>
                <View style={styles.inputRight}>
                  <Text style={[styles.drinksValue, { color: activeGreen, fontFamily: 'Manrope' }]}>{drinks}</Text>
                  <View style={[styles.cursor, { borderColor: activeGreen }]} />
                </View>
              </View>
            </View>
          </>
        )}

        {/* About Section */}
        <Text style={[styles.sectionLabel, { color: c.text, fontFamily: 'Manrope' }]}>
          About Alcohol Consumption
        </Text>

        <View style={[styles.aboutCard, { backgroundColor: glassCardBg, borderColor: glassBorder }]}>
          <Text style={[styles.aboutText, { color: '#ababab', fontFamily: 'Inter' }]}>
            Logging your alcohol intake helps identify patterns that may affect your sleep, energy levels, and long-term health. While moderate consumption is common, tracking assists in staying within recommended guidelines and understanding its metabolic impact.
          </Text>

          <View style={[styles.insightPill, { backgroundColor: 'rgba(0,110,28,0.1)', borderColor: 'rgba(96,254,108,0.2)' }]}>
            <Ionicons name="leaf" size={16} color="#60fe6c" />
            <Text style={[styles.insightPillText, { color: '#60fe6c', fontFamily: 'Inter' }]}>
              Health insights based on weekly trends
            </Text>
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: primaryGreen }]}
          onPress={() => navigation.navigate('AlcoholSummary')}
        >
          <Text style={[styles.continueBtnText, { fontFamily: 'Inter' }]}>Continue</Text>
          <Ionicons name="arrow-forward" size={18} color="#141414" />
        </TouchableOpacity>
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
  dateChipDay: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  dateChipDate: { fontSize: 18, fontWeight: '700', marginTop: 2 },

  sectionLabel: { fontSize: 16, fontWeight: '800', paddingHorizontal: 24, marginBottom: 16 },

  // Yes/No
  yesNoRow: { flexDirection: 'row', paddingHorizontal: 24, gap: 12, marginBottom: 24 },
  yesNoCard: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: 'center',
    gap: 10,
  },
  yesNoText: { fontSize: 13, fontWeight: '600', textAlign: 'center' },

  // Central card
  centralCard: {
    marginHorizontal: 18,
    borderRadius: 33,
    borderWidth: 1,
    padding: 40,
    marginBottom: 24,
    gap: 8,
  },
  centralTitle: { fontSize: 24, fontWeight: '800', letterSpacing: -0.6, marginBottom: 24, textAlign: 'center' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    paddingHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
  },
  inputLabel: { fontSize: 16, fontWeight: '500' },
  inputRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  inputValue: { fontSize: 16, fontWeight: '600' },
  drinksValue: { fontSize: 24, fontWeight: '700' },
  cursor: { width: 2, height: 24, borderRightWidth: 2 },

  // About
  aboutCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    marginBottom: 24,
    gap: 16,
  },
  aboutText: { fontSize: 14, fontWeight: '400', lineHeight: 23 },
  insightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    borderRadius: 16,
    borderWidth: 1,
  },
  insightPillText: { fontSize: 12, fontWeight: '600' },

  // Continue
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 33,
    gap: 12,
  },
  continueBtnText: { fontSize: 18, fontWeight: '700', color: '#141414' },
});
