import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface SectionHeaderProps {
  title: string;
  rightText?: string;
  rightColor?: string;
  onRightPress?: () => void;
}

export default function SectionHeader({
  title,
  rightText,
  rightColor,
  onRightPress,
}: SectionHeaderProps) {
  const { theme } = useTheme();
  const c = theme.colors;
  const ty = theme.typography;
  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: c.text, fontFamily: 'Inter', ...ty.h3 }]}>{title}</Text>
      {rightText ? (
        <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.right, { color: rightColor ?? c.primary, fontFamily: 'Inter' }]}>{rightText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 14, marginTop: 8 },
  title: {},
  right: { fontSize: 14, fontWeight: '500', lineHeight: 20, letterSpacing: 0.35 },
});
