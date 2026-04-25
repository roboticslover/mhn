//this is only for the demo purpose...please don;t use this

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';

type DemoSelectorParams = {
  title: string;
  withDataRoute: string;
  emptyRoute: string;
};

export default function DemoSelectorScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: DemoSelectorParams };
}) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  const { title, withDataRoute, emptyRoute } = route.params;

  const cardBg = isDark ? 'rgba(23,23,23,0.6)' : '#FFFFFF';
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(188,203,183,0.24)';

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>{title}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Label */}
        <Text style={[styles.label, { color: c.textSecondary }]}>
          Choose a demo flow to preview
        </Text>

        {/* With Data card */}
        <TouchableOpacity
          activeOpacity={0.82}
          style={[styles.optionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
          onPress={() => navigation.navigate(withDataRoute)}
        >
          <View style={[styles.iconWrap, { backgroundColor: isDark ? '#1C3220' : 'rgba(56,166,47,0.08)', borderColor: isDark ? '#2D5035' : 'rgba(56,166,47,0.18)' }]}>
            <Ionicons name="layers-outline" size={32} color={isDark ? '#6FFB85' : '#38A62F'} />
          </View>
          <View style={styles.optionText}>
            <Text style={[styles.optionTitle, { color: c.text }]}>With Data</Text>
            <Text style={[styles.optionSub, { color: c.textSecondary }]}>
              View the populated screen with sample records
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,20,20,0.3)'}
          />
        </TouchableOpacity>

        {/* Without Data card */}
        <TouchableOpacity
          activeOpacity={0.82}
          style={[styles.optionCard, { backgroundColor: cardBg, borderColor: cardBorder }]}
          onPress={() => navigation.navigate(emptyRoute)}
        >
          <View style={[styles.iconWrap, { backgroundColor: isDark ? '#1C1C20' : 'rgba(100,100,120,0.06)', borderColor: isDark ? '#2D2D38' : 'rgba(100,100,120,0.15)' }]}>
            <Ionicons name="file-tray-outline" size={32} color={isDark ? 'rgba(255,255,255,0.5)' : '#888888'} />
          </View>
          <View style={styles.optionText}>
            <Text style={[styles.optionTitle, { color: c.text }]}>Without Data</Text>
            <Text style={[styles.optionSub, { color: c.textSecondary }]}>
              View the empty state with no records added
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={isDark ? 'rgba(255,255,255,0.3)' : 'rgba(20,20,20,0.3)'}
          />
        </TouchableOpacity>

        {/* Divider label */}
        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }]} />
          <Text style={[styles.dividerText, { color: c.textSecondary }]}>DEMO MODE</Text>
          <View style={[styles.dividerLine, { backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }]} />
        </View>
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
    paddingBottom: 10,
  },
  backBtn: { width: 24, alignItems: 'center' },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 80,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'Inter',
    textAlign: 'center',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: { flex: 1, gap: 4 },
  optionTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  optionSub: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 18,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Manrope',
    letterSpacing: 1,
  },
});
