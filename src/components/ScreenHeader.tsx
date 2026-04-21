import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export default function ScreenHeader({ title, onBack, rightElement }: ScreenHeaderProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const ty = theme.typography;
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={onBack}
        style={[styles.backBtn, { backgroundColor: c.cardGlassBorder }]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="chevron-back" size={24} color={c.text} />
      </TouchableOpacity>
      <Text style={[styles.title, { color: c.text, fontFamily: 'Inter', ...ty.h3 }]}>{title}</Text>
      <View style={styles.right}>{rightElement ?? null}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  title: {},
  right: { width: 40, alignItems: 'flex-end' },
});
