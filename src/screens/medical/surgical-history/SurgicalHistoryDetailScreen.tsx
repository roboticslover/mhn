import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

// Warning triangle icon
function WarningIcon({ size = 22, color = '#FF4D4D' }) {
  return (
    <Svg width={size} height={23} viewBox="0 0 22 23" fill="none">
      <Path d="M11 2L1 20H21L11 2Z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M11 10V14" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx={11} cy={17} r={1} fill={color} />
    </Svg>
  );
}

// Visibility/shield icon
function ShieldIcon({ size = 18, color = '#E2E2E2' }) {
  return (
    <Svg width={size} height={20} viewBox="0 0 18 20" fill="none">
      <Path d="M9 1L2 4V9.5C2 14 5.2 17.8 9 19C12.8 17.8 16 14 16 9.5V4L9 1Z" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
      <Path d="M6 10L8.5 12.5L12 7.5" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function SurgicalHistoryDetailScreen({ navigation, route }: { navigation: any; route: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;
  const [isVisible, setIsVisible] = useState(true);

  const record = route?.params?.record ?? {
    id: '1',
    title: 'Heart Bypass Surgery',
    startDate: '12 Apr 2026',
    endDate: '-- --- ----',
    status: 'Still going',
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 14, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="chevron-back" size={20} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Surgical History</Text>
          <View style={{ width: 20 }} />
        </View>

        {/* Tags + Edit/Download */}
        <View style={styles.tagsRow}>
          <View style={styles.tagsLeft}>
            <View style={[styles.tagPill, { backgroundColor: isDark ? 'rgba(52,199,89,0.16)' : 'rgba(57,166,87,0.16)' }]}>
              <Text style={[styles.tagText, { color: isDark ? '#34C759' : c.primary }]}>PUBLIC</Text>
            </View>
            <View style={[styles.tagPill, { backgroundColor: isDark ? '#1F1F1F' : '#E8E8E8' }]}>
              <Text style={[styles.tagText, { color: isDark ? '#C5C9AC' : '#707070' }]}>BLOOD REPORT</Text>
            </View>
          </View>
          <View style={styles.tagsRight}>
            <TouchableOpacity onPress={() => navigation.navigate('SurgicalHistoryEdit', { record })}>
              <Ionicons name="create-outline" size={24} color={isDark ? 'rgba(255,255,255,0.74)' : '#707070'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="download-outline" size={24} color={isDark ? '#E2E2E2' : '#333'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title + Date */}
        <View style={styles.heroSection}>
          <View style={styles.heroTitleRow}>
            <Text style={[styles.heroTitle, { color: isDark ? '#E2E2E2' : c.text }]}>
              Heart Bypass{'\n'}Surgery
            </Text>
            <View style={styles.performedBox}>
              <Text style={[styles.performedLabel, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>PERFORMED</Text>
              <Text style={[styles.performedValue, { color: isDark ? '#E2E2E2' : c.text }]}>last: 12 Apr</Text>
            </View>
          </View>

          {/* Active Care badge */}
          <View style={[styles.activeCareBadge, { backgroundColor: isDark ? 'rgba(85,238,113,0.1)' : 'rgba(57,166,87,0.1)' }]}>
            <Text style={[styles.activeCareText, { color: isDark ? '#55EE71' : c.primary }]}>Active Care</Text>
          </View>
        </View>

        {/* Report image placeholder */}
        <View style={[styles.reportCard, {
          backgroundColor: isDark ? '#FFF' : '#FFF',
          shadowColor: isDark ? '#000' : '#000',
        }]}>
          <View style={styles.reportPlaceholder}>
            <Ionicons name="document-text-outline" size={48} color="#CCC" />
            <Text style={styles.reportPlaceholderText}>Medical Report</Text>
          </View>
        </View>

        {/* Visibility toggle */}
        <View style={[styles.visibilityCard, {
          backgroundColor: isDark ? 'rgba(53,53,53,0.4)' : 'rgba(240,240,240,0.8)',
          borderColor: isDark ? 'rgba(68,73,51,0.15)' : 'rgba(0,0,0,0.08)',
        }]}>
          <View style={styles.visibilityLeft}>
            <ShieldIcon color={isDark ? '#E2E2E2' : '#333'} />
            <View style={styles.visibilityTextWrap}>
              <Text style={[styles.visibilityTitle, { color: isDark ? '#E2E2E2' : c.text }]}>VISIBILITY</Text>
              <Text style={[styles.visibilitySubtitle, { color: isDark ? '#C5C9AC' : c.textSecondary }]}>Visible to your family</Text>
            </View>
          </View>
          <Switch
            value={isVisible}
            onValueChange={setIsVisible}
            trackColor={{ false: isDark ? '#2A2A2A' : '#D1D5DB', true: '#34C759' }}
            thumbColor={isVisible ? '#000' : '#FFF'}
            ios_backgroundColor={isDark ? '#2A2A2A' : '#D1D5DB'}
          />
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={[styles.descriptionText, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>
            A coronary artery bypass graft (CABG) was performed to improve blood flow to the heart muscle, bypassing narrowed arteries with a healthy vessel.
          </Text>
        </View>

        {/* Impact on Life */}
        <View style={styles.impactSection}>
          <Text style={[styles.impactLabel, { color: isDark ? '#BCCBB7' : c.textSecondary }]}>
            IMPACT ON LIFE
          </Text>
          <View style={[styles.impactCard, {
            backgroundColor: isDark ? '#0E0E0E' : '#FFF',
            borderLeftColor: '#FF4D4D',
          }]}>
            <WarningIcon />
            <Text style={[styles.impactText, { color: isDark ? '#E2E2E2' : c.text }]}>
              "I cannot exercise more{'\n'}than 20 mins"
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 29,
    marginBottom: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Manrope-Bold',
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 31,
    marginBottom: 16,
  },
  tagsLeft: {
    flexDirection: 'row',
    gap: 8,
  },
  tagsRight: {
    flexDirection: 'row',
    gap: 16,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
  },
  heroSection: {
    paddingHorizontal: 31,
    marginBottom: 24,
  },
  heroTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 40,
    fontFamily: 'Inter-Bold',
    flex: 1,
  },
  performedBox: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  performedLabel: {
    fontSize: 5.7,
    letterSpacing: 0.57,
    textTransform: 'uppercase',
    fontFamily: 'Inter',
  },
  performedValue: {
    fontSize: 9.2,
    fontWeight: '600',
    lineHeight: 14,
    fontFamily: 'Inter-SemiBold',
  },
  activeCareBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  activeCareText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  reportCard: {
    marginHorizontal: 36,
    borderRadius: 24,
    height: 304,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  reportPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  reportPlaceholderText: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'Inter',
  },
  visibilityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    padding: 33,
    borderRadius: 40,
    borderWidth: 1,
    marginBottom: 24,
  },
  visibilityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  visibilityTextWrap: { gap: 2 },
  visibilityTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    fontFamily: 'Manrope-ExtraBold',
  },
  visibilitySubtitle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Manrope',
  },
  descriptionSection: {
    paddingHorizontal: 31,
    marginBottom: 24,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 29.25,
    fontFamily: 'Inter',
  },
  impactSection: {
    paddingHorizontal: 31,
    gap: 16,
    marginBottom: 24,
  },
  impactLabel: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 2.8,
    textTransform: 'uppercase',
    fontFamily: 'Inter-SemiBold',
  },
  impactCard: {
    borderLeftWidth: 4,
    borderTopRightRadius: 33,
    borderBottomRightRadius: 33,
    paddingVertical: 24,
    paddingLeft: 28,
    paddingRight: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  impactText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 25,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
});
