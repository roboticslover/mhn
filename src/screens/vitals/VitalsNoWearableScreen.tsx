import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import ScreenHeader from '../../components/ScreenHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_SIZE = (SCREEN_WIDTH - 24 * 2 - 16) / 2;

const PLATFORMS = [
  { name: 'Apple Watch', icon: 'watch-outline' },
  { name: 'Fitbit', icon: 'fitness-outline' },
  { name: 'Garmin', icon: 'navigate-outline' },
  { name: 'Samsung', icon: 'phone-portrait-outline' },
];

export default function VitalsNoWearableScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : c.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      <View style={{ paddingTop: insets.top + 8 }}>
        <ScreenHeader title="Vitals" onBack={() => navigation.goBack()} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Alert Banner ── */}
        <View style={[styles.alertBanner, { backgroundColor: isDark ? 'rgba(219,80,52,0.1)' : 'rgba(219,80,52,0.08)' }]}>
          <View style={[styles.alertDot, { backgroundColor: '#DB5034' }]} />
          <Text style={[styles.alertText, { color: isDark ? '#FFFFFF' : c.text, fontFamily: 'Inter' }]}>
            Limited Insights available. Some scores and metrics need wearable or Health app data to calculate accurately.
          </Text>
        </View>

        {/* ── Connect Wearable Hero ── */}
        <View style={[styles.connectHero, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
          {/* Watch Icon */}
          <View style={styles.watchIconContainer}>
            <View style={[styles.watchIconOuter, { borderColor: isDark ? '#6FFB85' : c.primary }]}>
              <Ionicons name="watch-outline" size={42} color={isDark ? '#6FFB85' : c.primary} />
            </View>
          </View>

          <Text style={[styles.connectTitle, { color: isDark ? '#FFFFFF' : c.text, fontFamily: 'Inter' }]}>
            Connect your{'\n'}wearable
          </Text>
          <Text style={[styles.connectSub, { color: isDark ? '#AAAAAA' : c.textSecondary, fontFamily: 'Inter' }]}>
            Unlock real-time heart rate,{'\n'}SpO2, sleep tracking and Sahha{'\n'}health scores by pairing your{'\n'}device.
          </Text>

          {/* Connect Button */}
          <TouchableOpacity style={[styles.connectBtn, { backgroundColor: isDark ? '#6FFB85' : c.primary }]}>
            <Text style={[styles.connectBtnText, { color: isDark ? '#141414' : '#FFFFFF', fontFamily: 'Inter' }]}>
              Connect device
            </Text>
          </TouchableOpacity>

          {/* Compatible Platforms */}
          <Text style={[styles.compatLabel, { color: isDark ? '#767676' : c.textTertiary, fontFamily: 'Inter' }]}>
            COMPATIBLE PLATFORMS
          </Text>
          <View style={styles.platformsGrid}>
            {PLATFORMS.map((p) => (
              <View key={p.name} style={[styles.platformChip, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.chipBackground, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.chipBorder }]}>
                <Ionicons name={p.icon as any} size={14} color={isDark ? '#AAAAAA' : c.textSecondary} />
                <Text style={[styles.platformText, { color: isDark ? '#AAAAAA' : c.textSecondary, fontFamily: 'Inter' }]}>{p.name}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={{ marginTop: 12 }}>
            <Text style={[styles.moreText, { color: isDark ? '#6FFB85' : c.primary, fontFamily: 'Inter' }]}>+ more</Text>
          </TouchableOpacity>
        </View>

        {/* ── Log Data Section ── */}
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : c.text, fontFamily: 'Inter' }]}>Log Data</Text>
        <View style={[styles.gridContainer, { paddingHorizontal: 24 }]}>
          {/* Coffee Card */}
          <View style={[styles.logCard, { width: CARD_SIZE, height: CARD_SIZE, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(255,174,0,0.1)' }]}>
              <Text style={{ fontSize: 15 }}>☕</Text>
            </View>
            <Text style={[styles.logLabel, { color: '#ABABAB', fontFamily: 'Inter' }]}>Coffee</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
              <Text style={[styles.logValue, { color: '#FFFFFF', fontFamily: 'Inter' }]}>4 </Text>
              <Text style={{ color: '#878686', fontSize: 12, fontFamily: 'Inter' }}>cups</Text>
            </View>
          </View>

          {/* Water Card */}
          <View style={[styles.logCard, { width: CARD_SIZE, height: CARD_SIZE, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <View style={[styles.logIconWrap, { backgroundColor: 'rgba(64,169,255,0.1)' }]}>
                <Text style={{ fontSize: 14, color: '#40A9FF' }}>💧</Text>
              </View>
              <Text style={{ color: '#AAAAAA', fontSize: 16, fontWeight: '600', fontFamily: 'Inter' }}>50%</Text>
            </View>
            <Text style={{ color: '#FFFFFF', fontSize: 30, fontWeight: '800', fontFamily: 'Inter', marginTop: 16 }}>1250</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 8, fontFamily: 'Inter', marginTop: 2 }}>of 2500 ml goal</Text>
          </View>

          {/* Medication Card */}
          <View style={[styles.logCard, { width: CARD_SIZE, height: CARD_SIZE, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(12,163,120,0.1)' }]}>
              <Text style={{ fontSize: 15 }}>💊</Text>
            </View>
            <Text style={{ color: '#ABABAB', fontSize: 12, fontFamily: 'Inter', marginTop: 4 }}>Upcoming</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'Inter', marginTop: 2 }}>Vitamin D3</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 2 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700', fontFamily: 'Inter' }}>9:30</Text>
              <Text style={{ color: '#ABABAB', fontSize: 12, fontFamily: 'Inter', marginLeft: 4 }}>PM</Text>
            </View>
          </View>

          {/* Weight Card */}
          <View style={[styles.logCard, { width: CARD_SIZE, height: CARD_SIZE, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
            <View style={[styles.logIconWrap, { backgroundColor: 'rgba(85,238,113,0.19)' }]}>
              <Text style={{ fontSize: 15 }}>⚖️</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 8 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '700', fontFamily: 'Inter', letterSpacing: -0.6 }}>124</Text>
              <Text style={{ color: '#6FFB85', fontSize: 16, fontWeight: '500', fontFamily: 'Inter', marginLeft: 4 }}>kg</Text>
            </View>
          </View>
        </View>

        {/* ── Vitals Connect Banner ── */}
        <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : c.text, fontFamily: 'Inter', marginTop: 24 }]}>Vitals</Text>
        <View style={[styles.connectBanner, { backgroundColor: isDark ? 'rgba(23,23,23,0.4)' : c.card, borderColor: isDark ? 'rgba(255,255,255,0.08)' : c.cardBorder }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={[styles.smallWatchIcon, { borderColor: isDark ? '#6FFB85' : c.primary }]}>
              <Ionicons name="watch-outline" size={20} color={isDark ? '#6FFB85' : c.primary} />
            </View>
            <Text style={{ color: isDark ? '#AAAAAA' : c.textSecondary, fontSize: 12, fontFamily: 'Inter', flex: 1, marginLeft: 12 }}>
              Connect a wearable{'\n'}to see insights
            </Text>
          </View>
          <TouchableOpacity style={[styles.smallConnectBtn, { backgroundColor: isDark ? '#6FFB85' : c.primary }]}>
            <Text style={{ color: isDark ? '#141414' : '#FFFFFF', fontSize: 12, fontWeight: '700', fontFamily: 'Inter' }}>Connect</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'capitalize',
    paddingHorizontal: 25,
    marginTop: 16,
    marginBottom: 16,
  },

  /* Alert */
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
    marginRight: 12,
  },
  alertText: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    flex: 1,
  },

  /* Connect Hero */
  connectHero: {
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
  },
  watchIconContainer: {
    marginBottom: 24,
  },
  watchIconOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
  },
  connectSub: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  connectBtn: {
    borderRadius: 33,
    paddingHorizontal: 36,
    paddingVertical: 14,
    marginBottom: 24,
  },
  connectBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  compatLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  platformText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreText: {
    fontSize: 14,
    fontWeight: '600',
  },

  /* Grid */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  logCard: {
    borderRadius: 33,
    borderWidth: 1,
    padding: 19,
  },
  logIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  logValue: {
    fontSize: 24,
    fontWeight: '700',
  },

  /* Connect Banner */
  connectBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    borderRadius: 33,
    borderWidth: 1,
    padding: 16,
  },
  smallWatchIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallConnectBtn: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
