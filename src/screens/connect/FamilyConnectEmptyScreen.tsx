import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle } from 'react-native-svg';
import ScreenHeader from '../../components/ScreenHeader';

export default function FamilyConnectEmptyScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <View style={{ paddingTop: insets.top + 4 }}>
        <ScreenHeader
          title="Family Connect"
          onBack={() => navigation.goBack()}
        />
      </View>

      <View style={styles.content}>
        {/* Network illustration placeholder */}
        <View style={styles.illustrationArea}>
          <View style={[styles.networkCircle, { backgroundColor: isDark ? '#1F1F1F' : '#E8E8E8' }]}>
            <Ionicons name="people" size={48} color={c.primary} />
          </View>
          {/* Floating avatar dots */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 100;
            const y = Math.sin(rad) * 100;
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: isDark ? '#2A2A2A' : '#D0D0D0',
                    borderColor: isDark ? '#353535' : '#BBBBBB',
                    left: 130 + x,
                    top: 130 + y,
                  },
                ]}
              >
                <Ionicons name="person" size={12} color={c.textSecondary} />
              </View>
            );
          })}
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: isDark ? '#E2E2E2' : c.text, fontFamily: 'Inter-Bold' }]}>
          No Members Added
        </Text>

        {/* Description */}
        <Text style={[styles.description, { color: isDark ? '#BCCBB7' : c.textSecondary, fontFamily: 'Inter-Medium' }]}>
          Enter a phone number to send a connection request and start monitoring well-being together.
        </Text>

        {/* Add button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: c.primary }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.addBtnText, { color: c.textOnPrimary, fontFamily: 'Inter-Bold' }]}>
            Add Family & Friends
          </Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <Text style={[styles.disclaimer, { color: isDark ? '#BCCBB7' : c.textTertiary, fontFamily: 'Inter' }]}>
          By sending an invite, you agree to share your basic vitality metrics with this contact once they accept.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  illustrationArea: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  networkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.75,
    lineHeight: 38,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 29.25,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  addBtn: {
    width: '100%',
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  disclaimer: {
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
    marginHorizontal: 40,
  },
});
