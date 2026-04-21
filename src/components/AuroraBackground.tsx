import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const { width: W, height: H } = Dimensions.get('window');

/**
 * Aurora-style green radial glow used behind onboarding content
 * (e.g. AllSetScreen). Produces a cream/white hotspot that bleeds into
 * a saturated green halo, then fades to pure black — matching the
 * reference design exactly.
 */
export default function AuroraBackground() {
  return (
    <View style={styles.wrap} pointerEvents="none">
      {/* Base black */}
      <View style={styles.black} />

      {/* Primary green aurora halo */}
      <Svg height={H} width={W} style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient
            id="auroraCore"
            cx="55%"
            cy="28%"
            rx="55%"
            ry="38%"
            fx="55%"
            fy="28%"
          >
            <Stop offset="0%" stopColor="#E8F8E8" stopOpacity={0.95} />
            <Stop offset="18%" stopColor="#B5F0B0" stopOpacity={0.85} />
            <Stop offset="42%" stopColor="#4CAF50" stopOpacity={0.7} />
            <Stop offset="75%" stopColor="#1B5E20" stopOpacity={0.25} />
            <Stop offset="100%" stopColor="#000000" stopOpacity={0} />
          </RadialGradient>

          <RadialGradient
            id="auroraSoft"
            cx="35%"
            cy="18%"
            rx="70%"
            ry="45%"
            fx="35%"
            fy="18%"
          >
            <Stop offset="0%" stopColor="#6FFB85" stopOpacity={0.35} />
            <Stop offset="60%" stopColor="#0A3D1A" stopOpacity={0.15} />
            <Stop offset="100%" stopColor="#000000" stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <Rect width={W} height={H} fill="url(#auroraSoft)" />
        <Rect width={W} height={H} fill="url(#auroraCore)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
  },
  black: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
});
