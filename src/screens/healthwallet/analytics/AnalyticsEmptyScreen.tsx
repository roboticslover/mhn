import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';

export default function AnalyticsEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text, fontFamily: 'Inter' }]}>Analytics and Insights</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Illustration */}
      <View style={styles.illustrationArea}>
        <View style={styles.mandalaOuter}>
          {[...Array(12)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.mandalaRing,
                {
                  borderColor: c.primary + '4D',
                  transform: [{ rotate: `${i * 30}deg` }],
                },
              ]}
            >
              <View style={[styles.mandalaInner, { borderColor: c.primary + '26' }]} />
            </View>
          ))}
        </View>
      </View>

      <Text style={[styles.mainTitle, { color: c.text, fontFamily: 'Inter' }]}>Unlock Clinical{'\n'}Intelligence</Text>
      <Text style={[styles.mainSubtitle, { color: c.textSecondary, fontFamily: 'Inter' }]}>
        Your personalized bio-analytics{'\n'}are waiting. Upload your medical{'\n'}records to sync your data and{'\n'}reveal deep-tissue insights.
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: c.primary }]} activeOpacity={0.7} onPress={() => navigation.navigate('AnalyticsList')}>
          <Text style={[styles.uploadBtnText, { color: c.textOnPrimary, fontFamily: 'Inter' }]}>UPLOAD RECORDS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.learnBtn, { backgroundColor: c.card, borderColor: c.cardGlassBorder }]} activeOpacity={0.7}>
          <Text style={[styles.learnBtnText, { color: c.textSecondary, fontFamily: 'Inter' }]}>LEARN ABOUT OUR{'\n'}ENCRYPTION</Text>
          <Ionicons name="arrow-forward" size={12} color={c.textSecondary} />
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
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '600' },
  illustrationArea: { height: 250, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  mandalaOuter: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center' },
  mandalaRing: { position: 'absolute', width: 120, height: 120, borderRadius: 60, borderWidth: 1 },
  mandalaInner: { width: 60, height: 60, borderRadius: 30, borderWidth: 1, alignSelf: 'center', marginTop: 30 },
  mainTitle: { fontSize: 34, fontWeight: '700', textAlign: 'center', letterSpacing: -0.68, marginBottom: 20 },
  mainSubtitle: { fontSize: 16, fontWeight: '500', textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  actions: { paddingHorizontal: 73, gap: 24 },
  uploadBtn: { height: 48, borderRadius: 33, alignItems: 'center', justifyContent: 'center' },
  uploadBtnText: { fontSize: 14, fontWeight: '800', textTransform: 'uppercase' },
  learnBtn: { height: 48, borderRadius: 33, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16, paddingHorizontal: 24 },
  learnBtnText: { fontSize: 10, fontWeight: '800', textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase' },
});
