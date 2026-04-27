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
          <Ionicons name="chevron-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Medical Conditions</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.illustrationContainer}>
        <View style={[styles.atmosphericGlow, { backgroundColor: c.accentSoft }]} />
        <View style={[styles.mainGlassCard, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
          <View style={[styles.centerIconWrap, { backgroundColor: c.successSoft, borderColor: c.primary + '60' }]}>
            <Ionicons name="heart-outline" size={38} color={c.primary} />
          </View>
          <View style={[styles.floatingCardTR, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
            <Ionicons name="pulse-outline" size={16} color={c.textSecondary} />
          </View>
          <View style={[styles.floatingCardBL, { backgroundColor: c.card, borderColor: c.cardBorder }]}>
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
          <Ionicons name="add-circle-outline" size={22} color={isDark ? '#003910' : '#FFFFFF'} />
          <Text style={[styles.addButtonText, { color: isDark ? '#003910' : '#FFFFFF' }]}>Add Condition</Text>
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
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backBtn: { 
    width: 40, 
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: { 
    fontSize: 24, 
    fontFamily: 'Inter-Bold',
    letterSpacing: -0.5,
  },
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
    borderRadius: 12,
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
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '8deg' }],
  },
  bottomContent: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    alignItems: 'center',
    gap: 32,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    lineHeight: 26,
  },
  addButton: {
    width: '100%',
    height: 60,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: 'rgba(57,166,87,0.3)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 6,
  },
  addButtonText: { 
    fontSize: 18, 
    fontFamily: 'Inter-Bold',
    letterSpacing: 0.5,
  },
});
