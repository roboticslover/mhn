import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function MedicalConditionsEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      <View style={[styles.header, { paddingTop: insets.top + 28 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Medical Conditions</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.illustrationContainer}>
        <View style={[styles.atmosphericGlow, { backgroundColor: c.accentSoft }]} />
        <View style={[styles.mainGlassCard, { backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : c.card, borderColor: c.cardGlassBorder }]}>
          <View style={[styles.centerIconWrap, { backgroundColor: isDark ? 'rgba(52,199,89,0.26)' : c.accentSoft, borderColor: c.primary + '60' }]}>
            <Ionicons name="heart-outline" size={38} color={c.primary} />
          </View>
          <View style={[styles.floatingCardTR, { backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : c.card, borderColor: c.cardGlassBorder }]}>
            <Ionicons name="pulse-outline" size={16} color={c.textSecondary} />
          </View>
          <View style={[styles.floatingCardBL, { backgroundColor: isDark ? 'rgba(31,31,31,0.4)' : c.card, borderColor: c.cardGlassBorder }]}>
            <Ionicons name="fitness-outline" size={14} color={c.textSecondary} />
          </View>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <Text style={[styles.emptySubtitle, { color: c.textSecondary }]}>
          Record your diagnosed conditions to enable better care and informed decisions
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: c.primary }]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('MedicalConditionsList')}
        >
          <Ionicons name="add-circle-outline" size={20} color={c.textOnPrimary} />
          <Text style={[styles.addButtonText, { color: c.textOnPrimary }]}>Add Condition</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 29,
    paddingBottom: 16,
  },
  backBtn: { width: 22, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600', fontFamily: 'Inter' },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  atmosphericGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.15,
    left: -20,
    bottom: '10%',
  },
  mainGlassCard: {
    width: 222,
    height: 222,
    borderRadius: 31,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '2deg' }],
  },
  centerIconWrap: {
    width: 123,
    height: 123,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCardTR: {
    position: 'absolute',
    top: -19,
    right: -22,
    width: 74,
    height: 99,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-10deg' }],
  },
  floatingCardBL: {
    position: 'absolute',
    bottom: -23,
    left: -21,
    width: 99,
    height: 62,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '8deg' }],
  },
  bottomContent: {
    paddingHorizontal: 25,
    paddingBottom: 48,
    alignItems: 'center',
    gap: 32,
  },
  emptySubtitle: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 28,
  },
  addButton: {
    width: '100%',
    height: 58,
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: 'rgba(0,110,40,0.3)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  addButtonText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter' },
});
