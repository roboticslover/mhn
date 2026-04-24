import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function VaccinesEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 28 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>vaccines</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Central Glassmorphic Card */}
      <View style={[styles.centralCard, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]}>
        {/* Top lens glow line */}
        <View style={[styles.lensGlow, { backgroundColor: c.primary }]} />

        {/* Illustration Area */}
        <View style={styles.illustrationArea}>
          {/* Main large glass circle */}
          <View style={[styles.mainCircle, { backgroundColor: 'rgba(31,31,31,0.4)', borderColor: c.cardGlassBorder }]}>
            {/* Floating top-right card */}
            <View style={[styles.floatingCardTopRight, { backgroundColor: 'rgba(31,31,31,0.4)', borderColor: 'rgba(255,255,255,0.2)' }]}>
              <Ionicons name="document-outline" size={18} color={c.textSecondary} />
            </View>
            {/* Floating bottom-left card */}
            <View style={[styles.floatingCardBottomLeft, { backgroundColor: 'rgba(31,31,31,0.4)', borderColor: 'rgba(255,255,255,0.2)' }]}>
              <Ionicons name="search-outline" size={16} color={c.textSecondary} />
            </View>
            {/* Central holographic element */}
            <View style={[styles.centralHolo, { backgroundColor: c.accentSoft, borderColor: c.primary + '60' }]}>
              <Ionicons name="cloud-upload-outline" size={36} color={c.primary} />
            </View>
          </View>
        </View>

        {/* Text Stack */}
        <View style={styles.textStack}>
          <Text style={[styles.emptyTitle, { color: c.text }]}>
            {'No\nvaccinations\nFound'}
          </Text>
          <Text style={[styles.emptySubtitle, { color: c.textSecondary }]}>
            Stay Protected and healthy, track your vaccinations with ease
          </Text>
        </View>

        {/* Add Reports Button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('VaccineAdd')}
        >
          <Ionicons name="add-circle-outline" size={18} color={c.textOnPrimary} />
          <Text style={[styles.addButtonText, { color: c.textOnPrimary }]}>Add Reports</Text>
        </TouchableOpacity>

        {/* Bottom refraction line */}
        <View style={[styles.bottomRefractionLine, { backgroundColor: c.cardGlassBorder }]} />
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
  centralCard: {
    marginHorizontal: 20,
    borderRadius: 33,
    borderWidth: 1,
    alignItems: 'center',
    paddingBottom: 49,
    paddingHorizontal: 49,
    paddingTop: 1,
    overflow: 'hidden',
    position: 'relative',
    gap: 30,
  },
  lensGlow: {
    position: 'absolute',
    top: 0,
    width: 128,
    height: 1,
    opacity: 0.45,
    borderRadius: 1,
  },
  illustrationArea: {
    width: 233,
    height: 233,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  mainCircle: {
    width: 222,
    height: 222,
    borderRadius: 31,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '3deg' }],
  },
  floatingCardTopRight: {
    position: 'absolute',
    top: -19,
    right: -22,
    width: 74,
    height: 99,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-12deg' }],
  },
  floatingCardBottomLeft: {
    position: 'absolute',
    bottom: -23,
    left: -21,
    width: 99,
    height: 62,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '6deg' }],
  },
  centralHolo: {
    width: 123,
    height: 123,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStack: { alignItems: 'center', gap: 23, width: '100%' },
  emptyTitle: {
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 40,
    letterSpacing: -0.68,
  },
  emptySubtitle: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  addButton: {
    height: 58,
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    gap: 12,
  },
  addButtonText: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter' },
  bottomRefractionLine: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 1,
    opacity: 0.05,
  },
});
