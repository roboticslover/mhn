import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface Props {
  style?: ViewStyle;
  variant?: 'onboarding' | 'app';
  size?: number;
}

/**
 * Universal theme toggle — works on any screen, any theme context.
 * - `onboarding` variant: subtle glass pill for dark image backgrounds.
 * - `app` variant: solid themed pill for in-app usage.
 */
export default function ThemeToggle({ style, variant = 'app', size = 36 }: Props) {
  const { isDark, toggleTheme, theme } = useTheme();
  const onboardingBg = 'rgba(255,255,255,0.12)';
  const onboardingBorder = 'rgba(255,255,255,0.18)';
  const appBg = theme.colors.inputBackground;
  const appBorder = theme.colors.inputBorder;

  const bg = variant === 'onboarding' ? onboardingBg : appBg;
  const border = variant === 'onboarding' ? onboardingBorder : appBorder;
  const iconColor =
    variant === 'onboarding'
      ? '#FFFFFF'
      : isDark
      ? '#FBBF24'
      : '#6366F1';

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.75}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bg,
          borderColor: border,
        },
        style,
      ]}
    >
      <Text style={{ fontSize: size * 0.5 }}>{isDark ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
